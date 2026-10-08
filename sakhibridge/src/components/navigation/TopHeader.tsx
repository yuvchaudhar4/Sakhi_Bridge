import React from 'react';
import { Logo } from '../common/Logo';
import { QuickExitButton } from '../common/QuickExitButton';
import { ViewState } from '../../types';
import { Shield, Sparkles, ChevronRight } from 'lucide-react';

interface TopHeaderProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onEmergencyTrigger: () => void;
  onQuickExit?: () => void;
}

export const TopHeader: React.FC<TopHeaderProps> = ({
  currentView,
  onNavigate,
  onEmergencyTrigger,
  onQuickExit
}) => {
  const getBreadcrumbTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Overview';
      case 'timeline':
        return 'My Journey & Timeline';
      case 'support_navigator':
        return 'Support Navigator';
      case 'support_detail':
        return 'Support Pathway';
      case 'consent_center':
        return 'Consent Center';
      case 'referral_tracking':
        return 'Referral Status';
      case 'provider_directory':
        return 'Resource Directory';
      case 'ai_navigator':
        return 'AI Navigator';
      case 'privacy':
        return 'Privacy & Data Governance';
      case 'profile':
        return 'Account & Emergency Contacts';
      case 'emergency':
        return 'Emergency Mode';
      case 'safe_confirmation':
        return 'Safety Confirmation';
      default:
        return 'Workspace';
    }
  };

  return (
    <header className="h-16 bg-[#FAF9F6]/90 backdrop-blur-sm border-b border-stone-200/80 sticky top-0 z-30 px-4 sm:px-6 flex items-center justify-between">
      {/* Zone 1: Brand (Mobile) or Breadcrumb (Desktop) */}
      <div className="flex items-center gap-3">
        <div className="lg:hidden">
          <Logo size="sm" showTagline={false} />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-xs text-stone-500 font-medium">
          <span
            onClick={() => onNavigate('dashboard')}
            className="hover:text-stone-900 cursor-pointer"
          >
            SAKHIBRIDGE
          </span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900 font-semibold">{getBreadcrumbTitle()}</span>
        </div>
      </div>

      {/* Zone 2: Navigation / Contextual quiet indicators */}
      <div className="hidden md:flex items-center gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-stone-100/80 border border-stone-200/60">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-600" />
          <span>Active Case #SB-1024</span>
          <span className="text-stone-300">|</span>
          <span className="text-stone-600 font-medium">Legal Referral</span>
        </div>
      </div>

      {/* Zone 3: 1-2 Primary Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        <QuickExitButton onTrigger={onQuickExit} />

        {/* HELP NOW accessible button on top bar */}
        <button
          onClick={onEmergencyTrigger}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors whitespace-nowrap cursor-pointer"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
          <span>HELP NOW</span>
        </button>

        {/* User quick avatar */}
        <button
          onClick={() => onNavigate('profile')}
          className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-xs font-semibold text-stone-700 transition-colors cursor-pointer"
          title="User Profile"
        >
          AS
        </button>
      </div>
    </header>
  );
};
