@echo off
cd /d "C:\Users\Administrator\.accio\accounts\1749812470\agents\DID-F456DA-2B0D4C\project\remake-workshop"

set NODE=C:\Users\Administrator\AppData\Roaming\Accio\pre-install\ab1f8a6ee51b\node\node.exe
set NEXT=node_modules\next\dist\bin\next
set ELECTRON=node_modules\electron\dist\electron.exe

:: Kill port 3000
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":3000.*LISTENING" 2^>nul') do (
    taskkill /F /PID %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

:: Start server (background)
start /B "" "%NODE%" "%NEXT%" start -p 3000 >nul 2>&1

:: Launch Electron once server is ready
for /L %%i in (1,1,15) do (
    timeout /t 1 /nobreak >nul
    curl -s -o nul http://localhost:3000 2>nul && start "" "%ELECTRON%" . && exit
)
start "" "%ELECTRON%" .
