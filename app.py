"""Read-only desktop companion for the DME Helper IVAO flight-simulation bot."""

import asyncio
import math
import os
import re
import socket
import sys
import threading
import time
from datetime import datetime, timedelta, timezone
from pathlib import Path

import aiohttp
import webview
from aiohttp import web

BASE_DIR = Path(getattr(sys, "_MEIPASS", Path(__file__).resolve().parent))
STATIC_DIR = BASE_DIR / "static"
METAR_URL = "https://aviationweather.gov/api/data/metar"
TAF_URL = "https://aviationweather.gov/api/data/taf"
WHAZZUP_URL = "https://api.ivao.aero/v2/tracker/whazzup"
ATC_SUMMARY_URL = "https://api.ivao.aero/v2/tracker/now/atc/summary"
EVENTS_URL = "https://api.ivao.aero/v1/events"
ICAO_RE = re.compile(r"^[A-Z0-9]{4}$")
TIMEOUT = aiohttp.ClientTimeout(total=18)
USER_AGENT = {"User-Agent": "DMEHelper/1.0 (flight simulation companion)"}
CACHE_SECONDS = 15  # IVAO refreshes its feed about every 15 seconds
MAX_MAP_PILOTS = 4000
_cache: dict = {}


def clients(feed: dict, kind: str) -> list:
    container = feed.get("clients") if isinstance(feed.get("clients"), dict) else feed
    items = container.get(kind)
    if not isinstance(items, list):
        return []
    return [item for item in items if isinstance(item, dict)]


def valid_coordinates(latitude, longitude):
    if isinstance(latitude, bool) or isinstance(longitude, bool):
        return None
    try:
        latitude = float(latitude)
        longitude = float(longitude)
    except (TypeError, ValueError):
        return None
    if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
        return None
    return latitude, longitude


def _point_to_lat_lon(point):
    """Accept the point formats IVAO has used: {"value": [lon, lat]},
    {"latitude": .., "longitude": ..}, {"lat": .., "lon": ..}, or [lon, lat]."""
    if isinstance(point, dict):
        value = point.get("value")
        if isinstance(value, (list, tuple)) and len(value) >= 2:
            return valid_coordinates(value[1], value[0])  # GeoJSON order: lon, lat
        lat = point.get("latitude", point.get("lat"))
        lon = point.get("longitude", point.get("lon", point.get("lng")))
        if lat is not None and lon is not None:
            return valid_coordinates(lat, lon)
        return None
    if isinstance(point, (list, tuple)) and len(point) >= 2:
        return valid_coordinates(point[1], point[0])  # lon, lat
    return None


def normalize_region_polygon(raw_polygon) -> list:
    if isinstance(raw_polygon, dict):  # GeoJSON-like {"coordinates": [[...]]}
        raw_polygon = raw_polygon.get("coordinates") or raw_polygon.get("points")
        if isinstance(raw_polygon, list) and raw_polygon and isinstance(raw_polygon[0], list) \
                and raw_polygon[0] and isinstance(raw_polygon[0][0], (list, tuple, dict)):
            raw_polygon = raw_polygon[0]
    if not isinstance(raw_polygon, list):
        return []
    points = []
    for point in raw_polygon:
        location = _point_to_lat_lon(point)
        if location is not None:
            points.append([location[0], location[1]])
    return points if len(points) >= 3 else []


def polygon_centroid(points: list) -> tuple:
    x = y = z = 0.0
    for latitude, longitude in points:
        latitude_radians = math.radians(latitude)
        longitude_radians = math.radians(longitude)
        x += math.cos(latitude_radians) * math.cos(longitude_radians)
        y += math.cos(latitude_radians) * math.sin(longitude_radians)
        z += math.sin(latitude_radians)
    horizontal = math.hypot(x, y)
    if horizontal < 1e-12 and abs(z) < 1e-12:
        return points[0][0], points[0][1]
    return (
        math.degrees(math.atan2(z, horizontal)),
        math.degrees(math.atan2(y, x)),
    )


async def fetch_json(session: aiohttp.ClientSession, url: str, params=None):
    async with session.get(url, params=params, timeout=TIMEOUT) as response:
        if response.status == 204:
            return None
        response.raise_for_status()
        return await response.json(content_type=None)


