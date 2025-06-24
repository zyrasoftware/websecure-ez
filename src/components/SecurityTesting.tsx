'use client';

import { useState, useEffect } from 'react';
import { WebSecureConfig } from 'websecure-ez';

interface SecurityTestingProps {
  config: Partial<WebSecureConfig>;
}

interface TestResult {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'warning' | 'pending';
  message: string;
  recommendation?: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

export default function SecurityTesting({ config }: SecurityTestingProps) {
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [testUrl, setTestUrl] = useState('');
  const [simulationMode, setSimulationMode] = useState<'production' | 'development'>('production');

  const securityTests = [
    {
      id: 'csp-enabled',
      name: 'Content Security Policy',
      test: () => config.contentSecurityPolicy?.enabled,
      severity: 'critical' as const,
      message: (result: boolean) => result ? 'CSP is enabled' : 'CSP is not enabled',
      recommendation: 'Enable Content Security Policy to prevent XSS attacks'
    },
    {
      id: 'csp-unsafe-inline',
      name: 'CSP Unsafe Inline Scripts',
      test: () => !config.contentSecurityPolicy?.directives?.scriptSrc?.includes("'unsafe-inline'"),
      severity: 'high' as const,
      message: (result: boolean) => result ? 'No unsafe-inline in script-src' : 'unsafe-inline detected in script-src',
      recommendation: 'Remove unsafe-inline and use nonces or hashes for inline scripts'
    },
    {
      id: 'hsts-enabled',
      name: 'HSTS Protection',
      test: () => config.hsts?.enabled,
      severity: 'high' as const,
      message: (result: boolean) => result ? 'HSTS is enabled' : 'HSTS is not enabled',
      recommendation: 'Enable HSTS to force HTTPS connections'
    },
    {
      id: 'hsts-duration',
      name: 'HSTS Duration',
      test: () => (config.hsts?.maxAge || 0) >= 31536000,
      severity: 'medium' as const,
      message: (result: boolean) => result ? 'HSTS max-age is sufficient' : 'HSTS max-age is too short',
      recommendation: 'Set HSTS max-age to at least 1 year (31536000 seconds)'
    },
    {
      id: 'xframe-enabled',
      name: 'Clickjacking Protection',
      test: () => config.xFrameOptions?.enabled,
      severity: 'medium' as const,
      message: (result: boolean) => result ? 'X-Frame-Options is enabled' : 'X-Frame-Options is not enabled',
      recommendation: 'Enable X-Frame-Options to prevent clickjacking attacks'
    },
    {
      id: 'secure-cookies',
      name: 'Secure Cookie Defaults',
      test: () => config.secureCookies?.enabled && config.secureCookies?.httpOnly && config.secureCookies?.secure,
      severity: 'medium' as const,
      message: (result: boolean) => result ? 'Secure cookie defaults are set' : 'Secure cookie defaults are missing',
      recommendation: 'Enable httpOnly, secure, and sameSite attributes for cookies'
    },
    {
      id: 'content-type-options',
      name: 'MIME Sniffing Protection',
      test: () => config.xContentTypeOptions?.enabled,
      severity: 'low' as const,
      message: (result: boolean) => result ? 'X-Content-Type-Options is enabled' : 'X-Content-Type-Options is not enabled',
      recommendation: 'Enable X-Content-Type-Options to prevent MIME sniffing attacks'
    },
    {
      id: 'referrer-policy',
      name: 'Referrer Policy',
      test: () => config.referrerPolicy?.enabled,
      severity: 'low' as const,
      message: (result: boolean) => result ? 'Referrer Policy is set' : 'Referrer Policy is not set',
      recommendation: 'Set Referrer Policy to control referrer information leakage'
    }
  ];

  const runSecurityTests = async () => {
    setIsRunning(true);
    const results: TestResult[] = [];

    for (const test of securityTests) {
      // Simulate test execution delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const testResult = test.test();
      const status = testResult ? 'pass' : 'fail';
      
      results.push({
        id: test.id,
        name: test.name,
        status,
        message: test.message(testResult),
        recommendation: testResult ? undefined : test.recommendation,
        severity: test.severity
      });
      
      setTestResults([...results]);
    }

    setIsRunning(false);
  };

  const runUrlTest = async () => {
    if (!testUrl) return;
    
    setIsRunning(true);
    
    try {
      // Simulate URL testing (in a real implementation, this would make actual HTTP requests)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const urlResults: TestResult[] = [
        {
          id: 'url-https',
          name: 'HTTPS Connection',
          status: testUrl.startsWith('https://') ? 'pass' : 'fail',
          message: testUrl.startsWith('https://') ? 'URL uses HTTPS' : 'URL does not use HTTPS',
          recommendation: 'Use HTTPS for secure connections',
          severity: 'critical'
        },
        {
          id: 'url-headers',
          name: 'Security Headers',
          status: 'warning',
          message: 'Some security headers may be missing',
          recommendation: 'Check if your server is sending all configured security headers',
          severity: 'medium'
        }
      ];
      
      setTestResults(prev => [...prev, ...urlResults]);
    } catch (error) {
      console.error('URL test failed:', error);
    }
    
    setIsRunning(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pass':
        return <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>;
      case 'fail':
        return <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>;
      case 'warning':
        return <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>;
      default:
        return <svg className="w-5 h-5 text-gray-400 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getOverallScore = () => {
    if (testResults.length === 0) return 0;
    
    const passed = testResults.filter(r => r.status === 'pass').length;
    return Math.round((passed / testResults.length) * 100);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 dark:text-green-400';
    if (score >= 70) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  useEffect(() => {
    // Auto-run tests when config changes
    if (Object.keys(config).length > 0) {
      runSecurityTests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  return (
    <div className="space-y-6">
      {/* Test Controls */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-slate-600/40">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Security Testing</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Configuration Testing */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 dark:text-slate-300">Configuration Tests</h4>
            
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-600 dark:text-slate-400">Mode:</label>
              <div className="flex gap-2">
                {['production', 'development'].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setSimulationMode(mode as 'production' | 'development')}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      simulationMode === mode
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-200 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-300 dark:hover:bg-slate-600'
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={runSecurityTests}
              disabled={isRunning}
              className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-300"
            >
              {isRunning ? 'Running Tests...' : 'Run Security Tests'}
            </button>
          </div>

          {/* URL Testing */}
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-700 dark:text-slate-300">Live URL Testing</h4>
            
            <div className="space-y-3">
              <input
                type="url"
                placeholder="https://zyros.vercel.app/"
                value={testUrl}
                onChange={(e) => setTestUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
              />
              
              <button
                onClick={runUrlTest}
                disabled={isRunning || !testUrl}
                className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none transition-all duration-300"
              >
                {isRunning ? 'Testing URL...' : 'Test URL'}
              </button>
            </div>

            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
              <p className="text-xs text-amber-800 dark:text-amber-200">
                <strong>Note:</strong> URL testing is simulated in this demo. In production, this would make actual HTTP requests to test headers.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-slate-600/40">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">Test Results</h3>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={`text-2xl font-bold ${getScoreColor(getOverallScore())}`}>
                  {getOverallScore()}%
                </div>
                <div className="text-sm text-gray-500 dark:text-slate-400">Security Score</div>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {testResults.map((result) => (
              <div
                key={result.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  result.status === 'pass'
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                    : result.status === 'fail'
                    ? 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                    : result.status === 'warning'
                    ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                    : 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {getStatusIcon(result.status)}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h4 className="font-medium text-gray-900 dark:text-white">{result.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(result.severity)}`}>
                        {result.severity}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-600 dark:text-slate-400 mb-2">
                      {result.message}
                    </p>
                    
                    {result.recommendation && (
                      <div className="bg-white/50 dark:bg-slate-800/50 rounded-lg p-3 border border-gray-200/50 dark:border-slate-600/50">
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <p className="text-sm text-blue-800 dark:text-blue-200">
                            <strong>Recommendation:</strong> {result.recommendation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Passed', count: testResults.filter(r => r.status === 'pass').length, color: 'text-green-600' },
              { label: 'Failed', count: testResults.filter(r => r.status === 'fail').length, color: 'text-red-600' },
              { label: 'Warnings', count: testResults.filter(r => r.status === 'warning').length, color: 'text-yellow-600' },
              { label: 'Total', count: testResults.length, color: 'text-gray-600' }
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                <div className={`text-xl font-bold ${stat.color}`}>{stat.count}</div>
                <div className="text-sm text-gray-500 dark:text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 