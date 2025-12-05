import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, Sparkles, AlertCircle, BadgeCheck } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Habari! Mimi ni Dsn Ai. Naweza kukusaidia vipi kuhusu usalama wa mtandao, manenosiri, au maswali mengine yoyote ya teknolojia?'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Note: In a real production app, ensure the API Key is secured via backend proxy or strict constraints.
  // Using process.env.API_KEY as per standard requirement, but falling back to the user provided key for this demo context if env is missing.
  // Ideally, this key should be in .env.
  const API_KEY = process.env.API_KEY || "AIzaSyDQmipRoIhdhzhWfypKiMIGhWW1wUNvHUg";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'You are "Dsn Ai", a helpful cybersecurity assistant created by Dsn Technology for the "Password Generator" app. Respond in Swahili (Kiswahili) by default. Be professional, concise, and educational about tech, security, and passwords.',
        },
      });
      
      const response: GenerateContentResponse = await chat.sendMessage({ 
        message: input 
      });
      
      const text = response.text;

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: text || "Samahani, sikuweza kuelewa hilo.",
      };
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error("AI Error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Samahani, kuna tatizo la mtandao. Tafadhali jaribu tena.",
        isError: true
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 pb-20 pt-4">
      {/* Header */}
      <div className="px-5 pb-4 border-b border-slate-200 bg-white sticky top-0 z-10 pt-safe">
        <div className="flex items-center gap-3">
            <div className="bg-green-100 p-2 rounded-full">
                <Bot className="text-green-600" size={24} />
            </div>
            <div>
                <div className="flex items-center gap-1.5">
                    <h1 className="text-xl font-bold text-slate-800">Dsn Ai</h1>
                    <BadgeCheck size={18} className="text-blue-500" fill="#dbeafe" />
                </div>
                <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Ipo Hewani (Online)
                </p>
            </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 shadow-sm text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-800 text-white rounded-br-none'
                  : `bg-white text-slate-700 border border-slate-100 rounded-bl-none ${msg.isError ? 'text-red-500 bg-red-50' : ''}`
              }`}
            >
               {msg.role === 'model' && !msg.isError && (
                   <div className="flex items-center gap-1 mb-1 opacity-70">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dsn Ai</span>
                       <BadgeCheck size={12} className="text-blue-500" fill="#dbeafe" />
                   </div>
               )}
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm border border-slate-100">
                    <div className="flex items-center gap-1 mb-1 opacity-70">
                       <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Dsn Ai</span>
                       <BadgeCheck size={12} className="text-blue-500" fill="#dbeafe" />
                   </div>
                    <div className="flex gap-1.5 mt-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="px-4 py-3 bg-white border-t border-slate-200">
        <div className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Uliza chochote..."
            className="flex-1 bg-slate-100 border-none rounded-full px-5 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-green-500 text-white rounded-full p-3 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-md shadow-green-200"
          >
            <Send size={20} className={isLoading ? 'opacity-0' : 'opacity-100'} />
            {isLoading && <div className="absolute inset-0 m-auto w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;