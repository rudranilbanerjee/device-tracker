import { app, BrowserWindow, ipcMain } from 'electron';
import os from 'os';
import path from 'path';
import si from 'systeminformation';
import { execSync } from 'child_process';

// Webpack entry constants
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = (): void => {
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      contextIsolation: true,
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  mainWindow.webContents.openDevTools();

  ipcMain.handle('get-system-info', async () => {
    const interfaces = os.networkInterfaces();

    const getIPAddress = () => {
      for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name] || []) {
          if (iface.family === 'IPv4' && !iface.internal) {
            return iface.address;
          }
        }
      }
      return 'Not Found';
    };

    let serialNumber = 'Unknown';

    try {
      const system = await si.system();
      if (
        system.serial &&
        system.serial !== '-' &&
        system.serial.toLowerCase() !== 'na'
      ) {
        serialNumber = system.serial;
      } else {
        const platform = os.platform();

        if (platform === 'linux') {
          try {
            const output = execSync(
              'pkexec dmidecode -s system-serial-number',
              { encoding: 'utf-8' }
            );
            serialNumber = output.trim() || 'Not Found';
          } catch (err: any) {
            console.error('Linux pkexec failed:', err.message);
            serialNumber = 'Permission denied or not found';
          }
        } else if (platform === 'win32') {
          try {
            // First try systemenclosure serial number
            let output = execSync(
              'wmic systemenclosure get serialnumber',
              { encoding: 'utf-8' }
            );
            let lines = output.trim().split('\n').filter(Boolean);
            let result = lines[1]?.trim();

            if (!result || result.toLowerCase() === 'na') {
              // Fallback to UUID
              output = execSync(
                'wmic csproduct get uuid',
                { encoding: 'utf-8' }
              );
              lines = output.trim().split('\n').filter(Boolean);
              result = lines[1]?.trim() || 'Not Found';
            }

            serialNumber = result;
          } catch (err: any) {
            console.error('Windows fallback failed:', err.message);
            serialNumber = 'Not Found';
          }
        }
      }
    } catch (error) {
      console.error('Error fetching system info:', error);
    }

    return {
      platform: os.platform(),
      arch: os.arch(),
      cpus: os.cpus(),
      totalMem: os.totalmem(),
      freeMem: os.freemem(),
      hostname: os.hostname(),
      userInfo: os.userInfo(),
      ip: getIPAddress(),
      serialNumber,
    };
  });

};

app.on('ready', createWindow);

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
