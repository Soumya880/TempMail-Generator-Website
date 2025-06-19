
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Clock, AlertTriangle } from 'lucide-react';

interface TimerProps {
  expirationTime: Date;
  onExpiration: () => void;
  email: string;
}

export const Timer = ({ expirationTime, onExpiration, email }: TimerProps) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const [isExpiring, setIsExpiring] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const expiration = expirationTime.getTime();
      const difference = expiration - now;
      
      if (difference <= 0) {
        onExpiration();
        return 0;
      }
      
      setIsExpiring(difference <= 60000); // Last minute warning
      return Math.floor(difference / 1000);
    };

    setTimeLeft(calculateTimeLeft());
    
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationTime, onExpiration]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className={`bg-white/10 backdrop-blur-md border-white/20 p-6 transition-all duration-300 ${isExpiring ? 'border-red-400 bg-red-500/20' : ''}`}>
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center">
          {isExpiring ? (
            <AlertTriangle className="w-8 h-8 text-red-400 animate-pulse" />
          ) : (
            <Clock className="w-8 h-8 text-green-400" />
          )}
        </div>
        
        <div>
          <h3 className="text-white font-semibold mb-2">Email Active</h3>
          <p className="text-white/80 text-sm mb-4">
            {email}
          </p>
          <div className={`text-4xl font-bold ${isExpiring ? 'text-red-400' : 'text-green-400'}`}>
            {formatTime(timeLeft)}
          </div>
          <p className="text-white/70 text-sm mt-2">
            {isExpiring ? 'Expiring soon!' : 'Time remaining'}
          </p>
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${isExpiring ? 'bg-red-400' : 'bg-green-400'}`}
            style={{ width: `${(timeLeft / 600) * 100}%` }}
          ></div>
        </div>
      </div>
    </Card>
  );
};
