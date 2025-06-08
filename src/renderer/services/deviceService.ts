// src/main/deviceReporter.ts
import { ipcMain } from 'electron';
import api from '../app/axios';
import { collectSystemInfo } from './../../shared/types/systemInfo';
import { getLocation } from '../../shared/utils/location';

ipcMain.handle('report-device-info', async (_, token: string) => {
  const systemInfo = await collectSystemInfo();
  const location = await getLocation();

  return api.post('/device/report', {
    systemInfo,
    location,
  }, {
    headers: { Authorization: `Bearer ${token}` },
  });
});
