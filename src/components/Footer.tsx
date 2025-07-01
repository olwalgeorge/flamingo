import Link from 'next/link';
import { Heart, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-2">          <Link href="/" className="flex items-center space-x-2 mb-4">
            <div className="bg-gradient-to-r from-green-600 to-blue-600 p-2 rounded-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <span className="text-2xl font-bold">
              FLAMINGO
              <span className="text-green-400"> CHAP CHAP</span>
            </span>
          </Link>
          <p className="text-gray-300 mb-6 max-w-md">
            A values-driven organization working for environmental conservation, community empowerment, 
            and sustainable development in Kisumu County, Kenya.
          </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/events" className="text-gray-300 hover:text-blue-400 transition-colors">Events</Link></li>
              <li><Link href="/members" className="text-gray-300 hover:text-blue-400 transition-colors">Members</Link></li>
              <li><Link href="/volunteer" className="text-gray-300 hover:text-blue-400 transition-colors">Volunteer</Link></li>
              <li><Link href="/news" className="text-gray-300 hover:text-blue-400 transition-colors">News</Link></li>
              <li><Link href="/donate" className="text-gray-300 hover:text-blue-400 transition-colors">Donate</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Flamingo Unit, Kondele Ward, P.O Box 2340-40100, Kisumu County, Kenya</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">Contact via local office</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-green-400" />
                <span className="text-gray-300">info@flamingochapchap.org</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 FLAMINGO CHAP CHAP Community Based Organisation. All rights reserved. Made with ❤️ for environmental conservation and community empowerment.
          </p>
        </div>
      </div>
    </footer>
  );
}
