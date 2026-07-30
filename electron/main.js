const { app, BrowserWindow } = require('electron');
const path = require('path');
const http = require('http');

let mainWindow;
const PORT = 3000;

function waitForServer(url, retries = 60) {
  return new Promise((resolve, reject) => {
    const check = () => {
      http.get(url, (res) => {
        resolve();
      }).on('error', () => {
        if (retries > 0) {
          retries--;
          setTimeout(check, 500);
        } else {
          reject(new Error('Server did not start on port ' + PORT));
        }
      });
    };
    check();
  });
}

async function createWindow() {
  // Wait for Next.js server
  try {
    await waitForServer(`http://localhost:${PORT}/`);
  } catch (e) {
    console.error(e.message);
    app.quit();
    return;
  }

  mainWindow = new BrowserWindow({
    width: 1400,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    title: '金涛即氪梦工厂',
    icon: path.join(__dirname, '..', 'public', 'icon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(`http://localhost:${PORT}`);
  mainWindow.setMenuBarVisibility(false);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
