import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, User, Minimize2 } from 'lucide-react';
import { api } from '../../services/api';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Namaskara! 🙏 Welcome to Sri Vidya International Pre-University College. I am **VidyaBot**, your 24/7 AI Academic and Admissions Counselor. How can I help you today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickPrompts = [
    "What streams and combinations are available?",
    "Tell me about KCET & NEET coaching",
    "What is the fee structure?",
    "How do I apply for 2026-2027 admissions?",
    "Tell me about campus hostel & buses"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (messageText) => {
    const query = messageText || input;
    if (!query.trim() || loading) return;

    const userMsg = { id: Date.now(), sender: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const data = await api.sendChatQuery(query);
      const botMsg = { id: Date.now() + 1, sender: 'bot', text: data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = { 
        id: Date.now() + 1, 
        sender: 'bot', 
        text: "I am having temporary trouble reaching the admissions server. Please call our campus helpline at +91 80 2845 7890 or submit an online enquiry!" 
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-navy-950 via-navy-900 to-navy-800 text-white rounded-full shadow-2xl hover:shadow-gold-500/20 border border-gold-500/50 hover:scale-105 transition-all duration-300"
          aria-label="Open VidyaBot AI Counselor"
        >
          <div className="w-8 h-8 rounded-full bg-gold-500/20 flex items-center justify-center text-gold-400">
            <Bot className="w-5 h-5" />
          </div>
          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold leading-none flex items-center gap-1">
              <span>VidyaBot AI</span>
              <Sparkles className="w-3 h-3 text-gold-400" />
            </div>
            <div className="text-[10px] text-slate-300">College Admissions Guide</div>
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gold-500"></span>
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[560px] max-h-[85vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-navy-950 to-navy-900 text-white p-4 flex items-center justify-between border-b border-navy-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400 shadow-sm">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-1.5 font-serif">
                  <span>VidyaBot Counselor</span>
                  <span className="text-[10px] bg-emerald-900/80 text-emerald-300 border border-emerald-600/40 px-1.5 py-0.2 rounded-full font-sans">Online</span>
                </h3>
                <p className="text-[11px] text-slate-300">Sri Vidya PU College AI Helpdesk</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-navy-800 transition"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50 text-xs">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center shrink-0 text-xs font-bold border border-gold-500/30">
                    SV
                  </div>
                )}
                <div
                  className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-navy-900 text-white rounded-tr-none'
                      : 'bg-white text-slate-800 shadow-sm border border-slate-200/80 rounded-tl-none whitespace-pre-line'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 justify-start items-center text-slate-400 text-xs italic py-1">
                <div className="w-7 h-7 rounded-full bg-navy-900 text-gold-400 flex items-center justify-center shrink-0">
                  <Bot className="w-4 h-4 animate-spin" />
                </div>
                <span>VidyaBot is thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-slate-100/90 border-t border-slate-200 flex gap-1.5 overflow-x-auto text-[11px] no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="whitespace-nowrap bg-white hover:bg-gold-50 hover:text-gold-900 hover:border-gold-300 text-slate-700 px-2.5 py-1 rounded-full border border-slate-300 transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form
            onSubmit={(e) => { e.preventDefault(); handleSend(); }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about admissions, cutoffs, syllabus, fees..."
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-navy-900 focus:ring-1 focus:ring-navy-900"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 bg-navy-950 text-gold-400 rounded-xl hover:bg-navy-900 disabled:opacity-50 transition shrink-0"
              aria-label="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

