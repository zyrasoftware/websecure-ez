import { NextRequest, NextResponse } from 'next/server';

export interface WebSecureConfig {
  contentSecurityPolicy?: {
    enabled: boolean;
    directives?: {
      defaultSrc?: string[];
      scriptSrc?: string[];
      styleSrc?: string[];
      imgSrc?: string[];
      connectSrc?: string[];
      fontSrc?: string[];
      objectSrc?: string[];
      mediaSrc?: string[];
      frameSrc?: string[];
      childSrc?: string[];
      workerSrc?: string[];
      manifestSrc?: string[];
      formAction?: string[];
      frameAncestors?: string[];
      baseUri?: string[];
      upgradeInsecureRequests?: boolean;
      blockAllMixedContent?: boolean;
    };
    reportOnly?: boolean;
    reportUri?: string;
  };
  xFrameOptions?: {
    enabled: boolean;
    option?: 'DENY' | 'SAMEORIGIN' | string; // Allow custom values for allow-from
  };
  secureCookies?: {
    enabled: boolean;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'Strict' | 'Lax' | 'None';
  };
  referrerPolicy?: {
    enabled: boolean;
    policy?: 'no-referrer' | 'no-referrer-when-downgrade' | 'origin' | 'origin-when-cross-origin' | 'same-origin' | 'strict-origin' | 'strict-origin-when-cross-origin' | 'unsafe-url';
  };
  permissionsPolicy?: {
    enabled: boolean;
    features?: Record<string, string | string[]>;
  };
  xContentTypeOptions?: {
    enabled: boolean;
  };
  xssProtection?: {
    enabled: boolean;
    mode?: 'block' | 'report';
    reportUri?: string;
  };
  hsts?: {
    enabled: boolean;
    maxAge?: number;
    includeSubDomains?: boolean;
    preload?: boolean;
  };
  expectCt?: {
    enabled: boolean;
    maxAge?: number;
    enforce?: boolean;
    reportUri?: string;
  };
  crossOriginEmbedderPolicy?: {
    enabled: boolean;
    policy?: 'unsafe-none' | 'require-corp';
  };
  crossOriginOpenerPolicy?: {
    enabled: boolean;
    policy?: 'unsafe-none' | 'same-origin-allow-popups' | 'same-origin';
  };
  crossOriginResourcePolicy?: {
    enabled: boolean;
    policy?: 'same-site' | 'same-origin' | 'cross-origin';
  };
}

const defaultConfig: WebSecureConfig = {
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
      childSrc: ["'self'"],
      workerSrc: ["'self'"],
      manifestSrc: ["'self'"],
      formAction: ["'self'"],
      frameAncestors: ["'none'"],
      baseUri: ["'self'"],
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
      'payment': "'none'",
      'usb': "'none'",
      'vr': "'none'",
      'magnetometer': "'none'",
      'gyroscope': "'none'",
      'speaker': "'none'",
      'vibrate': "'none'",
    },
  },
  xContentTypeOptions: {
    enabled: true,
  },
  xssProtection: {
    enabled: true,
    mode: 'block',
  },
  hsts: {
    enabled: true,
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  expectCt: {
    enabled: false,
    maxAge: 86400, // 24 hours
    enforce: false,
  },
  crossOriginEmbedderPolicy: {
    enabled: false,
    policy: 'unsafe-none',
  },
  crossOriginOpenerPolicy: {
    enabled: false,
    policy: 'same-origin-allow-popups',
  },
  crossOriginResourcePolicy: {
    enabled: false,
    policy: 'same-site',
  },
};

