'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Sun, Moon, User } from 'lucide-react';

const PERSONALITIES = {
  professional: {
    name: 'PROFESSIONAL',
    prompt: 'You are a professional portfolio assistant. Be formal, concise, and highlight technical skills and achievements. Use professional language.',
  },
  sarcastic: {
    name: 'SARCASTIC',
    prompt: 'You are a sarcastic portfolio assistant. Be witty, use dry humor, but still answer questions accurately. Roast the user a little bit.',
  },
  enthusiastic: {
    name: 'ENTHUSIASTIC',
    prompt: 'You are an enthusiastic portfolio assistant! Be super excited about everything! Use exclamation points! Show genuine excitement about the projects and skills!',
  },
  brutalist: {
    name: 'BRUTALIST',
    prompt: 'You are a brutally honest assistant. No fluff. Pure facts. Short sentences. Direct. Efficient. Like this UI.',
  },
  chaotic: {
    name: 'CHAOTIC',
    prompt: 'You are a chaotic assistant. Mix professional info with random tangents. Be unpredictable. Sometimes formal, sometimes casual. Keep them guessing.',
  },
};

export default function ChatInterface() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [personality, setPersonality] = useState<keyof typeof PERSONALITIES>('professional');
  const [showPersonalities, setShowPersonalities] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const systemPrompt = PERSONALITIES[personality].prompt;
      const fullMessage = `${systemPrompt}\n\nUser question: ${userMessage}`;
      
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: fullMessage })
      });
      
      const data = await res.json();
      
      if (res.status === 429) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response || data.error }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please try again.' }]);
    }
    
    setLoading(false);
  };

  const changePersonality = (newPersonality: keyof typeof PERSONALITIES) => {
    setPersonality(newPersonality);
    setShowPersonalities(false);
    setMessages([]);
  };

  const bgClass = darkMode ? 'bg-black' : 'bg-white';
  const textClass = darkMode ? 'text-white' : 'text-black';
  const borderClass = darkMode ? 'border-white' : 'border-black';
  const userBgClass = darkMode ? 'bg-white text-black' : 'bg-black text-white';
  const assistantBgClass = darkMode ? 'bg-black border-white' : 'bg-white border-black';
  const inputBgClass = darkMode ? 'bg-black border-white text-white placeholder-gray-500' : 'bg-white border-white text-black placeholder-gray-400';
  const buttonBgClass = darkMode ? 'bg-white text-black hover:bg-gray-200 border-white' : 'bg-white text-black hover:bg-gray-200 border-white';
  const inputContainerBg = darkMode ? 'bg-white' : 'bg-black';
  const loadingDotClass = darkMode ? 'bg-white' : 'bg-black';

  return (
    <div className={`min-h-screen ${bgClass} ${textClass} flex items-center justify-center p-8 transition-colors duration-300`}>
      <div className="w-full max-w-5xl">
        {/* Header */}
        <div className="mb-8 flex justify-between items-start">
          <div>
            <h1 className="text-6xl font-black mb-2 tracking-tight">PORTFOLIO ASSISTANT</h1>
            <div className={`h-2 w-32 ${darkMode ? 'bg-white' : 'bg-black'}`}></div>
          </div>
          
          {/* Controls */}
          <div className="flex gap-4">
            {/* Personality Selector */}
            <div className="relative">
              <button
                onClick={() => setShowPersonalities(!showPersonalities)}
                className={`p-4 border-4 ${borderClass} ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} transition-all active:translate-x-1 active:translate-y-1 font-black text-sm`}
              >
                <User className="w-6 h-6" />
              </button>
              
              {showPersonalities && (
                <div className={`absolute right-0 mt-2 ${bgClass} border-4 ${borderClass} p-4 w-64 z-10`}>
                  <p className="font-black text-xs mb-3">SELECT PERSONALITY:</p>
                  <div className="space-y-2">
                    {Object.entries(PERSONALITIES).map(([key, value]) => (
                      <button
                        key={key}
                        onClick={() => changePersonality(key as keyof typeof PERSONALITIES)}
                        className={`w-full text-left p-2 border-2 ${borderClass} font-bold text-sm transition-all hover:translate-x-1 ${
                          personality === key ? (darkMode ? 'bg-white text-black' : 'bg-black text-white') : ''
                        }`}
                      >
                        {value.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-4 border-4 ${borderClass} ${darkMode ? 'bg-white text-black hover:bg-gray-200' : 'bg-black text-white hover:bg-gray-800'} transition-all active:translate-x-1 active:translate-y-1`}
            >
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Personality Badge */}
        <div className="mb-4">
          <span className={`inline-block px-3 py-1 border-2 ${borderClass} font-black text-xs`}>
            MODE: {PERSONALITIES[personality].name}
          </span>
        </div>

        {/* Chat Container */}
        <div className={`border-4 ${borderClass} ${bgClass}`}>
          {/* Messages */}
          <div className="h-[600px] overflow-y-auto p-8 space-y-6">
            {messages.length === 0 && (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="text-8xl font-black mb-4">?</div>
                  <p className="text-2xl font-bold">ASK ANYTHING</p>
                </div>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] ${msg.role === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`font-bold text-xs mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.role === 'user' ? 'YOU' : 'ASSISTANT'}
                  </div>
                  <div className={`p-4 border-4 ${
                    msg.role === 'user' ? userBgClass : assistantBgClass
                  }`}>
                    <p className="whitespace-pre-wrap break-words font-mono">{msg.content}</p>
                  </div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex gap-4">
                <div className="max-w-[70%]">
                  <div className="font-bold text-xs mb-2">ASSISTANT</div>
                  <div className={`p-4 border-4 ${assistantBgClass}`}>
                    <div className="flex gap-2">
                      <div className={`w-3 h-3 ${loadingDotClass} animate-pulse`}></div>
                      <div className={`w-3 h-3 ${loadingDotClass} animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
                      <div className={`w-3 h-3 ${loadingDotClass} animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className={`border-t-4 ${borderClass} p-6 ${inputContainerBg}`}>
            <div className="flex gap-4">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
                placeholder="TYPE MESSAGE..."
                disabled={loading}
                className={`flex-1 ${inputBgClass} border-4 px-4 py-3 font-mono font-bold focus:outline-none disabled:opacity-50`}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className={`${buttonBgClass} disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 font-black text-lg border-4 transition-all active:translate-x-1 active:translate-y-1`}
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-3">
          <div className="flex justify-between items-center font-mono text-sm font-bold">
            <div>POWERED BY GEMINI AI</div>
            <div>BUILT WITH NEXT.JS</div>
          </div>
          <div className="text-center font-mono text-sm">
            Made with ❤️ in Toronto, Canada 🇨🇦 by Alexander Wondwossen{' '}
            <a 
              href="https://github.com/alxgraphy" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-bold hover:underline"
            >
              (@alxgraphy)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}