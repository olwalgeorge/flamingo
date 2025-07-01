import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-amber-600 to-orange-700 text-white py-32 px-6 text-center min-h-[70vh] flex items-center">
      <div className="absolute inset-0 opacity-30">
        <Image
          src="https://images.pexels.com/photos/2802809/pexels-photo-2802809.jpeg"
          alt="African Community Gathering"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-75"
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
          Building Strong Communities Together
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
          Empowering African communities through unity, collaboration, and shared prosperity. Join us in creating lasting positive change.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <a
            href="/about"
            className="bg-white text-orange-700 font-bold py-4 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
          >
            Discover Our Mission
          </a>
          <a
            href="/volunteer"
            className="bg-orange-800 text-white font-bold py-4 px-8 rounded-full shadow-lg hover:bg-orange-900 transition-all duration-300 transform hover:scale-105 border-2 border-white"
          >
            Get Involved
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
