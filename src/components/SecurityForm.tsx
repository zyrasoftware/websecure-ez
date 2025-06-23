'use client';

import { useState } from 'react';
import { WebSecureConfig } from '@/lib/websecure-ez';

interface SecurityFormProps {
  config: Partial<WebSecureConfig>;
  setConfig: (config: Partial<WebSecureConfig>) => void;
}

export default function SecurityForm({ config, setConfig }: SecurityFormProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    csp: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateConfig = (section: keyof WebSecureConfig, enabled: boolean) => {
    setConfig({
      ...config,
      [section]: {
        ...config[section],
        enabled,
      },
    });
  };

  const updateCSPDirective = (directive: string, value: string) => {
    const values = value.trim() ? value.split(/\s+/) : [];
    setConfig({
      ...config,
      contentSecurityPolicy: {
        enabled: config.contentSecurityPolicy?.enabled ?? false,
        ...config.contentSecurityPolicy,
        directives: {
          ...config.contentSecurityPolicy?.directives,
          [directive]: values,
        },
      },
    });
  };

  const updateCSPBoolean = (directive: string, value: boolean) => {
    setConfig({
      ...config,
      contentSecurityPolicy: {
        enabled: config.contentSecurityPolicy?.enabled ?? false,
        ...config.contentSecurityPolicy,
        directives: {
          ...config.contentSecurityPolicy?.directives,
          [directive]: value,
        },
      },
    });
  };

  const updateXFrameOption = (option: 'DENY' | 'SAMEORIGIN') => {
    setConfig({
      ...config,
      xFrameOptions: {
        enabled: config.xFrameOptions?.enabled ?? false,
        ...config.xFrameOptions,
        option,
      },
    });
  };

  const updateReferrerPolicy = (policy: string) => {
    setConfig({
      ...config,
      referrerPolicy: {
        enabled: config.referrerPolicy?.enabled ?? false,
        ...config.referrerPolicy,
        policy: policy as 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url',
      },
    });
  };

  const updateCookieOption = (option: string, value: boolean) => {
    setConfig({
      ...config,
      secureCookies: {
        enabled: config.secureCookies?.enabled ?? false,
        ...config.secureCookies,
        [option]: value,
      },
    });
  };

  const updateHSTSOption = (option: string, value: boolean | number) => {
    setConfig({
      ...config,
      hsts: {
        enabled: config.hsts?.enabled ?? false,
        ...config.hsts,
        [option]: value,
      },
    });
  };

  const updatePermissionsFeature = (feature: string, value: string) => {
    setConfig({
      ...config,
      permissionsPolicy: {
        enabled: config.permissionsPolicy?.enabled ?? false,
        ...config.permissionsPolicy,
        features: {
          ...config.permissionsPolicy?.features,
          [feature]: value,
        },
      },
    });
  };

  const exportConfig = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
    
    const exportFileDefaultName = 'websecure-config.json';
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  const cspDirectives = [
    { key: 'defaultSrc', label: 'default-src', placeholder: "'self'", description: 'Fallback for other CSP directives' },
    { key: 'scriptSrc', label: 'script-src', placeholder: "'self' 'unsafe-inline'", description: 'JavaScript sources' },
    { key: 'styleSrc', label: 'style-src', placeholder: "'self' 'unsafe-inline'", description: 'CSS sources' },
    { key: 'imgSrc', label: 'img-src', placeholder: "'self' data: https:", description: 'Image sources' },
    { key: 'connectSrc', label: 'connect-src', placeholder: "'self'", description: 'AJAX/WebSocket sources' },
    { key: 'fontSrc', label: 'font-src', placeholder: "'self' https: data:", description: 'Font sources' },
    { key: 'objectSrc', label: 'object-src', placeholder: "'none'", description: 'Plugin sources' },
    { key: 'mediaSrc', label: 'media-src', placeholder: "'self'", description: 'Audio/video sources' },
    { key: 'frameSrc', label: 'frame-src', placeholder: "'none'", description: 'Frame sources' },
    { key: 'childSrc', label: 'child-src', placeholder: "'self'", description: 'Worker/frame sources' },
    { key: 'workerSrc', label: 'worker-src', placeholder: "'self'", description: 'Worker sources' },
    { key: 'manifestSrc', label: 'manifest-src', placeholder: "'self'", description: 'Manifest sources' },
    { key: 'formAction', label: 'form-action', placeholder: "'self'", description: 'Form submission targets' },
    { key: 'frameAncestors', label: 'frame-ancestors', placeholder: "'none'", description: 'Valid frame parents' },
    { key: 'baseUri', label: 'base-uri', placeholder: "'self'", description: 'Base element URLs' },
  ];

  const permissionFeatures = [
    { key: 'camera', label: 'Camera', description: 'Camera access' },
    { key: 'microphone', label: 'Microphone', description: 'Microphone access' },
    { key: 'geolocation', label: 'Geolocation', description: 'Location access' },
    { key: 'payment', label: 'Payment', description: 'Payment API' },
    { key: 'usb', label: 'USB', description: 'USB device access' },
    { key: 'vr', label: 'VR', description: 'VR device access' },
    { key: 'magnetometer', label: 'Magnetometer', description: 'Magnetometer sensor' },
    { key: 'gyroscope', label: 'Gyroscope', description: 'Gyroscope sensor' },
    { key: 'speaker', label: 'Speaker', description: 'Speaker access' },
    { key: 'vibrate', label: 'Vibrate', description: 'Vibration API' },
    { key: 'fullscreen', label: 'Fullscreen', description: 'Fullscreen API' },
    { key: 'picture-in-picture', label: 'Picture-in-Picture', description: 'PiP mode' }
  ];

  return (
    <div className="space-y-6">
      {/* Content Security Policy */}
      <div className="group bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/30 dark:to-indigo-900/30 backdrop-blur-sm border border-blue-200/60 dark:border-blue-600/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-2 border-blue-300 text-blue-600 focus:ring-2 focus:ring-blue-500/30 focus:ring-offset-0 transition-all"
                  checked={config.contentSecurityPolicy?.enabled || false}
                  onChange={(e) => updateConfig('contentSecurityPolicy', e.target.checked)}
                />
                <div>
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100">Content Security Policy</h3>
                  <p className="text-sm text-blue-700 dark:text-blue-300">Prevents XSS and data injection attacks</p>
                </div>
              </label>
            </div>
          </div>
          <button
            onClick={() => toggleSection('csp')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 hover:bg-blue-100/50 dark:hover:bg-blue-800/30 rounded-lg transition-all duration-200"
          >
            {expandedSections.csp ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Collapse
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Expand
              </>
            )}
          </button>
        </div>
        
        {config.contentSecurityPolicy?.enabled && expandedSections.csp && (
          <div className="space-y-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-blue-100/50 dark:border-blue-800/30">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {cspDirectives.map(({ key, label, placeholder, description }) => (
                <div key={key} className="group/input space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-slate-300">{label}</label>
                    <div className="group/tooltip relative">
                      <svg className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="absolute right-0 bottom-6 w-48 p-2 bg-gray-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                        {description}
                      </div>
                    </div>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500 dark:focus:border-blue-400 transition-all duration-200 group-hover/input:border-gray-300 dark:group-hover/input:border-slate-500"
                    value={Array.isArray(config.contentSecurityPolicy?.directives?.[key as keyof typeof config.contentSecurityPolicy.directives]) 
                      ? (config.contentSecurityPolicy.directives[key as keyof typeof config.contentSecurityPolicy.directives] as string[]).join(' ') 
                      : ''}
                    placeholder={placeholder}
                    onChange={(e) => updateCSPDirective(key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200/50 dark:border-slate-600/30">
              {[
                { key: 'upgradeInsecureRequests', label: 'Upgrade Insecure Requests', desc: 'Upgrade HTTP to HTTPS' },
                { key: 'blockAllMixedContent', label: 'Block Mixed Content', desc: 'Block HTTP content on HTTPS' },
                { key: 'reportOnly', label: 'Report Only Mode', desc: 'Monitor violations without blocking' }
              ].map(({ key, label, desc }) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-gray-50/80 dark:bg-slate-700/50 rounded-lg hover:bg-gray-100/80 dark:hover:bg-slate-600/50 transition-all cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-gray-300 dark:border-slate-500 text-blue-600 focus:ring-2 focus:ring-blue-500/30 transition-all"
                    checked={key === 'reportOnly' ? config.contentSecurityPolicy?.reportOnly || false : Boolean(config.contentSecurityPolicy?.directives?.[key as keyof typeof config.contentSecurityPolicy.directives])}
                    onChange={(e) => {
                      if (key === 'reportOnly') {
                        setConfig({
                          ...config,
                          contentSecurityPolicy: {
                            enabled: config.contentSecurityPolicy?.enabled || false,
                            ...config.contentSecurityPolicy,
                            reportOnly: e.target.checked
                          }
                        });
                      } else {
                        updateCSPBoolean(key, e.target.checked);
                      }
                    }}
                  />
                  <div>
                    <span className="text-sm font-medium text-gray-700 dark:text-slate-300 group-hover:text-gray-900 dark:group-hover:text-slate-100">{label}</span>
                    <p className="text-xs text-gray-500 dark:text-slate-400">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* HSTS */}
      <div className="group bg-gradient-to-r from-emerald-50/80 to-teal-50/80 dark:from-emerald-900/30 dark:to-teal-900/30 backdrop-blur-sm border border-emerald-200/60 dark:border-emerald-600/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-emerald-300 text-emerald-600 focus:ring-2 focus:ring-emerald-500/30 focus:ring-offset-0 transition-all"
              checked={config.hsts?.enabled || false}
              onChange={(e) => updateConfig('hsts', e.target.checked)}
            />
            <div>
              <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">HTTP Strict Transport Security</h3>
              <p className="text-sm text-emerald-700 dark:text-emerald-300">Forces HTTPS connections</p>
            </div>
          </label>
        </div>
        
        {config.hsts?.enabled && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-emerald-100/50 dark:border-emerald-800/30 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Max Age (seconds)</label>
              <input
                type="number"
                className="w-full px-3 py-2 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 dark:focus:border-emerald-400 transition-all duration-200"
                value={config.hsts?.maxAge || 31536000}
                onChange={(e) => updateHSTSOption('maxAge', parseInt(e.target.value))}
                placeholder="31536000"
              />
              <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Recommended: 31536000 (1 year)</p>
            </div>
            
            <div className="flex flex-wrap gap-4">
              {[
                { key: 'includeSubDomains', label: 'Include Subdomains', desc: 'Apply to all subdomains' },
                { key: 'preload', label: 'Preload', desc: 'Include in browser preload lists' }
              ].map(({ key, label, desc }) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-emerald-50/80 dark:bg-emerald-900/30 rounded-lg hover:bg-emerald-100/80 dark:hover:bg-emerald-800/40 transition-all cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-emerald-300 dark:border-emerald-500 text-emerald-600 focus:ring-2 focus:ring-emerald-500/30 transition-all"
                    checked={Boolean(config.hsts?.[key as keyof typeof config.hsts])}
                    onChange={(e) => updateHSTSOption(key, e.target.checked)}
                  />
                  <div>
                    <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300 group-hover:text-emerald-900 dark:group-hover:text-emerald-100">{label}</span>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* X-Frame-Options */}
      <div className="group bg-gradient-to-r from-orange-50/80 to-amber-50/80 dark:from-orange-900/30 dark:to-amber-900/30 backdrop-blur-sm border border-orange-200/60 dark:border-orange-600/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L18.364 5.636M5.636 18.364l12.728-12.728" />
            </svg>
          </div>
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-orange-300 text-orange-600 focus:ring-2 focus:ring-orange-500/30 focus:ring-offset-0 transition-all"
              checked={config.xFrameOptions?.enabled || false}
              onChange={(e) => updateConfig('xFrameOptions', e.target.checked)}
            />
            <div>
              <h3 className="text-lg font-semibold text-orange-900 dark:text-orange-100">X-Frame-Options</h3>
              <p className="text-sm text-orange-700 dark:text-orange-300">Prevents clickjacking attacks</p>
            </div>
          </label>
        </div>
        
        {config.xFrameOptions?.enabled && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-orange-100/50 dark:border-orange-800/30">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Frame Policy</label>
            <select
              className="w-full px-3 py-2 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 dark:focus:border-orange-400 transition-all duration-200"
              value={config.xFrameOptions?.option || 'DENY'}
              onChange={(e) => updateXFrameOption(e.target.value as 'DENY' | 'SAMEORIGIN')}
            >
              <option value="DENY">DENY - Block all framing</option>
              <option value="SAMEORIGIN">SAMEORIGIN - Allow same origin framing</option>
            </select>
          </div>
        )}
      </div>

      {/* Permissions Policy */}
      <div className="group bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/30 dark:to-pink-900/30 backdrop-blur-sm border border-purple-200/60 dark:border-purple-600/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-purple-300 text-purple-600 focus:ring-2 focus:ring-purple-500/30 focus:ring-offset-0 transition-all"
                checked={config.permissionsPolicy?.enabled || false}
                onChange={(e) => updateConfig('permissionsPolicy', e.target.checked)}
              />
              <div>
                <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100">Permissions Policy</h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">Controls browser feature access</p>
              </div>
            </label>
          </div>
          <button
            onClick={() => toggleSection('permissions')}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-200 hover:bg-purple-100/50 dark:hover:bg-purple-800/30 rounded-lg transition-all duration-200"
          >
            {expandedSections.permissions ? (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
                Collapse
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                Expand
              </>
            )}
          </button>
        </div>
        
        {config.permissionsPolicy?.enabled && expandedSections.permissions && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-purple-100/50 dark:border-purple-800/30">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permissionFeatures.map(({ key, label, description }) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 dark:text-slate-300">{label}</label>
                    <div className="group/tooltip relative">
                      <svg className="w-4 h-4 text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 cursor-help" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="absolute right-0 bottom-6 w-32 p-2 bg-gray-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs rounded-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                        {description}
                      </div>
                    </div>
                  </div>
                  <select
                    className="w-full px-3 py-2 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-lg text-sm focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
                    value={config.permissionsPolicy?.features?.[key] || "'none'"}
                    onChange={(e) => updatePermissionsFeature(key, e.target.value)}
                  >
                    <option value="'none'">None</option>
                    <option value="'self'">Self</option>
                    <option value="*">All</option>
                  </select>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Secure Cookies */}
      <div className="group bg-gradient-to-r from-red-50/80 to-rose-50/80 dark:from-red-900/30 dark:to-rose-900/30 backdrop-blur-sm border border-red-200/60 dark:border-red-600/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
            </svg>
          </div>
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-red-300 text-red-600 focus:ring-2 focus:ring-red-500/30 focus:ring-offset-0 transition-all"
              checked={config.secureCookies?.enabled || false}
              onChange={(e) => updateConfig('secureCookies', e.target.checked)}
            />
            <div>
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100">Secure Cookies</h3>
              <p className="text-sm text-red-700 dark:text-red-300">Enhanced cookie security settings</p>
            </div>
          </label>
        </div>
        
        {config.secureCookies?.enabled && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-red-100/50 dark:border-red-800/30 space-y-4">
            <div className="flex flex-wrap gap-4">
              {[
                { key: 'httpOnly', label: 'HttpOnly', desc: 'Prevent JavaScript access' },
                { key: 'secure', label: 'Secure', desc: 'HTTPS only transmission' }
              ].map(({ key, label, desc }) => (
                <label key={key} className="flex items-center gap-3 p-3 bg-red-50/80 dark:bg-red-900/30 rounded-lg hover:bg-red-100/80 dark:hover:bg-red-800/40 transition-all cursor-pointer group">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 border-red-300 dark:border-red-500 text-red-600 focus:ring-2 focus:ring-red-500/30 transition-all"
                                         checked={Boolean(config.secureCookies?.[key as 'httpOnly' | 'secure'])}
                     onChange={(e) => updateCookieOption(key, e.target.checked)}
                  />
                  <div>
                    <span className="text-sm font-medium text-red-700 dark:text-red-300 group-hover:text-red-900 dark:group-hover:text-red-100">{label}</span>
                    <p className="text-xs text-red-600 dark:text-red-400">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">SameSite Policy</label>
              <select
                className="w-full px-3 py-2 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-red-500/30 focus:border-red-500 dark:focus:border-red-400 transition-all duration-200"
                value={config.secureCookies?.sameSite || 'Strict'}
                                 onChange={(e) => setConfig({
                   ...config,
                   secureCookies: {
                     enabled: config.secureCookies?.enabled || false,
                     ...config.secureCookies,
                     sameSite: e.target.value as 'Strict' | 'Lax' | 'None'
                   }
                 })}
              >
                <option value="Strict">Strict - Maximum protection</option>
                <option value="Lax">Lax - Balanced protection</option>
                <option value="None">None - No restrictions</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Referrer Policy */}
      <div className="group bg-gradient-to-r from-teal-50/80 to-cyan-50/80 dark:from-teal-900/30 dark:to-cyan-900/30 backdrop-blur-sm border border-teal-200/60 dark:border-teal-600/40 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
          </div>
          <label className="flex items-center gap-3 cursor-pointer flex-1">
            <input
              type="checkbox"
              className="w-5 h-5 rounded border-2 border-teal-300 text-teal-600 focus:ring-2 focus:ring-teal-500/30 focus:ring-offset-0 transition-all"
              checked={config.referrerPolicy?.enabled || false}
              onChange={(e) => updateConfig('referrerPolicy', e.target.checked)}
            />
            <div>
              <h3 className="text-lg font-semibold text-teal-900 dark:text-teal-100">Referrer Policy</h3>
              <p className="text-sm text-teal-700 dark:text-teal-300">Controls referrer information</p>
            </div>
          </label>
        </div>
        
        {config.referrerPolicy?.enabled && (
          <div className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl p-6 border border-teal-100/50 dark:border-teal-800/30">
            <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">Policy</label>
            <select
              className="w-full px-3 py-2 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 dark:focus:border-teal-400 transition-all duration-200"
              value={config.referrerPolicy?.policy || 'strict-origin-when-cross-origin'}
              onChange={(e) => updateReferrerPolicy(e.target.value)}
            >
              <option value="no-referrer">no-referrer - No referrer info</option>
              <option value="no-referrer-when-downgrade">no-referrer-when-downgrade</option>
              <option value="origin">origin - Origin only</option>
              <option value="origin-when-cross-origin">origin-when-cross-origin</option>
              <option value="same-origin">same-origin - Same origin only</option>
              <option value="strict-origin">strict-origin - Strict origin</option>
              <option value="strict-origin-when-cross-origin">strict-origin-when-cross-origin</option>
              <option value="unsafe-url">unsafe-url - Full URL (unsafe)</option>
            </select>
          </div>
        )}
      </div>

      {/* Additional Security Headers */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-slate-200 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Additional Security Headers
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* X-Content-Type-Options */}
          <div className="group bg-gradient-to-r from-gray-50/80 to-slate-50/80 dark:from-slate-800/50 dark:to-slate-700/50 backdrop-blur-sm border border-gray-200/60 dark:border-slate-600/40 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-gray-300 dark:border-slate-500 text-gray-600 dark:text-slate-400 focus:ring-2 focus:ring-gray-500/30 focus:ring-offset-0 transition-all"
                checked={config.xContentTypeOptions?.enabled || false}
                onChange={(e) => updateConfig('xContentTypeOptions', e.target.checked)}
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-slate-100">X-Content-Type-Options</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">Disable MIME-sniffing</p>
              </div>
            </label>
          </div>

          {/* XSS Protection */}
          <div className="group bg-gradient-to-r from-gray-50/80 to-slate-50/80 dark:from-slate-800/50 dark:to-slate-700/50 backdrop-blur-sm border border-gray-200/60 dark:border-slate-600/40 rounded-xl p-4 transition-all duration-300 hover:shadow-md">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-2 border-gray-300 dark:border-slate-500 text-gray-600 dark:text-slate-400 focus:ring-2 focus:ring-gray-500/30 focus:ring-offset-0 transition-all"
                checked={config.xssProtection?.enabled || false}
                onChange={(e) => updateConfig('xssProtection', e.target.checked)}
              />
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-slate-100">X-XSS-Protection</h4>
                <p className="text-sm text-gray-600 dark:text-slate-400">Legacy XSS filter</p>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <div className="pt-6 border-t border-gray-200/50 dark:border-slate-600/30">
        <button
          onClick={exportConfig}
          className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Configuration as JSON
        </button>
      </div>
    </div>
  );
}