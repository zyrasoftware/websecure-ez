**The ultimate web security configuration tool and library for Next.js applications.** Protect your applications against XSS, clickjacking, CSRF, and other common web vulnerabilities with just a few lines of code.

## 🎯 What is websecure-ez?

websecure-ez is **two things in one**:

1. **📚 A powerful security library** - Add comprehensive security headers to your Next.js app
2. **🎨 A visual configuration tool** - Configure security settings through an intuitive web interface

## 🚀 Quick Start

websecure-ez is **both a library and a configuration tool**. Here are the different ways to use it:

### 📦 For Library Users (Securing Your App)

If you want to **add security to your existing Next.js project**:

```bash
# Install in your project
npm install websecure-ez
```

Create `middleware.ts` in your project root:

```typescript
import { createSecureMiddleware } from 'websecure-ez';

const secureMiddleware = createSecureMiddleware();

export default secureMiddleware;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

**That's it!** Your app is now secured. The websecure-ez package only adds the security library - no extra files or scripts will interfere with your project.

### 🛠️ For Configuration (Setting Up Security)

If you want to **configure custom security settings**, use the CLI tools:

#### 🎨 Visual Mode (Web Interface)

Perfect for visual learners and comprehensive configuration:

```bash
# Use without installing (recommended)
npx websecure-ez visual

# Or install globally first
npm install -g websecure-ez
websecure-ez visual
```

This opens a beautiful web interface at `http://localhost:3000` where you can:
- ✨ Configure security settings with real-time preview
- 📊 Get instant security analysis and scoring
- 🎯 Choose from predefined security presets
- 💻 See generated middleware code update live
- 📋 Copy production-ready code to your project

### ⚡ Option 2: Console Mode (Terminal Interface)

Perfect for automation, CI/CD, and developers who prefer CLI:

```bash
# Install globally (recommended)
npm install -g websecure-ez
websecure-ez console

# Or run without installing
npx websecure-ez console
```

This runs entirely in your terminal and allows you to:
- 🚀 Quick setup with interactive prompts
- 🎯 Choose security presets (Strict/Moderate/Custom)
- ⚙️ Configure individual security features
- 💾 Auto-generate and save `middleware.ts` file
- 🔄 Perfect for scripting and automation

### 🎨 Option 2.5: Industry Templates (CLI)

Perfect for quick setup with industry-specific configurations:

```bash
# List all available templates
websecure-ez templates

# Generate from a specific template
websecure-ez template ecommerce
websecure-ez template saas
websecure-ez template healthcare

# Or run without installing
npx websecure-ez template fintech
```

Available templates:
- **🛒 ecommerce** - E-commerce platforms with payment processing (Stripe, PayPal)
- **💼 saas** - SaaS applications and web dashboards
- **📝 blog** - Content sites, blogs, and news platforms
- **🏥 healthcare** - HIPAA-compliant healthcare applications
- **💰 fintech** - Banking-grade security for financial services
- **🔌 api** - API gateways and microservices

Each template includes:
- ✅ Pre-configured security headers optimized for the industry
- 🎯 Appropriate CSP directives for common third-party services
- 🔒 Compliance-ready settings (HIPAA, PCI-DSS considerations)
- ⚙️ Optional customization prompts

### 📦 Option 3: Direct Library Usage

For developers who know exactly what they want:

```bash
npm install websecure-ez
```

Create `middleware.ts` in your project root:

```typescript
import { createSecureMiddleware } from 'websecure-ez';

// Use default secure configuration
const secureMiddleware = createSecureMiddleware();

export default secureMiddleware;

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
```

## ✨ Features

### 🛡️ Comprehensive Security Headers
- **Content Security Policy (CSP)** - Prevent XSS attacks with fine-grained control
- **HTTP Strict Transport Security (HSTS)** - Enforce HTTPS connections
- **X-Frame-Options** - Block clickjacking attempts
- **Permissions Policy** - Control browser feature access
- **X-Content-Type-Options** - Prevent MIME-sniffing attacks
- **X-XSS-Protection** - Enable browser XSS filtering
- **Referrer Policy** - Control referrer information leakage
- **Cross-Origin Policies** - Configure CORS and isolation policies

### 🎨 Visual Configuration Interface
- **Real-time Security Analysis** - Get instant feedback on your configuration
- **Security Score Dashboard** - See your security posture at a glance
- **Preset Configurations** - Choose from Strict, Balanced, or Basic security levels
- **Live Code Generation** - See your middleware code update in real-time
- **Dark/Light Mode** - Beautiful interface that adapts to your preference

