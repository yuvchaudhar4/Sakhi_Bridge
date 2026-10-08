import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  ArrowRight,
  ShieldAlert,
  Info,
  Compass,
  Scale,
  Stethoscope,
  HeartPulse,
  Home,
  FileText
} from 'lucide-react';
import { ChatMessage, SupportCategoryType } from '../types';

interface AiNavigatorViewProps {
  onRouteToCategory: (category: SupportCategoryType) => void;
  onEmergencyTrigger: () => void;
}

export const AiNavigatorView: React.FC<AiNavigatorViewProps> = ({
  onRouteToCategory,
  onEmergencyTrigger
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "Hello Ananya. I am your SAKHIBRIDGE Navigator. I can help clarify available support pathways, explain legal and medical rights, and guide you through choosing what information to share. You remain in complete control of every decision.",
      timestamp: 'Just now'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    { label: "I need legal support.", category: 'legal' as SupportCategoryType },
    { label: "I need medical support.", category: 'medical' as SupportCategoryType },
    { label: "I want to understand my options.", category: null },
    { label: "I need counselling.", category: 'counselling' as SupportCategoryType },
    { label: "I need safe accommodation.", category: 'accommodation' as SupportCategoryType }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateNavigatorResponse = (userText: string) => {
    const textLower = userText.toLowerCase();

    // Check emergency triggers first
    if (
      textLower.includes('emergency') ||
      textLower.includes('danger') ||
      textLower.includes('threat') ||
      textLower.includes('kill') ||
      textLower.includes('hurt') ||
      textLower.includes('right now')
    ) {
      return {
        text: "If you are in immediate physical danger, please prioritize your safety right now. SAKHIBRIDGE provides direct dialers to 112 (National Emergency) and 1091 (Women Helpline) in Emergency Mode. I am an informational navigator and cannot dispatch police or emergency responders.",
        suggestedAction: {
          label: 'Open Emergency Mode Now',
          targetView: 'emergency'
        }
      };
    }

    if (textLower.includes('legal') || textLower.includes('law') || textLower.includes('court') || textLower.includes('fir') || textLower.includes('divorce') || textLower.includes('order')) {
      return {
        text: "Legal aid can provide protection orders, confidential consultations with women advocates, and explain rights without forcing you to file an FIR or go to court. You can share as little or as much context as you want using our Consent Center.",
        suggestedAction: {
          label: 'Start Legal Support Pathway',
          targetView: 'legal'
        }
      };
    }

    if (textLower.includes('medical') || textLower.includes('doctor') || textLower.includes('hospital') || textLower.includes('injury') || textLower.includes('pep') || textLower.includes('clinic')) {
      return {
        text: "Trauma-informed medical care and forensic evaluations are available through One-Stop Crisis Centers (OSCC). Care is confidential and prioritizes your immediate physical comfort, prophylactic medicines, and emotional recovery.",
        suggestedAction: {
          label: 'Start Medical Support Pathway',
          targetView: 'medical'
        }
      };
    }

    if (textLower.includes('counsel') || textLower.includes('mental') || textLower.includes('therapy') || textLower.includes('anxiety') || textLower.includes('scared') || textLower.includes('stress')) {
      return {
        text: "Emotional trauma impacts the nervous system. Certified trauma counselors offer private sessions (via phone, video, or in person) focused on grounding, emotional regulation, and non-judgmental listening.",
        suggestedAction: {
          label: 'Start Counselling Pathway',
          targetView: 'counselling'
        }
      };
    }

    if (textLower.includes('shelter') || textLower.includes('accommodation') || textLower.includes('stay') || textLower.includes('home') || textLower.includes('leave') || textLower.includes('place')) {
      return {
        text: "Safe accommodation networks provide confidential, secure shelters with perimeter security, meals, and accommodations for children. Locations are strictly undisclosed to maintain universal resident safety.",
        suggestedAction: {
          label: 'Explore Safe Accommodation',
          targetView: 'accommodation'
        }
      };
    }

    if (textLower.includes('money') || textLower.includes('bank') || textLower.includes('job') || textLower.includes('financial') || textLower.includes('work')) {
      return {
        text: "Long-term independence often requires financial self-sufficiency. Pathways include private bank account opening, emergency micro-relocation stipends, and dignified employment training.",
        suggestedAction: {
          label: 'Explore Financial & Work Support',
          targetView: 'financial'
        }
      };
    }

    return {
      text: "You have several self-directed options: Medical care for trauma, Legal support for protection and rights, Counselling for emotional stabilization, Safe accommodation for immediate housing, or the Documentation Vault to preserve evidence locally.",
      suggestedAction: {
        label: 'View Support Pathways',
        targetView: 'support_navigator'
      }
    };
  };

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query.trim(),
      timestamp: 'Just now'
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateNavigatorResponse(query);
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'assistant',
        text: response.text,
        timestamp: 'Just now',
        suggestedAction: response.suggestedAction
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-16 flex flex-col h-[calc(100vh-8rem)]">
      {/* Top Title Banner */}
      <section className="space-y-1 pt-2 border-b border-stone-200/80 pb-4 shrink-0">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <Sparkles className="w-3.5 h-3.5 text-teal-700" />
          <span>AI Navigator</span>
          <span aria-hidden="true">·</span>
          <span>Decision Support</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
          Find your next step.
        </h1>
        <p className="text-xs sm:text-sm text-stone-600">
          Tell me what kind of support you're looking for.
        </p>
      </section>

      {/* Strict Ethical Boundary Notice (Section 15) */}
      <div className="p-3 bg-stone-100/90 rounded-xl border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5 shrink-0">
        <Info className="w-4 h-4 text-teal-800 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <span className="font-semibold text-stone-800">
            Navigator Principle:
          </span>{' '}
          AI helps organize information and explain options. You remain in control.
          SAKHIBRIDGE AI does not diagnose, make legal decisions, or contact emergency institutions.
        </p>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-4 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${
              m.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-xl p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-stone-900 text-white rounded-br-xs'
                  : 'bg-white border border-stone-200/90 text-stone-800 shadow-2xs rounded-bl-xs'
              }`}
            >
              <p>{m.text}</p>

              {m.suggestedAction && (
                <div className="mt-3 pt-3 border-t border-stone-100">
                  <button
                    onClick={() => {
                      if (m.suggestedAction?.targetView === 'emergency') {
                        onEmergencyTrigger();
                      } else if (
                        ['legal', 'medical', 'counselling', 'accommodation', 'financial', 'documentation'].includes(
                          m.suggestedAction?.targetView || ''
                        )
                      ) {
                        onRouteToCategory(
                          m.suggestedAction?.targetView as SupportCategoryType
                        );
                      }
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-teal-900 bg-teal-50 hover:bg-teal-100 rounded-lg border border-teal-200 transition-colors cursor-pointer"
                  >
                    <span>{m.suggestedAction.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] text-stone-400 mt-1 px-1 font-mono">
              {m.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 bg-white rounded-xl border border-stone-200 w-24">
            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce" />
            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]" />
            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]" />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts (Section 15) */}
      <div className="space-y-2 shrink-0">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-stone-400">
          Suggested Inquiries:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {suggestedPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.label)}
              className="text-xs px-3 py-1.5 rounded-lg bg-white hover:bg-stone-50 border border-stone-200 text-stone-700 transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Text Input Row */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center gap-2 pt-2 border-t border-stone-200 shrink-0"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question or explain what support you need..."
          className="flex-1 p-3 text-xs sm:text-sm bg-white rounded-xl border border-stone-200 focus:outline-none focus:ring-1 focus:ring-stone-900 shadow-2xs text-stone-900 placeholder:text-stone-400"
        />
        <button
          type="submit"
          disabled={!input.trim()}
          className="p-3 bg-stone-900 hover:bg-stone-800 disabled:bg-stone-300 text-white rounded-xl transition-colors cursor-pointer"
          title="Send query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
