import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RotateCcw,
  ChevronDown,
  PhoneCall,
  CheckCircle2,
  FileText,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}

export const LandAiChatbot: React.FC = () => {
  const { language, navigateTo } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text:
        language === 'bn'
          ? 'আসসালামু আলাইকুম! আমি বিডি ল্যান্ড গার্ড-এর স্মার্ট ভূমি সহকারী এআই।\n\nজমি সংক্রান্ত যেকোনো বিষয়ে প্রশ্ন করতে পারেন—যেমন:\n• **ই-নামজারি (জমাখারিজ)** করার নিয়ম ও সরকারি ফি\n• **খতিয়ান (CS, SA, RS, BS)** অনুসন্ধান ও পার্থক্য\n• **জমির দাগ নম্বর ও ডিজিটাল নকশা**\n• **জমি কেনার পূর্বে জরুরি ১০টি সতর্কতা**\n• **ভূমি উন্নয়ন কর (অনলাইন খাজনা দাখিলা)**\n\nকীভাবে সহায়তা করতে পারি?'
          : 'Welcome! I am the Smart Land AI Assistant for BD LAND GUARD.\n\nAsk any question regarding Bangladesh land affairs, such as:\n• e-Mutation procedures and official fees\n• Khatians (CS, SA, RS, BS) identification\n• Dag numbers and cadastral maps\n• Key checklists before purchasing land\n• Land Development Tax (ldtax.gov.bd)\n\nHow can I help you today?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    { label: 'ই-নামজারি করার নিয়ম ও ফি', query: 'ই-নামজারি করার নিয়ম, প্রয়োজনীয় কাগজপত্র ও সরকারি ফি কত?' },
    { label: 'খতিয়ানের প্রকারভেদ (CS, RS, BS)', query: 'সিএস, এসএ, আরএস ও বিএস খতিয়ানের মধ্যে পার্থক্য কি?' },
    { label: 'জমি কেনার আগে সতর্কতা', query: 'জমি কেনার আগে কী কী কাগজপত্র ও তথ্য যাচাই করতে হয়?' },
    { label: 'অনলাইনে খাজনা পরিশোধ', query: 'অনলাইনে জমির খাজনা ও ভূমি উন্নয়ন কর কিভাবে দেব?' },
    { label: 'জাল দলিলের প্রতিকার', query: 'জাল দলিল বা ভুয়া নামজারি হলে আইনি প্রতিকার কি?' }
  ];

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Network error');
      }

      const data = await response.json();
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'দুঃখিত, কোনো উত্তর পাওয়া যায়নি। ১৬১২২ হেল্পলাইনে যোগাযোগ করুন।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      // Local fallback in case network endpoint fails
      const fallbackReply = generateClientFallback(text);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateClientFallback = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('নামজারি') || q.includes('mutation')) {
      return `**ই-নামজারি (Mutation) সংক্রান্ত তথ্য:**\n\n১. **আবেদন পোর্টাল:** mutation.land.gov.bd\n২. **সরকারি ফি:** ১,১৭০ টাকা (কোর্ট ফি ২০, নোটিশ ৫০, রেকর্ড সংশোধন ১০০০, খতিয়ান ১০০)।\n৩. **সময়সীমা:** সর্বোচ্চ ২৮ কার্যদিবস।\n৪. **প্রয়োজনীয় কাগজ:** মূল দলিলের কপি, খতিয়ান, খাজনার দাখিলা ও ওয়ারিশান সনদ (প্রযোজ্য ক্ষেত্রে)।`;
    }
    if (q.includes('খতিয়ান') || q.includes('khatian') || q.includes('পরচা')) {
      return `**খতিয়ান পরিচিতি:**\n\n• **সিএস (CS):** ১৮৮৮-১৯৪০ সালের প্রথম ব্রিটিশ জরিপ।\n• **এসএ (SA):** ১৯৫৬-১৯৬২ সালের জমিদারী বিলুপ্তির জরিপ।\n• **আরএস (RS):** ভুল সংশোধনকারী নির্ভরযোগ্য রিভিশনাল জরিপ।\n• **সিটি/বিএস (BS):** আধুনিক কম্পিউটারাইজড রেকর্ড।\n\nঅনলাইনে অনুসন্ধান ও সার্টিফাইড কপির জন্য **eporcha.gov.bd** ব্যবহার করুন।`;
    }
    return `আপনার প্রশ্নের জন্য ধন্যবাদ। ভূমি সংক্রান্ত যেকোনো সহায়তায় ১৬১২২ কলসেন্টার অথবা নিকটস্থ উপজেলা সহকারী কমিশনার (ভূমি) কার্যালয়ে যোগাযোগ করতে পারেন।`;
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'bot',
        text: 'চ্যাট ইতিহাস রিসেট করা হয়েছে। নতুন প্রশ্ন লিখুন অথবা নিচের বোতাম থেকে বেছে নিন।',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="no-print fixed bottom-6 right-6 z-50 select-none">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-3 bg-[#006A4E] hover:bg-[#064E3B] text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-white/40"
          aria-label="Open AI Land Assistant"
        >
          {/* Glowing Avatar */}
          <div className="relative w-9 h-9 rounded-full bg-white text-[#006A4E] flex items-center justify-center font-bold shadow-xs">
            <Sparkles className="w-5 h-5 text-[#006A4E] animate-pulse" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#F42A41] rounded-full ring-2 ring-white" />
          </div>

          <div className="text-left pr-1">
            <div className="text-xs font-black tracking-tight leading-none flex items-center gap-1.5">
              <span>{language === 'bn' ? 'স্মার্ট ভূমি সহকারী এআই' : 'Smart Land AI Assistant'}</span>
            </div>
            <div className="text-[10px] text-emerald-200 mt-0.5">
              {language === 'bn' ? 'যেকোনো প্রশ্ন করুন · ১৬১২২' : '24/7 Land Q&A'}
            </div>
          </div>
        </button>
      )}

      {/* Floating Chat Drawer Window */}
      {isOpen && (
        <div className="w-[92vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-white rounded-3xl shadow-2xl border border-[#DCE6DF] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Chat Window Header (land.gov.bd theme) */}
          <div className="bg-linear-to-r from-[#006A4E] to-[#064E3B] text-white p-4 flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white border border-white/20">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-[#006A4E]" />
              </div>
              <div className="text-left">
                <div className="text-xs font-black tracking-tight leading-tight">
                  {language === 'bn' ? 'স্মার্ট ভূমি সহকারী AI' : 'Smart Land Assistant AI'}
                </div>
                <div className="text-[10px] text-emerald-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>{language === 'bn' ? 'অনলাইন · ভূমি মন্ত্রণালয় তথ্যসমৃদ্ধ' : 'Active Online · Land Knowledge Base'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleResetChat}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                title="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition-colors"
                title="Close Window"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Prompts Bar */}
          <div className="bg-[#F5F8F6] px-3 py-2 border-b border-[#DCE6DF] overflow-x-auto flex gap-1.5 text-left shrink-0 scrollbar-none">
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(q.query)}
                className="text-[11px] font-semibold text-[#17231E] bg-white hover:bg-[#EAEFEA] px-2.5 py-1 rounded-lg border border-[#DCE6DF] whitespace-nowrap shadow-2xs transition-colors shrink-0"
              >
                {q.label}
              </button>
            ))}
          </div>

          {/* Message Stream Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-linear-to-b from-white to-[#F5F8F6]/50 text-left">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-[#006A4E] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#006A4E] text-white rounded-br-none shadow-xs'
                      : 'bg-white text-[#17231E] border border-[#DCE6DF] rounded-bl-none shadow-xs'
                  }`}
                >
                  <div className="whitespace-pre-line font-medium">
                    {msg.text}
                  </div>
                  <div
                    className={`text-[9px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-emerald-200' : 'text-[#68766F]'
                    }`}
                  >
                    {msg.timestamp}
                  </div>
                </div>

                {msg.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-gray-200 text-gray-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-2.5 items-center text-xs text-[#68766F]">
                <div className="w-7 h-7 rounded-lg bg-[#006A4E] text-white flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="bg-white p-3 rounded-2xl border border-[#DCE6DF] flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#006A4E] animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-[#006A4E] animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-[#006A4E] animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[11px] text-[#68766F] ml-1">তথ্য যাচাই ও প্রস্তুত হচ্ছে...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Helpline & Input Box */}
          <div className="p-3 bg-white border-t border-[#DCE6DF] space-y-2">
            <div className="flex items-center justify-between text-[10px] text-[#68766F] px-1">
              <span>জরুরি ভূমি কলসেন্টার: <strong>১৬১২২</strong></span>
              <span>land.gov.bd ভিত্তিক এআই মডেল</span>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="জমি, খতিয়ান বা নামজারি সংক্রান্ত প্রশ্ন লিখুন..."
                disabled={isLoading}
                className="flex-1 bg-[#F5F8F6] border border-[#DCE6DF] rounded-2xl px-3.5 py-2.5 text-xs text-[#17231E] focus:outline-hidden focus:ring-2 focus:ring-[#006A4E] disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isLoading}
                className="w-9 h-9 rounded-2xl bg-[#006A4E] hover:bg-[#064E3B] text-white flex items-center justify-center transition-colors disabled:opacity-40 shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
