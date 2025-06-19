
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EmailGeneratorProps {
  onEmailGenerated: (email: string) => void;
}

const domains = [
  'tempmail.com',
  'quickmail.io',
  'fastmail.temp',
  'securemail.now',
  'privatemail.xyz'
];

export const EmailGenerator = ({ onEmailGenerated }: EmailGeneratorProps) => {
  const [selectedDomain, setSelectedDomain] = useState(domains[0]);
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateRandomString = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 12; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  const generateEmail = () => {
    setIsGenerating(true);
    
    // Simulate generation delay for better UX
    setTimeout(() => {
      const username = generateRandomString();
      const email = `${username}@${selectedDomain}`;
      setGeneratedEmail(email);
      onEmailGenerated(email);
      setIsGenerating(false);
      
      toast({
        title: "Email Generated!",
        description: "Your temporary email is ready to use.",
      });
    }, 1000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedEmail);
    toast({
      title: "Copied!",
      description: "Email address copied to clipboard.",
    });
  };

  return (
    <Card className="bg-white/10 backdrop-blur-md border-white/20 p-8">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center mb-4">
          <Mail className="w-12 h-12 text-yellow-300" />
        </div>
        
        <h2 className="text-2xl font-bold text-white mb-4">
          Generate Your Temporary Email
        </h2>
        
        <div className="max-w-md mx-auto space-y-4">
          <Select value={selectedDomain} onValueChange={setSelectedDomain}>
            <SelectTrigger className="bg-white/20 border-white/30 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95 backdrop-blur-md">
              {domains.map((domain) => (
                <SelectItem key={domain} value={domain}>
                  @{domain}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button
            onClick={generateEmail}
            disabled={isGenerating}
            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                Generate Email
              </>
            )}
          </Button>
        </div>
        
        {generatedEmail && (
          <div className="mt-6 p-4 bg-white/20 rounded-lg border border-white/30">
            <div className="flex items-center justify-between">
              <span className="text-white font-mono text-lg">{generatedEmail}</span>
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
};
