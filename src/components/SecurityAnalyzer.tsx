'use client';

import { WebSecureConfig } from 'websecure-ez';
import { useState, useEffect, useCallback } from 'react';

interface SecurityAnalyzerProps {
  config: Partial<WebSecureConfig>;
}

interface SecurityIssue {
  level: 'error' | 'warning' | 'info';
  title: string;
  description: string;
  fix: string;
  icon: string;
}

export default function SecurityAnalyzer({ config }: SecurityAnalyzerProps) {
  const [issues, setIssues] = useState<SecurityIssue[]>([]);
  const [score, setScore] = useState(0);

  const analyzeConfiguration = useCallback(() => {
    const foundIssues: SecurityIssue[] = [];
    let currentScore = 100;

    // CSP Analysis
    if (!config.contentSecurityPolicy?.enabled) {
      foundIssues.push({
        level: 'error',
        title: 'Content Security Policy Disabled',
        description: 'CSP is one of the most important security headers for preventing XSS attacks.',
        fix: 'Enable Content Security Policy in the configuration form.',
        icon: '🚨'
      });
      currentScore -= 30;
    } else {
      if (config.contentSecurityPolicy?.directives?.scriptSrc?.includes("'unsafe-inline'")) {
        foundIssues.push({
          level: 'warning',
          title: 'Unsafe Script Sources',
          description: 'Allowing unsafe-inline scripts reduces XSS protection.',
          fix: 'Remove unsafe-inline from script-src and use nonces or hashes instead.',
          icon: '⚠️'
        });
        currentScore -= 10;
      }

      if (config.contentSecurityPolicy?.directives?.styleSrc?.includes("'unsafe-inline'")) {
        foundIssues.push({
          level: 'warning',
          title: 'Unsafe Style Sources',
          description: 'Allowing unsafe-inline styles can lead to CSS injection attacks.',
          fix: 'Remove unsafe-inline from style-src and use nonces or hashes for inline styles.',
          icon: '⚠️'
        });
        currentScore -= 5;
      }

      if (config.contentSecurityPolicy?.reportOnly) {
        foundIssues.push({
          level: 'info',
          title: 'CSP in Report-Only Mode',
          description: 'CSP is currently only reporting violations, not blocking them.',
          fix: 'Disable report-only mode to actively block violations in production.',
          icon: '📊'
        });
        currentScore -= 5;
      }
    }

    // HSTS Analysis
    if (!config.hsts?.enabled) {
      foundIssues.push({
        level: 'error',
        title: 'HSTS Not Enabled',
        description: 'HTTP Strict Transport Security protects against protocol downgrade attacks.',
        fix: 'Enable HSTS to force HTTPS connections.',
        icon: '🔓'
      });
      currentScore -= 20;
    } else {
      if ((config.hsts?.maxAge || 0) < 31536000) {
        foundIssues.push({
          level: 'warning',
          title: 'Short HSTS Max Age',
          description: 'HSTS max-age should be at least 1 year (31536000 seconds).',
          fix: 'Increase HSTS max-age to 31536000 or higher.',
          icon: '⏰'
        });
        currentScore -= 5;
      }

      if (!config.hsts?.includeSubDomains) {
        foundIssues.push({
          level: 'info',
          title: 'HSTS Subdomains Not Included',
          description: 'Consider including subdomains in HSTS protection.',
          fix: 'Enable includeSubDomains for comprehensive protection.',
          icon: '🌐'
        });
        currentScore -= 3;
      }
    }

    // X-Frame-Options Analysis
    if (!config.xFrameOptions?.enabled) {
      foundIssues.push({
        level: 'warning',
        title: 'Clickjacking Protection Disabled',
        description: 'X-Frame-Options protects against clickjacking attacks.',
        fix: 'Enable X-Frame-Options with DENY or SAMEORIGIN.',
        icon: '🖱️'
      });
      currentScore -= 15;
    }

    // Secure Cookies Analysis
    if (!config.secureCookies?.enabled) {
      foundIssues.push({
        level: 'warning',
        title: 'Secure Cookie Defaults Not Applied',
        description: 'Cookies should have secure attributes set by default.',
        fix: 'Enable secure cookie defaults.',
        icon: '🍪'
      });
      currentScore -= 10;
    } else {
      if (!config.secureCookies?.httpOnly) {
        foundIssues.push({
          level: 'warning',
          title: 'Cookies Not HttpOnly',
          description: 'HttpOnly cookies are not accessible via JavaScript, reducing XSS risks.',
          fix: 'Enable httpOnly for cookies.',
          icon: '🍪'
        });
        currentScore -= 5;
      }

      if (config.secureCookies?.sameSite !== 'Strict' && config.secureCookies?.sameSite !== 'Lax') {
        foundIssues.push({
          level: 'info',
          title: 'SameSite Cookie Attribute',
          description: 'SameSite attribute helps prevent CSRF attacks.',
          fix: 'Set sameSite to Strict or Lax depending on your needs.',
          icon: '🔗'
        });
        currentScore -= 3;
      }
    }

    // XSS Protection Analysis
    if (!config.xssProtection?.enabled) {
      foundIssues.push({
        level: 'info',
        title: 'XSS Protection Disabled',
        description: 'X-XSS-Protection provides additional XSS filtering in older browsers.',
        fix: 'Enable XSS Protection for legacy browser support.',
        icon: '🛡️'
      });
      currentScore -= 5;
    }

    // Content Type Options
    if (!config.xContentTypeOptions?.enabled) {
      foundIssues.push({
        level: 'warning',
        title: 'MIME Sniffing Protection Disabled',
        description: 'X-Content-Type-Options prevents MIME-sniffing attacks.',
        fix: 'Enable X-Content-Type-Options.',
        icon: '📄'
      });
      currentScore -= 10;
    }

    setIssues(foundIssues);
    setScore(Math.max(0, currentScore));
  }, [config]);

  useEffect(() => {
    analyzeConfiguration();
  }, [analyzeConfiguration]);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 70) return 'from-yellow-500 to-yellow-600';
    if (score >= 50) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'A';
    if (score >= 80) return 'B';
    if (score >= 70) return 'C';
    if (score >= 60) return 'D';
    return 'F';
  };

  

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'error': return 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20';
      case 'warning': return 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20';
      case 'info': return 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20';
      default: return 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Score */}
      <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/20 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📊</span>
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">Security Analysis</h3>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${getScoreColor(score)} flex items-center justify-center shadow-lg`}>
              <div className="text-center text-white">
                <div className="text-2xl font-bold">{getScoreGrade(score)}</div>
                <div className="text-xs opacity-90">{score}/100</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              Security Score: {score}/100
            </h4>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-2">
              <div 
                className={`h-3 rounded-full bg-gradient-to-r ${getScoreColor(score)} transition-all duration-1000`}
                style={{ width: `${score}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {score >= 90 ? 'Excellent security configuration!' :
               score >= 70 ? 'Good security with room for improvement.' :
               score >= 50 ? 'Basic security in place, consider improvements.' :
               'Security configuration needs attention.'}
            </p>
          </div>
        </div>
      </div>

      {/* Issues List */}
      {issues.length > 0 && (
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <span>🔍</span>
            Security Recommendations ({issues.length})
          </h4>
          
          {issues.map((issue, index) => (
            <div key={index} className={`rounded-lg border p-4 ${getLevelColor(issue.level)}`}>
              <div className="flex items-start gap-3">
                <span className="text-xl flex-shrink-0">{issue.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h5 className="font-semibold text-gray-800 dark:text-white">{issue.title}</h5>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      issue.level === 'error' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
                      issue.level === 'warning' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {issue.level.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">{issue.description}</p>
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                    <strong>Fix:</strong> {issue.fix}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {issues.length === 0 && (
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
          <div className="text-4xl mb-3">🎉</div>
          <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">Perfect Configuration!</h4>
          <p className="text-sm text-green-700 dark:text-green-300">
            Your security configuration looks great! No issues found.
          </p>
        </div>
      )}
    </div>
  );
} 