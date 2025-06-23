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
console.log('1. 📚 Use as Library - Secure my existing Next.js project');
console.log('2. 🎨 Configure Settings - Set up custom security configuration');
console.log('3. ⚡ Quick Setup - Generate middleware with templates');
console.log('');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (prompt) => new Promise((resolve) => {
  rl.question(prompt, resolve);
});

async function postInstall() {
  try {
    const choice = await question('Select an option (1-3): ');
    
    console.log('');
    
    switch (choice.trim()) {
      case '1':
        console.log('📚 Library Usage - Secure Your Next.js Project');
        console.log('==============================================');
        console.log('');
        console.log('Create middleware.ts in your project root:');
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
        console.log('🚀 That\'s it! Your Next.js app is now secured with:');
        console.log('   • Content Security Policy');
        console.log('   • HTTPS enforcement');
        console.log('   • Clickjacking protection');
        console.log('   • XSS protection');
        console.log('   • And more security headers');
        console.log('');
        console.log('💡 Need custom configuration? Run:');
        console.log('   npx websecure-ez console    # Terminal configuration');
        console.log('   npx websecure-ez visual     # Web interface');
        break;
        
      case '2':
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
        console.log('📋 Templates:');
        console.log('   npx websecure-ez templates      # List available');
        console.log('   npx websecure-ez template saas  # Generate from template');
        break;
        
      case '3':
        console.log('⚡ Quick Template Setup');
        console.log('======================');
        console.log('');
        console.log('Available industry-specific templates:');
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
        break;
        
      default:
        console.log('ℹ️  No problem! You can always configure later:');
        console.log('');
        console.log('📚 Basic usage: Create middleware.ts with:');
        console.log('   import { createSecureMiddleware } from \'websecure-ez\';');
        console.log('   export default createSecureMiddleware();');
        console.log('');
        console.log('🔧 Configuration:');
        console.log('   npx websecure-ez console  # Terminal setup');
        console.log('   npx websecure-ez visual   # Web interface');
        console.log('   npx websecure-ez help     # All commands');
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
    console.log('');
  } finally {
    rl.close();
  }
}

postInstall(); 