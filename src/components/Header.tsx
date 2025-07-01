'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Heart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              Community
              <span className="text-blue-600">Connect</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-blue-600 transition-colors">
              Events
            </Link>
            <Link href="/members" className="text-gray-700 hover:text-blue-600 transition-colors">
              Members
            </Link>
            <Link href="/volunteer" className="text-gray-700 hover:text-blue-600 transition-colors">
              Volunteer
            </Link>
            <Link href="/news" className="text-gray-700 hover:text-blue-600 transition-colors">
              News
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-blue-600 transition-colors">
              Contact
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/donate" 
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              Donate Now
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200">
              <Link 
                href="/" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link 
                href="/events" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Events
              </Link>
              <Link 
                href="/members" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Members
              </Link>
              <Link 
                href="/volunteer" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Volunteer
              </Link>
              <Link 
                href="/news" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                News
              </Link>
              <Link 
                href="/contact" 
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link 
                href="/donate" 
                className="block mx-3 my-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                onClick={toggleMenu}
              >
                Donate Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
