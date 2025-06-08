import os from 'os';
import { networkInterfaces } from 'os';

export function collectSystemInfo() {
  const nets = networkInterfaces();
  const net = Object.values(nets).flat().find(n => n && !n.internal && n.mac !== '00:00:00:00:00:00');

  return {
    platform: os.platform(),
    osType: os.type(),
    release: os.release(),
    arch: os.arch(),
    cpu: os.cpus()[0].model,
    cores: os.cpus().length,
    totalMemory: os.totalmem(),
    hostname: os.hostname(),
    uptime: os.uptime(),
    ip: net?.address,
    mac: net?.mac,
  };
}
