
import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Inbox, RefreshCw, Mail, Trash2, Clock } from 'lucide-react';

interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  timestamp: Date;
  isRead: boolean;
}

interface EmailInboxProps {
  email: string;
  isActive: boolean;
}

export const EmailInbox = ({ email, isActive }: EmailInboxProps) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Simulate receiving emails for demo purposes
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => {
        const demoEmail: Email = {
          id: '1',
          from: 'noreply@example.com',
          subject: 'Welcome to our service!',
          body: 'Thank you for using our temporary email service. This is a demo email to show how the inbox works.',
          timestamp: new Date(),
          isRead: false
        };
        setEmails([demoEmail]);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const refreshInbox = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // In a real app, this would fetch new emails
    }, 1000);
  };

  const markAsRead = (emailId: string) => {
    setEmails(emails.map(e => 
      e.id === emailId ? { ...e, isRead: true } : e
    ));
  };

  const deleteEmail = (emailId: string) => {
    setEmails(emails.filter(e => e.id !== emailId));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
  };

  const openEmail = (email: Email) => {
    setSelectedEmail(email);
    markAsRead(email.id);
  };

  if (!isActive) return null;

  return (
    <div className="space-y-4">
      <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Inbox className="w-6 h-6 text-white" />
            <h3 className="text-xl font-semibold text-white">Inbox</h3>
            {emails.length > 0 && (
              <Badge variant="secondary" className="bg-yellow-500 text-white">
                {emails.filter(e => !e.isRead).length} new
              </Badge>
            )}
          </div>
          <Button
            onClick={refreshInbox}
            disabled={isRefreshing}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-white/20"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>

        {emails.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="w-12 h-12 text-white/50 mx-auto mb-4" />
            <p className="text-white/70">No emails received yet</p>
            <p className="text-white/50 text-sm">New emails will appear here automatically</p>
          </div>
        ) : (
          <div className="space-y-2">
            {emails.map((email) => (
              <div
                key={email.id}
                onClick={() => openEmail(email)}
                className={`p-4 rounded-lg cursor-pointer transition-all duration-200 hover:bg-white/20 ${
                  !email.isRead ? 'bg-white/15 border border-yellow-400/50' : 'bg-white/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <p className="font-medium text-white">{email.from}</p>
                      {!email.isRead && (
                        <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      )}
                    </div>
                    <p className="text-white/90 font-medium">{email.subject}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <Clock className="w-3 h-3 text-white/50" />
                      <p className="text-white/50 text-sm">
                        {email.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEmail(email.id);
                    }}
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:bg-red-500/20"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {selectedEmail && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-white">Email Details</h4>
              <Button
                onClick={() => setSelectedEmail(null)}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
              >
                Close
              </Button>
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="text-white/70 text-sm">From:</label>
                <p className="text-white font-medium">{selectedEmail.from}</p>
              </div>
              <div>
                <label className="text-white/70 text-sm">Subject:</label>
                <p className="text-white font-medium">{selectedEmail.subject}</p>
              </div>
              <div>
                <label className="text-white/70 text-sm">Time:</label>
                <p className="text-white/70">{selectedEmail.timestamp.toLocaleString()}</p>
              </div>
              <div>
                <label className="text-white/70 text-sm">Message:</label>
                <div className="bg-white/10 p-4 rounded-lg mt-2">
                  <p className="text-white">{selectedEmail.body}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
