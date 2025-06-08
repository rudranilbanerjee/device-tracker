import { app, BrowserWindow, ipcMain } from 'electron';
import os from 'os';

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: __dirname + '/preload.js',  // or wherever your preload is
    },
  });

  win.loadFile('index.html');
}

app.whenReady().then(() => {
  createWindow();

 
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
