#!/usr/bin/env node
/* eslint-disable */

const readline = require('readline');
const fs = require('fs');
const path = require('path');

// Check if we're being installed as a dependency (not in development)
const isInstallation = !process.env.npm_config_dev && !fs.existsSync(path.join(__dirname, '../src'));

if (!isInstallation) {
  // Skip post-install in development environment
  process.exit(0);
}

console.log('');
console.log('🛡️  Thank you for installing websecure-ez!');
console.log('');
console.log('What would you like to do?');
console.log('');
console.log('1. 🚀 Auto-Setup - Create middleware.ts file automatically');
console.log('2. 📚 Manual Setup - Show me the code to copy');
console.log('3. 🎨 Custom Config - Configure advanced settings');
console.log('4. ⚡ Templates - Use industry-specific templates');
console.log('5. ℹ️  Skip - I\'ll set it up later');
console.log('');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

// Middleware template
const middlewareTemplate = `import { createSecureMiddleware } from 'websecure-ez';

// Basic secure configuration for Next.js
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
🛡️ websecure-ez Security Middleware

This middleware automatically adds security headers to your Next.js app:
• Content Security Policy (CSP) - Prevents XSS attacks
• X-Frame-Options - Prevents clickjacking
• HSTS - Enforces HTTPS connections
• X-Content-Type-Options - Prevents MIME sniffing
• X-XSS-Protection - Browser XSS protection

To customize settings:
• Run: npx websecure-ez console
• Or visit: npx websecure-ez visual
• Templates: npx websecure-ez templates

Documentation: https://github.com/zyrasoftware/websecure-ez
*/`;

async function createMiddlewareFile() {
  const middlewarePath = path.join(process.cwd(), 'middleware.ts');
  
  if (fs.existsSync(middlewarePath)) {
    console.log('⚠️  middleware.ts already exists in your project.');
    const overwrite = await question('Do you want to overwrite it? (y/N): ');
    if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
      console.log('✅ Keeping your existing middleware.ts file.');
      return false;
    }
  }
  
  try {
    fs.writeFileSync(middlewarePath, middlewareTemplate);
    console.log('✅ Created middleware.ts in your project root!');
    console.log('');
    console.log('🚀 Your Next.js app is now secured! Security features include:');
    console.log('   • Content Security Policy (XSS protection)');
    console.log('   • Clickjacking protection');
    console.log('   • HTTPS enforcement');
    console.log('   • MIME sniffing prevention');
    console.log('   • And more security headers');
    console.log('');
    console.log('💡 To customize settings later:');
    console.log('   npx websecure-ez console    # Terminal configuration');
    console.log('   npx websecure-ez visual     # Web interface');
    return true;
  } catch (error) {
    console.log('❌ Failed to create middleware.ts:', error.message);
    console.log('');
    console.log('You can create it manually with the code shown in option 2.');
    return false;
  }
}

async function postInstall() {
  try {
    const choice = await question('Select an option (1-5): ');
    
    console.log('');
    
    switch (choice.trim()) {
      case '1':
        console.log('🚀 Auto-Setup - Creating middleware.ts');
        console.log('=====================================');
        console.log('');
        await createMiddlewareFile();
        break;
        
      case '2':
        console.log('📚 Manual Setup - Copy This Code');
        console.log('=================================');
        console.log('');
        console.log('Create middleware.ts in your project root with this content:');
        console.log('');
        console.log('```typescript');
        console.log('import { createSecureMiddleware } from \'websecure-ez\';');
        console.log('');
        console.log('const secureMiddleware = createSecureMiddleware();');
        console.log('');
        console.log('export default secureMiddleware;');
        console.log('');
        console.log('export const config = {');
        console.log('  matcher: [\'/((?!_next/static|_next/image|favicon.ico).*)\'],');
        console.log('};');
        console.log('```');
        console.log('');
        console.log('🚀 That\'s it! Your Next.js app will be secured with:');
        console.log('   • Content Security Policy');
        console.log('   • HTTPS enforcement');
        console.log('   • Clickjacking protection');
        console.log('   • XSS protection');
        console.log('   • And more security headers');
        break;
        
      case '3':
        console.log('🎨 Custom Configuration Options');
        console.log('===============================');
        console.log('');
        console.log('Choose your preferred configuration method:');
        console.log('');
        console.log('⚡ Console Mode (Recommended):');
        console.log('   npx websecure-ez console');
        console.log('   • Works entirely in terminal');
        console.log('   • No additional dependencies');
        console.log('   • Perfect for your current setup');
        console.log('');
        console.log('🎨 Visual Mode:');
        console.log('   npx websecure-ez visual');
        console.log('   • Beautiful web interface');
        console.log('   • Real-time preview');
        console.log('   • Runs separately from your project');
        console.log('');
        console.log('The configuration tools will generate middleware code');
        console.log('that you can copy into your middleware.ts file.');
        break;
        
      case '4':
        console.log('⚡ Industry Templates');
        console.log('====================');
        console.log('');
        console.log('Generate middleware from industry-specific templates:');
        console.log('');
        console.log('🛒 E-commerce:     npx websecure-ez template ecommerce');
        console.log('💼 SaaS:           npx websecure-ez template saas');
        console.log('📝 Blog/Content:   npx websecure-ez template blog');
        console.log('🏥 Healthcare:     npx websecure-ez template healthcare');
        console.log('💰 Fintech:        npx websecure-ez template fintech');
        console.log('🔌 API:            npx websecure-ez template api');
        console.log('');
        console.log('Or see all templates:');
        console.log('   npx websecure-ez templates');
        console.log('');
        console.log('Templates generate complete middleware.ts files');
        console.log('optimized for your specific industry needs.');
        break;
        
      case '5':
      default:
        console.log('ℹ️  No problem! websecure-ez is ready when you are.');
        console.log('');
        console.log('📚 Quick start:');
        console.log('   npx websecure-ez help     # See all commands');
        console.log('   npx websecure-ez console  # Terminal setup');
        console.log('   npx websecure-ez visual   # Web interface');
        console.log('');
        console.log('📖 Full example file available at:');
        console.log('   node_modules/websecure-ez/example-middleware.ts');
    }
    
    console.log('');
    console.log('📖 Documentation: https://github.com/zyrasoftware/websecure-ez');
    console.log('🛡️  Your Next.js security is in good hands!');
    console.log('');
    
  } catch {
    console.log('');
    console.log('ℹ️  websecure-ez is ready to use!');
    console.log('');
    console.log('Quick start: npx websecure-ez help');
    console.log('📖 Example: node_modules/websecure-ez/example-middleware.ts');
    console.log('');
  } finally {
    rl.close();
  }
}

postInstall(); 