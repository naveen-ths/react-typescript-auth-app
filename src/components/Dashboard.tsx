import React from 'react';
import { useAuthStore } from '../stores/authStore';

const Dashboard: React.FC = () => {
  const { user } = useAuthStore();

  return (
    <div className="text-center">

      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Welcome to your Dashboard!
      </h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        You have successfully logged in. This is a protected route that only authenticated users can access.
      </p>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-md mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
          User Information
        </h3>
        <div className="space-y-2 text-left">
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Name:</span>
            <span className="ml-2 text-sm text-gray-900 dark:text-white">{user?.name}</span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Email:</span>
            <span className="ml-2 text-sm text-gray-900 dark:text-white">{user?.email}</span>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">User ID:</span>
            <span className="ml-2 text-sm text-gray-900 dark:text-white">{user?.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
