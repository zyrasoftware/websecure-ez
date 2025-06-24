'use client';

import { WebSecureConfig } from 'websecure-ez';

interface PresetSelectorProps {
  onPresetSelect: (config: Partial<WebSecureConfig>) => void;
}

export default function PresetSelector({ onPresetSelect }: PresetSelectorProps) {
  const presets = {
    strict: {
      name: 'Strict Security',
      description: 'Maximum security for production apps',
      icon: '🔒',
      color: 'from-red-500 to-red-700',
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'", 'data:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],
            upgradeInsecureRequests: true,
            blockAllMixedContent: true,
          },
          reportOnly: false,
        },
                 xFrameOptions: { enabled: true, option: 'DENY' as const },
         secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Strict' as const },
                 referrerPolicy: { enabled: true, policy: 'no-referrer' as const },
        permissionsPolicy: {
          enabled: true,
          features: {
            camera: "'none'",
            microphone: "'none'",
            geolocation: "'none'",
            payment: "'none'",
            usb: "'none'",
            vr: "'none'",
            magnetometer: "'none'",
            gyroscope: "'none'",
            speaker: "'none'",
            vibrate: "'none'",
            fullscreen: "'none'",
            'picture-in-picture': "'none'",
          },
        },
        hsts: { enabled: true, maxAge: 63072000, includeSubDomains: true, preload: true },
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' as const },
      },
    },
    moderate: {
      name: 'Balanced Security',
      description: 'Good security with flexibility',
      icon: '⚖️',
      color: 'from-blue-500 to-blue-700',
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
            imgSrc: ["'self'", 'data:', 'https:'],
            connectSrc: ["'self'"],
            fontSrc: ["'self'", 'https:', 'data:'],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'"],
            upgradeInsecureRequests: true,
          },
          reportOnly: false,
        },
                 xFrameOptions: { enabled: true, option: 'SAMEORIGIN' as const },
         secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Lax' as const },
                 referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' as const },
        permissionsPolicy: {
          enabled: true,
          features: {
            camera: "'none'",
            microphone: "'none'",
            geolocation: "'self'",
            payment: "'none'",
            usb: "'none'",
            vr: "'none'",
          },
        },
        hsts: { enabled: true, maxAge: 31536000, includeSubDomains: true, preload: false },
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' as const },
      },
    },
    permissive: {
      name: 'Basic Security',
      description: 'Essential protections only',
      icon: '🛡️',
      color: 'from-green-500 to-green-700',
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'self'", '*'],
            scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
            styleSrc: ["'self'", "'unsafe-inline'", '*'],
            imgSrc: ['*', 'data:', 'blob:'],
            connectSrc: ['*'],
            fontSrc: ['*', 'data:'],
            objectSrc: ["'self'"],
            mediaSrc: ['*'],
            frameSrc: ['*'],
          },
          reportOnly: true,
        },
                 xFrameOptions: { enabled: true, option: 'SAMEORIGIN' as const },
         secureCookies: { enabled: true, httpOnly: true, secure: false, sameSite: 'Lax' as const },
                 referrerPolicy: { enabled: true, policy: 'unsafe-url' as const },
        permissionsPolicy: { enabled: false, features: {} },
        hsts: { enabled: false },
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' as const },
      },
    },
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
          <span className="text-white text-lg">⚡</span>
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Quick Presets</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Object.entries(presets).map(([key, preset]) => (
          <button
            key={key}
            onClick={() => onPresetSelect(preset.config)}
            className={`group relative overflow-hidden bg-gradient-to-br ${preset.color} rounded-xl p-6 text-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl`}
          >
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
            <div className="relative z-10">
              <div className="text-3xl mb-3">{preset.icon}</div>
              <h4 className="text-lg font-bold mb-2">{preset.name}</h4>
              <p className="text-sm opacity-90">{preset.description}</p>
              
              <div className="mt-4 flex items-center gap-2 text-xs">
                <span className="bg-white/20 rounded-full px-2 py-1">
                  CSP: {preset.config.contentSecurityPolicy?.enabled ? 'ON' : 'OFF'}
                </span>
                <span className="bg-white/20 rounded-full px-2 py-1">
                  HSTS: {preset.config.hsts?.enabled ? 'ON' : 'OFF'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-purple-600 dark:text-purple-400">💡</span>
          <h4 className="font-semibold text-purple-900 dark:text-purple-100">Pro Tip</h4>
        </div>
        <p className="text-sm text-purple-800 dark:text-purple-200">
          Start with a preset and customize it to your needs. You can always adjust individual settings after selecting a preset.
        </p>
      </div>
    </div>
  );
} 