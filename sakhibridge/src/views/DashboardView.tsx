import React from 'react';
import {
  ChevronRight,
  Shield,
  Scale,
  Stethoscope,
  HeartPulse,
  Home,
  FileText,
  Coins,
  ArrowRight,
  Lock,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { ViewState, SupportCategoryType } from '../types';

interface DashboardViewProps {
  onNavigate: (view: ViewState) => void;
  onEmergencyTrigger: () => void;
  onSelectCategory: (category: SupportCategoryType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  onEmergencyTrigger,
  onSelectCategory
}) => {
  const supportCategories = [
    {
      id: 'medical' as SupportCategoryType,
      title: 'Medical Support',
      description: 'Discreet trauma care, clinical evaluation, and health triage.',
      icon: Stethoscope,
      timeframe: 'Immediate · 24/7'
    },
    {
      id: 'legal' as SupportCategoryType,
      title: 'Legal Support',
      description: 'Protection order guidance, legal aid counsel, and rights exploration.',
      icon: Scale,
      timeframe: 'Intake in 24h'
    },
    {
      id: 'counselling' as SupportCategoryType,
      title: 'Counselling',
      description: 'Trauma-informed psychological counseling and emotional grounding.',
      icon: HeartPulse,
      timeframe: 'Scheduled session'
    },
    {
      id: 'accommodation' as SupportCategoryType,
      title: 'Safe Accommodation',
      description: 'Emergency shelter pathways and secured transitional housing.',
      icon: Home,
      timeframe: 'Same-day intake'
    },
    {
      id: 'documentation' as SupportCategoryType,
      title: 'Documentation',
      description: 'Organize incident logs, encrypted photos, and timestamped records.',
      icon: FileText,
      timeframe: 'Self-directed vault'
    },
    {
      id: 'financial' as SupportCategoryType,
      title: 'Financial / Work',
      description: 'Independent bank setup, emergency micro-grants, and career stability.',
      icon: Coins,
      timeframe: 'Resilience pathway'
    }
  ];

  const journeySteps = [
    { label: 'Emergency', status: 'completed' },
    { label: 'Safe', status: 'completed' },
    { label: 'Support', status: 'completed' },
    { label: 'Referral', status: 'active' },
    { label: 'Follow-up', status: 'upcoming' },
    { label: 'Recovery', status: 'upcoming' }
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Welcome Section */}
      <section className="space-y-1.5 pt-2">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>Good morning, Ananya</span>
          <span aria-hidden="true">·</span>
          <span>Verified Session</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900 text-balance">
          You're in control.
        </h1>
        <p className="text-sm text-stone-600 max-w-xl">
          Access help quickly or continue your chosen support journey at your own pace.
        </p>
      </section>

      {/* Primary Emergency Area: High visibility, dignified, calm */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-7 border border-stone-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-lg">
            <div className="flex items-center gap-2 text-xs font-medium text-rose-400">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="uppercase tracking-wider font-semibold">Immediate Assistance</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Need help right now?
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              Activate emergency mode to access verified direct hotlines, assemble local safety context, and notify your trusted contacts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <button
              onClick={onEmergencyTrigger}
              className="px-6 py-3.5 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-[0.99] text-white font-semibold text-sm transition-all shadow-md hover:shadow-rose-900/30 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>HELP NOW</span>
            </button>
            <span className="text-[11px] text-stone-400 text-center sm:text-left self-center">
              Quick access to emergency support
            </span>
          </div>
        </div>
      </section>

      {/* YOUR SUPPORT JOURNEY: Progress Visualization */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200/80 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-stone-100 pb-4">
          <div>
            <h2 className="text-base font-semibold text-stone-900">
              Your Support Journey
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              From crisis to recovery and independence — you dictate every stage.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-stone-600">
            <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
            <span className="font-medium text-stone-800">Current Phase: Referral In Progress</span>
          </div>
        </div>

        {/* Horizontal Progress Flow */}
        <div className="relative pt-2 pb-1 overflow-x-auto">
          <div className="flex items-center justify-between min-w-[580px] gap-2">
            {journeySteps.map((step, idx) => {
              const isCompleted = step.status === 'completed';
              const isActive = step.status === 'active';
              const isUpcoming = step.status === 'upcoming';

              return (
                <div key={step.label} className="flex-1 flex flex-col items-center text-center relative group">
                  {/* Step Connector Line */}
                  {idx < journeySteps.length - 1 && (
                    <div
                      className={`absolute top-3.5 left-1/2 w-full h-[2px] -z-0 ${
                        isCompleted ? 'bg-teal-600' : 'bg-stone-200'
                      }`}
                    />
                  )}

                  {/* Step Node */}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium z-10 transition-all ${
                      isCompleted
                        ? 'bg-teal-700 text-white'
                        : isActive
                        ? 'bg-white border-2 border-teal-600 text-teal-800 shadow-sm'
                        : 'bg-stone-100 text-stone-400 border border-stone-200'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="font-mono text-[11px]">{idx + 1}</span>
                    )}
                  </div>

                  <span
                    className={`text-xs mt-2 ${
                      isActive
                        ? 'font-semibold text-teal-900'
                        : isCompleted
                        ? 'font-medium text-stone-800'
                        : 'text-stone-400'
                    }`}
                  >
                    {step.label}
                  </span>

                  <span className="text-[10px] text-stone-400 mt-0.5">
                    {isCompleted ? 'Done' : isActive ? 'In Progress' : 'Upcoming'}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Status Snapshot row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-stone-100 text-xs">
          <div>
            <span className="text-stone-400 block text-[11px]">Incident recorded</span>
            <span className="text-stone-800 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Confirmed
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Support selected</span>
            <span className="text-stone-800 font-medium flex items-center gap-1 mt-0.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Legal Aid
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Referral status</span>
            <span className="text-teal-800 font-semibold flex items-center gap-1 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-teal-600" /> Submitted (#SB-1024)
            </span>
          </div>
          <div>
            <span className="text-stone-400 block text-[11px]">Next follow-up</span>
            <span className="text-stone-600 font-medium block mt-0.5">
              Within 24h intake review
            </span>
          </div>
        </div>
      </section>

      {/* CONTINUE YOUR JOURNEY CARD */}
      <section className="bg-stone-50 rounded-2xl p-6 border border-stone-200/90 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Continue Your Journey</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-stone-600">Case #SB-1024</span>
          </div>
          <h3 className="text-lg font-semibold text-stone-900">
            Legal Support & Protective Consultation
          </h3>
          <p className="text-xs text-stone-600">
            Submitted to Nyaya Legal Aid Collective with 2 approved data scopes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('referral_tracking')}
            className="px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium flex items-center gap-2 transition-colors cursor-pointer"
          >
            <span>VIEW JOURNEY</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onNavigate('timeline')}
            className="px-3 py-2.5 rounded-lg bg-white hover:bg-stone-100 text-stone-700 text-xs font-medium border border-stone-200 transition-colors cursor-pointer"
          >
            Timeline Log
          </button>
        </div>
      </section>

      {/* QUICK SUPPORT SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-stone-900 tracking-tight">
              Quick Support
            </h2>
            <p className="text-xs text-stone-500 mt-0.5">
              Select any pathway to explore assistance and choose what information is shared.
            </p>
          </div>
          <button
            onClick={() => onNavigate('support_navigator')}
            className="text-xs font-medium text-teal-800 hover:text-teal-900 flex items-center gap-1"
          >
            <span>View all pathways</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {supportCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group p-5 bg-white rounded-xl border border-stone-200 hover:border-stone-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-stone-100 group-hover:bg-teal-50 group-hover:text-teal-700 text-stone-700 flex items-center justify-center mb-3.5 transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-semibold text-stone-900 group-hover:text-teal-900 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-stone-400">{cat.timeframe}</span>
                  <span className="text-stone-400 group-hover:text-stone-800 group-hover:translate-x-0.5 transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* PRIVACY SNAPSHOT */}
      <section className="p-6 bg-teal-50/70 border border-teal-200/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-teal-950">
              Your information is under your control.
            </h3>
            <p className="text-xs text-teal-800/80 mt-0.5 max-w-lg leading-relaxed">
              No medical, legal, or location records are shared with anyone without your explicit consent. You can modify or revoke permissions at any moment.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigate('privacy')}
          className="px-4 py-2 rounded-lg bg-teal-900 hover:bg-teal-800 text-white text-xs font-medium whitespace-nowrap transition-colors cursor-pointer self-start sm:self-center"
        >
          MANAGE PRIVACY
        </button>
      </section>
    </div>
  );
};
