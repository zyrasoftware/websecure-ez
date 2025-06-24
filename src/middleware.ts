import { createSecureMiddleware } from 'websecure-ez';

// Import the middleware from websecure-ez
const secureMiddleware = createSecureMiddleware({
  // Configuration can be customized here
  contentSecurityPolicy: {
    enabled: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
      fontSrc: ["'self'", 'https://fonts.gstatic.com'],
      imgSrc: ["'self'", 'data:'],
      connectSrc: ["'self'"],
    },
  },
  xFrameOptions: {
    enabled: true,
    option: 'DENY',
  },
  // Other security features...
});

export default secureMiddleware;

// Optionally specify which paths the middleware should run on
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};