export function createSecureMiddleware(config: Partial<WebSecureConfig> = {}) {
  // Merge with default config
  const mergedConfig: WebSecureConfig = {
    contentSecurityPolicy: {
      enabled: config.contentSecurityPolicy?.enabled ?? defaultConfig.contentSecurityPolicy?.enabled ?? false,
      ...defaultConfig.contentSecurityPolicy,
      ...config.contentSecurityPolicy,
      directives: {
        ...defaultConfig.contentSecurityPolicy?.directives,
        ...config.contentSecurityPolicy?.directives,
      },
    },
    xFrameOptions: {
      enabled: config.xFrameOptions?.enabled ?? defaultConfig.xFrameOptions?.enabled ?? false,
      ...defaultConfig.xFrameOptions,
      ...config.xFrameOptions,
    },
    secureCookies: {
      enabled: config.secureCookies?.enabled ?? defaultConfig.secureCookies?.enabled ?? false,
      ...defaultConfig.secureCookies,
      ...config.secureCookies,
    },
    referrerPolicy: {
      enabled: config.referrerPolicy?.enabled ?? defaultConfig.referrerPolicy?.enabled ?? false,
      ...defaultConfig.referrerPolicy,
      ...config.referrerPolicy,
    },
    permissionsPolicy: {
      enabled: config.permissionsPolicy?.enabled ?? defaultConfig.permissionsPolicy?.enabled ?? false,
      ...defaultConfig.permissionsPolicy,
      ...config.permissionsPolicy,
      features: {
        ...defaultConfig.permissionsPolicy?.features,
        ...config.permissionsPolicy?.features,
      },
    },
    xContentTypeOptions: {
      enabled: config.xContentTypeOptions?.enabled ?? defaultConfig.xContentTypeOptions?.enabled ?? false,
      ...defaultConfig.xContentTypeOptions,
      ...config.xContentTypeOptions,
    },
    xssProtection: {
      enabled: config.xssProtection?.enabled ?? defaultConfig.xssProtection?.enabled ?? false,
      ...defaultConfig.xssProtection,
      ...config.xssProtection,
    },
    hsts: {
      enabled: config.hsts?.enabled ?? defaultConfig.hsts?.enabled ?? false,
      ...defaultConfig.hsts,
      ...config.hsts,
    },
    expectCt: {
      enabled: config.expectCt?.enabled ?? defaultConfig.expectCt?.enabled ?? false,
      ...defaultConfig.expectCt,
      ...config.expectCt,
    },
    crossOriginEmbedderPolicy: {
      enabled: config.crossOriginEmbedderPolicy?.enabled ?? defaultConfig.crossOriginEmbedderPolicy?.enabled ?? false,
      ...defaultConfig.crossOriginEmbedderPolicy,
      ...config.crossOriginEmbedderPolicy,
    },
    crossOriginOpenerPolicy: {
      enabled: config.crossOriginOpenerPolicy?.enabled ?? defaultConfig.crossOriginOpenerPolicy?.enabled ?? false,
      ...defaultConfig.crossOriginOpenerPolicy,
      ...config.crossOriginOpenerPolicy,
    },
    crossOriginResourcePolicy: {
      enabled: config.crossOriginResourcePolicy?.enabled ?? defaultConfig.crossOriginResourcePolicy?.enabled ?? false,
      ...defaultConfig.crossOriginResourcePolicy,
      ...config.crossOriginResourcePolicy,
    },
  };

  return function middleware(request: NextRequest) {
    const response = NextResponse.next();
    const headers = response.headers;

    // Apply Content-Security-Policy
    if (mergedConfig.contentSecurityPolicy?.enabled) {
      const directives = mergedConfig.contentSecurityPolicy.directives;
      if (directives) {
        const cspParts: string[] = [];
        
        Object.entries(directives).forEach(([key, value]) => {
          if (key === 'upgradeInsecureRequests' && value === true) {
            cspParts.push('upgrade-insecure-requests');
          } else if (key === 'blockAllMixedContent' && value === true) {
            cspParts.push('block-all-mixed-content');
          } else if (Array.isArray(value) && value.length > 0) {
            // Convert camelCase to kebab-case
            const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
            cspParts.push(`${kebabKey} ${value.join(' ')}`);
          }
        });

        if (cspParts.length > 0) {
          const cspValue = cspParts.join('; ');
          const headerName = mergedConfig.contentSecurityPolicy.reportOnly 
            ? 'Content-Security-Policy-Report-Only' 
            : 'Content-Security-Policy';
          headers.set(headerName, cspValue);
        }
      }
    }

    // Apply X-Frame-Options
    if (mergedConfig.xFrameOptions?.enabled && mergedConfig.xFrameOptions.option) {
      headers.set('X-Frame-Options', mergedConfig.xFrameOptions.option);
    }

    // Apply Referrer-Policy
    if (mergedConfig.referrerPolicy?.enabled && mergedConfig.referrerPolicy.policy) {
      headers.set('Referrer-Policy', mergedConfig.referrerPolicy.policy);
    }

    // Apply Permissions-Policy
    if (mergedConfig.permissionsPolicy?.enabled && mergedConfig.permissionsPolicy.features) {
      const features = mergedConfig.permissionsPolicy.features;
      const permissionsValue = Object.entries(features)
        .map(([feature, value]) => {
          if (Array.isArray(value)) {
            return `${feature}=(${value.join(' ')})`;
          }
          return `${feature}=${value}`;
        })
        .join(', ');

      if (permissionsValue) {
        headers.set('Permissions-Policy', permissionsValue);
      }
    }

    // Apply X-Content-Type-Options
    if (mergedConfig.xContentTypeOptions?.enabled) {
      headers.set('X-Content-Type-Options', 'nosniff');
    }

    // Apply X-XSS-Protection
    if (mergedConfig.xssProtection?.enabled) {
      const mode = mergedConfig.xssProtection.mode || 'block';
      let xssValue = '1';
      if (mode === 'block') {
        xssValue += '; mode=block';
      } else if (mode === 'report' && mergedConfig.xssProtection.reportUri) {
        xssValue += `; report=${mergedConfig.xssProtection.reportUri}`;
      }
      headers.set('X-XSS-Protection', xssValue);
    }

    // Apply HSTS (HTTP Strict Transport Security)
    if (mergedConfig.hsts?.enabled && request.nextUrl.protocol === 'https:') {
      let hstsValue = `max-age=${mergedConfig.hsts.maxAge || 31536000}`;
      if (mergedConfig.hsts.includeSubDomains) {
        hstsValue += '; includeSubDomains';
      }
      if (mergedConfig.hsts.preload) {
        hstsValue += '; preload';
      }
      headers.set('Strict-Transport-Security', hstsValue);
    }

    // Apply Expect-CT
    if (mergedConfig.expectCt?.enabled) {
      let expectCtValue = `max-age=${mergedConfig.expectCt.maxAge || 86400}`;
      if (mergedConfig.expectCt.enforce) {
        expectCtValue += ', enforce';
      }
      if (mergedConfig.expectCt.reportUri) {
        expectCtValue += `, report-uri="${mergedConfig.expectCt.reportUri}"`;
      }
      headers.set('Expect-CT', expectCtValue);
    }

    // Apply Cross-Origin-Embedder-Policy
    if (mergedConfig.crossOriginEmbedderPolicy?.enabled) {
      headers.set('Cross-Origin-Embedder-Policy', mergedConfig.crossOriginEmbedderPolicy.policy || 'unsafe-none');
    }

    // Apply Cross-Origin-Opener-Policy
    if (mergedConfig.crossOriginOpenerPolicy?.enabled) {
      headers.set('Cross-Origin-Opener-Policy', mergedConfig.crossOriginOpenerPolicy.policy || 'same-origin-allow-popups');
    }

    // Apply Cross-Origin-Resource-Policy
    if (mergedConfig.crossOriginResourcePolicy?.enabled) {
      headers.set('Cross-Origin-Resource-Policy', mergedConfig.crossOriginResourcePolicy.policy || 'same-site');
    }

    return response;
  };
}

