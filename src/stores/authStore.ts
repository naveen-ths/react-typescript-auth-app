import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export type AuthStore = AuthState & AuthActions;

// Mock API functions - replace with actual API calls
const mockLogin = async (email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

  if (email === 'test@example.com' && password === 'password') {
    return {
      id: '1',
      email: 'test@example.com',
      name: 'Test User'
    };
  }

  throw new Error('Invalid credentials');
};

const mockRegister = async (name: string, email: string, password: string): Promise<User> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

  // Simple validation
  if (email.includes('@') && password.length >= 6) {
    return {
      id: Date.now().toString(),
      email,
      name
    };
  }

  throw new Error('Registration failed');
};

const mockForgotPassword = async (email: string): Promise<void> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay

  // Simple validation to check if it's a valid email
  if (!email.includes('@')) {
    throw new Error('Invalid email address');
  }

  // In a real app, this would send a reset password email
  // For demo purposes, we'll just simulate success
  return;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await mockLogin(email, password);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Login failed'
          });
        }
      },

      register: async (name: string, email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          const user = await mockRegister(name, email, password);
          set({
            user,
            isAuthenticated: true,
            isLoading: false,
            error: null
          });
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Registration failed'
          });
        }
      },

      forgotPassword: async (email: string) => {
        set({ isLoading: true, error: null });

        try {
          await mockForgotPassword(email);
          set({
            isLoading: false,
            error: null
          });
          return Promise.resolve();
        } catch (error) {
          set({
            isLoading: false,
            error: error instanceof Error ? error.message : 'Password reset request failed'
          });
          return Promise.reject(error);
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null
        });
      },

      clearError: () => {
        set({ error: null });
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
