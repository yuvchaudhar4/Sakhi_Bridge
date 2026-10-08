import React from 'react';
import { Home, Clock, Compass, Building2, User } from 'lucide-react';
import { ViewState } from '../../types';

interface MobileNavProps {
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onEmergencyTrigger: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({
  currentView,
  onNavigate,
  onEmergencyTrigger
}) => {
  const tabs: { id: ViewState; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'timeline', label: 'Journey', icon: Clock },
    { id: 'support_navigator', label: 'Support', icon: Compass },
    { id: 'provider_directory', label: 'Resources', icon: Building2 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-t border-stone-200/80 px-2 py-1.5 flex items-center justify-around safe-bottom">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive =
          currentView === tab.id ||
          (tab.id === 'support_navigator' &&
            (currentView === 'support_detail' ||
              currentView === 'consent_center' ||
              currentView === 'referral_tracking'));

        return (
          <button
            key={tab.id}
            onClick={() => onNavigate(tab.id)}
            className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-colors cursor-pointer ${
              isActive ? 'text-teal-800 font-semibold' : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-teal-700' : 'text-stone-500'}`} />
            <span className="text-[10px] mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
