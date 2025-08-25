import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { Button } from './ui/Button';
import { DropdownMenu } from './ui/DropdownMenu';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  // Settings dropdown items
  const settingsItems = [
    {
      label: 'Account Settings',
      onClick: () => console.log('Account Settings clicked')
    },
    {
      label: 'Profile',
      onClick: () => console.log('Profile clicked')
    },
    {
      label: 'Preferences',
      onClick: () => console.log('Preferences clicked')
    },
    {
      label: 'Notifications',
      onClick: () => console.log('Notifications clicked')
    }
  ];

  // Tools dropdown items
  const toolsItems = [
    {
      label: 'Analytics',
      onClick: () => console.log('Analytics clicked')
    },
    {
      label: 'Reports',
      onClick: () => console.log('Reports clicked')
    },
    {
      label: 'Integrations',
      onClick: () => console.log('Integrations clicked')
    },
    {
      label: 'API Access',
      onClick: () => console.log('API Access clicked')
    },
    {
      label: 'System Information',
      onClick: () => navigate('/system-info')
    }
  ];

  const todosItems = [
    {
      label: 'View Todos',
      onClick: () => navigate('/todos')
    },
    {
      label: 'Add Todo',
      onClick: () => navigate('/todos/add-todo')
    }
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              <Link to="/dashboard">Dashboard</Link>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Welcome, {user?.name}
            </span>

            <DropdownMenu label="Todos" items={todosItems} />
            <DropdownMenu label="Settings" items={settingsItems} />
            <DropdownMenu label="Tools" items={toolsItems} />

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
            >
              Sign out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
