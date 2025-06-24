'use client';

import { useState } from 'react';
import { WebSecureConfig } from 'websecure-ez';

interface SecurityTemplatesProps {
  onTemplateSelect: (config: Partial<WebSecureConfig>) => void;
}

interface Template {
  id: string;
  name: string;
  description: string;
  useCase: string;
  icon: string;
  color: string;
  tags: string[];
  config: Partial<WebSecureConfig>;
  features: string[];
}

export default function SecurityTemplates({ onTemplateSelect }: SecurityTemplatesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const templates: Template[] = [
    {
      id: 'ecommerce',
      name: 'E-commerce Platform',
      description: 'Secure configuration for online stores with payment processing',
      useCase: 'Online stores, marketplaces, payment processing',
      icon: '🛒',
      color: 'from-green-500 to-emerald-600',
      tags: ['ecommerce', 'payments', 'pci-dss'],
      features: ['Strict CSP for payment forms', 'Enhanced cookie security', 'Frame protection'],
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://js.stripe.com", "https://checkout.paypal.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:", "https://cdn.stripe.com"],
            connectSrc: ["'self'", "https://api.stripe.com", "https://api.paypal.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["https://js.stripe.com", "https://checkout.paypal.com"],
            upgradeInsecureRequests: true,
            blockAllMixedContent: true,
          },
          reportOnly: false,
        },
        hsts: { enabled: true, maxAge: 63072000, includeSubDomains: true, preload: true },
        xFrameOptions: { enabled: true, option: 'DENY' },
        secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Strict' },
        referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' },
        permissionsPolicy: {
          enabled: true,
          features: {
            camera: "'none'",
            microphone: "'none'",
            geolocation: "'self'",
            payment: "'self'",
            usb: "'none'",
            vr: "'none'",
          },
        },
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' },
      }
    },
    {
      id: 'saas',
      name: 'SaaS Application',
      description: 'Configuration for software-as-a-service platforms',
      useCase: 'SaaS platforms, web applications, dashboards',
      icon: '☁️',
      color: 'from-blue-500 to-indigo-600',
      tags: ['saas', 'dashboard', 'api'],
      features: ['API security', 'User data protection', 'Cross-origin controls'],
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:", "blob:"],
            connectSrc: ["'self'", "https://api.yourdomain.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'"],
            frameSrc: ["'self'"],
            upgradeInsecureRequests: true,
          },
          reportOnly: false,
        },
        hsts: { enabled: true, maxAge: 31536000, includeSubDomains: true, preload: false },
        xFrameOptions: { enabled: true, option: 'SAMEORIGIN' },
        secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Lax' },
        referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' },
        permissionsPolicy: {
          enabled: true,
          features: {
            camera: "'self'",
            microphone: "'self'",
            geolocation: "'self'",
            payment: "'none'",
            usb: "'none'",
            vr: "'none'",
          },
        },
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' },
      }
    },
    {
      id: 'blog',
      name: 'Blog & Content Site',
      description: 'Optimized for content websites and blogs',
      useCase: 'Blogs, news sites, content management systems',
      icon: '📝',
      color: 'from-purple-500 to-pink-600',
      tags: ['blog', 'cms', 'content'],
      features: ['SEO-friendly', 'Social media integration', 'Analytics support'],
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://www.google-analytics.com", "https://www.googletagmanager.com"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            imgSrc: ["'self'", "data:", "https:", "https://www.google-analytics.com"],
            connectSrc: ["'self'", "https://www.google-analytics.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            objectSrc: ["'none'"],
            mediaSrc: ["'self'", "https:"],
            frameSrc: ["'self'", "https://www.youtube.com", "https://player.vimeo.com"],
            upgradeInsecureRequests: true,
          },
          reportOnly: false,
        },
        hsts: { enabled: true, maxAge: 31536000, includeSubDomains: false, preload: false },
        xFrameOptions: { enabled: true, option: 'SAMEORIGIN' },
        secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Lax' },
        referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' },
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
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' },
      }
    },
    {
      id: 'healthcare',
      name: 'Healthcare & HIPAA',
      description: 'HIPAA-compliant configuration for healthcare applications',
      useCase: 'Healthcare apps, patient portals, medical records',
      icon: '🏥',
      color: 'from-red-500 to-rose-600',
      tags: ['healthcare', 'hipaa', 'compliance'],
      features: ['HIPAA compliance', 'Maximum security', 'Audit logging'],
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'", "data:"],
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
        hsts: { enabled: true, maxAge: 63072000, includeSubDomains: true, preload: true },
        xFrameOptions: { enabled: true, option: 'DENY' },
        secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Strict' },
        referrerPolicy: { enabled: true, policy: 'no-referrer' },
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
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' },
      }
    },
    {
      id: 'fintech',
      name: 'Financial Services',
      description: 'Banking-grade security for financial applications',
      useCase: 'Banking apps, fintech platforms, investment tools',
      icon: '🏦',
      color: 'from-yellow-500 to-orange-600',
      tags: ['fintech', 'banking', 'pci-dss'],
      features: ['Banking-grade security', 'PCI DSS compliance', 'Anti-fraud measures'],
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'"],
            styleSrc: ["'self'"],
            imgSrc: ["'self'", "data:"],
            connectSrc: ["'self'"],
            fontSrc: ["'self'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'none'"],
            frameSrc: ["'none'"],
            upgradeInsecureRequests: true,
            blockAllMixedContent: true,
          },
          reportOnly: false,
        },
        hsts: { enabled: true, maxAge: 63072000, includeSubDomains: true, preload: true },
        xFrameOptions: { enabled: true, option: 'DENY' },
        secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Strict' },
        referrerPolicy: { enabled: true, policy: 'no-referrer' },
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
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' },
      }
    },
    {
      id: 'api',
      name: 'API Gateway',
      description: 'Secure configuration for API endpoints and microservices',
      useCase: 'REST APIs, GraphQL endpoints, microservices',
      icon: '🔌',
      color: 'from-teal-500 to-cyan-600',
      tags: ['api', 'microservices', 'backend'],
      features: ['CORS configuration', 'Rate limiting', 'API security'],
      config: {
        contentSecurityPolicy: {
          enabled: true,
          directives: {
            defaultSrc: ["'none'"],
            scriptSrc: ["'none'"],
            styleSrc: ["'none'"],
            imgSrc: ["'none'"],
            connectSrc: ["'self'"],
            fontSrc: ["'none'"],
            objectSrc: ["'none'"],
            mediaSrc: ["'none'"],
            frameSrc: ["'none'"],
          },
          reportOnly: false,
        },
        hsts: { enabled: true, maxAge: 31536000, includeSubDomains: true, preload: false },
        xFrameOptions: { enabled: true, option: 'DENY' },
        secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Strict' },
        referrerPolicy: { enabled: true, policy: 'no-referrer' },
        permissionsPolicy: { enabled: false, features: {} },
        xContentTypeOptions: { enabled: true },
        xssProtection: { enabled: true, mode: 'block' },
      }
    }
  ];

  const categories = [
    { id: 'all', name: 'All Templates', icon: '🔍' },
    { id: 'ecommerce', name: 'E-commerce', icon: '🛒' },
    { id: 'saas', name: 'SaaS', icon: '☁️' },
    { id: 'content', name: 'Content', icon: '📝' },
    { id: 'compliance', name: 'Compliance', icon: '🏥' },
    { id: 'api', name: 'APIs', icon: '🔌' },
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.tags.includes(selectedCategory);
    const matchesSearch = searchTerm === '' || 
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Security Templates
        </h2>
        <p className="text-gray-600 dark:text-slate-300 max-w-2xl mx-auto">
          Choose from industry-specific security configurations tailored for different use cases and compliance requirements.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-slate-600/40">
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white/80 dark:bg-slate-700/80 border border-gray-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 dark:focus:border-purple-400 transition-all duration-200"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-600'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map((template) => (
          <div
            key={template.id}
            className="group bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-slate-600/40 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            {/* Template Header */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${template.color} rounded-xl flex items-center justify-center shadow-lg text-white text-xl`}>
                {template.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white">{template.name}</h3>
                <p className="text-sm text-gray-500 dark:text-slate-400">{template.useCase}</p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-600 dark:text-slate-300 mb-4">
              {template.description}
            </p>

            {/* Features */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Key Features:</h4>
              <ul className="space-y-1">
                {template.features.map((feature, index) => (
                  <li key={index} className="text-xs text-gray-600 dark:text-slate-400 flex items-center gap-2">
                    <svg className="w-3 h-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-4">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-slate-400 text-xs rounded-lg"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Button */}
            <button
              onClick={() => onTemplateSelect(template.config)}
              className={`w-full px-4 py-3 bg-gradient-to-r ${template.color} text-white rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group-hover:shadow-2xl`}
            >
              Use This Template
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 mx-auto bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-slate-300 mb-2">No templates found</h3>
          <p className="text-gray-500 dark:text-slate-400">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-2xl p-6">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Template Customization</h4>
            <p className="text-sm text-blue-800 dark:text-blue-200">
              These templates provide starting points based on industry best practices. You can customize any template 
              after selection to match your specific requirements. Consider your compliance needs, third-party integrations, 
              and user experience requirements when making adjustments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 