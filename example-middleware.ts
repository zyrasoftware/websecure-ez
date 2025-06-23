import { createSecureMiddleware } from 'websecure-ez';

// Example: Basic security configuration
// Copy this code to your project's middleware.ts file after installing websecure-ez

const secureMiddleware = createSecureMiddleware({
  contentSecurityPolicy: {
    enabled: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      fontSrc: ["'self'", "https:", "data:"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: true,
    },
  },
  xFrameOptions: {
    enabled: true,
    option: 'DENY',
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

export default secureMiddleware;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

/* 
Usage Instructions:
1. Install: npm install websecure-ez
2. Copy this file to your project root as middleware.ts
3. Customize the configuration above to match your needs
4. Or use the CLI: npx websecure-ez console
5. Or use templates: npx websecure-ez template ecommerce

For more examples and configurations, visit:
https://github.com/zyrasoftware/websecure-ez
*/ 