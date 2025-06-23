'use client';

import { useState } from 'react';

export default function HelpCenter() {
  const [activeTab, setActiveTab] = useState<'faq' | 'guides' | 'support'>('faq');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is websecure-ez and why do I need it?",
      answer: "websecure-ez is a security configuration tool for Next.js applications that helps you implement industry-standard security headers like CSP, HSTS, and more. It protects your app from common web vulnerabilities like XSS, clickjacking, and protocol downgrade attacks."
    },
    {
      question: "How do I install and set up websecure-ez?",
      answer: "Install with 'npm install websecure-ez', then create a middleware.ts file in your project root. Use the configuration tool above to generate your security settings, then copy the generated code into your middleware file."
    },
    {
      question: "Will websecure-ez break my existing application?",
      answer: "websecure-ez is designed to be safe, but security headers can sometimes block legitimate resources. Start with the 'Basic Security' preset or enable 'report-only' mode for CSP to identify potential issues before enforcing policies."
    },
    {
      question: "What's the difference between the security presets?",
      answer: "Strict Security offers maximum protection but may break some functionality. Balanced Security provides good protection with more flexibility. Basic Security enables essential protections with minimal restrictions."
    },
    {
      question: "How do I fix CSP violations?",
      answer: "CSP violations appear in browser console. Add the blocked domains to appropriate CSP directives (scriptSrc, styleSrc, etc.). Use 'report-only' mode initially to identify all required domains before enforcing."
    },
    {
      question: "Can I use websecure-ez with third-party services?",
      answer: "Yes! You'll need to add third-party domains to your CSP directives. Common services like Google Analytics, Stripe, or social media widgets require specific domains in your CSP configuration."
    },
    {
      question: "How do I test if my security headers are working?",
      answer: "Use browser developer tools to check response headers, or online tools like securityheaders.com. The built-in security analyzer in this tool also provides real-time feedback on your configuration."
    },
    {
      question: "What should I do if HSTS is causing issues?",
      answer: "HSTS forces HTTPS connections. Ensure your site is fully HTTPS-compatible before enabling. If you need to disable HSTS, you'll need to wait for the max-age period to expire or clear browser HSTS cache."
    }
  ];

  const guides = [
    {
      title: "Setting up CSP for React/Next.js",
      description: "Learn how to configure Content Security Policy for modern React applications",
      steps: [
        "Start with basic CSP directives",
        "Add necessary domains for your app",
        "Handle inline scripts and styles",
        "Test thoroughly in development"
      ],
      difficulty: "Intermediate"
    },
    {
      title: "E-commerce Security Configuration",
      description: "Secure your online store with payment processor compatibility",
      steps: [
        "Configure CSP for payment gateways",
        "Set up secure cookie policies",
        "Enable HSTS with subdomains",
        "Test checkout flow thoroughly"
      ],
      difficulty: "Advanced"
    },
    {
      title: "Debugging Security Header Issues",
      description: "Troubleshoot common problems with security headers",
      steps: [
        "Check browser console for violations",
        "Use report-only mode for testing",
        "Identify blocked resources",
        "Update CSP directives incrementally"
      ],
      difficulty: "Beginner"
    },
    {
      title: "HTTPS and HSTS Best Practices",
      description: "Implement secure transport layer security",
      steps: [
        "Ensure full HTTPS deployment",
        "Configure HSTS with appropriate max-age",
        "Consider HSTS preloading",
        "Monitor certificate expiration"
      ],
      difficulty: "Intermediate"
    }
  ];

  const supportResources = [
    {
      title: "GitHub Repository",
      description: "Source code, issues, and contributions",
      url: "https://github.com/websecure-ez/websecure-ez",
      icon: "🐙"
    },
    {
      title: "Security Headers Reference",
      description: "MDN documentation on security headers",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers#Security",
      icon: "📚"
    },
    {
      title: "OWASP Security Guide",
      description: "Comprehensive web application security guide",
      url: "https://owasp.org/www-project-web-security-testing-guide/",
      icon: "🛡️"
    },
    {
      title: "CSP Evaluator",
      description: "Google's CSP evaluation tool",
      url: "https://csp-evaluator.withgoogle.com/",
      icon: "🔍"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          Help Center
        </h2>
        <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
          Find answers to common questions, step-by-step guides, and support resources.
        </p>
      </div>

      {/* Tabs */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/50 dark:border-slate-600/40">
        <div className="flex border-b border-gray-200 dark:border-slate-700">
          {[
            { id: 'faq', label: 'FAQ', icon: '❓' },
            { id: 'guides', label: 'Guides', icon: '📖' },
            { id: 'support', label: 'Resources', icon: '🔗' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as 'faq' | 'guides' | 'support')}
              className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-gray-600 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        <div className="p-6">
          {activeTab === 'faq' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Frequently Asked Questions
              </h3>
              
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 dark:border-slate-600 rounded-lg">
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <span className="font-medium text-gray-800 dark:text-white pr-4">
                      {faq.question}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transition-transform ${
                        expandedFaq === index ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 pb-4 border-t border-gray-200 dark:border-slate-600 bg-gray-50 dark:bg-slate-700/30">
                      <p className="text-gray-600 dark:text-slate-300 pt-4">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeTab === 'guides' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Step-by-Step Guides
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide, index) => (
                  <div key={index} className="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-6 border border-gray-200 dark:border-slate-600">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {guide.title}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        guide.difficulty === 'Beginner' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300'
                          : guide.difficulty === 'Intermediate'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300'
                      }`}>
                        {guide.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 dark:text-slate-300 mb-4 text-sm">
                      {guide.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h5 className="font-medium text-gray-700 dark:text-slate-300 text-sm">Steps:</h5>
                      <ol className="space-y-1">
                        {guide.steps.map((step, stepIndex) => (
                          <li key={stepIndex} className="text-sm text-gray-600 dark:text-slate-400 flex items-start gap-2">
                            <span className="w-5 h-5 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                              {stepIndex + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'support' && (
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Support Resources
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {supportResources.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-6 bg-gray-50 dark:bg-slate-700/50 rounded-lg border border-gray-200 dark:border-slate-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl">{resource.icon}</div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {resource.title}
                        </h4>
                        <p className="text-gray-600 dark:text-slate-300 text-sm">
                          {resource.description}
                        </p>
                        <div className="mt-3 flex items-center gap-1 text-blue-600 dark:text-blue-400 text-sm font-medium">
                          <span>Visit resource</span>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Need More Help?</h4>
                <p className="text-blue-800 dark:text-blue-200 text-sm mb-4">
                  If you can&apos;t find what you&apos;re looking for, here are additional ways to get support:
                </p>
                <ul className="space-y-2 text-blue-800 dark:text-blue-200 text-sm">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Check the browser console for specific error messages
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Use online security header testing tools
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Test configurations in development before production
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 