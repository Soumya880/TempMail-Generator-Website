
import React, { useState, useEffect } from 'react';
import { EmailGenerator } from '../components/EmailGenerator';
import { EmailInbox } from '../components/EmailInbox';
import { Timer } from '../components/Timer';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const Index = () => {
  const [generatedEmail, setGeneratedEmail] = useState<string>('');
  const [expirationTime, setExpirationTime] = useState<Date | null>(null);
  const [isActive, setIsActive] = useState(false);

  const handleEmailGenerated = (email: string) => {
    setGeneratedEmail(email);
    const expiration = new Date();
    expiration.setMinutes(expiration.getMinutes() + 10);
    setExpirationTime(expiration);
    setIsActive(true);
  };

  const handleExpiration = () => {
    setIsActive(false);
    setGeneratedEmail('');
    setExpirationTime(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-indigo-600">
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="relative z-10">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
              Temp<span className="text-yellow-300">Mail</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Generate secure temporary email addresses that expire in 10 minutes. 
              Perfect for sign-ups, verification, and protecting your privacy.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <EmailGenerator onEmailGenerated={handleEmailGenerated} />
            
            {isActive && expirationTime && (
              <>
                <Timer 
                  expirationTime={expirationTime} 
                  onExpiration={handleExpiration}
                  email={generatedEmail}
                />
                <EmailInbox email={generatedEmail} isActive={isActive} />
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Index;
