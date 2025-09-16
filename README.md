## ATM Simulator (React + TypeScript)

An elegant ATM simulator built with React and TypeScript. Perform login, view balance, withdraw, deposit, and review recent transactions with a modern, responsive UI.

- **Live Demo**: [atmsimul.netlify.app](https://atmsimul.netlify.app/)  

### Tech Stack
- **Framework**: React 18 (with Hooks)
- **Language**: TypeScript 5
- **Bundler/Dev Server**: Vite 5
- **Styling**: Tailwind CSS 3, PostCSS, Autoprefixer
- **Icons**: lucide-react
- **Linting**: ESLint 9, eslint-plugin-react-hooks, eslint-plugin-react-refresh, @eslint/js
- **Types**: @types/react, @types/react-dom
- **Optional SDK present**: @supabase/supabase-js (not required to run the demo)

### Features
- Login with account number and 4-digit PIN
- Main menu for ATM actions
- Balance inquiry with timestamped transaction log
- Withdraw and deposit with validation and minimum balance enforcement
- Printable-like statement view of recent transactions
- Virtual numeric keypad for PIN entry
- Demo accounts pre-seeded and persisted to `localStorage`

### Demo Accounts
Use any of the following to try the app immediately:
- Account: `1234567890`, PIN: `1234`
- Account: `0987654321`, PIN: `5678`

### Getting Started

Prerequisites:
- Node.js 18+ and npm

Install dependencies:
```bash
npm install
```

Start the dev server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

### Scripts (from package.json)
- `dev`: Start Vite dev server
- `build`: Build with Vite
- `lint`: Run ESLint
- `preview`: Preview the production build

### Project Structure
```text
project/
├─ src/
│  ├─ components/
│  │  ├─ LoginScreen.tsx
│  │  ├─ MainMenu.tsx
│  │  ├─ BalanceScreen.tsx
│  │  ├─ TransactionScreen.tsx
│  │  └─ StatementScreen.tsx
│  ├─ services/
│  │  └─ atmService.ts
│  ├─ types/
│  │  └─ account.ts
│  ├─ App.tsx
│  ├─ main.tsx
│  └─ index.css
├─ index.html
├─ tailwind.config.js
├─ postcss.config.js
├─ tsconfig.json
├─ tsconfig.app.json
├─ tsconfig.node.json
├─ vite.config.ts
└─ eslint.config.js
```

### How It Works (Brief)
- `src/services/atmService.ts` seeds demo accounts, stores data in `localStorage`, and exposes methods for login, balance checks, deposits, withdrawals, and fetching transaction history.
- UI components in `src/components/` orchestrate flow from login to main menu and individual operations.
- TailwindCSS styles provide a compact, responsive UI suitable for small screens.

### Environment & Deployment
- No environment variables are required for the demo.
- Can be deployed to any static host (e.g., Netlify, Vercel, GitHub Pages).
- For Netlify: build command `npm run build`, publish directory `dist`.

### License
MIT


