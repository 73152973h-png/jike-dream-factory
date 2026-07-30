chcp 65001 > $null
$ErrorActionPreference = "Continue"

$NPX = "C:\Users\Administrator\AppData\Roaming\Accio\pre-install\ab1f8a6ee51b\node\npx.cmd"
$ELECTRON = "C:\Users\Administrator\.accio\accounts\1749812470\agents\DID-F456DA-2B0D4C\project\remake-workshop\node_modules\electron\dist\electron.exe"
$WORKDIR = "C:\Users\Administrator\.accio\accounts\1749812470\agents\DID-F456DA-2B0D4C\project\remake-workshop"

Set-Location $WORKDIR
Write-Host "JinTao Jike Dream Factory - Starting..." -ForegroundColor Cyan

# Kill existing server on port 3000
$p = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue | Select-Object -First 1
if ($p) { 
    Stop-Process -Id $p.OwningProcess -Force -ErrorAction SilentlyContinue
    Start-Sleep 1
}

# Start Next.js server
Start-Process -FilePath $NPX -ArgumentList "next","start","-p","3000" -WorkingDirectory $WORKDIR -WindowStyle Minimized

# Wait for server
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Seconds 2
    try { 
        $r = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -TimeoutSec 3
        if ($r.StatusCode -eq 200) { 
            Write-Host "Server ready! Launching app..." -ForegroundColor Green
            break 
        }
    } catch {}
}

# Launch Electron
Start-Process -FilePath $ELECTRON -ArgumentList $WORKDIR -WorkingDirectory $WORKDIR -Wait
