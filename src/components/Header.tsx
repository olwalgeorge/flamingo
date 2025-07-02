'use client';

import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Menu, X, Heart } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navLinkClasses = (path: string) => {
    const baseClasses = "transition-all duration-300 font-medium relative";
    const activeClasses = "text-emerald-600 border-b-2 border-emerald-600";
    const inactiveClasses = "text-gray-700 hover:text-emerald-600 hover:border-b-2 hover:border-emerald-300";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  const mobileNavLinkClasses = (path: string) => {
    const baseClasses = "block px-3 py-2 transition-all duration-300 font-medium rounded-lg";
    const activeClasses = "text-emerald-600 bg-emerald-50 border-l-4 border-emerald-600";
    const inactiveClasses = "text-gray-700 hover:text-emerald-600 hover:bg-emerald-50";
    
    return `${baseClasses} ${isActive(path) ? activeClasses : inactiveClasses}`;
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              FLAMINGO
              <span className="text-green-600"> CHAP CHAP</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className={navLinkClasses('/')}>
              Home
            </Link>
            <Link href="/about" className={navLinkClasses('/about')}>
              About
            </Link>
            <Link href="/events" className={navLinkClasses('/events')}>
              Events
            </Link>
            <Link href="/members" className={navLinkClasses('/members')}>
              Members
            </Link>
            <Link href="/volunteer" className={navLinkClasses('/volunteer')}>
              Volunteer
            </Link>
            <Link href="/news" className={navLinkClasses('/news')}>
              News
            </Link>
            <Link href="/contact" className={navLinkClasses('/contact')}>
              Contact
            </Link>
            <Link href="/support" className={navLinkClasses('/support')}>
              Support
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              href="/donate" 
              className={`px-6 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-medium ${
                isActive('/donate') 
                  ? 'bg-gradient-to-r from-emerald-700 to-green-700 text-white' 
                  : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700'
              }`}
            >
              Support Us
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
                className={mobileNavLinkClasses('/')}
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={mobileNavLinkClasses('/about')}
                onClick={toggleMenu}
              >
                About
              </Link>
              <Link 
                href="/events" 
                className={mobileNavLinkClasses('/events')}
                onClick={toggleMenu}
              >
                Events
              </Link>
              <Link 
                href="/members" 
                className={mobileNavLinkClasses('/members')}
                onClick={toggleMenu}
              >
                Members
              </Link>
              <Link 
                href="/volunteer" 
                className={mobileNavLinkClasses('/volunteer')}
                onClick={toggleMenu}
              >
                Volunteer
              </Link>
              <Link 
                href="/news" 
                className={mobileNavLinkClasses('/news')}
                onClick={toggleMenu}
              >
                News
              </Link>
              <Link 
                href="/contact" 
                className={mobileNavLinkClasses('/contact')}
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link 
                href="/support" 
                className={mobileNavLinkClasses('/support')}
                onClick={toggleMenu}
              >
                Support
              </Link>            <Link 
              href="/donate" 
              className={`block mx-3 my-2 text-center px-6 py-2 rounded-lg transition-all duration-300 font-medium ${
                isActive('/donate') 
                  ? 'bg-gradient-to-r from-emerald-700 to-green-700 text-white' 
                  : 'bg-gradient-to-r from-emerald-600 to-green-600 text-white hover:from-emerald-700 hover:to-green-700'
              }`}
              onClick={toggleMenu}
            >
              Support Us
            </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
