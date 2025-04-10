import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">RescueGrid</h3>
            <p className="text-gray-400 mb-4">
              AI-Powered Disaster Coordination & Communication Platform for emergency response agencies and citizens.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FaGithub size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaLinkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FaTwitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-400 hover:text-white">Home</a></li>
              <li><a href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</a></li>
              <li><a href="/sos" className="text-gray-400 hover:text-white">Emergency SOS</a></li>
              <li><a href="/register" className="text-gray-400 hover:text-white">Register Agency</a></li>
            </ul>
          </div>

          {/* Emergency Contacts */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Emergency Contacts</h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">🚑</span>
                <span className="text-gray-400">Medical: 112</span>
              </li>
              <li className="flex items-center">
                <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">👮</span>
                <span className="text-gray-400">Police: 100</span>
              </li>
              <li className="flex items-center">
                <span className="bg-yellow-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">🚒</span>
                <span className="text-gray-400">Fire: 101</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-600 text-white rounded-full w-6 h-6 flex items-center justify-center mr-2">🌊</span>
                <span className="text-gray-400">Disaster Management: 108</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} RescueGrid. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0">
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm mr-4">
              Privacy Policy
            </a>
            <a href="/terms" className="text-gray-400 hover:text-white text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Also export as default for flexibility
export default Footer;