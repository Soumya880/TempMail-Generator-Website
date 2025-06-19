
import React from 'react';
import { Shield, Clock, Mail } from 'lucide-react';

export const Header = () => {
  return (
    <header className="relative z-20 bg-white/10 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Mail className="w-8 h-8 text-yellow-300" />
            <span className="text-2xl font-bold text-white">TempMail</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-white/90">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Secure</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>10 Minutes</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};
