const FAVORITES_KEY = 'domodedovo.app.favorites.v1';
const LOGBOOK_KEY = 'domodedovo.app.logbook.v1';
const LANGUAGE_KEY = 'dme-helper.language.v1';
const MAP_THEME_KEY = 'dme-helper.map-theme.v1';
const MAP_ZONES_KEY = 'dme-helper.map-zones.v1';
const ZONE_COLORS = {ground: '#d9a400', delivery: '#e07b1f', tower: '#d9453d', center: '#6b7580', approach: '#2f7fc1', atis: '#8a8f94', other: '#8a8f94'};
// Used only when IVAO publishes no boundary for a position (radius in km).
const APPROX_RADIUS_KM = {delivery: 5, ground: 5, tower: 18, approach: 74};
const translations = {
  en: {
    brandSubtitle: 'IVAO FLIGHT COMPANION', workspace: 'WORKSPACE', overview: 'Overview', briefing: 'Briefing', network: 'Network', events: 'Events', logbook: 'Logbook',
    mainNavigation: 'Main navigation', mainTabs: 'Main tabs', language: 'Language', networkTotals: 'IVAO network totals', removeFavorite: 'Remove saved airport',
    dataLinkActive: 'DATA LINK ACTIVE', weatherSource: 'Weather · aviationweather.gov', networkSource: 'Network · IVAO public feed', sideVersion: 'SIMULATION COMPANION / 01',
    flightOperations: 'FLIGHT OPERATIONS', simPilotConsole: 'SIM PILOT CONSOLE', headlineFirst: 'Good flying starts', headlineSecond: 'with better awareness.',
    introCopy: 'Airport conditions, live network activity, live map coverage, and your personal flight history in a single cockpit view.',
    ivaoLiveOverview: 'IVAO LIVE OVERVIEW', liveMap: 'Live map', livePositions: '· aircraft positions', tracking: 'TRACKING', mapAria: 'Live IVAO aircraft map',
    mapConnecting: 'Connecting to IVAO…', aircraftPositions: 'Aircraft', atcCoverage: 'IVAO ATC zones',
    mapZoneUnavailable: 'IVAO ATC boundary data is temporarily unavailable.',
    mapZoneAvailable: 'IVAO boundary available', mapZoneMissing: 'No IVAO boundary data for this position', mapZoneApprox: 'Approximate coverage circle (no IVAO boundary)', zonesToggle: 'ZONES', zonesCount: '{zones} zones', zonesApproxLegend: 'Approx. coverage',
    mapStyle: 'Map style', mapLight: 'LIGHT', mapDark: 'DARK', mapAttribution: 'Map tiles © Esri', mapLibraryUnavailable: 'Map library unavailable. Check your internet connection.',
    mapFeedUnavailable: 'IVAO positions unavailable.', mapNoPositions: 'No aircraft positions available · {controllers} ATC positions shown.', mapPositions: '{count} aircraft · {controllers} ATC positions · public IVAO feed',
    operations: 'OPERATIONS', flightBoard: 'Flight board', quickView: '· quick view', live: 'LIVE', lastMetar: 'LAST METAR', activeAtc: 'ACTIVE ATC', onlinePilots: 'ONLINE PILOTS',
    recent: 'RECENT', watch: 'WATCH', atcSectors: 'ATC sectors and hand-offs', note: 'NOTE', weatherChecks: 'Weather and visibility',
    airportSearch: 'Airport search', airportBriefing: 'AIRPORT BRIEFING', icaoLabel: 'Four-character airport ICAO code', icaoPlaceholder: 'Enter ICAO code · e.g. UUDD',
    getBriefing: 'Get briefing', quickAccess: 'QUICK ACCESS', saveCurrent: '＋ Save current', loadingBriefing: 'Loading airport briefing…', noSavedAirports: 'No saved airports yet.',
    invalidIcao: 'Enter a valid four-character ICAO code.', requestingData: 'Requesting current data for {code}…', fetchedBriefing: 'Briefing for {code} · fetched {time} local time',
    partialData: ' · some data sources unavailable', invalidFavorite: 'Enter a valid ICAO code before saving it.', requestFailed: 'Request failed. Please try again.',
    currentConditions: 'CURRENT CONDITIONS', airport: '· AIRPORT', wind: 'WIND', visibility: 'VISIBILITY', temperature: 'TEMPERATURE', unavailable: 'UNAVAILABLE',
    timeUnavailable: 'TIME N/A', noMetar: 'No METAR available for this station.', tafLabel: 'TERMINAL FORECAST · TAF', noTaf: 'No TAF available for this station.',
    liveActivity: 'LIVE IVAO ACTIVITY', airspace: '· AIRSPACE', controllers: 'CONTROLLERS', noControllers: 'No controllers online at this airport.', publicNetworkData: 'PUBLIC NETWORK DATA',
    arrivalsDepartures: 'ARRIVALS & DEPARTURES', noTraffic: 'No matching traffic in the local area.', atis: 'ATIS', source: 'SOURCE',
    liveNetwork: 'LIVE NETWORK', ivaoRightNow: 'IVAO right now', waitingFeed: 'WAITING FOR FEED', connecting: 'CONNECTING…',
    connectedPilots: 'CONNECTED PILOTS', activeNetwork: 'Active on the network', providingAtc: 'Providing ATC service', observers: 'OBSERVERS',
    connectedObservers: 'Connected observers', networkNote: 'Live totals from the public IVAO tracker. Feed availability can vary.', refreshFeed: 'Refresh feed ↻',
    networkUpdated: 'FEED UPDATED', upcoming: 'UPCOMING', ivaoEvents: 'IVAO events', nextSevenDays: 'NEXT 7 DAYS', loadingEvents: 'Loading events…',
    noEvents: 'No published events found in the next seven days.', generalEvent: 'General event', personalRecord: 'PERSONAL RECORD', flightLogbook: 'Flight logbook',
    localOnly: 'LOCAL ONLY', flightsLogged: 'FLIGHTS LOGGED', totalTime: 'TOTAL TIME', callsign: 'CALLSIGN', aircraft: 'AIRCRAFT', from: 'FROM',
    to: 'TO', timeMinutes: 'TIME (MIN)', addFlight: '＋ Add completed flight', callsignPlaceholder: 'e.g. AFL123', aircraftPlaceholder: 'A320',
    noFlights: 'No flights logged yet. Add your next completed operation.', deleteFlight: 'Delete flight', privacyNote: 'Your logbook stays in this browser only. It is not sent to a server.',
    sameAirport: 'Departure and arrival airports must be different.', invalidFlight: 'Check the flight details and enter a valid duration.',
    builtForSimmers: 'BUILT FOR FLIGHT SIMMERS', disclaimer: 'NOT FOR REAL-WORLD NAVIGATION · DATA MAY BE DELAYED',
    briefingError: 'Airport briefing is temporarily unavailable.', networkError: 'IVAO network data is temporarily unavailable.', eventsError: 'IVAO events are temporarily unavailable.'
  },
  ru: {
    brandSubtitle: 'ПОМОЩНИК ПИЛОТА IVAO', workspace: 'РАБОЧЕЕ ПРОСТРАНСТВО', overview: 'Обзор', briefing: 'Сводка', network: 'Сеть', events: 'События', logbook: 'Журнал полётов',
    mainNavigation: 'Главная навигация', mainTabs: 'Основные разделы', language: 'Язык', networkTotals: 'Статистика сети IVAO', removeFavorite: 'Удалить сохранённый аэропорт',
    dataLinkActive: 'СВЯЗЬ АКТИВНА', weatherSource: 'Погода · aviationweather.gov', networkSource: 'Сеть · открытый канал IVAO', sideVersion: 'АВИАСИМУЛЯТОР / 01',
    flightOperations: 'ЛЁТНЫЕ ОПЕРАЦИИ', simPilotConsole: 'КАБИНА ПИЛОТА', headlineFirst: 'Уверенный полёт начинается', headlineSecond: 'с полной ситуационной осведомлённости.',
    introCopy: 'Погода в аэропорту, активность сети, карта трафика и ваша история полётов — на одном экране.',
    ivaoLiveOverview: 'СЕТЬ IVAO В РЕАЛЬНОМ ВРЕМЕНИ', liveMap: 'Карта трафика', livePositions: '· позиции самолётов', tracking: 'СЛЕЖЕНИЕ', mapAria: 'Карта самолётов IVAO в реальном времени',
    mapConnecting: 'Подключение к IVAO…', aircraftPositions: 'Самолёты', atcCoverage: 'Зоны УВД IVAO',
    mapZoneUnavailable: 'Данные границ УВД IVAO временно недоступны.',
    mapZoneAvailable: 'Граница IVAO доступна', mapZoneMissing: 'Для этой позиции IVAO не публикует границу', mapZoneApprox: 'Приблизительная зона покрытия (границы IVAO нет)', zonesToggle: 'ЗОНЫ', zonesCount: 'зон: {zones}', zonesApproxLegend: 'Прибл. покрытие',
    mapStyle: 'Стиль карты', mapLight: 'СВЕТЛАЯ', mapDark: 'ТЁМНАЯ', mapAttribution: 'Карта © Esri', mapLibraryUnavailable: 'Не удалось загрузить карту. Проверьте подключение к интернету.',
    mapFeedUnavailable: 'Позиции IVAO недоступны.', mapNoPositions: 'Нет позиций самолётов · показано позиций УВД: {controllers}.', mapPositions: 'Самолёты: {count} · позиции УВД: {controllers} · открытый канал IVAO',
    operations: 'ОПЕРАЦИИ', flightBoard: 'Табло полётов', quickView: '· кратко', live: 'В СЕТИ', lastMetar: 'ПОСЛЕДНИЙ METAR', activeAtc: 'АКТИВНЫЕ ДИСПЕТЧЕРЫ', onlinePilots: 'ПИЛОТЫ В СЕТИ',
    recent: 'НЕДАВНО', watch: 'КОНТРОЛЬ', atcSectors: 'Секторы и передача управления', note: 'ПОГОДА', weatherChecks: 'Погода и видимость',
    airportSearch: 'Поиск аэропорта', airportBriefing: 'СВОДКА ПО АЭРОПОРТУ', icaoLabel: 'Четырёхзначный код аэропорта ICAO', icaoPlaceholder: 'Введите код ICAO · например UUDD',
    getBriefing: 'Получить сводку', quickAccess: 'БЫСТРЫЙ ДОСТУП', saveCurrent: '＋ Сохранить код', loadingBriefing: 'Загрузка сводки аэропорта…', noSavedAirports: 'Нет сохранённых аэропортов.',
    invalidIcao: 'Введите корректный четырёхзначный код ICAO.', requestingData: 'Запрашиваем данные для {code}…', fetchedBriefing: 'Сводка {code} · получена в {time} (местное время)',
    partialData: ' · некоторые источники данных недоступны', invalidFavorite: 'Введите корректный код ICAO перед сохранением.', requestFailed: 'Не удалось выполнить запрос. Попробуйте ещё раз.',
    currentConditions: 'ТЕКУЩИЕ УСЛОВИЯ', airport: '· АЭРОПОРТ', wind: 'ВЕТЕР', visibility: 'ВИДИМОСТЬ', temperature: 'ТЕМПЕРАТУРА', unavailable: 'НЕТ ДАННЫХ',
    timeUnavailable: 'ВРЕМЯ Н/Д', noMetar: 'METAR для этой станции недоступен.', tafLabel: 'ПРОГНОЗ АЭРОДРОМА · TAF', noTaf: 'TAF для этой станции недоступен.',
    liveActivity: 'АКТИВНОСТЬ IVAO', airspace: '· ВОЗДУШНОЕ ПРОСТРАНСТВО', controllers: 'ДИСПЕТЧЕРЫ', noControllers: 'На этом аэродроме нет диспетчеров в сети.', publicNetworkData: 'ОТКРЫТЫЕ ДАННЫЕ СЕТИ',
    arrivalsDepartures: 'ПРИЛЁТЫ И ВЫЛЕТЫ', noTraffic: 'Поблизости нет подходящего трафика.', atis: 'ATIS', source: 'ИСТОЧНИК',
    liveNetwork: 'СЕТЬ В РЕАЛЬНОМ ВРЕМЕНИ', ivaoRightNow: 'IVAO сейчас', waitingFeed: 'ОЖИДАНИЕ ДАННЫХ', connecting: 'ПОДКЛЮЧЕНИЕ…',
    connectedPilots: 'ПИЛОТЫ В СЕТИ', activeNetwork: 'Активны в сети', providingAtc: 'Обеспечивают диспетчерское обслуживание', observers: 'НАБЛЮДАТЕЛИ',
    connectedObservers: 'Наблюдатели в сети', networkNote: 'Текущая статистика открытого трекера IVAO. Доступность канала может меняться.', refreshFeed: 'Обновить данные ↻',
    networkUpdated: 'ДАННЫЕ ОБНОВЛЕНЫ', upcoming: 'СКОРО', ivaoEvents: 'События IVAO', nextSevenDays: 'СЛЕДУЮЩИЕ 7 ДНЕЙ', loadingEvents: 'Загрузка событий…',
    noEvents: 'На следующие семь дней опубликованных событий нет.', generalEvent: 'Общее событие', personalRecord: 'ЛИЧНАЯ ИСТОРИЯ', flightLogbook: 'Журнал полётов',
    localOnly: 'ТОЛЬКО ЛОКАЛЬНО', flightsLogged: 'ПОЛЁТОВ ЗАПИСАНО', totalTime: 'ОБЩЕЕ ВРЕМЯ', callsign: 'ПОЗЫВНОЙ', aircraft: 'САМОЛЁТ', from: 'ОТКУДА',
    to: 'КУДА', timeMinutes: 'ВРЕМЯ (МИН)', addFlight: '＋ Добавить выполненный полёт', callsignPlaceholder: 'например AFL123', aircraftPlaceholder: 'A320',
    noFlights: 'Полётов пока нет. Добавьте следующий выполненный рейс.', deleteFlight: 'Удалить полёт', privacyNote: 'Журнал хранится только в этом браузере и не отправляется на сервер.',
    sameAirport: 'Аэропорты вылета и прилёта должны различаться.', invalidFlight: 'Проверьте данные рейса и укажите корректную длительность.',
    builtForSimmers: 'ДЛЯ ЛЮБИТЕЛЕЙ АВИАСИМУЛЯТОРОВ', disclaimer: 'НЕ ДЛЯ РЕАЛЬНОЙ НАВИГАЦИИ · ДАННЫЕ МОГУТ ЗАПАЗДЫВАТЬ',
    briefingError: 'Сводка аэропорта временно недоступна.', networkError: 'Данные сети IVAO временно недоступны.', eventsError: 'События IVAO временно недоступны.'
  }
};
let language = readLocal(LANGUAGE_KEY, 'en');
if (!translations[language]) language = 'en';
let activePanel = 'overview';
let map;
let mapMarkers;
let mapTileLayer;
let mapLabelLayer;
let zoneLayer;
let zonesVisible = readLocal(MAP_ZONES_KEY, true) !== false;
let mapTheme = readLocal(MAP_THEME_KEY, 'light');
if (!['light', 'dark'].includes(mapTheme)) mapTheme = 'light';

