import React from 'react';
import Image from 'next/image';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 text-white py-32 px-6 text-center min-h-[85vh] flex items-center overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-teal-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Main background image */}
      <div className="absolute inset-0 opacity-40">
        <Image
          src="https://images.pexels.com/photos/2802809/pexels-photo-2802809.jpeg"
          alt="African Community Gathering"
          fill
          style={{ objectFit: 'cover' }}
          className="brightness-75 contrast-110"
        />
      </div>
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-transparent to-green-800/40"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="inline-flex items-center bg-emerald-500/20 backdrop-blur-sm border border-emerald-300/30 rounded-full px-6 py-3 mb-6">
            <span className="text-emerald-200 text-sm font-medium">🌱 Environmental Conservation • Community Empowerment</span>
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-8 drop-shadow-2xl leading-tight">
          <span className="block text-white">Protecting Our</span>
          <span className="block bg-gradient-to-r from-emerald-300 via-green-200 to-teal-200 bg-clip-text text-transparent">
            Planet Together
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed drop-shadow-lg text-green-50">
          FLAMINGO CHAP CHAP CBO - Driving sustainable environmental management, 
          empowering communities, and creating green livelihoods across Kisumu County, Kenya
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6 mt-12">
          <a
            href="/about"
            className="group bg-white/95 backdrop-blur-sm text-emerald-800 font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 transform hover:scale-105 hover:bg-white border-2 border-emerald-200"
          >
            <span className="flex items-center justify-center gap-2">
              🌿 Our Green Mission
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </a>
          <a
            href="/volunteer"
            className="group bg-emerald-500/90 backdrop-blur-sm text-white font-bold py-5 px-10 rounded-full shadow-2xl hover:shadow-emerald-400/30 transition-all duration-500 transform hover:scale-105 border-2 border-emerald-300 hover:bg-emerald-400"
          >
            <span className="flex items-center justify-center gap-2">
              🤝 Join Our Movement
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
          </a>
        </div>
        
        {/* Environmental stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-300/20">
            <div className="text-3xl font-bold text-emerald-200">500+</div>
            <div className="text-green-100 text-sm">Trees Planted</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-300/20">
            <div className="text-3xl font-bold text-emerald-200">50</div>
            <div className="text-green-100 text-sm">Communities</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-300/20">
            <div className="text-3xl font-bold text-emerald-200">1K+</div>
            <div className="text-green-100 text-sm">Lives Impacted</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-emerald-300/20">
            <div className="text-3xl font-bold text-emerald-200">100%</div>
            <div className="text-green-100 text-sm">Sustainable</div>
          </div>
        </div>
      </div>
      
      {/* Floating elements */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <div className="w-4 h-4 bg-emerald-300 rounded-full animate-bounce"></div>
      </div>
      <div className="absolute top-20 right-20 opacity-30">
        <div className="w-3 h-3 bg-green-200 rounded-full animate-bounce animation-delay-1000"></div>
      </div>
      <div className="absolute bottom-20 right-32 opacity-30">
        <div className="w-2 h-2 bg-teal-200 rounded-full animate-bounce animation-delay-2000"></div>
      </div>
    </div>
  );
};

export default Hero;