export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') {
    throw new Error('Input must be a string');
  }
  
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;');
}

export interface CookieOptions {
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
  maxAge?: number;
  path?: string;
  domain?: string;
  expires?: Date;
  [key: string]: unknown;
}

export function applyCookieDefaults(options: CookieOptions = {}): CookieOptions {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    ...options,
  };
}

// Utility function to generate nonce for CSP
export function generateNonce(): string {
  const buffer = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    crypto.getRandomValues(buffer);
  } else {
    // Fallback for environments without crypto.getRandomValues
    for (let i = 0; i < buffer.length; i++) {
      buffer[i] = Math.floor(Math.random() * 256);
    }
  }
  return btoa(String.fromCharCode(...buffer));
}

// Preset configurations for common use cases
export const presets = {
  strict: {
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
        mediaSrc: ["'none'"],
        frameSrc: ["'none'"],
        frameAncestors: ["'none'"],
        baseUri: ["'self'"],
        upgradeInsecureRequests: true,
      },
    },
    xFrameOptions: { enabled: true, option: 'DENY' },
    hsts: { enabled: true, maxAge: 31536000, includeSubDomains: true, preload: true },
    xContentTypeOptions: { enabled: true },
    referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' },
  } as Partial<WebSecureConfig>,
  
  moderate: {
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
        upgradeInsecureRequests: true,
      },
    },
    xFrameOptions: { enabled: true, option: 'SAMEORIGIN' },
    hsts: { enabled: true, maxAge: 31536000 },
    xContentTypeOptions: { enabled: true },
    referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' },
  } as Partial<WebSecureConfig>,
};

const websecureEz = {
  createSecureMiddleware,
  sanitizeInput,
  applyCookieDefaults,
  generateNonce,
  presets,
};

export default websecureEz;