'use client';

import { useState } from 'react';

export default function Documentation() {
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = [
    { id: 'getting-started', title: 'Getting Started', icon: '🚀' },
    { id: 'installation', title: 'Installation', icon: '📦' },
    { id: 'configuration', title: 'Configuration', icon: '⚙️' },
    { id: 'best-practices', title: 'Best Practices', icon: '💡' },
    { id: 'troubleshooting', title: 'Troubleshooting', icon: '🔧' },
    { id: 'api-reference', title: 'API Reference', icon: '📚' },
  ];

  const CodeBlock = ({ code, language = 'typescript' }: { code: string; language?: string }) => (
    <div className="bg-gray-900 dark:bg-black rounded-lg overflow-hidden">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 px-4 py-2">
        <span className="text-sm text-gray-300">{language}</span>
        <button
          onClick={() => navigator.clipboard.writeText(code)}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded transition-colors"
        >
          Copy
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
        <code>{code}</code>
      </pre>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'getting-started':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Welcome to websecure-ez</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-4">
                websecure-ez is a comprehensive security configuration tool for Next.js applications. 
                It helps you implement industry-standard security headers and policies with ease.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">What you can do:</h4>
              <ul className="space-y-2 text-blue-800 dark:text-blue-200">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Configure Content Security Policy (CSP)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Set up HTTP Strict Transport Security (HSTS)
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Enable clickjacking protection
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Configure secure cookie defaults
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Generate production-ready middleware code
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Quick Start Steps:</h4>
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Configure Security Settings', desc: 'Use the form above to configure your security preferences' },
                  { step: 2, title: 'Generate Code', desc: 'Copy the generated middleware code from the code preview' },
                  { step: 3, title: 'Install Package', desc: 'Run npm install websecure-ez in your project' },
                  { step: 4, title: 'Deploy', desc: 'Create middleware.ts and paste the generated code' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-4 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h5 className="font-semibold text-gray-800 dark:text-white">{item.title}</h5>
                      <p className="text-sm text-gray-600 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'installation':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Installation</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-6">
                Install websecure-ez in your Next.js project using your preferred package manager.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Using npm:</h4>
                <CodeBlock code="npm install websecure-ez" language="bash" />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Using yarn:</h4>
                <CodeBlock code="yarn add websecure-ez" language="bash" />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">Using pnpm:</h4>
                <CodeBlock code="pnpm add websecure-ez" language="bash" />
              </div>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">Requirements</h4>
              <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                <li>• Next.js 12.0 or higher</li>
                <li>• Node.js 16.0 or higher</li>
                <li>• TypeScript support (recommended)</li>
              </ul>
            </div>
          </div>
        );

      case 'configuration':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Configuration Guide</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-6">
                Learn how to configure websecure-ez for your specific needs.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Basic Setup</h4>
                <p className="text-gray-600 dark:text-slate-300 mb-3">
                  Create a <code className="bg-gray-200 dark:bg-slate-700 px-2 py-1 rounded">middleware.ts</code> file in your project root:
                </p>
                <CodeBlock 
                  code={`import { NextRequest } from 'next/server';
import { createSecureMiddleware } from 'websecure-ez';

// Basic configuration
const secureMiddleware = createSecureMiddleware({
  contentSecurityPolicy: {
    enabled: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
  hsts: {
    enabled: true,
    maxAge: 31536000,
    includeSubDomains: true,
  },
});

export default secureMiddleware;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};`}
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">Advanced Configuration</h4>
                <p className="text-gray-600 dark:text-slate-300 mb-3">
                  For production applications, use more comprehensive settings:
                </p>
                <CodeBlock 
                  code={`import { createSecureMiddleware } from 'websecure-ez';

const secureMiddleware = createSecureMiddleware({
  contentSecurityPolicy: {
    enabled: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://trusted-scripts.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.yourdomain.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      objectSrc: ["'none'"],
      mediaSrc: ["'self'"],
      frameSrc: ["'none'"],
      upgradeInsecureRequests: true,
      blockAllMixedContent: true,
    },
    reportOnly: false,
  },
  hsts: {
    enabled: true,
    maxAge: 63072000, // 2 years
    includeSubDomains: true,
    preload: true,
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
    },
  },
});

export default secureMiddleware;`}
                />
              </div>
            </div>
          </div>
        );

      case 'best-practices':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Security Best Practices</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-6">
                Follow these recommendations to maximize your application&apos;s security.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  title: 'Content Security Policy (CSP)',
                  icon: '🛡️',
                  color: 'blue',
                  tips: [
                    'Start with report-only mode to identify issues',
                    'Avoid unsafe-inline and unsafe-eval in production',
                    'Use nonces or hashes for inline scripts/styles',
                    'Regularly review and update your CSP directives',
                    'Test thoroughly after CSP changes'
                  ]
                },
                {
                  title: 'HTTPS and HSTS',
                  icon: '🔒',
                  color: 'green',
                  tips: [
                    'Always use HTTPS in production',
                    'Set HSTS max-age to at least 1 year',
                    'Include subdomains in HSTS policy',
                    'Consider HSTS preloading for maximum security',
                    'Monitor certificate expiration'
                  ]
                },
                {
                  title: 'Cookie Security',
                  icon: '🍪',
                  color: 'orange',
                  tips: [
                    'Always set HttpOnly for session cookies',
                    'Use Secure flag for HTTPS-only cookies',
                    'Choose appropriate SameSite values',
                    'Set reasonable expiration times',
                    'Implement proper session management'
                  ]
                },
                {
                  title: 'General Security',
                  icon: '⚡',
                  color: 'purple',
                  tips: [
                    'Keep dependencies up to date',
                    'Implement proper input validation',
                    'Use environment variables for secrets',
                    'Enable security headers monitoring',
                    'Regular security audits and testing'
                  ]
                }
              ].map((section) => (
                <div key={section.title} className={`bg-${section.color}-50 dark:bg-${section.color}-900/20 border border-${section.color}-200 dark:border-${section.color}-800 rounded-lg p-6`}>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{section.icon}</span>
                    <h4 className={`text-lg font-semibold text-${section.color}-900 dark:text-${section.color}-100`}>
                      {section.title}
                    </h4>
                  </div>
                  <ul className={`space-y-2 text-${section.color}-800 dark:text-${section.color}-200`}>
                    {section.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case 'troubleshooting':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Troubleshooting</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-6">
                Common issues and their solutions.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  problem: 'CSP blocking legitimate resources',
                  solution: 'Add the blocked domains to appropriate CSP directives. Use browser dev tools to identify blocked resources.',
                  code: `// Add trusted domains to CSP
scriptSrc: ["'self'", "https://trusted-domain.com"]`
                },
                {
                  problem: 'Inline styles/scripts not working',
                  solution: 'Use nonces or hashes instead of unsafe-inline, or add specific inline content to CSP.',
                  code: `// Use nonces for inline scripts
scriptSrc: ["'self'", "'nonce-abc123'"]`
                },
                {
                  problem: 'Third-party integrations breaking',
                  solution: 'Identify required domains and add them to CSP. Check integration documentation for CSP requirements.',
                  code: `// Example for Google Analytics
scriptSrc: ["'self'", "https://www.google-analytics.com"]
imgSrc: ["'self'", "https://www.google-analytics.com"]`
                },
                {
                  problem: 'HSTS not working on subdomains',
                  solution: 'Ensure includeSubDomains is enabled and HSTS header is sent from the main domain.',
                  code: `hsts: {
  enabled: true,
  maxAge: 31536000,
  includeSubDomains: true,
}`
                }
              ].map((item, index) => (
                <div key={index} className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                  <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    ❌ {item.problem}
                  </h4>
                  <p className="text-red-800 dark:text-red-200 mb-3">
                    ✅ {item.solution}
                  </p>
                  {item.code && (
                    <CodeBlock code={item.code} />
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 'api-reference':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">API Reference</h3>
              <p className="text-gray-600 dark:text-slate-300 mb-6">
                Complete reference for websecure-ez functions and types.
              </p>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">createSecureMiddleware(config)</h4>
                <p className="text-gray-600 dark:text-slate-300 mb-3">
                  Creates a Next.js middleware function with security headers based on the provided configuration.
                </p>
                <CodeBlock 
                  code={`import { createSecureMiddleware, WebSecureConfig } from 'websecure-ez';

const config: Partial<WebSecureConfig> = {
  // Your configuration
};

const middleware = createSecureMiddleware(config);
export default middleware;`}
                />
              </div>

              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">sanitizeInput(input)</h4>
                <p className="text-gray-600 dark:text-slate-300 mb-3">
                  Sanitizes user input to prevent XSS attacks.
                </p>
                <CodeBlock 
                  code={`import { sanitizeInput } from 'websecure-ez';

const userInput = "<script>alert(&apos;xss&apos;)</script>";
const safeInput = sanitizeInput(userInput);
// Returns: "&lt;script&gt;alert(&apos;xss&apos;)&lt;/script&gt;"`}
                />
              </div>

              <div className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-6">
                <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">applyCookieDefaults(options)</h4>
                <p className="text-gray-600 dark:text-slate-300 mb-3">
                  Applies secure defaults to cookie options.
                </p>
                <CodeBlock 
                  code={`import { applyCookieDefaults } from 'websecure-ez';

const cookieOptions = applyCookieDefaults({
  maxAge: 3600,
  path: '/',
});
// Returns options with httpOnly: true, secure: true, sameSite: 'Strict'`}
                />
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Navigation */}
      <div className="lg:col-span-1">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-slate-600/40 sticky top-6">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Documentation</h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                  activeSection === section.id
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700/50'
                }`}
              >
                <span>{section.icon}</span>
                <span className="text-sm font-medium">{section.title}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="lg:col-span-3">
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-slate-600/40">
          {renderContent()}
        </div>
      </div>
    </div>
  );
} 