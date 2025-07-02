'use client';

import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import { ChatMessage } from '@/types';

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [isAnimating, setIsAnimating] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Check for stored name on component mount
  useEffect(() => {
    const storedName = localStorage.getItem('flamingo-chat-username');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  useEffect(() => {
    // Animation and initial conversation setup
    const timer = setTimeout(() => {
      setIsAnimating(false);
      
      // Add welcome message with typing effect
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: `Hello there! 👋 I'm Amara, and I'm so excited to meet you! Welcome to FLAMINGO CHAP CHAP CBO - we're doing amazing things for environmental conservation and I'd love to tell you all about it! ✨`,
        role: 'assistant',
        timestamp: new Date(),
        sessionId: ''
      };
      
      setMessages([welcomeMessage]);
      
      // Check if we have a stored name
      const storedName = localStorage.getItem('flamingo-chat-username');
      if (storedName) {
        // Greet returning user by name
        setTimeout(() => {
          const returnGreeting: ChatMessage = {
            id: 'return-greeting',
            content: `Welcome back, ${storedName}! 🌸 It's wonderful to see you again! What would you like to know about today? 💚`,
            role: 'assistant',
            timestamp: new Date(),
            sessionId: ''
          };
          setMessages(prev => [...prev, returnGreeting]);
        }, 2000);
      } else {
        // Ask for name from new user
        setTimeout(() => {
          const nameRequest: ChatMessage = {
            id: 'name-request',
            content: `I'd love to get to know you better - what's your name, lovely? 😊`,
            role: 'assistant',
            timestamp: new Date(),
            sessionId: ''
          };
          setMessages(prev => [...prev, nameRequest]);
        }, 2000);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputMessage,
      role: 'user',
      timestamp: new Date(),
      sessionId: sessionId
    };

    setMessages(prev => [...prev, userMessage]);
    
    // Check if this is the first user message (likely their name)
    if (!userName && messages.length <= 2) {
      const newUserName = inputMessage.trim();
      setUserName(newUserName);
      // Save name to local storage
      localStorage.setItem('flamingo-chat-username', newUserName);
      setInputMessage('');
      
      // Add personalized greeting - shorter and direct
      setTimeout(() => {
        const personalGreeting: ChatMessage = {
          id: 'personal-greeting',
          content: `What a beautiful name, ${newUserName}! 🌸 I'm so happy to meet you! What would you like to know about today? 💚`,
          role: 'assistant',
          timestamp: new Date(),
          sessionId: sessionId
        };
        setMessages(prev => [...prev, personalGreeting]);
      }, 1000);
      return;
    }

    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: sessionId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const data = await response.json();
      setMessages(prev => [...prev, data.message]);
      
      if (!sessionId) {
        setSessionId(data.sessionId);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString(),
        content: 'Oh dear! I seem to be having a little technical hiccup 😅 Could you try again in a moment? If it keeps happening, feel free to reach out directly at info@flamingochapchap.org or call our secretary at +254722113087 - I promise someone wonderful will help you!',
        role: 'assistant',
        timestamp: new Date(),
        sessionId: sessionId
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className={`flex flex-col h-[500px] transition-all duration-1000 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.map((message, index) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
            style={{
              animationDelay: `${index * 0.3}s`,
              opacity: 0,
              animation: 'fadeInUp 0.5s ease-out forwards'
            }}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg transition-all duration-300 hover:shadow-md ${
                message.role === 'user'
                  ? 'bg-green-600 text-white ml-auto'
                  : 'bg-gray-100 text-gray-800 border border-gray-200'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">🤖</span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">
                    {userName ? `Amara for ${userName}` : 'Amara 🌺'}
                  </span>
                </div>
              )}
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              <span className="text-xs opacity-70 mt-1 block">
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start animate-pulse">
            <div className="bg-gray-100 p-3 rounded-lg border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs">🤖</span>
                </div>
                <span className="text-xs text-gray-500 font-medium">
                  {userName ? `Amara for ${userName}` : 'Amara 🌺'}
                </span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={userName ? `Type your message, ${userName}...` : "Type your name to get started..."}
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
            disabled={isLoading}
          />
          <button
            onClick={sendMessage}
            disabled={isLoading || !inputMessage.trim()}
            className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
