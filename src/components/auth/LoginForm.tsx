import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { loginSchema, type LoginFormData } from '../../schemas/authSchemas';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  // Focus email input on mount
  useEffect(() => {
    setFocus('email');
  }, [setFocus]);

  // Clear error when component unmounts or user starts typing
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: LoginFormData) => {
    clearError();
    await login(data.email, data.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              create a new account
            </Link>
          </p>
        
          <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="space-y-4">
            {error && (
              <div 
                className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
                role="alert"
                aria-live="polite"
              >
                <p className="text-sm">{error}</p>
              </div>
            )}

            <Input
              {...register('email')}
              type="email"
              label="Email address"
              placeholder="Enter your email"
              error={errors.email?.message}
              autoComplete="email"
              aria-describedby="email-error"
            />

            <Input
              {...register('password')}
              type="password"
              label="Password"
              placeholder="Enter your password"
              error={errors.password?.message}
              autoComplete="current-password"
              aria-describedby="password-error"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
          
          <div className="mt-6">
            <div className="text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Demo credentials: test@example.com / password
              </p>
            </div>
          </div>
        </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
