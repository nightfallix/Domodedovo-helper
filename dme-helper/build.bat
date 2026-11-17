@echo off
setlocal
REM One-click build of a single DMEHelper.exe (Windows 10/11, Python 3.10+ required).
cd /d "%~dp0"

where python >nul 2>nul || ( echo Python not found. Install it from https://www.python.org/downloads/ ^(tick "Add python.exe to PATH"^) & goto :fail )
if not exist .venv ( python -m venv .venv || goto :fail )
call .venv\Scripts\activate || goto :fail
python -m pip install --upgrade pip || goto :fail
python -m pip install -r requirements.txt "pyinstaller>=6,<7" || goto :fail

if exist build rmdir /s /q build
if exist dist rmdir /s /q dist
pyinstaller --noconfirm --clean DMEHelper.spec || goto :fail

echo.
echo ===== Build finished =====
echo File: %cd%\dist\DMEHelper.exe
echo SHA-256 ^(share it with the exe so others can verify the download^):
certutil -hashfile dist\DMEHelper.exe SHA256 | findstr /v "hash CertUtil"
echo.
echo DMEHelper.exe is standalone: copy it anywhere and run it, no other files needed.
pause
exit /b 0

:fail
echo.
echo BUILD FAILED - see the messages above.
pause
exit /b 1
