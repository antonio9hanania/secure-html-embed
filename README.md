# 🔒 Secure HTML Embed Generator

A Next.js application that generates production-ready secure HTML embeds with complete XSS protection and responsive iframe capabilities.

## ✨ Features

- **🛡️ Complete XSS Protection** - Sandboxed iframes with CSP headers
- **📏 Responsive Embeds** - Auto-resizing iframes with custom resizer
- **🎯 TinyMCE Compatible** - Works in any CMS or content editor
- **🚀 Next.js Ready** - Production-ready components and hooks
- **🌍 Hebrew/RTL Support** - Full internationalization support
- **📊 Complex Examples** - Chart.js demo with interactive features
- **🆓 Completely Free** - No commercial dependencies

## 🚀 Live Demo

Visit the live demo: [https://antonio9hanania.github.io/secure-html-embed](https://antonio9hanania.github.io/secure-html-embed)

## 🏗️ How It Works

### Step 1: Generate Embed Code

- Input raw HTML/CSS/JavaScript code
- Choose fixed height or responsive mode
- Get TinyMCE-compatible embed code
- Preview with live demo

### Step 2: Backend Processing

- Extract iframe src from Step 1
- Generate clean JSON structure
- Ready for database storage

### Step 3: Next.js Implementation

- Use responsive iframe hook
- Render with complete security
- Auto-height functionality

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/antoio9hanania/secure-html-embed.git
cd secure-html-embed

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```
