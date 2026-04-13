# Founder Forge Nation - Pre-Incubation Platform

A premium pre-incubation program designed to transform student founders into venture-backed entrepreneurs.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ ([install with nvm](https://github.com/nvm-sh/nvm))
- npm or bun

### Installation

```bash
# Clone the repository
git clone <YOUR_GIT_URL>
cd founder-forge-nation

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui + Radix UI
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **Routing**: React Router v6
- **Testing**: Vitest + Playwright

## 📦 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm test             # Run unit tests
npm run test:watch   # Run tests in watch mode
```

## 🏗️ Project Structure

```
src/
├── components/       # React components
│   ├── ui/          # shadcn/ui components
│   └── ...          # Feature components
├── pages/           # Page components
├── lib/             # Utilities and helpers
├── hooks/           # Custom React hooks
└── assets/          # Static assets
```

## 🌐 Deployment

Build the project for production:

```bash
npm run build
```

The optimized files will be in the `dist/` directory, ready for deployment to any static hosting service (Vercel, Netlify, etc.).
