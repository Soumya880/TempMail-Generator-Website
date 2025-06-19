
import React from 'react';
import { Shield, Lock, Clock, Zap } from 'lucide-react';

export const Footer = () => {
  const features = [
    {
      icon: Clock,
      title: '10 Minute Validity',
      description: 'Emails expire automatically for maximum security'
    },
    {
      icon: Shield,
      title: 'Privacy Protected',
      description: 'No personal data stored or tracked'
    },
    {
      icon: Lock,
      title: 'Secure Encryption',
      description: 'All email data is encrypted end-to-end'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Get your temporary email in seconds'
    }
  ];

  return (
    <footer className="relative z-20 bg-white/5 backdrop-blur-md border-t border-white/20 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center space-y-3">
              <div className="flex justify-center">
                <feature.icon className="w-8 h-8 text-yellow-300" />
              </div>
              <h3 className="text-white font-semibold">{feature.title}</h3>
              <p className="text-white/70 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="border-t border-white/20 pt-8 text-center">
          <p className="text-white/70 text-sm mb-4">
            TempMail - Secure Temporary Email Service
          </p>
          <div className="flex justify-center space-x-6 text-white/60 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
          <p className="text-white/50 text-xs mt-4">
            © 2024 TempMail. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
