'use client';

import { useState } from 'react';
import { WebSecureConfig } from '@/lib/websecure-ez';

interface CodePreviewProps {
  config: Partial<WebSecureConfig>;
}

export default function CodePreview({ config }: CodePreviewProps) {
  const [activeTab, setActiveTab] = useState<'config' | 'middleware' | 'usage'>('middleware');
  const [copied, setCopied] = useState('');

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const configCode = JSON.stringify(config, null, 2);

  const middlewareCode = `import { NextRequest } from 'next/server';
import { createSecureMiddleware } from 'websecure-ez';

// Create secure middleware with your configuration
const secureMiddleware = createSecureMiddleware(${JSON.stringify(config, null, 2)});

export default secureMiddleware;

// Configure which paths the middleware should run on
export const config = {
  // Match all paths except static files and images
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};`;

  const usageCode = `// Installation
npm install websecure-ez

// Basic usage in your Next.js app
import { createSecureMiddleware, sanitizeInput, applyCookieDefaults } from 'websecure-ez';

// 1. Middleware setup (middleware.ts)
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
  xFrameOptions: {
    enabled: true,
    option: 'DENY',
  },
});

// 2. Input sanitization
const safeInput = sanitizeInput(userInput);

// 3. Secure cookie defaults
const cookieOptions = applyCookieDefaults({
  maxAge: 3600,
  path: '/',
});

// 4. Use presets for common configurations
import { presets } from 'websecure-ez';
const strictMiddleware = createSecureMiddleware(presets.strict);`;

  const installCode = `# Install websecure-ez
npm install websecure-ez

# Or with yarn
yarn add websecure-ez

# Or with pnpm
pnpm add websecure-ez`;

  const tabs = [
    { id: 'middleware', label: '🔧 Middleware', icon: '🔧' },
    { id: 'config', label: '⚙️ Configuration', icon: '⚙️' },
    { id: 'usage', label: '📚 Usage Guide', icon: '📚' },
  ];

  const CodeBlock = ({ code, language = 'typescript', label }: { code: string; language?: string; label: string }) => (
    <div className="relative">
      <div className="flex items-center justify-between bg-gray-800 dark:bg-gray-900 text-white px-4 py-2 rounded-t-md">
        <span className="text-sm font-medium">{label}</span>
        <button
          onClick={() => copyToClipboard(code, label)}
          className="text-xs bg-gray-700 hover:bg-gray-600 px-2 py-1 rounded transition-colors duration-200"
        >
          {copied === label ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>
      <div className="bg-gray-900 dark:bg-black rounded-b-md overflow-hidden">
        <pre className="p-4 text-sm text-gray-100 overflow-x-auto">
          <code className={`language-${language}`}>{code}</code>
        </pre>
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Tab Navigation */}
      <div className="flex flex-wrap border-b border-gray-200 dark:border-gray-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
            }`}
                         onClick={() => setActiveTab(tab.id as 'config' | 'middleware' | 'usage')}
          >
            <span className="flex items-center gap-2">
              <span>{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label}</span>
            </span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'middleware' && (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-blue-600 dark:text-blue-400">💡</span>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100">Quick Setup</h3>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Create a <code className="bg-blue-200 dark:bg-blue-800 px-1 rounded">middleware.ts</code> file in your project root and paste the code below.
              </p>
            </div>
            <CodeBlock code={middlewareCode} language="typescript" label="middleware.ts" />
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-green-600 dark:text-green-400">⚙️</span>
                <h3 className="font-semibold text-green-900 dark:text-green-100">Configuration Object</h3>
              </div>
              <p className="text-sm text-green-800 dark:text-green-200">
                This is your current security configuration. You can export this and use it in your application.
              </p>
            </div>
            <CodeBlock code={configCode} language="json" label="Configuration JSON" />
          </div>
        )}

        {activeTab === 'usage' && (
          <div className="space-y-6">
            <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-purple-600 dark:text-purple-400">📚</span>
                <h3 className="font-semibold text-purple-900 dark:text-purple-100">Complete Usage Guide</h3>
              </div>
              <p className="text-sm text-purple-800 dark:text-purple-200">
                Everything you need to get started with websecure-ez in your Next.js application.
              </p>
            </div>
            
            <CodeBlock code={installCode} language="bash" label="Installation" />
            <CodeBlock code={usageCode} language="typescript" label="Complete Example" />
            
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-amber-600 dark:text-amber-400">⚠️</span>
                <h3 className="font-semibold text-amber-900 dark:text-amber-100">Important Notes</h3>
              </div>
              <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1">
                <li>• Test your configuration in development before deploying</li>
                <li>• Some CSP directives may break functionality if too restrictive</li>
                <li>• HSTS headers only work on HTTPS connections</li>
                <li>• Consider using report-only mode for CSP initially</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}