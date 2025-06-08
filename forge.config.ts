import type { ForgeConfig } from '@electron-forge/shared-types';
import { MakerSquirrel } from '@electron-forge/maker-squirrel';
import { MakerZIP } from '@electron-forge/maker-zip';
import { MakerDeb } from '@electron-forge/maker-deb';
import { MakerRpm } from '@electron-forge/maker-rpm';
import { AutoUnpackNativesPlugin } from '@electron-forge/plugin-auto-unpack-natives';
import { WebpackPlugin } from '@electron-forge/plugin-webpack';
import { FusesPlugin } from '@electron-forge/plugin-fuses';
import { FuseV1Options, FuseVersion } from '@electron/fuses';

import { mainConfig } from './webpack.main.config';
import { rendererConfig } from './webpack.renderer.config';
import { preloadConfig } from './webpack.preload.config';

const config: ForgeConfig = {
  packagerConfig: {
    asar: true,
    icon: './assets/icon', // icon.ico for Windows, icon.icns for macOS, no extension here
  },
  rebuildConfig: {},
  makers: [
    // ✅ Windows installer (wrap this with InnoSetup to add uninstall password)
    new MakerSquirrel({
      setupIcon: './assets/icon.ico',
    }),

    // ✅ macOS .zip for development/testing
    new MakerZIP({}, ['darwin']),

    // ✅ Linux DEB package (install with sudo)
    new MakerDeb({
      options: {
        maintainer: 'Your Name <you@example.com>',
        homepage: 'https://your-app-homepage.com',
        description: 'Device Tracker - Cross-platform Electron App',
      },
    }),

    // ✅ Linux RPM package
    new MakerRpm({}),
  ],
  plugins: [
    // ✅ Automatically unpacks native modules
    new AutoUnpackNativesPlugin({}),

    // ✅ Webpack build for main, renderer, and preload scripts
    new WebpackPlugin({
      mainConfig,
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: './src/index.html',
            js: './src/renderer.tsx',
            name: 'main_window',
            preload: {
              js: './src/preload.ts',
              config: preloadConfig,
            },
          },
        ],
      },
    }),

    // ✅ Hardened security options using Electron Fuses
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};

export default config;
