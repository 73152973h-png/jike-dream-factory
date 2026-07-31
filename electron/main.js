const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const http = require('http');

let mainWindow;
let serverProcess;
const PORT = 3000;

function getServerPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'standalone', 'server.js');
  }
  return path.join(__dirname, '..', '.next', 'standalone', 'server.js');
}

function getStaticPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'standalone', '.next', 'static');
  }
  return path.join(__dirname, '..', '.next', 'static');
}

function getPublicPath() {
  if (app.isPackaged) {
    return path.join(process.resourcesPath, 'standalone', 'public');
  }
  return path.join(__dirname, '..', 'public');
}

function waitForServer(url, retries = 60) {
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => resolve()).on('error', () => {
        if (retries > 0) { retries--; setTimeout(check, 500); }
        else reject(new Error('Server failed to start'));
      });
    };
    check();
  });
}

async function createWindow() {
  const serverPath = getServerPath();
  const staticPath = getStaticPath();
  const publicPath = getPublicPath();

  // Symlink/copy static files for standalone
  const fs = require('fs');
  const dotNext = path.dirname(staticPath);
  if (!fs.existsSync(path.join(dotNext, 'static'))) {
    // Standalone needs .next/static at the right place
  }

  // Start server
  const nodeExe = app.isPackaged
    ? path.join(process.resourcesPath, 'node', 'node.exe')
    : process.execPath;

  serverProcess = spawn(nodeExe, [serverPath], {
    env: {
      ...process.env,
      PORT: String(PORT),
      NODE_ENV: 'production',
    },
    cwd: path.dirname(serverPath),
    stdio: 'pipe',
  });

  serverProcess.stdout.on('data', (d) => { /* silent */ });
  serverProcess.stderr.on('data', (d) => { /* silent */ });

  await waitForServer(`http://localhost:${PORT}/`);

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: '即氪梦工厂',
    icon: path.join(publicPath, 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);
  mainWindow.setMenuBarVisibility(false);
  mainWindow.on('closed', () => { mainWindow = null; });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (serverProcess) serverProcess.kill();
  if (process.platform !== 'darwin') app.quit();
});

app.on('before-quit', () => {
  if (serverProcess) serverProcess.kill();
});
