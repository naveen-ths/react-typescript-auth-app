# React TypeScript Authentication App

A modern React TypeScript application with authentication features built using best practices and industry-standard libraries.

## 🚀 Features

- **Authentication System**: Complete login and registration with form validation
- **State Management**: Zustand for lightweight, scalable state management
- **Form Handling**: React Hook Form with Zod validation schemas
- **Routing**: React Router for navigation and protected routes
- **Styling**: Tailwind CSS for modern, responsive design
- **TypeScript**: Full type safety throughout the application
- **Accessibility**: ARIA labels, semantic HTML, and keyboard navigation
- **Performance**: Optimized with React best practices

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type safety and better DX
- **Zustand** - Lightweight state management
- **React Hook Form** - Performant form handling
- **Zod** - Schema validation
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first styling
- **Vite** - Fast build tool and dev server

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx      # Login component with validation
│   │   ├── RegisterForm.tsx   # Registration component
│   │   └── ProtectedRoute.tsx # Route protection wrapper
│   ├── ui/
│   │   ├── Button.tsx         # Reusable button component
│   │   └── Input.tsx          # Reusable input component
│   └── Dashboard.tsx          # Protected dashboard page
├── stores/
│   └── authStore.ts           # Zustand authentication store
├── schemas/
│   └── authSchemas.ts         # Zod validation schemas
├── utils/
│   └── cn.ts                  # Utility for class name merging
└── main.tsx                   # Application entry point
```

## 🚦 Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd react-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔐 Authentication

### Demo Credentials

For testing purposes, you can use these credentials:
- **Email**: test@example.com
- **Password**: password

### Features

- **Login**: Email/password authentication with remember me option
- **Registration**: User registration with password strength indicator
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Persistent State**: Login state persisted across browser sessions
- **Form Validation**: Real-time validation with helpful error messages

## 🎨 Design System

The application uses a consistent design system with:
- **Color Scheme**: Light/dark mode support
- **Typography**: Consistent text hierarchy
- **Spacing**: Tailwind's spacing scale
- **Components**: Reusable UI components with proper props
- **Accessibility**: WCAG compliant with proper ARIA labels

## 🔒 Security

- Form validation on both client and server side (mock)
- Password strength indicator
- Protection against common vulnerabilities
- Secure state management with Zustand

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop browsers
- Tablet devices  
- Mobile phones

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
