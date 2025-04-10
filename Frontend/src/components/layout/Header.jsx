import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaBell, FaInfoCircle } from 'react-icons/fa';
import logo from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Close menus when location changes
    setShowNotifications(false);
    setMobileMenuOpen(false);
  }, [location]);

  // Mock notifications - in production, fetch from backend
  useEffect(() => {
    setNotifications([
      {
        id: 1,
        title: 'New SOS Alert',
        message: 'Flood emergency reported in sector B4',
        time: '5 minutes ago',
        read: false
      },
      {
        id: 2,
        title: 'Task Assignment',
        message: 'You have been assigned to emergency response in North Area',
        time: '1 hour ago',
        read: true
      }
    ]);
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    // Close mobile menu if open
    if (mobileMenuOpen) setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(prev => !prev);
    // Close notifications if open
    if (showNotifications) setShowNotifications(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      // Redirect is handled by AuthContext
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img src={logo} alt="RescueGrid Logo" className="h-8 w-8 mr-2" />
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-red-600 to-yellow-400 bg-clip-text text-transparent">
                RescueGrid
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className={`px-3 py-2 rounded-md hover:bg-gray-700 transition duration-150 ${location.pathname === '/' ? 'bg-gray-700' : ''}`}>
              Home
            </Link>
            <Link to="/dashboard" className={`px-3 py-2 rounded-md hover:bg-gray-700 transition duration-150 ${location.pathname === '/dashboard' ? 'bg-gray-700' : ''}`}>
              Dashboard
            </Link>
            <Link to="/sos" className={`px-3 py-2 rounded-md hover:bg-gray-700 transition duration-150 ${location.pathname === '/sos' ? 'bg-gray-700' : ''}`}>
              SOS
            </Link>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-gray-700 transition duration-150 relative"
                aria-label="Notifications"
              >
                <FaBell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 block h-4 w-4 rounded-full bg-red-600 text-white text-xs flex items-center justify-center transform translate-x-1 -translate-y-1">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-20">
                  <div className="py-2 px-3 bg-gray-100 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.length > 0 ? (
                      notifications.map(notification => (
                        <div
                          key={notification.id}
                          className={`px-4 py-3 border-b border-gray-100 hover:bg-gray-50 ${
                            !notification.read ? 'bg-blue-50' : ''
                          }`}
                        >
                          <div className="flex items-start">
                            <div className="ml-2 w-0 flex-1">
                              <p className="text-sm font-medium text-gray-900">{notification.title}</p>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="px-4 py-3 text-sm text-gray-500">No notifications</p>
                    )}
                  </div>
                  <div className="py-2 px-3 bg-gray-50 text-xs text-center">
                    <button className="text-blue-600 hover:text-blue-800">Mark all as read</button>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            {user ? (
              <div className="relative ml-3">
                <div className="flex items-center space-x-3">
                  <div className="text-sm">
                    <span className="text-white">Welcome, {user.displayName || 'User'}</span>
                  </div>
                  <button 
                    onClick={handleLogout}
                    className="px-3 py-1.5 text-sm bg-red-600 hover:bg-red-700 text-white rounded transition duration-150"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 text-sm bg-transparent border border-white text-white rounded hover:bg-white hover:text-gray-800 transition duration-150"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1.5 text-sm bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded hover:from-red-700 hover:to-yellow-600 transition duration-150"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
              aria-expanded="false"
            >
              <FaBars className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-gray-800 shadow-inner pt-2 pb-3 space-y-1">
            <Link to="/" className={`block px-4 py-2 rounded-md hover:bg-gray-700 transition duration-150 ${location.pathname === '/' ? 'bg-gray-700' : ''}`}>
              Home
            </Link>
            <Link to="/dashboard" className={`block px-4 py-2 rounded-md hover:bg-gray-700 transition duration-150 ${location.pathname === '/dashboard' ? 'bg-gray-700' : ''}`}>
              Dashboard
            </Link>
            <Link to="/sos" className={`block px-4 py-2 rounded-md hover:bg-gray-700 transition duration-150 ${location.pathname === '/sos' ? 'bg-gray-700' : ''}`}>
              SOS
            </Link>
            
            {user ? (
              <>
                <div className="px-4 py-3 border-t border-gray-700">
                  <div className="flex items-center">
                    <div className="text-base font-medium text-white">{user.displayName || 'User'}</div>
                  </div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-base font-medium text-red-300 hover:text-white hover:bg-gray-700 transition duration-150"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="px-4 py-3 space-y-2">
                <Link to="/login" className="block w-full px-4 py-2 text-center text-sm border border-white text-white rounded hover:bg-white hover:text-gray-800 transition duration-150">
                  Login
                </Link>
                <Link to="/register" className="block w-full px-4 py-2 text-center text-sm bg-gradient-to-r from-red-600 to-yellow-500 text-white rounded hover:from-red-700 hover:to-yellow-600 transition duration-150">
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;