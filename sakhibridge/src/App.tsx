/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ViewState, SupportCategoryType, Referral } from './types';
import { apiService } from './services/api';

// Navigation Components
import { Sidebar } from './components/navigation/Sidebar';
import { TopHeader } from './components/navigation/TopHeader';
import { MobileNav } from './components/navigation/MobileNav';

// View Components
import { DashboardView } from './views/DashboardView';
import { EmergencyView } from './views/EmergencyView';
import { SafeConfirmationView } from './views/SafeConfirmationView';
import { IncidentTimelineView } from './views/IncidentTimelineView';
import { SupportNavigatorView } from './views/SupportNavigatorView';
import { ConsentCenterView } from './views/ConsentCenterView';
import { ReferralTrackingView } from './views/ReferralTrackingView';
import { ProviderDirectoryView } from './views/ProviderDirectoryView';
import { AiNavigatorView } from './views/AiNavigatorView';
import { PrivacyView } from './views/PrivacyView';
import { SettingsProfileView } from './views/SettingsProfileView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedCategory, setSelectedCategory] =
    useState<SupportCategoryType | null>(null);
  const [activeReferralId, setActiveReferralId] = useState<string>('');
  const [postCrisisNotice, setPostCrisisNotice] = useState<boolean>(false);

  // Trigger Emergency Mode
  const handleTriggerEmergency = async () => {
    await apiService.startEmergency();
    setCurrentView('emergency');
  };

  // Safe confirmation requested
  const handleRequestSafeConfirmation = () => {
    setCurrentView('safe_confirmation');
  };

  // Confirmed safe
  const handleConfirmedSafe = async () => {
    await apiService.markSafe();
    setPostCrisisNotice(true);
    setCurrentView('timeline');
    setTimeout(() => {
      setPostCrisisNotice(false);
    }, 6000);
  };

  // Return to emergency if still in danger
  const handleReturnToEmergency = () => {
    setCurrentView('emergency');
  };

  // Support pathway selection
  const handleSelectCategory = (category: SupportCategoryType | null) => {
    setSelectedCategory(category);
    if (category) {
      setCurrentView('support_navigator');
    }
  };

  // Start referral pathway from detail
  const handleStartReferral = (category: SupportCategoryType) => {
    setSelectedCategory(category);
    setCurrentView('consent_center');
  };

  // Referral submitted from Consent Center
  const handleReferralSubmitted = (newReferral: Referral) => {
    setActiveReferralId(newReferral.id);
    setCurrentView('referral_tracking');
  };

  // Render Emergency Mode exclusively without standard chrome
  if (currentView === 'emergency') {
    return (
      <EmergencyView
        onMarkSafe={handleRequestSafeConfirmation}
        onExitEmergency={() => setCurrentView('dashboard')}
        onQuickExit={() => setCurrentView('dashboard')}
      />
    );
  }

  // Render Safe Confirmation exclusively
  if (currentView === 'safe_confirmation') {
    return (
      <SafeConfirmationView
        onConfirmSafe={handleConfirmedSafe}
        onReturnToEmergency={handleReturnToEmergency}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex font-sans antialiased">
      {/* Desktop Left Sidebar */}
      <Sidebar
        currentView={currentView}
        onNavigate={(view) => {
          if (view === 'support_navigator') {
            setSelectedCategory(null);
          }
          setCurrentView(view);
        }}
        onEmergencyTrigger={handleTriggerEmergency}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopHeader
          currentView={currentView}
          onNavigate={(view) => {
            if (view === 'support_navigator') {
              setSelectedCategory(null);
            }
            setCurrentView(view);
          }}
          onEmergencyTrigger={handleTriggerEmergency}
        />

        {/* Global Post-Crisis Smooth Transition Banner */}
        {postCrisisNotice && (
          <div className="bg-teal-50 border-b border-teal-200 px-4 py-3 text-xs text-teal-900 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-600" />
              <span>
                Safety verified. Your emergency event was recorded locally. Whenever you are ready, explore next steps in{' '}
                <button
                  onClick={() => setCurrentView('support_navigator')}
                  className="font-semibold underline hover:text-teal-950 cursor-pointer"
                >
                  Support Navigator
                </button>
                .
              </span>
            </div>
            <button
              onClick={() => setPostCrisisNotice(false)}
              className="text-teal-700 hover:text-teal-950 font-semibold px-2 py-0.5"
            >
              Dismiss
            </button>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {currentView === 'dashboard' && (
            <DashboardView
              onNavigate={(view) => setCurrentView(view)}
              onEmergencyTrigger={handleTriggerEmergency}
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentView('support_navigator');
              }}
            />
          )}

          {currentView === 'timeline' && <IncidentTimelineView />}

          {currentView === 'support_navigator' && (
            <SupportNavigatorView
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onStartReferral={handleStartReferral}
            />
          )}

          {currentView === 'consent_center' && (
            <ConsentCenterView
              category={selectedCategory || 'legal'}
              onSubmitted={handleReferralSubmitted}
              onGoBack={() => setCurrentView('support_navigator')}
            />
          )}

          {currentView === 'referral_tracking' && (
            <ReferralTrackingView
              initialReferralId={activeReferralId}
              onNavigateSupport={() => setCurrentView('support_navigator')}
            />
          )}

          {currentView === 'provider_directory' && (
            <ProviderDirectoryView
              onSelectProviderForReferral={handleStartReferral}
            />
          )}

          {currentView === 'ai_navigator' && (
            <AiNavigatorView
              onRouteToCategory={(cat) => {
                setSelectedCategory(cat);
                setCurrentView('support_navigator');
              }}
              onEmergencyTrigger={handleTriggerEmergency}
            />
          )}

          {currentView === 'privacy' && <PrivacyView />}

          {currentView === 'profile' && <SettingsProfileView />}
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav
          currentView={currentView}
          onNavigate={(view) => {
            if (view === 'support_navigator') {
              setSelectedCategory(null);
            }
            setCurrentView(view);
          }}
          onEmergencyTrigger={handleTriggerEmergency}
        />
      </div>
    </div>
  );
}