### 🔧 Developer Experience
- **🚀 TypeScript Support** - Fully typed for better development experience
- **📦 Zero Dependencies** - Lightweight and fast
- **🎯 Next.js Optimized** - Built specifically for Next.js middleware
- **📚 Comprehensive Documentation** - Clear examples and guides

## 📖 Configuration Options

### Security Presets

**Strict Security** 🔒
- Maximum security for production applications
- Blocks most external resources
- Strictest cookie and frame policies

**Balanced Security** ⚖️  
- Good security with development flexibility
- Allows common external resources (fonts, CDNs)
- Balanced policies for most applications

**Basic Security** 🛡️
- Essential protections only
- Permissive for development
- Good starting point for new projects

### Custom Configuration

```typescript
import { createSecureMiddleware } from 'websecure-ez';

const secureMiddleware = createSecureMiddleware({
  contentSecurityPolicy: {
    enabled: true,
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'"],
      upgradeInsecureRequests: true,
    },
    reportOnly: false, // Set to true for testing
  },
  hsts: {
    enabled: true,
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true,
  },
  xFrameOptions: {
    enabled: true,
    option: 'DENY', // or 'SAMEORIGIN'
  },
  permissionsPolicy: {
    enabled: true,
    features: {
      camera: "'none'",
      microphone: "'none'",
      geolocation: "'none'",
      payment: "'none'",
    },
  },
  secureCookies: {
    enabled: true,
    httpOnly: true,
    secure: true,
    sameSite: 'Strict',
  },
});

export default secureMiddleware;
```

## 🔧 Utility Functions

### Input Sanitization

```typescript
import { sanitizeInput } from 'websecure-ez';

const userInput = '<script>alert("xss")</script>';
const safeInput = sanitizeInput(userInput);
// Output: '&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'
```

### Secure Cookie Defaults

```typescript
import { applyCookieDefaults } from 'websecure-ez';

const cookieOptions = applyCookieDefaults({
  maxAge: 3600,
  path: '/',
});

// Use with your cookie library
response.cookies.set('session', token, cookieOptions);
```

### Nonce Generation

```typescript
import { generateNonce } from 'websecure-ez';

const nonce = generateNonce();
// Use in your CSP directive: script-src 'nonce-{nonce}'
```

## 🎯 Command Reference

### Global Installation Commands

```bash
# Install globally for easy access
npm install -g websecure-ez

# Visual mode (web interface)
websecure-ez visual
websecure-ez          # Default to visual mode

# Console mode (terminal interface)  
websecure-ez console
websecure-ez generate # Alias for console mode

# Template commands
websecure-ez templates              # List all templates
websecure-ez template <name>        # Generate from template
websecure-ez template ecommerce     # E-commerce template
websecure-ez template saas          # SaaS template
websecure-ez template healthcare    # Healthcare template

# Help
websecure-ez help
```

### NPX Commands (No Installation)

```bash
# Visual mode
npx websecure-ez visual

# Template generation
npx websecure-ez templates
npx websecure-ez template ecommerce
npx websecure-ez        # Default to visual mode

# Console mode
npx websecure-ez console
npx websecure-ez generate

# Help
npx websecure-ez help
```

### Development Commands (Source Code)

```bash
# If you cloned the repository
npm run dev      # Visual interface
npm run console  # Console mode
npm run visual   # Visual interface (alias)
npm run help     # Show help
```

## 🎯 Understanding the Modes

### When to Use Visual Mode 🎨
- **Learning**: First time setting up security
- **Exploration**: Want to see all available options
- **Analysis**: Need real-time security scoring
- **Comparison**: Testing different configurations

### When to Use Console Mode ⚡
- **Automation**: CI/CD pipelines and scripts
- **Speed**: Quick setup for new projects
- **Headless**: Server environments without GUI
- **Integration**: Part of larger toolchains

## 🚨 Important Notes

- **Configuration Tool vs Library**: The `npm run dev` command starts the configuration interface. To use the library in your project, install it as a dependency.
- **Testing**: Always test your configuration in development before deploying to production.
- **CSP Strictness**: Some CSP directives may break functionality if too restrictive - use report-only mode initially.
- **HTTPS Required**: HSTS headers only work on HTTPS connections.
- **Browser Compatibility**: Some headers may not be supported in older browsers.

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Support

- ⭐ Star this repo if you find it helpful
- 🐛 Report bugs in [Issues](https://github.com/zyrasoftware/websecure-ez/issues)
- 💡 Request features in [Discussions](https://github.com/zyrasoftware/websecure-ez/discussions)
- 📚 Read the [Documentation](https://websecure-ez.dev)

---

<div align="center">
  <strong>Built with ❤️ for secure web development</strong>
</div>
