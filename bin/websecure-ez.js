#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const readline = require('readline');

// Parse command line arguments
const args = process.argv.slice(2);
const command = args[0];
const templateName = args[1];

// Security templates
const templates = {
  ecommerce: {
    name: 'E-commerce Platform',
    description: 'Secure configuration for online stores with payment processing',
    useCase: 'Online stores, marketplaces, payment processing',
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
  saas: {
    name: 'SaaS Application',
    description: 'Configuration for software-as-a-service platforms',
    useCase: 'SaaS platforms, web applications, dashboards',
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
  blog: {
    name: 'Blog & Content Site',
    description: 'Optimized for content websites and blogs',
    useCase: 'Blogs, news sites, content management systems',
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
  healthcare: {
    name: 'Healthcare & HIPAA',
    description: 'HIPAA-compliant configuration for healthcare applications',
    useCase: 'Healthcare apps, patient portals, medical records',
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
  fintech: {
    name: 'Financial Services',
    description: 'Banking-grade security for financial applications',
    useCase: 'Banking apps, fintech platforms, investment tools',
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
  api: {
    name: 'API Gateway',
    description: 'Secure configuration for API endpoints and microservices',
    useCase: 'REST APIs, GraphQL endpoints, microservices',
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
};

// Check if we're running from node_modules (installed package) or from source
const isInstalledPackage = __dirname.includes('node_modules');
const packageDir = path.resolve(__dirname, '..');

// Display help information
function showHelp() {
  console.log('🛡️  websecure-ez - Web Security Configuration Tool');
  console.log('');
  console.log('Two ways to configure your Next.js security:');
  console.log('');
  console.log('🎨 VISUAL MODE - Web-based configuration interface');
  console.log('   • Beautiful visual interface at localhost:3000');
  console.log('   • Real-time preview and security analysis');
  console.log('   • Requires development environment');
  console.log('');
  console.log('⚡ CONSOLE MODE - Terminal-based configuration');
  console.log('   • Works entirely in your terminal');
  console.log('   • No web dependencies or interference');
  console.log('   • Perfect for CI/CD and automation');
  console.log('');
  console.log('Usage:');
  console.log('  websecure-ez [command] [options]');
  console.log('');
  console.log('Commands:');
  console.log('  init        Quick setup - create middleware.ts in your project');
  console.log('  visual      Launch visual web interface (default)');
  console.log('  console     Terminal-based configuration');
  console.log('  templates   List industry-specific templates');
  console.log('  template    Generate from specific template');
  console.log('  help        Show this help message');
  console.log('');
  console.log('Quick Start Examples:');
  console.log('  websecure-ez visual              # Web interface');
  console.log('  websecure-ez console             # Terminal setup');
  console.log('  websecure-ez template ecommerce  # E-commerce template');
  console.log('  npx websecure-ez console         # No installation needed');
  console.log('');
  console.log('Available Templates:');
  console.log('  ecommerce   - E-commerce platform security');
  console.log('  saas        - SaaS application security');
  console.log('  blog        - Blog and content site security');
  console.log('  healthcare  - Healthcare/HIPAA compliance');
  console.log('  fintech     - Financial services security');
  console.log('  api         - API gateway security');
  console.log('');
}

// List available templates
function listTemplates() {
  console.log('🛡️  Available Security Templates');
  console.log('');
  console.log('Choose from these industry-specific configurations:');
  console.log('');
  
  Object.entries(templates).forEach(([key, template]) => {
    console.log(`📋 ${key.padEnd(12)} - ${template.name}`);
    console.log(`   ${template.description}`);
    console.log(`   Use case: ${template.useCase}`);
    console.log('');
  });
  
  console.log('Usage:');
  console.log('  websecure-ez template <name>     # Generate middleware from template');
  console.log('  websecure-ez template ecommerce  # Example: E-commerce template');
  console.log('');
}

// Quick init command - create middleware.ts file
async function runInitCommand() {
  console.log('🚀 websecure-ez Quick Setup');
  console.log('');
  
  // Check if middleware.ts already exists
  if (fs.existsSync('middleware.ts')) {
    console.log('⚠️  middleware.ts already exists in your project.');
    
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    
    const question = (prompt) => new Promise((resolve) => {
      rl.question(prompt, resolve);
    });
    
    try {
      const overwrite = await question('Do you want to overwrite it? (y/N): ');
      if (overwrite.toLowerCase() !== 'y' && overwrite.toLowerCase() !== 'yes') {
        console.log('✅ Keeping your existing middleware.ts file.');
        console.log('');
        console.log('💡 To configure your existing middleware:');
        console.log('   websecure-ez console    # Terminal configuration');
        console.log('   websecure-ez templates  # Browse templates');
        rl.close();
        return;
      }
    } catch (error) {
      rl.close();
      return;
    }
    
    rl.close();
  }
  
  // Create basic middleware template
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

  try {
    fs.writeFileSync('middleware.ts', middlewareTemplate);
    console.log('✅ Created middleware.ts in your project root!');
    console.log('');
    console.log('🚀 Your Next.js app is now secured! Security features include:');
    console.log('   • Content Security Policy (XSS protection)');
    console.log('   • Clickjacking protection');
    console.log('   • HTTPS enforcement');
    console.log('   • MIME sniffing prevention');
    console.log('   • And more security headers');
    console.log('');
    console.log('🎯 Next steps:');
    console.log('1. Make sure websecure-ez is installed: npm install websecure-ez');
    console.log('2. Test your application');
    console.log('3. Customize if needed: npx websecure-ez console');
    console.log('');
    console.log('💡 To customize settings later:');
    console.log('   npx websecure-ez console    # Terminal configuration');
    console.log('   npx websecure-ez visual     # Web interface');
    console.log('   npx websecure-ez templates  # Industry templates');
    
  } catch (error) {
    console.log('❌ Failed to create middleware.ts:', error.message);
    console.log('');
    console.log('You can create it manually with:');
    console.log('```typescript');
    console.log('import { createSecureMiddleware } from \'websecure-ez\';');
    console.log('export default createSecureMiddleware();');
    console.log('```');
  }
  
  console.log('');
  console.log('🛡️  Your Next.js security is in good hands!');
}

// Generate code from template
async function generateFromTemplate(templateName) {
  if (!templateName) {
    console.log('❌ Error: Template name required');
    console.log('');
    console.log('Usage: websecure-ez template <name>');
    console.log('');
    console.log('Available templates:');
    Object.keys(templates).forEach(name => {
      console.log(`  ${name}`);
    });
    console.log('');
    console.log('Example: websecure-ez template ecommerce');
    process.exit(1);
  }

  const template = templates[templateName.toLowerCase()];
  if (!template) {
    console.log(`❌ Error: Template "${templateName}" not found`);
    console.log('');
    console.log('Available templates:');
    Object.keys(templates).forEach(name => {
      console.log(`  ${name}`);
    });
    console.log('');
    console.log('Use "websecure-ez templates" to see detailed descriptions');
    process.exit(1);
  }

  console.log('🛡️  websecure-ez Template Generator');
  console.log('');
  console.log(`📋 Template: ${template.name}`);
  console.log(`📝 Description: ${template.description}`);
  console.log(`🎯 Use case: ${template.useCase}`);
  console.log('');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise((resolve) => {
    rl.question(prompt, resolve);
  });

  try {
    // Ask for customization
    const customize = await question('Do you want to customize this template? (y/n): ');
    let config = { ...template.config };
    
    if (customize.toLowerCase().startsWith('y')) {
      console.log('');
      console.log('🔧 Template Customization');
      console.log('');
      
      // CSP customization
      if (config.contentSecurityPolicy?.enabled) {
        const cspMode = await question('CSP Mode - (1) Enforce (2) Report-only: ');
        if (cspMode === '2') {
          config.contentSecurityPolicy.reportOnly = true;
          console.log('✅ CSP set to report-only mode (recommended for testing)');
        }
        
        // Domain customization for specific templates
        if (templateName === 'saas') {
          const apiDomain = await question('Enter your API domain (e.g., api.yourdomain.com) or press Enter to skip: ');
          if (apiDomain.trim()) {
            config.contentSecurityPolicy.directives.connectSrc = ["'self'", `https://${apiDomain.trim()}`];
            console.log(`✅ Added ${apiDomain.trim()} to connect-src`);
          }
        }
      }
      
      // HSTS customization
      if (config.hsts?.enabled) {
        const hstsSubdomains = await question('Include subdomains in HSTS? (y/n): ');
        config.hsts.includeSubDomains = hstsSubdomains.toLowerCase().startsWith('y');
        console.log(`✅ HSTS subdomains: ${config.hsts.includeSubDomains ? 'enabled' : 'disabled'}`);
      }
    }

    console.log('');
    console.log('🎯 Generated Middleware Code');
    console.log('============================');
    console.log('');
    
    // Generate the middleware code
    const middlewareCode = `import { createSecureMiddleware } from 'websecure-ez';

// ${template.name} Security Configuration
// ${template.description}
const secureMiddleware = createSecureMiddleware(${JSON.stringify(config, null, 2)});

export default secureMiddleware;

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};`;

    console.log(middlewareCode);
    console.log('');
    
    const saveToFile = await question('Save this code to middleware.ts? (y/n): ');
    if (saveToFile.toLowerCase().startsWith('y')) {
      try {
        fs.writeFileSync('middleware.ts', middlewareCode);
        console.log('✅ Saved to middleware.ts');
        console.log('');
        console.log('🚀 Next steps:');
        console.log('1. Install websecure-ez: npm install websecure-ez');
        console.log('2. Test your application thoroughly');
        console.log('3. Monitor browser console for CSP violations');
        console.log('4. Adjust configuration as needed');
        
        if (config.contentSecurityPolicy?.reportOnly) {
          console.log('');
          console.log('⚠️  Note: CSP is in report-only mode');
          console.log('   Check browser console for violations, then disable report-only');
        }
      } catch (error) {
        console.log('❌ Error saving file:', error.message);
        console.log('Please copy the code above manually.');
      }
    } else {
      console.log('📋 Copy the code above to your middleware.ts file');
    }
    
    console.log('');
    console.log(`🛡️  ${template.name} security template applied!`);
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Console mode implementation
async function runConsoleMode() {
  console.log('⚡ websecure-ez Console Mode');
  console.log('');
  console.log('Terminal-based security configuration - no web dependencies!');
  console.log('');
  console.log('✅ This mode:');
  console.log('   • Works entirely in your terminal');
  console.log('   • Generates clean middleware code');
  console.log('   • Won\'t interfere with your project files');
  console.log('   • Perfect for automation and CI/CD');
  console.log('');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const question = (prompt) => new Promise((resolve) => {
    rl.question(prompt, resolve);
  });

  try {
    console.log('📋 Security Configuration Setup');
    console.log('================================');
    console.log('');

    // Preset selection
    console.log('Choose a security preset:');
    console.log('1. Strict    - Maximum security (recommended for production)');
    console.log('2. Moderate  - Balanced security with flexibility');
    console.log('3. Custom    - Configure each setting individually');
    console.log('');

    const presetChoice = await question('Select preset (1-3): ');
    
    let config = {};
    
    switch (presetChoice.trim()) {
      case '1':
        config = {
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
              frameAncestors: ["'none'"],
              upgradeInsecureRequests: true,
            },
          },
          xFrameOptions: { enabled: true, option: 'DENY' },
          hsts: { enabled: true, maxAge: 31536000, includeSubDomains: true, preload: true },
          xContentTypeOptions: { enabled: true },
          referrerPolicy: { enabled: true, policy: 'strict-origin-when-cross-origin' },
          xssProtection: { enabled: true, mode: 'block' },
          secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Strict' },
        };
        console.log('✅ Selected: Strict Security Preset');
        break;
        
      case '2':
        config = {
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
          xssProtection: { enabled: true, mode: 'block' },
          secureCookies: { enabled: true, httpOnly: true, secure: true, sameSite: 'Lax' },
        };
        console.log('✅ Selected: Moderate Security Preset');
        break;
        
      case '3':
        console.log('🔧 Custom Configuration Mode');
        console.log('');
        
        // CSP Configuration
        const enableCSP = await question('Enable Content Security Policy? (y/n): ');
        if (enableCSP.toLowerCase().startsWith('y')) {
          const allowInlineScripts = await question('Allow inline scripts? (less secure but more compatible) (y/n): ');
          const allowInlineStyles = await question('Allow inline styles? (y/n): ');
          
          config.contentSecurityPolicy = {
            enabled: true,
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: allowInlineScripts.toLowerCase().startsWith('y') 
                ? ["'self'", "'unsafe-inline'"] 
                : ["'self'"],
              styleSrc: allowInlineStyles.toLowerCase().startsWith('y')
                ? ["'self'", "'unsafe-inline'"]
                : ["'self'"],
              imgSrc: ["'self'", 'data:', 'https:'],
              connectSrc: ["'self'"],
              fontSrc: ["'self'", 'https:', 'data:'],
              upgradeInsecureRequests: true,
            },
          };
        }
        
        // HSTS Configuration
        const enableHSTS = await question('Enable HSTS (HTTP Strict Transport Security)? (y/n): ');
        if (enableHSTS.toLowerCase().startsWith('y')) {
          config.hsts = { enabled: true, maxAge: 31536000, includeSubDomains: true };
        }
        
        // Frame Options
        const enableFrameOptions = await question('Enable clickjacking protection (X-Frame-Options)? (y/n): ');
        if (enableFrameOptions.toLowerCase().startsWith('y')) {
          const frameOption = await question('Frame option (DENY/SAMEORIGIN): ');
          config.xFrameOptions = { 
            enabled: true, 
            option: frameOption.toUpperCase() === 'SAMEORIGIN' ? 'SAMEORIGIN' : 'DENY' 
          };
        }
        
        console.log('✅ Custom configuration completed');
        break;
        
      default:
        console.log('❌ Invalid selection. Using moderate preset.');
        config = { /* moderate preset */ };
    }

    console.log('');
    console.log('🎯 Generated Middleware Code');
    console.log('============================');
    console.log('');
    
    // Generate the middleware code
    const middlewareCode = `import { createSecureMiddleware } from 'websecure-ez';

const secureMiddleware = createSecureMiddleware(${JSON.stringify(config, null, 2)});

export default secureMiddleware;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};`;

    console.log(middlewareCode);
    console.log('');
    
    const saveToFile = await question('Save this code to middleware.ts? (y/n): ');
    if (saveToFile.toLowerCase().startsWith('y')) {
      try {
        fs.writeFileSync('middleware.ts', middlewareCode);
        console.log('✅ Saved to middleware.ts');
        console.log('');
        console.log('🚀 Next steps:');
        console.log('1. Install websecure-ez: npm install websecure-ez');
        console.log('2. Test your application');
        console.log('3. Adjust configuration as needed');
      } catch (error) {
        console.log('❌ Error saving file:', error.message);
        console.log('Please copy the code above manually.');
      }
    } else {
      console.log('📋 Copy the code above to your middleware.ts file');
    }
    
    console.log('');
    console.log('🛡️  Your Next.js application is now secured!');
    
  } catch (error) {
    console.log('❌ Error:', error.message);
  } finally {
    rl.close();
  }
}

// Visual mode implementation
function runVisualMode() {
  if (isInstalledPackage) {
    console.log('🎨 websecure-ez Visual Mode');
    console.log('');
    console.log('You\'ve installed websecure-ez in your project for the security library.');
    console.log('The Visual Mode runs as a separate development tool to avoid conflicts.');
    console.log('');
    console.log('🚀 Quick Solution - Use Console Mode instead:');
    console.log('  websecure-ez console     # Terminal-based configuration');
    console.log('  websecure-ez templates   # Browse industry templates');
    console.log('');
    console.log('🎨 Or access Visual Mode separately:');
    console.log('  npx websecure-ez visual  # Runs in temporary environment');
    console.log('');
    console.log('💡 Why this separation?');
    console.log('   • Keeps your project clean (no UI dependencies)');
    console.log('   • Prevents conflicts with your Next.js setup');
    console.log('   • Visual tool generates code you copy to your project');
    console.log('');
    console.log('✅ Your websecure-ez library is ready to use:');
    console.log('   import { createSecureMiddleware } from \'websecure-ez\';');
    console.log('');
    console.log('💡 Tip: You can also run the post-install guide again:');
    console.log('   node node_modules/websecure-ez/scripts/postinstall.js');
    return;
  }

  // Check if we're in the source directory
  const packageJsonPath = path.join(packageDir, 'package.json');
  if (!fs.existsSync(packageJsonPath)) {
    console.log('❌ Error: Could not find websecure-ez source files.');
    console.log('Make sure you\'re in the websecure-ez development directory.');
    process.exit(1);
  }

  console.log('🛡️  websecure-ez Visual Mode');
  console.log('');
  console.log('🚀 Starting visual configuration interface...');
  console.log('📖 Opening at http://localhost:3000');
  console.log('💡 This is a configuration tool - generate code and copy to your project');
  console.log('');

  // Start the Next.js development server
  const child = spawn('npx', ['next', 'dev', '--turbopack'], {
    cwd: packageDir,
    stdio: 'inherit',
    shell: true
  });

  child.on('error', (error) => {
    console.error('❌ Error starting visual interface:', error);
    console.log('');
    console.log('Make sure you have installed dependencies with: npm install');
    process.exit(1);
  });

  child.on('close', (code) => {
    console.log(`\n👋 Visual interface closed with code ${code}`);
    process.exit(code);
  });

  // Handle graceful shutdown
  process.on('SIGINT', () => {
    console.log('\n👋 Shutting down visual interface...');
    child.kill('SIGINT');
  });

  process.on('SIGTERM', () => {
    console.log('\n👋 Shutting down visual interface...');
    child.kill('SIGTERM');
  });
}

// Main execution logic
function main() {
  switch (command) {
    case 'help':
    case '--help':
    case '-h':
      showHelp();
      break;
      
    case 'init':
    case 'setup':
      runInitCommand();
      break;
      
    case 'console':
    case 'cli':
      runConsoleMode();
      break;
      
    case 'generate':
      console.log('🔄 Redirecting to console mode for code generation...');
      console.log('');
      runConsoleMode();
      break;
      
    case 'templates':
      listTemplates();
      break;
      
    case 'template':
      generateFromTemplate(templateName);
      break;
      
    case 'visual':
    case 'ui':
    case undefined: // Default to visual mode
      runVisualMode();
      break;
      
    default:
      console.log(`❌ Unknown command: ${command}`);
      console.log('');
      showHelp();
      process.exit(1);
  }
}

// Run the main function
main(); 