function t(key) {
  return translations[language][key] || translations.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.documentElement.classList.toggle('ru', language === 'ru');
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  document.querySelectorAll('[data-i18n-aria]').forEach((element) => {
    element.setAttribute('aria-label', t(element.dataset.i18nAria));
  });
  document.querySelectorAll('[data-language]').forEach((button) => {
    const active = button.dataset.language === language;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  updateBreadcrumb();
  document.getElementById('flight-form-status').textContent = '';
  formatClock();
  renderFavorites();
  renderLogbook();
}

function escapeHTML(value) {
  return String(value ?? '').replace(/[&<>"']/g, (char) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[char]));
}

function readLocal(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key, value) {
  try {
    writeLocal(key, value);
  } catch {
    // Storage unavailable: keep working without persistence.
  }
}

function formatClock() {
  const now = new Date();
  const locale = language === 'ru' ? 'ru-RU' : 'en-GB';
  document.getElementById('utc-clock').textContent = `UTC ${new Intl.DateTimeFormat(locale, {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false}).format(now)}`;
  document.getElementById('utc-date').textContent = new Intl.DateTimeFormat(locale, {timeZone: 'UTC', weekday: 'short', day: '2-digit', month: 'short', year: 'numeric'}).format(now).toUpperCase();
}

function activatePanel(target) {
  activePanel = target;
  const tabs = document.querySelectorAll('[data-tab-target]');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach((button) => {
    button.classList.toggle('active', button.dataset.tabTarget === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle('active', panel.dataset.panel === target);
  });
  updateBreadcrumb();
  if (target === 'overview' && map) {
    setTimeout(() => map.invalidateSize(), 100);
  }
}

function updateBreadcrumb() {
  const breadcrumb = document.getElementById('breadcrumb-current');
  if (breadcrumb) {
    const locale = language === 'ru' ? 'ru-RU' : 'en-GB';
    breadcrumb.textContent = t(activePanel).toLocaleUpperCase(locale);
  }
}

function initializeMap() {
  const statusEl = document.getElementById('map-status');
  if (!window.L) {
    statusEl.textContent = t('mapLibraryUnavailable');
    return;
  }

  map = window.L.map('ivao-map', {zoomControl: false, scrollWheelZoom: true}).setView([25, 20], 2);
  map.on('zoomend', () => {
    map.getContainer().classList.toggle('map-zoomed-out', map.getZoom() < 4);
  });
  map.getContainer().classList.toggle('map-zoomed-out', map.getZoom() < 4);
  zoneLayer = window.L.layerGroup();
  if (zonesVisible) zoneLayer.addTo(map);
  mapMarkers = window.L.layerGroup().addTo(map);
  updateZonesToggle();
  setMapTheme(mapTheme);
  statusEl.textContent = t('mapConnecting');
}

function setMapTheme(theme) {
  mapTheme = theme;
  if (mapTileLayer) map.removeLayer(mapTileLayer);
  if (mapLabelLayer) map.removeLayer(mapLabelLayer);
  const attribution = 'Tiles &copy; Esri — Sources: Esri, TomTom, Garmin, FAO, NOAA, USGS, OpenStreetMap contributors, and the GIS User Community';
  if (theme === 'dark') {
    const tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray';
    mapTileLayer = window.L.tileLayer(`${tileUrl}_Base/MapServer/tile/{z}/{y}/{x}`, {
      maxZoom: 19,
      maxNativeZoom: 16,
      attribution,
    }).addTo(map);
    mapLabelLayer = window.L.tileLayer(`${tileUrl}_Reference/MapServer/tile/{z}/{y}/{x}`, {
      maxZoom: 19,
      maxNativeZoom: 16,
      zIndex: 2,
    }).addTo(map);
  } else {
    mapTileLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 19,
      maxNativeZoom: 19,
      attribution,
    }).addTo(map);
    mapLabelLayer = null;
  }
  document.querySelectorAll('[data-map-theme]').forEach((button) => {
    const active = button.dataset.mapTheme === theme;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
}

function updateZonesToggle() {
  const button = document.getElementById('zones-toggle');
  if (!button) return;
  button.classList.toggle('active', zonesVisible);
  button.setAttribute('aria-pressed', String(zonesVisible));
}

function setZonesVisible(visible) {
  zonesVisible = visible;
  writeLocal(MAP_ZONES_KEY, visible);
  if (map && zoneLayer) {
    if (visible) zoneLayer.addTo(map);
    else map.removeLayer(zoneLayer);
  }
  updateZonesToggle();
}

function polygonSize(points) {
  const lats = points.map((p) => p[0]);
  const lons = points.map((p) => p[1]);
  const midLat = (Math.max(...lats) + Math.min(...lats)) / 2;
  const heightKm = (Math.max(...lats) - Math.min(...lats)) * 111;
  const widthKm = (Math.max(...lons) - Math.min(...lons)) * 111 * Math.cos(midLat * Math.PI / 180);
  return Math.abs(heightKm * widthKm); // rough km², only used to order drawing
}

function atcCategory(position) {
  const parts = String(position || '').toUpperCase().split(/[^A-Z0-9]+/);
  if (parts.some((part) => ['TWR', 'TOWER'].includes(part))) return 'tower';
  if (parts.includes('DEL')) return 'delivery';
  if (parts.includes('GND')) return 'ground';
  if (parts.some((part) => ['APP', 'DEP'].includes(part))) return 'approach';
  if (parts.some((part) => ['CTR', 'ACC', 'FSS'].includes(part))) return 'center';
  if (parts.includes('ATIS')) return 'atis';
  return 'other';
}

function atcPositionLabel(position) {
  const parts = String(position || 'ATC').toUpperCase().split(/[^A-Z0-9]+/).filter(Boolean);
  const knownPositions = ['GND', 'DEL', 'TWR', 'APP', 'DEP', 'CTR', 'ACC', 'FSS', 'ATIS'];
  const labels = parts.filter((part) => knownPositions.includes(part));
  return (labels.length ? labels : parts).slice(0, 2).join('/') || 'ATC';
}

function groupAtcControllers(controllers) {
  const groups = new Map();
  controllers.forEach((controller) => {
    const callsign = String(controller.callsign || '').toUpperCase();
    const airport = String(controller.airport || '').toUpperCase();
    const station = /^[A-Z0-9]{4}$/.test(airport) ? airport : callsign.slice(0, 4);
    const key = /^[A-Z0-9]{4}$/.test(station) ? station : callsign;
    if (!groups.has(key)) {
      groups.set(key, {
        station: key,
        latitude: Number(controller.latitude),
        longitude: Number(controller.longitude),
        hasAirportLocation: Boolean(airport),
        controllers: [],
      });
    }
    const group = groups.get(key);
    if (airport && !group.hasAirportLocation) {
      group.latitude = Number(controller.latitude);
      group.longitude = Number(controller.longitude);
      group.hasAirportLocation = true;
    }
    group.controllers.push(controller);
  });
  return Array.from(groups.values());
}

function atcMarkerIcon(controllers) {
  const positions = Array.from(new Set(controllers.map((controller) => atcPositionLabel(controller.position))));
  const labels = positions.map((label) => {
    const category = atcCategory(label);
    return `<span class="atc-label atc-label-${category}">${escapeHTML(label)}</span>`;
  }).join('');
  const width = Math.max(56, positions.length * 56);
  return window.L.divIcon({
    className: 'atc-map-icon',
    html: `<span class="atc-stack">${labels}</span>`,
    iconSize: [width, 22],
    iconAnchor: [width / 2, 11],
  });
}

function renderMap(data) {
  const statusEl = document.getElementById('map-status');
  if (!map || !mapMarkers) {
    statusEl.textContent = t('mapLibraryUnavailable');
    return;
  }

  mapMarkers.clearLayers();
  zoneLayer.clearLayers();
  const aircraft = Array.isArray(data.map_pilots) ? data.map_pilots : [];
  const controllers = Array.isArray(data.map_atcs) ? data.map_atcs : [];
  const zones = [];
  const seenZones = new Set();

  groupAtcControllers(controllers).forEach((group) => {
    const positionDetails = group.controllers.map((controller) => {
      const position = atcPositionLabel(controller.position);
      const frequency = controller.frequency == null ? '—' : `${controller.frequency} MHz`;
      return `<strong>${escapeHTML(controller.callsign)}</strong> · ${escapeHTML(position)} · ${escapeHTML(frequency)}`;
    }).join('<br>');

    group.controllers.forEach((controller) => {
      const category = atcCategory(controller.position);
      const polygon = controller.zone_polygon;
      if (Array.isArray(polygon) && polygon.length >= 3) {
        const key = `p:${JSON.stringify(polygon)}`;
        if (seenZones.has(key)) return;
        seenZones.add(key);
        zones.push({kind: 'polygon', category, polygon, size: polygonSize(polygon), details: `${positionDetails}<br><small>${escapeHTML(t('mapZoneAvailable'))}</small>`});
      } else if (controller.airport && APPROX_RADIUS_KM[category] && Number.isFinite(group.latitude) && Number.isFinite(group.longitude)) {
        const key = `c:${group.station}:${category}`;
        if (seenZones.has(key)) return;
        seenZones.add(key);
        const radius = APPROX_RADIUS_KM[category] * 1000;
        zones.push({kind: 'circle', category, center: [group.latitude, group.longitude], radius, size: Math.PI * APPROX_RADIUS_KM[category] ** 2, details: `${positionDetails}<br><small>${escapeHTML(t('mapZoneApprox'))}</small>`});
      }
    });

    window.L.marker([group.latitude, group.longitude], {
      icon: atcMarkerIcon(group.controllers),
      title: `${group.station} · ${Array.from(new Set(group.controllers.map((controller) => atcPositionLabel(controller.position)))).join(' ')}`,
      riseOnHover: true,
    }).bindPopup(positionDetails).addTo(mapMarkers);
  });

  // Draw large zones first so small ones (tower, ground) stay on top and clickable.
  let approxCount = 0;
  zones.sort((a, b) => b.size - a.size).forEach((zone) => {
    const color = ZONE_COLORS[zone.category] || ZONE_COLORS.other;
    const common = {color, fillColor: color, className: 'map-atc-coverage'};
    let layer;
    if (zone.kind === 'polygon') {
      layer = window.L.polygon(zone.polygon, {...common, weight: 2, opacity: 0.85, fillOpacity: 0.16});
    } else {
      approxCount += 1;
      layer = window.L.circle(zone.center, {...common, radius: zone.radius, weight: 1.5, opacity: 0.8, fillOpacity: 0.1, dashArray: '5 5'});
    }
    layer.bindPopup(zone.details).addTo(zoneLayer);
  });

  aircraft.forEach((pilot) => {
    const route = [pilot.departure, pilot.arrival].filter(Boolean).join(' → ');
    const details = [pilot.callsign, pilot.aircraft, route].filter(Boolean).map(escapeHTML).join('<br>');
    const rawHeading = Number(pilot.heading);
    const heading = Number.isFinite(rawHeading) && rawHeading >= 0 && rawHeading < 360 ? rawHeading : 0;
    const icon = window.L.divIcon({
      className: 'aircraft-map-icon',
      html: `<span class="aircraft-marker" aria-hidden="true"><svg viewBox="0 0 24 24" focusable="false"><path transform="rotate(${heading} 12 12)" d="M12 1 14 9 22 14 22 16 14 13 13 20 16 22 16 23 12 22 8 23 8 22 11 20 10 13 2 16 2 14 10 9Z"/></svg></span>`,
      iconSize: [18, 18],
      iconAnchor: [9, 9],
    });
    window.L.marker([pilot.latitude, pilot.longitude], {
      icon,
      title: pilot.callsign || t('aircraftPositions'),
      riseOnHover: true,
    }).bindPopup(details).addTo(mapMarkers);
  });
  const status = aircraft.length
    ? t('mapPositions')
      .replace('{count}', aircraft.length.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-GB'))
      .replace('{controllers}', controllers.length.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-GB'))
    : t('mapNoPositions').replace('{controllers}', controllers.length.toLocaleString(language === 'ru' ? 'ru-RU' : 'en-GB'));
  const zoneNote = zones.length ? ` · ${t('zonesCount').replace('{zones}', zones.length)}${approxCount ? ` (${approxCount} ≈)` : ''}` : '';
  statusEl.textContent = data.map_zone_data_available === false
    ? `${status}${zoneNote} · ${t('mapZoneUnavailable')}`
    : `${status}${zoneNote}`;
}

async function api(url) {
  const response = await fetch(url, {headers: {Accept: 'application/json'}});
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
  return data;
}

function formatVisibility(raw) {
  // aviationweather.gov reports visibility in statute miles, sometimes as a string like "6+".
  if (raw === undefined || raw === null || raw === '') return '—';
  const text = String(raw);
  // Handles "6+", "3", "1/2" and "1 1/2".
  const miles = text.replace('+', '').trim().split(/\s+/).reduce((sum, part) => {
    const [top, bottom] = part.split('/');
    return sum + (bottom ? Number(top) / Number(bottom) : Number(top));
  }, 0);
  if (!Number.isFinite(miles)) return '—';
  if (text.includes('+') || miles >= 6.2) return '10+ km';
  return `${(miles * 1.609344).toFixed(1)} km`;
}

function renderBriefing(data) {
  const metar = data.metar;
  const category = String(metar?.fltCat || t('unavailable')).toUpperCase();
  const catClass = ['VFR', 'MVFR', 'IFR', 'LIFR'].includes(category) ? category.toLowerCase() : 'unknown';
  const wind = metar?.wspd === undefined || metar?.wspd === null ? '—' : `${metar.wdir === 'VRB' || metar.wdir == null ? 'VRB' : `${String(metar.wdir).padStart(3, '0')}°`} ${metar.wspd} kt`;
  const vis = formatVisibility(metar?.visib);
  const temp = metar?.temp === undefined || metar?.temp === null ? '—' : `${Math.round(metar.temp)}°C`;
  const observation = metar?.obsTime ? `${new Date(metar.obsTime * 1000).toISOString().slice(11, 16)}Z` : t('timeUnavailable');
  const controllers = data.controllers.map((item) => `<div class="activity-row"><span class="row-name">${escapeHTML(item.callsign)}</span><span>${escapeHTML(item.position)}</span><span class="mono">${escapeHTML(item.frequency ?? '—')}</span></div>`).join('');
  const traffic = data.traffic.map((item) => `<div class="activity-row traffic-row"><span class="row-name">${escapeHTML(item.callsign)}</span><span>${escapeHTML(item.departure)} → ${escapeHTML(item.arrival)}</span><span class="traffic-state">${escapeHTML(item.state)}</span></div>`).join('');
  const atis = data.controllers.find((item) => Array.isArray(item.atis) && item.atis.length)?.atis;
  const errors = data.errors?.length ? `<div class="inline-warning">${t('partialData').trim()}</div>` : '';

  const overviewIcao = document.getElementById('overview-icao');
  if (overviewIcao && data.metar) overviewIcao.textContent = data.icao;
  document.getElementById('briefing-content').innerHTML = `
    <article class="weather-card card">
      <div class="card-head"><div><div class="card-kicker">${t('currentConditions')}</div><h3>${escapeHTML(data.icao)} <span class="airport-sub">${t('airport')}</span></h3></div><span class="category-badge ${catClass}"><i></i>${escapeHTML(category)}</span></div>
      <div class="weather-metrics"><div><span>${t('wind')}</span><strong>${escapeHTML(wind)}</strong></div><div><span>${t('visibility')}</span><strong>${escapeHTML(vis)}</strong></div><div><span>${t('temperature')}</span><strong>${escapeHTML(temp)}</strong></div></div>
      <div class="raw-block"><div class="raw-label">METAR <span>${escapeHTML(observation)}</span></div><code>${escapeHTML(metar?.rawOb || t('noMetar'))}</code></div>
      <div class="taf-block"><div class="raw-label">${t('tafLabel')}</div><code>${escapeHTML(data.taf || t('noTaf'))}</code></div>
      ${errors}
      <div class="source-note">${t('source')} · <a href="https://aviationweather.gov/data/api/" target="_blank" rel="noreferrer">AVIATIONWEATHER.GOV</a></div>
    </article>
    <article class="activity-card card">
      <div class="card-head"><div><div class="card-kicker">${t('liveActivity')}</div><h3>${escapeHTML(data.icao)} <span class="airport-sub">${t('airspace')}</span></h3></div><span class="live-tag"><i></i>${t('live')}</span></div>
      <div class="activity-block"><div class="activity-title">${t('controllers')} <span>${data.controllers.length}</span></div>${controllers || `<div class="empty-row">${t('noControllers')}</div>`}</div>
      <div class="activity-block traffic-block"><div class="activity-title">${t('arrivalsDepartures')} <span>${data.traffic.length}</span></div>${traffic || `<div class="empty-row">${t('noTraffic')}</div>`}</div>
      ${atis?.length ? `<div class="atis-preview"><span>${t('atis')} · ${escapeHTML(data.controllers.find((item) => item.atis === atis)?.callsign || '')}</span><p>${escapeHTML(atis.slice(0, 4).join(' · '))}</p></div>` : ''}
      <div class="source-note">IVAO WHAZZUP · <a href="https://api.ivao.aero/" target="_blank" rel="noreferrer">${t('publicNetworkData')}</a></div>
    </article>`;
}

async function loadBriefing(icao) {
  const code = String(icao || '').trim().toUpperCase();
  if (!/^[A-Z0-9]{4}$/.test(code)) {
    document.getElementById('briefing-status').textContent = t('invalidIcao');
    return;
  }

  document.getElementById('icao-input').value = code;
  const statusEl = document.getElementById('briefing-status');
  statusEl.textContent = t('requestingData').replace('{code}', code);
  statusEl.classList.remove('error');
  document.getElementById('briefing-content').innerHTML = '';

  try {
    const data = await api(`/api/briefing?icao=${encodeURIComponent(code)}`);
    renderBriefing(data);
    const locale = language === 'ru' ? 'ru-RU' : 'en-GB';
    statusEl.textContent = t('fetchedBriefing').replace('{code}', code).replace('{time}', new Date(data.fetched_at).toLocaleTimeString(locale, {hour: '2-digit', minute: '2-digit'}));
    if (data.errors?.length) statusEl.textContent += t('partialData');
  } catch (error) {
    statusEl.textContent = t('briefingError');
    statusEl.classList.add('error');
  }
}

document.getElementById('briefing-form').addEventListener('submit', (event) => {
  event.preventDefault();
  loadBriefing(document.getElementById('icao-input').value);
});

function renderFavorites() {
  const savedFavorites = readLocal(FAVORITES_KEY, []);
  const favorites = Array.isArray(savedFavorites) ? savedFavorites : [];
  const favoritesEl = document.getElementById('favorites');
  favoritesEl.innerHTML = favorites.map((code) => `<button type="button" class="favorite-chip" data-icao="${escapeHTML(code)}">${escapeHTML(code)} <span aria-label="${t('removeFavorite')}" data-remove="${escapeHTML(code)}">×</span></button>`).join('') || `<span class="no-favorites">${t('noSavedAirports')}</span>`;

  favoritesEl.querySelectorAll('[data-icao]').forEach((button) => {
    button.addEventListener('click', (event) => {
      const removeCode = event.target.dataset.remove;
      if (removeCode) {
        const next = favorites.filter((item) => item !== removeCode);
        writeLocal(FAVORITES_KEY, next);
        renderFavorites();
        return;
      }
      loadBriefing(button.dataset.icao);
    });
  });
}

document.getElementById('add-favorite').addEventListener('click', () => {
  const code = document.getElementById('icao-input').value.trim().toUpperCase();
  if (!/^[A-Z0-9]{4}$/.test(code)) {
    document.getElementById('briefing-status').textContent = t('invalidFavorite');
    return;
  }

  const savedFavorites = readLocal(FAVORITES_KEY, []);
  const favorites = Array.isArray(savedFavorites) ? savedFavorites : [];
  if (!favorites.includes(code)) favorites.push(code);
  writeLocal(FAVORITES_KEY, favorites.slice(0, 8));
  renderFavorites();
});

async function loadNetwork() {
  document.getElementById('network-updated').textContent = t('connecting');
  document.getElementById('map-status').textContent = t('mapConnecting');
  try {
    const data = await api('/api/network');
    renderMap(data);
    const locale = language === 'ru' ? 'ru-RU' : 'en-GB';
    document.getElementById('pilots-count').textContent = Number(data.pilots).toLocaleString(locale);
    document.getElementById('controllers-count').textContent = Number(data.controllers).toLocaleString(locale);
    document.getElementById('observers-count').textContent = Number(data.observers).toLocaleString(locale);
    document.getElementById('overview-pilots').textContent = Number(data.pilots).toLocaleString(locale);
    document.getElementById('overview-controllers').textContent = Number(data.controllers).toLocaleString(locale);
    document.getElementById('network-updated').textContent = data.updated_at
      ? `${t('networkUpdated')} · ${new Date(data.updated_at).toLocaleTimeString(locale, {timeZone: 'UTC', hour: '2-digit', minute: '2-digit'})}Z`
      : t('networkUpdated');
  } catch (error) {
    document.getElementById('network-updated').textContent = t('networkError');
    document.getElementById('map-status').textContent = t('mapFeedUnavailable');
    ['#pilots-count', '#controllers-count', '#observers-count'].forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) el.textContent = '—';
    });
    document.getElementById('overview-pilots').textContent = '—';
    document.getElementById('overview-controllers').textContent = '—';
    if (mapMarkers) mapMarkers.clearLayers();
    if (zoneLayer) zoneLayer.clearLayers();
  }
}

document.getElementById('refresh-network').addEventListener('click', loadNetwork);

async function loadEvents() {
  try {
    const data = await api('/api/events');
    if (!data.events.length) {
      document.getElementById('events-list').innerHTML = `<div class="empty-state">${t('noEvents')}</div>`;
      return;
    }

    document.getElementById('events-list').innerHTML = data.events.slice(0, 8).map((event) => {
      const date = new Date(event.start);
      const locale = language === 'ru' ? 'ru-RU' : 'en-GB';
      const dateLabel = new Intl.DateTimeFormat(locale, {timeZone: 'UTC', day: '2-digit', month: 'short'}).format(date).toUpperCase();
      const timeLabel = new Intl.DateTimeFormat(locale, {timeZone: 'UTC', hour: '2-digit', minute: '2-digit', hour12: false}).format(date) + 'Z';
      const meta = [...(event.divisions || []).slice(0, 2), ...(event.airports || []).slice(0, 2)].map(escapeHTML).join(' · ');
      const title = event.url ? `<a href="${escapeHTML(event.url)}" target="_blank" rel="noreferrer">${escapeHTML(event.title)} ↗</a>` : escapeHTML(event.title);
      const dateParts = dateLabel.split(' ');
      return `<article class="event-row"><div class="event-date"><strong>${dateParts[0]}</strong><span>${dateParts[1] || ''}</span></div><div class="event-detail"><h3>${title}</h3><span>${escapeHTML(meta || t('generalEvent'))}</span></div><time>${escapeHTML(timeLabel)}</time></article>`;
    }).join('');
  } catch (error) {
    document.getElementById('events-list').innerHTML = `<div class="empty-state">${t('eventsError')}</div>`;
  }
}

function formatDuration(minutes) {
  return `${Math.floor(minutes / 60)}h ${String(minutes % 60).padStart(2, '0')}m`;
}

function renderLogbook() {
  const savedFlights = readLocal(LOGBOOK_KEY, []);
  const flights = (Array.isArray(savedFlights) ? savedFlights : []).sort((a, b) => b.created - a.created);
  const total = flights.reduce((sum, flight) => sum + Number(flight.minutes || 0), 0);

  document.getElementById('flight-total').textContent = flights.length;
  document.getElementById('time-total').textContent = formatDuration(total);

  const flightsEl = document.getElementById('flight-list');
  flightsEl.innerHTML = flights.slice(0, 6).map((flight) => `<div class="flight-row"><div class="flight-route"><strong>${escapeHTML(flight.departure)} <span>→</span> ${escapeHTML(flight.arrival)}</strong><small>${escapeHTML(flight.callsign)} · ${escapeHTML(flight.aircraft)}</small></div><span class="flight-time">${formatDuration(Number(flight.minutes || 0))}</span><button class="delete-flight" type="button" data-id="${escapeHTML(flight.id)}" aria-label="${t('deleteFlight')}">×</button></div>`).join('') || `<div class="empty-state">${t('noFlights')}</div>`;

  flightsEl.querySelectorAll('[data-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = readLocal(LOGBOOK_KEY, []).filter((flight) => flight.id !== button.dataset.id);
      writeLocal(LOGBOOK_KEY, next);
      renderLogbook();
    });
  });
}

document.getElementById('flight-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const departure = String(form.get('departure')).trim().toUpperCase();
  const arrival = String(form.get('arrival')).trim().toUpperCase();
  const minutes = Number(form.get('minutes'));

  if (!/^[A-Z0-9]{4}$/.test(departure) || !/^[A-Z0-9]{4}$/.test(arrival) || departure === arrival || !Number.isInteger(minutes) || minutes < 1) {
    document.getElementById('flight-form-status').textContent = departure === arrival ? t('sameAirport') : t('invalidFlight');
    return;
  }

  const savedFlights = readLocal(LOGBOOK_KEY, []);
  const flights = Array.isArray(savedFlights) ? savedFlights : [];
  flights.push({
    id: crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
    created: Date.now(),
    callsign: String(form.get('callsign')).trim().toUpperCase(),
    aircraft: String(form.get('aircraft')).trim().toUpperCase(),
    departure,
    arrival,
    minutes,
  });

  writeLocal(LOGBOOK_KEY, flights);
  event.currentTarget.reset();
  document.getElementById('flight-form-status').textContent = '';
  renderLogbook();
});

document.querySelectorAll('[data-tab-target]').forEach((button) => {
  button.addEventListener('click', () => activatePanel(button.dataset.tabTarget));
});

document.querySelectorAll('[data-language]').forEach((button) => {
  button.addEventListener('click', () => {
    language = button.dataset.language;
    writeLocal(LANGUAGE_KEY, language);
    applyLanguage();
    loadBriefing(document.getElementById('icao-input').value);
    loadNetwork();
    loadEvents();
  });
});

document.getElementById('zones-toggle')?.addEventListener('click', () => setZonesVisible(!zonesVisible));

document.querySelectorAll('[data-map-theme]').forEach((button) => {
  button.addEventListener('click', () => {
    const theme = button.dataset.mapTheme;
    if (theme !== 'light' && theme !== 'dark') return;
    writeLocal(MAP_THEME_KEY, theme);
    setMapTheme(theme);
  });
});

applyLanguage();
initializeMap();
setInterval(formatClock, 1000);
loadBriefing(document.getElementById('icao-input').value);
loadNetwork();
loadEvents();
setInterval(loadNetwork, 60000);
