import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { forgotPasswordSchema, type ForgotPasswordFormData } from '../../schemas/authSchemas';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const ForgotPasswordForm: React.FC = () => {
  const { forgotPassword, isLoading, error, clearError } = useAuthStore();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ''
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

  const onSubmit = async (data: ForgotPasswordFormData) => {
    clearError();
    try {
      await forgotPassword(data.email);
      setIsSuccess(true);
    } catch (error) {
      // Error is handled by the store
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we'll send you a link to reset your password.
          </p>
        
        {isSuccess ? (
          <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-green-400 dark:text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800 dark:text-green-400">
                  Password reset email sent
                </h3>
                <div className="mt-2 text-sm text-green-700 dark:text-green-500">
                  <p>
                    If an account exists with this email, you'll receive instructions on how to reset your password shortly.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="-mx-2 -my-1.5 flex">
                    <Link
                      to="/login"
                      className="px-2 py-1.5 rounded-md text-sm font-medium text-green-800 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Return to login
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
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
            </div>

            <div className="flex flex-col gap-3">
              <Button
                type="submit"
                className="w-full"
                isLoading={isLoading}
                disabled={isLoading}
              >
                {isLoading ? 'Sending reset link...' : 'Reset password'}
              </Button>
              
              <div className="text-sm text-center">
                <Link
                  to="/"
                  className="font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  Return to login
                </Link>
              </div>
            </div>
          </form>
        )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
