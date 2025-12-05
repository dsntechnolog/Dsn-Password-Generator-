import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Download, SlidersHorizontal, Settings2, FileText, X, Sparkles, BrainCircuit, Check } from 'lucide-react';
import { GoogleGenAI, Type, Schema } from "@google/genai";
import { PasswordOptions, PasswordType, AISuggestion } from '../types';
import { generatePassword, calculateStrength, downloadPassword } from '../utils/passwordUtils';
import Toggle from '../components/Toggle';

const Home: React.FC = () => {
  const [password, setPassword] = useState('');
  const [options, setOptions] = useState<PasswordOptions>({
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    type: PasswordType.RANDOM,
  });

  const [strength, setStrength] = useState({ score: 0, text: '', color: '' });
  const [copied, setCopied] = useState(false);
  
  // Download Modal State
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [filename, setFilename] = useState('my_secure_password');

  // AI Modal State
  const [showAIModal, setShowAIModal] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<AISuggestion[]>([]);

  useEffect(() => {
    handleGenerate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]); // Regenerate when options change

  const handleGenerate = () => {
    const newPass = generatePassword(options);
    setPassword(newPass);
    setStrength(calculateStrength(newPass));
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownloadConfirm = () => {
    downloadPassword(password, filename);
    setShowDownloadModal(false);
  };

  const handleAISuggest = async () => {
    setShowAIModal(true);
    setAiLoading(true);
    setAiSuggestions([]);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const schema: Schema = {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            password: { type: Type.STRING, description: "The generated password" },
            type: { type: Type.STRING, description: "Short label like 'Phonetic', 'High Entropy', or 'Pattern-Free'" },
            explanation: { type: Type.STRING, description: "Brief explanation of why this is secure" }
          },
          required: ["password", "type", "explanation"],
        }
      };

      const prompt = `Generate 3 distinct, highly secure password variations based on these constraints:
      - Length: ${options.length}
      - Include Uppercase: ${options.uppercase}
      - Include Numbers: ${options.numbers}
      - Include Symbols: ${options.symbols}
      
      1. One should be 'Phonetic' (pronounceable but complex).
      2. One should be 'High Entropy' (completely random distribution).
      3. One should be 'Pattern-Free' (avoids common keyboard walks).
      
      Ensure they strictly follow the length constraint.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: schema,
        },
      });

      if (response.text) {
        const suggestions = JSON.parse(response.text) as AISuggestion[];
        setAiSuggestions(suggestions);
      }
    } catch (error) {
      console.error("AI Generation Error", error);
      // Fallback or error state could go here, for now we just stop loading
    } finally {
      setAiLoading(false);
    }
  };

  const applySuggestion = (suggestion: string) => {
    setPassword(suggestion);
    setStrength(calculateStrength(suggestion));
    setCopied(false);
    setShowAIModal(false);
  };

  const renderPassword = () => {
    return password.split('').map((char, index) => {
      let colorClass = 'text-slate-700';
      if (/[0-9]/.test(char)) colorClass = 'text-blue-500';
      else if (/[^A-Za-z0-9]/.test(char)) colorClass = 'text-purple-500';
      else if (/[A-Z]/.test(char)) colorClass = 'text-orange-500';

      return <span key={index} className={colorClass}>{char}</span>;
    });
  };

  return (
    <div className="pb-24 pt-8 px-5 max-w-md mx-auto min-h-screen bg-slate-50 relative">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Password Generator</h1>
        <p className="text-slate-400 text-xs mt-1 uppercase tracking-wider font-semibold">Secure & Private</p>
      </div>

      {/* Display Box */}
      <div className="bg-white rounded-3xl p-6 shadow-xl shadow-slate-200/50 mb-6 border border-slate-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1 h-full bg-green-500"></div>
        <div className="text-center mb-4 break-all font-mono text-2xl font-semibold tracking-wide min-h-[32px] flex flex-wrap justify-center items-center">
          {renderPassword()}
        </div>
        <div className="flex justify-center items-center gap-2 mt-4">
           <div className={`h-1.5 rounded-full transition-all duration-500 ${strength.score >= 1 ? 'w-full bg-red-400' : 'w-2 bg-slate-200'} flex-1`}></div>
           <div className={`h-1.5 rounded-full transition-all duration-500 ${strength.score >= 3 ? 'w-full bg-yellow-400' : 'w-2 bg-slate-200'} flex-1`}></div>
           <div className={`h-1.5 rounded-full transition-all duration-500 ${strength.score >= 5 ? 'w-full bg-green-500' : 'w-2 bg-slate-200'} flex-1`}></div>
        </div>
        <p className={`text-center text-xs font-medium mt-3 transition-colors ${strength.color}`}>
          {strength.text}
        </p>
      </div>

      {/* Main Actions */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <button
          onClick={handleGenerate}
          className="flex items-center justify-center gap-2 bg-slate-800 active:bg-slate-900 text-white py-3.5 px-4 rounded-2xl shadow-lg shadow-slate-800/20 transition-transform active:scale-95"
        >
          <RefreshCw size={18} strokeWidth={2.5} />
          <span className="font-semibold text-sm">Generate</span>
        </button>

        <button
          onClick={handleCopy}
          className={`flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl shadow-lg transition-all active:scale-95 ${
            copied ? 'bg-green-100 text-green-700' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
          }`}
        >
          {copied ? <span className="font-bold">Copied!</span> : (
            <>
              <Copy size={18} strokeWidth={2.5} />
              <span className="font-semibold text-sm">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* AI Suggest Button */}
      <button
        onClick={handleAISuggest}
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-3 px-4 rounded-2xl shadow-lg shadow-purple-200 transition-transform active:scale-95 mb-8"
      >
        <Sparkles size={18} strokeWidth={2.5} className="text-yellow-300" />
        <span className="font-semibold text-sm">Smart Suggest with AI</span>
      </button>

       {/* Type Selector */}
       <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
            <Settings2 size={16} className="text-slate-400"/>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Password Type</h3>
        </div>
        <div className="flex bg-slate-100 p-1 rounded-xl">
          {Object.values(PasswordType).map((type) => (
            <button
              key={type}
              onClick={() => setOptions({ ...options, type })}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${
                options.type === type
                  ? 'bg-white text-slate-800 shadow-sm'
                  : 'text-slate-500 hover:text-slate-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 mb-6">
        <div className="flex items-center gap-2 mb-4">
            <SlidersHorizontal size={16} className="text-slate-400"/>
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parameters</h3>
        </div>
        
        <div className="mb-4 px-1">
             <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Length</span>
                <span className="text-blue-600">{options.length}</span>
             </div>
             <input 
                type="range" 
                min="6" 
                max="32" 
                value={options.length} 
                onChange={(e) => setOptions({...options, length: parseInt(e.target.value)})}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
             />
        </div>

        <Toggle label="Lowercase (a-z)" checked={options.lowercase} onChange={(v) => setOptions({...options, lowercase: v})} />
        <Toggle label="Uppercase (A-Z)" checked={options.uppercase} onChange={(v) => setOptions({...options, uppercase: v})} />
        <Toggle label="Numbers (0-9)" checked={options.numbers} onChange={(v) => setOptions({...options, numbers: v})} />
        <Toggle label="Symbols (!@#)" checked={options.symbols} onChange={(v) => setOptions({...options, symbols: v})} />
      </div>

      {/* Download */}
      <button
        onClick={() => setShowDownloadModal(true)}
        className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-600 font-semibold py-4 rounded-2xl hover:bg-slate-50 active:scale-95 transition-all mb-4"
      >
        <Download size={20} />
        Download as .txt
      </button>

      {/* Download Modal Overlay */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowDownloadModal(false)}
          />
          <div className="bg-white w-full max-w-sm rounded-[2rem] p-6 shadow-2xl relative z-10 transform transition-all scale-100">
            
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                 <div className="bg-green-100 p-2.5 rounded-full text-green-600">
                   <FileText size={24} />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-slate-800 leading-tight">Save Password</h3>
                   <p className="text-xs text-slate-500 font-medium">Download to device</p>
                 </div>
              </div>
              <button 
                onClick={() => setShowDownloadModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={24} />
              </button>
            </div>

            <div className="mb-6">
               <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">Filename</label>
               <input 
                 type="text" 
                 value={filename}
                 onChange={(e) => setFilename(e.target.value)}
                 className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 transition-all placeholder-slate-400"
                 placeholder="Enter filename"
                 autoFocus
               />
               <p className="text-right text-xs text-slate-400 mt-2 font-medium">.txt will be added automatically</p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDownloadModal(false)}
                className="flex-1 py-3.5 text-slate-600 font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDownloadConfirm}
                className="flex-1 py-3.5 text-white font-bold bg-green-500 rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200 flex justify-center items-center gap-2"
              >
                <Download size={18} strokeWidth={2.5} />
                Download
              </button>
            </div>

          </div>
        </div>
      )}

      {/* AI Suggestion Modal */}
      {showAIModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setShowAIModal(false)}
          />
          <div className="bg-slate-50 w-full max-w-sm rounded-t-[2rem] sm:rounded-[2rem] p-6 shadow-2xl relative z-10 transform transition-all scale-100 max-h-[90vh] overflow-y-auto">
            
            <div className="flex justify-between items-center mb-6 sticky top-0 bg-slate-50 pb-2 z-20">
              <div className="flex items-center gap-3">
                 <div className="bg-purple-100 p-2.5 rounded-full text-purple-600">
                   <BrainCircuit size={24} />
                 </div>
                 <div>
                   <h3 className="text-lg font-bold text-slate-800 leading-tight">AI Security Expert</h3>
                   <p className="text-xs text-slate-500 font-medium">Smart variations</p>
                 </div>
              </div>
              <button 
                onClick={() => setShowAIModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X size={24} />
              </button>
            </div>

            {aiLoading ? (
               <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="w-12 h-12 border-4 border-purple-100 border-t-purple-600 rounded-full animate-spin"></div>
                    <Sparkles size={16} className="text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" fill="currentColor" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-600 animate-pulse">Analyzing patterns...</p>
               </div>
            ) : (
              <div className="space-y-3">
                 {aiSuggestions.map((item, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:border-purple-200 transition-colors group cursor-pointer" onClick={() => applySuggestion(item.password)}>
                        <div className="flex justify-between items-start mb-2">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 text-[10px] font-bold uppercase tracking-wider">{item.type}</span>
                            <div className="w-5 h-5 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-purple-500 group-hover:bg-purple-500 transition-colors">
                                <Check size={12} className="text-white opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                        <p className="font-mono text-lg font-semibold text-slate-800 break-all mb-2">{item.password}</p>
                        <p className="text-xs text-slate-500 leading-relaxed">{item.explanation}</p>
                    </div>
                 ))}
                 
                 <div className="mt-4 pt-2 text-center">
                    <p className="text-xs text-slate-400">Tap any card to use that password.</p>
                 </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;