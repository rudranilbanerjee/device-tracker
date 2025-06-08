import os from 'os';
import { networkInterfaces } from 'os';

export function collectSystemInfo() {
  const cpus = os.cpus();
  const nets = networkInterfaces();

  const network = Object.values(nets)
    .flat()
    .filter((net) => net && net.mac !== '00:00:00:00:00:00' && !net.internal);

  return {
    platform: os.platform(),
    osType: os.type(),
    release: os.release(),
    arch: os.arch(),
    cpuModel: cpus[0]?.model,
    cpuCores: cpus.length,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    hostname: os.hostname(),
    uptime: os.uptime(),
    mac: network[0]?.mac,
    ip: network[0]?.address,
  };
}
