import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <hr />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
              <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
