import { Link, Outlet } from "react-router-dom";

const PublicLayout = () => (
  <div className="min-h-screen bg-white">
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-blue-600">
              AuthApp
            </Link>
          </div>
          <div>
            <ul className="flex space-x-6">
              <li>
                <Link
                  to="/"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Register
                </Link>
              </li>
              <li>
                <Link
                  to="/forgot-password"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Forgot Password
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Outlet />
    </main>
  </div>
);

export default PublicLayout;