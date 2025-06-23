'use client';

import { useState, useEffect } from 'react';
import SecurityForm from '@/components/SecurityForm';
import CodePreview from '@/components/CodePreview';
import PresetSelector from '@/components/PresetSelector';
import SecurityAnalyzer from '@/components/SecurityAnalyzer';
import ConfigurationImportExport from '@/components/ConfigurationImportExport';
import HelpCenter from '@/components/HelpCenter';
import { WebSecureConfig } from '@/lib/websecure-ez';
import { ThemeToggle } from '@/components/ThemeToggle';


export default function Home() {
  const [config, setConfig] = useState<Partial<WebSecureConfig>>({
    contentSecurityPolicy: {
      enabled: true,
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        objectSrc: ["'none'"],
        mediaSrc: ["'self'"],
        frameSrc: ["'none'"],
        upgradeInsecureRequests: true,
      },
      reportOnly: false,
    },
    xFrameOptions: {
      enabled: true,
      option: 'DENY',
    },
    secureCookies: {
      enabled: true,
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
    },
    referrerPolicy: {
      enabled: true,
      policy: 'strict-origin-when-cross-origin',
    },
    permissionsPolicy: {
      enabled: true,
      features: {
        camera: "'none'",
        microphone: "'none'",
        geolocation: "'none'",
        payment: "'none'",
        usb: "'none'",
        vr: "'none'",
      },
    },
    hsts: {
      enabled: true,
      maxAge: 31536000,
      includeSubDomains: true,
      preload: true,
    },
    xContentTypeOptions: {
      enabled: true,
    },
    xssProtection: {
      enabled: true,
      mode: 'block',
    },
  });

  const [isLoaded, setIsLoaded] = useState(false);
  const [activeFeatures, setActiveFeatures] = useState(0);
  const [activeTab, setActiveTab] = useState<'configurator' | 'help'>('configurator');

  useEffect(() => {
    setIsLoaded(true);
    
    // Count active security features
    const features = Object.values(config).filter(feature => 
      feature && typeof feature === 'object' && 'enabled' in feature && feature.enabled
    ).length;
    setActiveFeatures(features);
  }, [config]);

  const securityStats = [
    { 
      label: 'Active Protections', 
      value: activeFeatures, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ), 
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20'
    },
    { 
      label: 'Security Score', 
      value: Math.round((activeFeatures / 8) * 100), 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ), 
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20'
    },
    { 
      label: 'Threat Level', 
      value: activeFeatures >= 6 ? 'Low' : activeFeatures >= 4 ? 'Medium' : 'High', 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
      ), 
      color: activeFeatures >= 6 ? 'from-emerald-500 to-green-600' : activeFeatures >= 4 ? 'from-yellow-500 to-orange-500' : 'from-red-500 to-rose-600',
      bgColor: activeFeatures >= 6 ? 'from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20' : activeFeatures >= 4 ? 'from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20' : 'from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Enhanced animated background */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-400/30 to-purple-400/30 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-pink-400/30 dark:from-indigo-500/20 dark:to-pink-500/20 rounded-full blur-3xl animate-pulse [animation-delay:1s]"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-cyan-400/20 to-violet-400/20 dark:from-cyan-500/15 dark:to-violet-500/15 rounded-full blur-2xl animate-pulse [animation-delay:2s]"></div>
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent dark:via-slate-900/20"></div>
      </div>
      
      <div className={`relative z-10 transition-all duration-1000 ease-out ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Mobile-first header */}
        <header className="px-4 sm:px-6 lg:px-8 pt-6 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Top navigation */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-4">
                {/* Logo */}
                <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                
                {/* Brand name - hidden on very small screens */}
                <div className="hidden xs:block">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                    websecure-ez
                  </h1>
                  <p className="text-sm text-gray-600 dark:text-slate-400">Security Configuration Tool</p>
                </div>
              </div>
              
              <ThemeToggle />
            </div>
            
            {/* Hero section */}
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight">
                websecure-ez
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-6">
                🚀 The ultimate web security configuration tool for Next.js applications
              </p>
              
              <p className="text-base sm:text-lg text-gray-500 dark:text-slate-400 max-w-3xl mx-auto mb-8">
                Configure comprehensive security headers, policies, and protections through an intuitive interface. 
                Generate production-ready middleware code in seconds.
              </p>
              
              {/* Navigation tabs */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <button 
                  onClick={() => setActiveTab('configurator')}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    activeTab === 'configurator'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white focus:ring-blue-500/50'
                      : 'bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-slate-500/50 text-gray-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 focus:ring-gray-500/50'
                  }`}
                >
                  🎯 Security Configurator
                </button>
                <button 
                  onClick={() => setActiveTab('help')}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    activeTab === 'help'
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white focus:ring-purple-500/50'
                      : 'bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm border border-gray-200/50 dark:border-slate-500/50 text-gray-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 focus:ring-gray-500/50'
                  }`}
                >
                  📚 Help & Documentation
                </button>
              </div>
            </div>
            
            {/* Important notice - more compact on mobile */}
            <div className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 backdrop-blur-lg rounded-2xl shadow-xl border border-amber-200/50 dark:border-amber-600/40 p-4 sm:p-6 mb-8 mx-auto max-w-4xl">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-amber-500 to-yellow-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="text-left flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-amber-900 dark:text-amber-100 mb-2">
                    📢 Important: This is the Configuration Tool
                  </h3>
                  <div className="space-y-2 text-sm sm:text-base text-amber-800 dark:text-amber-200">
                    <p className="font-semibold">
                      🎯 You&apos;re currently viewing the websecure-ez configuration interface.
                    </p>
                    <p>
                      This tool helps you generate secure middleware code for your Next.js applications.
                    </p>
                    <div className="bg-amber-100/50 dark:bg-amber-800/30 rounded-lg p-3 mt-3">
                      <p className="font-medium mb-2">To use in your project:</p>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        <li>Configure security settings below</li>
                        <li>Copy the generated middleware code</li>
                        <li>Install: <code className="bg-amber-200 dark:bg-amber-800 px-2 py-1 rounded text-xs font-mono">npm install websecure-ez</code></li>
                        <li>Paste code into your <code className="bg-amber-200 dark:bg-amber-800 px-2 py-1 rounded text-xs font-mono">middleware.ts</code></li>
                      </ol>
                    </div>
                  </div>
            </div>
          </div>
            </div>

            {/* Security stats - responsive grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
              {securityStats.map((stat, index) => (
                <div key={index} className={`bg-gradient-to-br ${stat.bgColor} backdrop-blur-lg rounded-2xl shadow-xl border border-white/30 dark:border-slate-600/30 p-6 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl`}>
                  <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl mb-4 shadow-lg text-white`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2">{stat.label}</h3>
                  <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {typeof stat.value === 'number' && stat.label === 'Security Score' ? `${stat.value}%` : stat.value}
                  </p>
                </div>
              ))}
            </div>
            
            {/* Feature badges - responsive layout */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm mb-8">
              {[
                { label: 'CSP Protection', active: config.contentSecurityPolicy?.enabled },
                { label: 'HSTS Enabled', active: config.hsts?.enabled },
                { label: 'Clickjacking Protection', active: config.xFrameOptions?.enabled },
                { label: 'Permissions Policy', active: config.permissionsPolicy?.enabled },
                { label: 'XSS Protection', active: config.xssProtection?.enabled },
                { label: 'Secure Cookies', active: config.secureCookies?.enabled }
              ].map((badge, index) => (
                <div key={index} className={`flex items-center gap-2 backdrop-blur-sm rounded-full px-3 py-2 transition-all duration-300 border ${
                  badge.active 
                    ? 'bg-emerald-100/80 dark:bg-emerald-900/60 border-emerald-200 dark:border-emerald-600/50 shadow-md' 
                    : 'bg-gray-100/80 dark:bg-slate-700/60 border-gray-200 dark:border-slate-600/50'
                }`}>
                  <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${badge.active ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400 dark:bg-slate-500'}`}></span>
                  <span className={`${badge.active ? 'text-emerald-700 dark:text-emerald-300 font-medium' : 'text-gray-600 dark:text-slate-400'}`}>
                    {badge.label}
                  </span>
            </div>
              ))}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="px-4 sm:px-6 lg:px-8 pb-12">
          <div className="max-w-7xl mx-auto">
            {activeTab === 'configurator' ? (
              <>
                {/* Quick Presets Section */}
                <section className="mb-12">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 dark:border-slate-600/30 p-6 sm:p-8 transform hover:shadow-3xl transition-all duration-500">
                <div className="text-center mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mb-4">
                    🎛️ Quick Security Presets
                  </h2>
                                      <p className="text-gray-600 dark:text-slate-300 text-sm sm:text-base">
                      Start with a preset configuration and customize as needed
                    </p>
                </div>
                                 <PresetSelector onPresetSelect={setConfig} />
              </div>
            </section>

            {/* Main configuration grid - responsive layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-12">
              {/* Security Configuration */}
              <section>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 dark:border-slate-600/30 p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
            </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                      Security Configuration
                    </h2>
          </div>
                                     <SecurityForm config={config} setConfig={setConfig} />
                </div>
              </section>

              {/* Generated Code */}
              <section>
                <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 dark:border-slate-600/30 p-6 sm:p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                      Generated Code
                    </h2>
              </div>
              <CodePreview config={config} />
                </div>
              </section>
            </div>

            {/* Configuration Import/Export */}
            <section className="mb-12">
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 dark:border-slate-600/30 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                    Configuration Management
                  </h2>
                </div>
                <ConfigurationImportExport config={config} onConfigImport={setConfig} />
              </div>
            </section>

            {/* Security Analysis */}
            <section>
              <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 dark:border-slate-600/30 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
                    Security Analysis
                  </h2>
                </div>
                <SecurityAnalyzer config={config} />
              </div>
            </section>
              </>
            ) : (
              <HelpCenter />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}














