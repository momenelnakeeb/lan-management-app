const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

if (process.env.NODE_ENV === 'development') {
  try {
    require('electron-reloader')(module, {
      electron: require('electron'),
      watch: ['electron']
    });
  } catch (err) {
    console.error('Failed to setup electron-reloader', err);
  }
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
      sandbox: true
    }
  });

  const indexPath = path.join(__dirname, 'index.html');
  console.log('Resolved path to index.html:', indexPath);

  if (fs.existsSync(indexPath)) {
    console.log('index.html exists, attempting to load...');
    mainWindow.loadFile(indexPath).catch(err => {
      console.error('Error loading index.html:', err);
    });
  } else {
    console.error('index.html file not found at:', indexPath);
    console.log('Current directory contents:', fs.readdirSync(__dirname));
  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
