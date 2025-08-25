import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { registerSchema, type RegisterFormData } from '../../schemas/authSchemas';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
    watch
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  });

  // Watch password for real-time validation feedback
  const password = watch('password');

  // Focus name input on mount
  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: RegisterFormData) => {
    clearError();
    await registerUser(data.name, data.email, data.password);
  };

  const getPasswordStrength = (password: string): { score: number; text: string; color: string } => {
    if (!password) return { score: 0, text: '', color: '' };
    
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2) return { score, text: 'Weak', color: 'text-red-500' };
    if (score <= 3) return { score, text: 'Fair', color: 'text-yellow-500' };
    if (score <= 4) return { score, text: 'Good', color: 'text-blue-500' };
    return { score, text: 'Strong', color: 'text-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Or{' '}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
            >
              sign in to your existing account
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
              {...register('name')}
              type="text"
              label="Full name"
              placeholder="Enter your full name"
              error={errors.name?.message}
              autoComplete="name"
            />

            <Input
              {...register('email')}
              type="email"
              label="Email address"
              placeholder="Enter your email"
              error={errors.email?.message}
              autoComplete="email"
            />

            <div>
              <Input
                {...register('password')}
                type="password"
                label="Password"
                placeholder="Create a password"
                error={errors.password?.message}
                autoComplete="new-password"
              />
              {password && password.length > 0 && (
                <div className="mt-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Password strength:</span>
                    <span className={passwordStrength.color}>{passwordStrength.text}</span>
                  </div>
                  <div className="mt-1 w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        passwordStrength.score <= 2 ? 'bg-red-500' :
                        passwordStrength.score <= 3 ? 'bg-yellow-500' :
                        passwordStrength.score <= 4 ? 'bg-blue-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <Input
              {...register('confirmPassword')}
              type="password"
              label="Confirm password"
              placeholder="Confirm your password"
              error={errors.confirmPassword?.message}
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-center">
            <input
              id="agree-terms"
              name="agree-terms"
              type="checkbox"
              required
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800"
            />
            <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
              I agree to the{' '}
              <Link
                to="/terms"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link
                to="/privacy"
                className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Privacy Policy
              </Link>
            </label>
          </div>

          <Button
            type="submit"
            className="w-full"
            isLoading={isLoading}
            disabled={isLoading}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>
        </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
