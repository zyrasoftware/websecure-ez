# Contributing to websecure-ez

Thank you for considering contributing to websecure-ez! We welcome contributions from everyone.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Development Setup

1. **Fork and clone the repository**
   ```bash
   git clone https://github.com/zyrasoftware/websecure-ez.git
   cd websecure-ez
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the configuration interface.

## 🏗️ Project Structure

```
websecure-ez/
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── page.tsx        # Main configuration interface
│   │   ├── layout.tsx      # App layout
│   │   └── globals.css     # Global styles
│   ├── components/         # Reusable React components
│   │   ├── SecurityForm.tsx    # Security configuration form
│   │   ├── CodePreview.tsx     # Generated code display
│   │   ├── PresetSelector.tsx  # Security presets
│   │   ├── SecurityAnalyzer.tsx # Security analysis
│   │   └── ThemeToggle.tsx     # Dark/light mode toggle
│   ├── lib/                # Core library code
│   │   ├── index.ts        # Public API exports
│   │   └── websecure-ez.ts # Main security middleware
│   └── middleware.ts       # Next.js middleware
├── bin/
│   └── websecure-ez.js     # CLI script
├── public/                 # Static assets
└── docs/                   # Documentation
```

## 🎯 How to Contribute

### 1. Security Features

We're always looking to add more security headers and features:

- **New Security Headers**: Add support for emerging security standards
- **Browser Compatibility**: Improve support for different browsers
- **Security Analysis**: Enhance the security analyzer with more checks

### 2. UI/UX Improvements

Help make the configuration interface even better:

- **Design Enhancements**: Improve the visual design and user experience
- **Accessibility**: Make the interface more accessible
- **Mobile Responsiveness**: Optimize for mobile devices
- **Animation and Interactions**: Add smooth animations and better interactions

### 3. Documentation

Good documentation is crucial:

- **Code Examples**: Add more practical examples
- **Tutorials**: Create step-by-step guides
- **API Documentation**: Improve API documentation
- **Video Tutorials**: Create video guides

### 4. Testing

Help us maintain quality:

- **Unit Tests**: Add tests for components and functions
- **Integration Tests**: Test the middleware with different configurations
- **Browser Testing**: Test across different browsers
- **Performance Testing**: Ensure the library is performant

## 📝 Development Guidelines

### Code Style

We use ESLint and Prettier for code formatting:

```bash
npm run lint        # Check for linting issues
npm run lint:fix    # Automatically fix linting issues
```

### TypeScript

- Use TypeScript for all new code
- Ensure proper type definitions
- Avoid `any` types when possible

### React Components

- Use functional components with hooks
- Follow React best practices
- Keep components focused and reusable
- Use proper prop types

### Security Library

- Follow security best practices
- Document security implications
- Add comprehensive tests for security features
- Ensure backwards compatibility

## 🧪 Testing

Run the test suite:

```bash
npm test           # Run all tests
npm test:watch     # Run tests in watch mode
npm test:coverage  # Run tests with coverage
```

Before submitting a PR, ensure:
- All tests pass
- Code coverage is maintained
- No linting errors
- TypeScript compiles without errors

## 📋 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test your changes**
   ```bash
   npm test
   npm run lint
   npm run build
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Use a clear, descriptive title
   - Describe what your PR does
   - Link any related issues
   - Add screenshots for UI changes

### Commit Message Format

We follow conventional commits:

- `feat:` - New features
- `fix:` - Bug fixes
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Clear description** of the problem
2. **Steps to reproduce** the issue
3. **Expected behavior** vs actual behavior
4. **Environment details** (OS, browser, Node.js version)
5. **Screenshots** if applicable
6. **Code examples** that demonstrate the issue

## 💡 Feature Requests

We welcome feature requests! Please:

1. Check if the feature already exists or is planned
2. Describe the use case clearly
3. Explain why this feature would be valuable
4. Provide examples if possible

## 🎉 Recognition

Contributors will be:

- Added to the README contributors section
- Mentioned in release notes
- Invited to join our Discord community
- Eligible for contributor swag (if available)

## 🤝 Code of Conduct

This project follows the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). By participating, you're expected to uphold this code.

## 📞 Getting Help

Need help? Here are your options:

- 💬 [GitHub Discussions](https://github.com/zyrasoftware/websecure-ez/discussions)
- 🐛 [GitHub Issues](https://github.com/zyrasoftware/websecure-ez/issues)
- 💌 Email: contribute@websecure-ez.dev
- 🗨️ Discord: [Join our community](https://discord.gg/websecure-ez)

## 🎯 Priority Areas

We're currently focusing on:

1. **Mobile Responsiveness** - Making the interface work great on mobile
2. **Security Presets** - Adding more predefined security configurations
3. **Export/Import** - Allowing users to save and share configurations
4. **Integration Examples** - More examples with popular frameworks
5. **Performance** - Optimizing the configuration interface

Thank you for contributing to websecure-ez! 🛡️✨ 