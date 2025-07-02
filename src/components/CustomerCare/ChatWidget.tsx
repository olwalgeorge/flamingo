'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Minimize2 } from 'lucide-react';
import { ChatMessage } from '@/types';

interface ChatWidgetProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatWidget({ isOpen, onToggle }: ChatWidgetProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [userName, setUserName] = useState<string>('');
  const [isNewSession, setIsNewSession] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [shouldWiggle, setShouldWiggle] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && isNewSession) {
      setShouldWiggle(false); // Stop wiggling once chat is opened
      setIsAnimating(true);
      
      // Add welcome message with delay for animation
      setTimeout(() => {
        setIsAnimating(false);
        
        const welcomeMessage: ChatMessage = {
          id: 'welcome',
          content: `Hello there! 👋 I'm Amara, and I'm so excited to meet you! Welcome to FLAMINGO CHAP CHAP CBO - we're doing amazing things for environmental conservation and I'd love to tell you all about it! ✨`,
          role: 'assistant',
          timestamp: new Date(),
          sessionId: ''
        };
        setMessages([welcomeMessage]);

        // Add name request after another delay
        setTimeout(() => {
          const nameRequest: ChatMessage = {
            id: 'name-request',
            content: `I'd love to get to know you better - what's your name, lovely? 😊 I'm here to help with anything you need!`,
            role: 'assistant',
            timestamp: new Date(),
            sessionId: ''
          };
          setMessages(prev => [...prev, nameRequest]);
        }, 1500);
      }, 800);
      
      setIsNewSession(false);
    }
  }, [isOpen, messages.length, isNewSession]);

  // Add wiggle effect after a delay to draw attention
  useEffect(() => {
    if (shouldWiggle && !isOpen) {
      const wiggleTimer = setTimeout(() => {
        // The wiggle will be handled by CSS animation
      }, 3000);
      
      return () => clearTimeout(wiggleTimer);
    }
  }, [shouldWiggle, isOpen]);

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
    
    // Check if this is likely their name (first user message and short)
    if (!userName && messages.length <= 2 && inputMessage.trim().length < 50) {
      setUserName(inputMessage.trim());
      setInputMessage('');
      
      // Add personalized greeting
      setTimeout(() => {
        const personalGreeting: ChatMessage = {
          id: 'personal-greeting',
          content: `What a beautiful name, ${inputMessage.trim()}! � I'm so happy to meet you! I'm here to chat about our wonderful environmental programs, upcoming events, volunteer opportunities, or anything else you'd like to know about FLAMINGO CHAP CHAP CBO. What would you like to explore today? 💚`,
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
        content: 'Oh dear! I seem to be having a little technical hiccup 😅 Could you try again in a moment? If it keeps happening, feel free to reach out directly at info@flamingochapchap.org - I promise someone wonderful will help you!',
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

  if (!isOpen) {
    return (
      <button
        onClick={() => {
          setShouldWiggle(false);
          onToggle();
        }}
        className={`fixed bottom-6 right-6 bg-gradient-to-r from-pink-500 to-green-600 hover:from-pink-600 hover:to-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50 flex items-center justify-center ${
          shouldWiggle ? 'animate-wiggle animate-pulse' : 'animate-bounce-in'
        }`}
        aria-label="Chat with Amara - Your friendly environmental assistant"
        title="Hi! I'm Amara 👋 Click to chat about our environmental programs!"
      >
        <MessageCircle size={24} />
        {shouldWiggle && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center animate-bounce">
            💬
          </div>
        )}
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 transform transition-all duration-500 ${
      isAnimating ? 'opacity-0 scale-95 translate-y-4' : 'opacity-100 scale-100 translate-y-0'
    } ${isMinimized ? 'h-14' : 'h-[500px]'}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-500 to-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-lg">🌺</span>
          </div>
          <div>
            <span className="font-medium">Amara</span>
            <p className="text-xs text-white/80">Environmental Care Assistant</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label={isMinimized ? "Expand chat" : "Minimize chat"}
          >
            <Minimize2 size={16} />
          </button>
          <button
            onClick={onToggle}
            className="hover:bg-white/20 p-1 rounded transition-colors"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto h-80 space-y-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                style={{
                  animationDelay: `${index * 0.2}s`,
                  opacity: 0,
                  animation: 'fadeInUp 0.5s ease-out forwards'
                }}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                    message.role === 'user'
                      ? 'bg-green-600 text-white ml-auto'
                      : 'bg-gray-100 text-gray-800 border border-gray-200'
                  }`}
                >
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
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg border border-gray-200">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                rows={1}
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