async def get_optional(session, url, params, label, errors, cache=False):
    key = (url, tuple(sorted((params or {}).items())))
    if cache:
        hit = _cache.get(key)
        if hit and time.monotonic() - hit[0] < CACHE_SECONDS:
            return hit[1]
    try:
        data = await fetch_json(session, url, params)
        if cache and data is not None:
            _cache[key] = (time.monotonic(), data)
        return data
    except (aiohttp.ClientError, asyncio.TimeoutError, ValueError) as exc:
        errors.append(f"{label} is temporarily unavailable ({type(exc).__name__}).")
        stale = _cache.get(key)
        return stale[1] if cache and stale else None


async def briefing(request: web.Request) -> web.Response:
    icao = request.query.get("icao", "").strip().upper()
    if not ICAO_RE.fullmatch(icao):
        raise web.HTTPBadRequest(text="Enter a four-character ICAO airport code.")

    errors = []
    async with aiohttp.ClientSession(
        headers=USER_AGENT
    ) as session:
        metar_data, taf_data, feed = await asyncio.gather(
            get_optional(session, METAR_URL, {"ids": icao, "format": "json"}, "METAR", errors),
            get_optional(session, TAF_URL, {"ids": icao, "format": "json"}, "TAF", errors),
            get_optional(session, WHAZZUP_URL, None, "IVAO live activity", errors, cache=True),
        )

    metar = metar_data[0] if isinstance(metar_data, list) and metar_data else None
    taf = taf_data[0] if isinstance(taf_data, list) and taf_data else None
    controllers = []
    traffic = []
    updated_at = None
    if isinstance(feed, dict):
        updated_at = feed.get("updatedAt")
        for controller in clients(feed, "atcs"):
            callsign = str(controller.get("callsign") or "").upper()
            if callsign.startswith(icao + "_"):
                session_data = controller.get("atcSession") or {}
                controllers.append(
                    {
                        "callsign": callsign,
                        "position": session_data.get("position") or callsign.rsplit("_", 1)[-1],
                        "frequency": session_data.get("frequency"),
                        "atis": (controller.get("atis") or {}).get("lines") or [],
                    }
                )
        for pilot in clients(feed, "pilots"):
            plan = pilot.get("flightPlan") or {}
            departure = str(plan.get("departureId") or "").upper()
            arrival = str(plan.get("arrivalId") or "").upper()
            if departure == icao or arrival == icao:
                track = pilot.get("lastTrack") or {}
                traffic.append(
                    {
                        "callsign": pilot.get("callsign") or "Unknown",
                        "aircraft": (plan.get("aircraftId") or "—")[:8],
                        "departure": departure or "—",
                        "arrival": arrival or "—",
                        "state": track.get("state") or "Status unavailable",
                        "distance_nm": track.get("arrivalDistance"),
                    }
                )

    return web.json_response(
        {
            "icao": icao,
            "metar": metar,
            "taf": (taf or {}).get("rawTAF"),
            "controllers": sorted(controllers, key=lambda item: item["callsign"]),
            "traffic": traffic[:30],
            "ivao_updated_at": updated_at,
            "errors": errors,
            "fetched_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        }
    )


async def network(request: web.Request) -> web.Response:
    del request
    errors = []
    async with aiohttp.ClientSession(
        headers=USER_AGENT
    ) as session:
        feed, atc_summary = await asyncio.gather(
            get_optional(session, WHAZZUP_URL, None, "IVAO network data", errors, cache=True),
            get_optional(session, ATC_SUMMARY_URL, None, "IVAO ATC map data", errors, cache=True),
        )
    if not isinstance(feed, dict):
        return web.json_response(
            {"error": "IVAO network data is temporarily unavailable."},
            status=502,
        )
    pilots = clients(feed, "pilots")
    map_pilots = []
    for pilot in pilots:
        if not isinstance(pilot, dict):
            continue
        track = pilot.get("lastTrack") or {}
        if not isinstance(track, dict):
            track = {}
        latitude = track.get("latitude")
        if latitude is None:
            latitude = track.get("lat", pilot.get("latitude"))
        longitude = track.get("longitude")
        if longitude is None:
            longitude = track.get("lon", track.get("lng", pilot.get("longitude")))
        if isinstance(latitude, bool) or isinstance(longitude, bool):
            continue
        try:
            latitude = float(latitude)
            longitude = float(longitude)
        except (TypeError, ValueError):
            continue
        if not (-90 <= latitude <= 90 and -180 <= longitude <= 180):
            continue

        plan = pilot.get("flightPlan") or {}
        if not isinstance(plan, dict):
            plan = {}
        map_pilots.append(
            {
                "callsign": str(pilot.get("callsign") or "Unknown")[:32],
                "aircraft": str(plan.get("aircraftId") or "")[:16],
                "departure": str(plan.get("departureId") or "")[:4],
                "arrival": str(plan.get("arrivalId") or "")[:4],
                "latitude": latitude,
                "longitude": longitude,
                "heading": track.get("heading"),
            }
        )
    fallback_atc_locations = {}
    for controller in clients(feed, "atcs"):
        if not isinstance(controller, dict):
            continue
        track = controller.get("lastTrack") or {}
        if not isinstance(track, dict):
            track = {}
        location = valid_coordinates(track.get("latitude"), track.get("longitude"))
        if location is not None:
            callsign = str(controller.get("callsign") or "Unknown")[:32]
            fallback_atc_locations[callsign] = location

    if isinstance(atc_summary, dict):
        for wrapper_key in ("atcs", "data", "items", "results"):
            if isinstance(atc_summary.get(wrapper_key), list):
                atc_summary = atc_summary[wrapper_key]
                break
    map_zone_data_available = isinstance(atc_summary, list)
    map_atcs = []
    if map_zone_data_available:
        atc_records = atc_summary
    else:
        atc_records = clients(feed, "atcs")

    for controller in atc_records:
        if not isinstance(controller, dict):
            continue
        callsign = str(controller.get("callsign") or "Unknown")[:32]
        atc_position = controller.get("atcPosition") or {}
        if not isinstance(atc_position, dict):
            atc_position = {}
        session_data = controller.get("atcSession") or {}
        if not isinstance(session_data, dict):
            session_data = {}

        zone_polygon = []
        for source in (atc_position, controller):
            for field in ("regionMapPolygon", "regionMap", "polygon"):
                zone_polygon = normalize_region_polygon(source.get(field))
                if zone_polygon:
                    break
            if zone_polygon:
                break
        airport = atc_position.get("airport") or {}
        if not isinstance(airport, dict):
            airport = {}
        location = valid_coordinates(airport.get("latitude"), airport.get("longitude"))
        if location is None and zone_polygon:
            location = polygon_centroid(zone_polygon)
        if location is None:
            location = fallback_atc_locations.get(callsign)
        if location is None:
            continue

        airport_code = str(airport.get("icao") or atc_position.get("airportId") or "").upper()[:4]
        position = atc_position.get("position") or session_data.get("position")
        if not position:
            position = callsign.rsplit("_", 1)[-1]
        map_atcs.append(
            {
                "callsign": callsign,
                "position": str(position)[:16],
                "frequency": session_data.get("frequency"),
                "airport": airport_code,
                "latitude": location[0],
                "longitude": location[1],
                "zone_polygon": zone_polygon,
            }
        )

    return web.json_response(
        {
            "pilots": len(pilots),
            "controllers": len(clients(feed, "atcs")),
            "observers": len(clients(feed, "observers")),
            "updated_at": feed.get("updatedAt"),
            "map_pilots": map_pilots[:MAX_MAP_PILOTS],
            "map_atcs": map_atcs[:1000],
            "map_zone_data_available": map_zone_data_available,
            "map_zone_count": sum(1 for item in map_atcs if item["zone_polygon"]),
        }
    )


async def events(request: web.Request) -> web.Response:
    del request
    async with aiohttp.ClientSession(
        headers=USER_AGENT
    ) as session:
        try:
            data = await fetch_json(session, EVENTS_URL, {"limit": 50})
        except (aiohttp.ClientError, asyncio.TimeoutError, ValueError) as exc:
            return web.json_response(
                {"error": f"IVAO events are temporarily unavailable ({type(exc).__name__})."},
                status=502,
            )
    if not isinstance(data, list):
        return web.json_response({"error": "IVAO returned an unexpected events response."}, status=502)

    now = datetime.now(timezone.utc)
    until = now + timedelta(days=7)
    upcoming = []
    for event in data:
        if not isinstance(event, dict) or not event.get("title"):
            continue
        try:
            start = datetime.fromisoformat(str(event.get("startDate", "")).replace("Z", "+00:00"))
            end = datetime.fromisoformat(str(event.get("endDate", "")).replace("Z", "+00:00"))
            if start.tzinfo is None or end.tzinfo is None or end <= now or start >= until:
                continue
        except ValueError:
            continue
        upcoming.append(
            {
                "id": str(event.get("id") or event.get("title")),
                "title": str(event["title"])[:160],
                "start": start.astimezone(timezone.utc).isoformat(),
                "end": end.astimezone(timezone.utc).isoformat(),
                "divisions": event.get("divisions") if isinstance(event.get("divisions"), list) else [],
                "airports": event.get("airports") if isinstance(event.get("airports"), list) else [],
                "url": event.get("infoUrl") if str(event.get("infoUrl", "")).startswith("https://") else None,
            }
        )
    upcoming.sort(key=lambda item: item["start"])
    return web.json_response({"events": upcoming})


def index(request: web.Request) -> web.FileResponse:
    del request
    return web.FileResponse(STATIC_DIR / "index.html")


CSP = (
    "default-src 'self'; "
    "script-src 'self' https://unpkg.com; "
    "style-src 'self' 'unsafe-inline' https://unpkg.com https://fonts.googleapis.com; "
    "font-src https://fonts.gstatic.com; "
    "img-src 'self' data: blob: https://server.arcgisonline.com https://unpkg.com; "
    "connect-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"
)


@web.middleware
async def security(request: web.Request, handler):
    # Only the app's own window may talk to this local server. Rejecting foreign
    # Host headers blocks DNS-rebinding attacks from web pages in other browsers.
    if request.host not in request.app["allowed_hosts"]:
        raise web.HTTPForbidden(text="Forbidden")
    if request.method not in ("GET", "HEAD"):
        raise web.HTTPMethodNotAllowed(request.method, ["GET", "HEAD"])
    try:
        response = await handler(request)
    except web.HTTPException as exc:
        response = exc
    response.headers["Content-Security-Policy"] = CSP
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "no-referrer"
    response.headers["X-Frame-Options"] = "DENY"
    if request.path.startswith("/api/"):
        response.headers["Cache-Control"] = "no-store"
    if isinstance(response, web.HTTPException):
        raise response
    return response


def create_app(port: int = 0) -> web.Application:
    app = web.Application(client_max_size=1024 * 1024, middlewares=[security])
    app["allowed_hosts"] = {f"127.0.0.1:{port}", f"localhost:{port}"}
    app.router.add_get("/api/briefing", briefing)
    app.router.add_get("/api/network", network)
    app.router.add_get("/api/events", events)
    app.router.add_get("/", index)
    app.router.add_static("/static/", STATIC_DIR, show_index=False)
    return app


def find_free_port() -> int:
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def start_server(port: int, ready: threading.Event, state: dict) -> None:
    loop = asyncio.new_event_loop()
    state["loop"] = loop
    asyncio.set_event_loop(loop)

    async def setup_server():
        runner = web.AppRunner(create_app(port))
        await runner.setup()
        site = web.TCPSite(runner, "127.0.0.1", port)
        await site.start()
        return runner

    try:
        state["runner"] = loop.run_until_complete(setup_server())
        ready.set()
        loop.run_forever()
    except Exception as exc:
        state["error"] = exc
        ready.set()
    finally:
        runner = state.get("runner")
        if runner is not None:
            loop.run_until_complete(runner.cleanup())
        loop.close()


def show_error(message: str) -> None:
    """The exe has no console, so surface fatal errors in a message box."""
    if sys.platform == "win32":
        import ctypes

        ctypes.windll.user32.MessageBoxW(0, message, "DME Helper", 0x10)
    else:
        print(message, file=sys.stderr)


def data_dir() -> str:
    base = os.environ.get("LOCALAPPDATA") or str(Path.home() / ".local" / "share")
    path = Path(base) / "DMEHelper"
    path.mkdir(parents=True, exist_ok=True)
    return str(path)


def run_desktop() -> None:
    port = find_free_port()
    ready = threading.Event()
    state = {}
    server_thread = threading.Thread(
        target=start_server, args=(port, ready, state), name="dme-helper-server", daemon=True
    )
    server_thread.start()
    if not ready.wait(timeout=15):
        raise RuntimeError("The local app server did not start in time.")
    if "error" in state:
        raise RuntimeError(f"The local app server failed to start: {state['error']}")

    try:
        webview.create_window("DME Helper", f"http://127.0.0.1:{port}", width=1280, height=850)
        # private_mode=False + storage_path keep the logbook and favourites between runs.
        gui = "edgechromium" if sys.platform == "win32" else None
        webview.start(gui=gui, private_mode=False, storage_path=data_dir())
    finally:
        loop = state.get("loop")
        if loop and loop.is_running():
            loop.call_soon_threadsafe(loop.stop)
        server_thread.join(timeout=5)


def main() -> None:
    try:
        run_desktop()
    except Exception as exc:  # noqa: BLE001
        show_error(
            f"DME Helper could not start:\n\n{exc}\n\n"
            "On Windows this app needs the Microsoft Edge WebView2 Runtime:\n"
            "https://developer.microsoft.com/microsoft-edge/webview2/"
        )
        sys.exit(1)


if __name__ == "__main__":
    main()
