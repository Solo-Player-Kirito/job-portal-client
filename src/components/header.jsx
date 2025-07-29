import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Plus, User } from "lucide-react";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              JP
            </div>
            <span className="text-2xl font-bold text-blue-600">JobPortal</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Browse Jobs
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Companies
            </Link>
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
            >
              Career Resources
            </Link>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium px-3 py-2"
            >
              <User className="h-5 w-5" />
              <span>Login</span>
            </Link>
            <Link
              to="/register"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
            >
              Sign Up
            </Link>
            <Link
              to="/add-job"
              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Post a Job</span>
            </Link>
          </div>

          <div className="flex md:hidden items-center space-x-4">
            <Link
              to="/add-job"
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white font-medium p-2 rounded-md transition-colors"
            >
              <Plus className="h-5 w-5" />
            </Link>
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 p-2 rounded-md hover:bg-gray-100"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="pt-4 pb-2 space-y-2">
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Browse Jobs
              </Link>
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Companies
              </Link>
              <Link
                to="/"
                onClick={toggleMobileMenu}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
              >
                Career Resources
              </Link>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <Link
                  to="/login"
                  onClick={toggleMobileMenu}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  <User className="h-5 w-5 mr-2" />
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={toggleMobileMenu}
                  className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 hover:bg-blue-50"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
