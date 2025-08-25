import React from 'react';

interface SystemInfoItem {
  label: string;
  value: string;
}

const SystemInfo: React.FC = () => {
  // Get current date and time
  const getCurrentDateTime = () => {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    };
    return now.toLocaleDateString('en-US', options);
  };

  // Mock system information data (in a real app, this would come from an API)
  const serverInfo: SystemInfoItem[] = [
    { label: 'Product Version:', value: '6.2.1' },
    { label: 'Character Set:', value: 'Universal Alphabet (UTF-8)' },
    { label: 'Server Timezone:', value: 'Western Europe Time, London, Lisbon, Casablanca (GMT)' },
    { label: 'Current Server Time:', value: getCurrentDateTime() },
    { label: 'PHP Version:', value: '7.3.33' },
    { label: 'Safe Mode Enabled:', value: 'No' },
    { label: 'Imap Support Found:', value: 'Yes' },
    { label: 'Curl Support Found:', value: 'Yes' },
    { label: 'DOM Extension Enabled:', value: 'Yes' },
    { label: 'GD Version:', value: 'bundled (2.1.0 compatible)' },
    { label: 'Mod Security Enabled:', value: 'Unknown or PHP is running in CGI mode' },
    { label: 'Server Software:', value: 'Apache' },
    { label: 'Database Version:', value: '8.0.37' }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          System Information
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          An overview of the configuration of your server can be seen below.
        </p>
      </div>

      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Server Information
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300">
            View Full System Info
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {serverInfo.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : 'bg-white dark:bg-gray-800'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white w-1/3">
                    {item.label}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 w-2/3">
                    {item.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemInfo;
