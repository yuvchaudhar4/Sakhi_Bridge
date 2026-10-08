import React from 'react';
import {
  Home,
  Clock,
  Compass,
  Building2,
  Sparkles,
  ShieldCheck,
  User,
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { ViewState } from '../../types';

interface SidebarProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onEmergencyTrigger: () => void;
  pendingReferralCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
  onEmergencyTrigger,
  pendingReferralCount = 1
}) => {
  const navItems: {
    id: ViewState;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: number;
  }[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'timeline', label: 'My Journey', icon: Clock },
    { id: 'support_navigator', label: 'Support', icon: Compass },
    { id: 'provider_directory', label: 'Resources', icon: Building2 },
    { id: 'ai_navigator', label: 'AI Navigator', icon: Sparkles },
    { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <aside className="w-64 h-screen bg-[#FAF9F6] border-r border-stone-200/80 flex flex-col justify-between p-5 select-none shrink-0 sticky top-0 hidden lg:flex">
      <div>
        {/* Logo and core principle */}
        <div className="pb-6 mb-4 border-b border-stone-200/70">
          <Logo size="md" showTagline={true} />
          <div className="mt-3.5 px-2.5 py-1.5 bg-stone-100/80 rounded-md border border-stone-200/60">
            <p className="text-[11px] font-medium text-stone-600 leading-tight">
              "I choose what happens next."
            </p>
          </div>
        </div>

        {/* HELP NOW - Distinct, permanent, dignified, calm yet urgent */}
        <div className="mb-6">
          <button
            onClick={onEmergencyTrigger}
            className="w-full group flex items-center justify-between px-3.5 py-3 rounded-xl bg-stone-900 hover:bg-stone-800 text-white transition-all shadow-sm hover:shadow active:scale-[0.99] border border-stone-800 cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping group-hover:scale-110" />
              <div className="text-left">
                <span className="block text-xs font-semibold tracking-wider uppercase text-rose-300">
                  Crisis Mode
                </span>
                <span className="text-sm font-medium text-stone-100">
                  HELP NOW
                </span>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-200 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-wider text-stone-400 px-3 pb-1.5">
            Platform Navigation
          </p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              currentView === item.id ||
              (item.id === 'support_navigator' &&
                (currentView === 'support_detail' ||
                  currentView === 'consent_center' ||
                  currentView === 'referral_tracking'));

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-stone-200/70 text-stone-900 font-semibold'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-teal-700' : 'text-stone-500'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && item.badge > 0 ? (
                  <span className="text-[11px] font-mono font-medium text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200/60">
                    {item.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </nav>
      </div>

      {/* User snapshot and privacy status */}
      <div className="pt-4 border-t border-stone-200/70">
        <div className="flex items-center justify-between px-2 py-2 rounded-lg bg-white/70 border border-stone-200/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-stone-800 text-stone-100 flex items-center justify-center text-xs font-semibold">
              AS
            </div>
            <div className="text-left">
              <p className="text-xs font-medium text-stone-900 leading-tight">
                Ananya Sharma
              </p>
              <p className="text-[10px] text-stone-500">Data self-controlled</p>
            </div>
          </div>
          <button
            onClick={() => onNavigate('privacy')}
            className="text-stone-400 hover:text-stone-700 p-1 rounded"
            title="Manage Privacy"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-teal-700" />
          </button>
        </div>
        <p className="text-[10px] text-stone-400 text-center mt-3">
          SAKHIBRIDGE Prototype · v1.0
        </p>
      </div>
    </aside>
  );
};
