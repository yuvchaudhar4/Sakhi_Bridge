import React, { useState, useEffect } from 'react';
import { PhoneCall, ShieldCheck, AlertCircle, Volume2, ShieldAlert, HeartHandshake, X } from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { QuickExitButton } from '../components/common/QuickExitButton';

interface EmergencyViewProps {
  onMarkSafe: () => void;
  onExitEmergency: () => void;
  onQuickExit: () => void;
}

export const EmergencyView: React.FC<EmergencyViewProps> = ({
  onMarkSafe,
  onExitEmergency,
  onQuickExit
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [showHelplineModal, setShowHelplineModal] = useState<boolean>(false);
  const [showDeescalationGuide, setShowDeescalationGuide] = useState<boolean>(false);
  const [audioSirenActive, setAudioSirenActive] = useState<boolean>(false);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setCurrentTime(
        `${String(now.getHours()).padStart(2, '0')}:${String(
          now.getMinutes()
        ).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  // Quick sound alert simulation
  const toggleAudioBeacon = () => {
    setAudioSirenActive(!audioSirenActive);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 flex flex-col justify-between p-4 sm:p-8 select-none">
      {/* Top minimal header */}
      <header className="max-w-2xl mx-auto w-full flex items-center justify-between pb-6 border-b border-stone-800">
        <Logo size="sm" showTagline={false} inverted={true} />
        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-stone-400 bg-stone-800 px-2 py-1 rounded border border-stone-700">
            DEMO / PROTOTYPE
          </span>
          <QuickExitButton onTrigger={onQuickExit} className="bg-stone-800 text-stone-200 border-stone-700 hover:bg-stone-700" />
        </div>
      </header>

      {/* Main Focused Emergency Content */}
      <main className="max-w-2xl mx-auto w-full my-auto py-8">
        <div className="text-center space-y-4">
          <p className="text-xs font-semibold tracking-widest uppercase text-rose-400">
            EMERGENCY MODE
          </p>

          {/* Large Status Indicator */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-rose-950/80 border border-rose-800/80 text-rose-200">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span className="text-sm font-semibold tracking-wide uppercase">
              HELP REQUEST ACTIVE
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-white pt-2">
            Help request initiated.
          </h1>
          <p className="text-sm text-stone-400 max-w-md mx-auto">
            Stay in a secure location if possible. Use official helplines below or notify us when you reach safety.
          </p>
        </div>

        {/* Emergency Metadata Panel */}
        <div className="mt-8 p-5 bg-stone-800/80 rounded-xl border border-stone-700 text-left space-y-3.5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <span className="text-stone-400 block text-[11px]">Time</span>
              <span className="font-mono text-stone-100 text-sm font-medium tabular-nums">
                {currentTime || '16:42:00'}
              </span>
            </div>

            <div>
              <span className="text-stone-400 block text-[11px]">Location</span>
              <span className="text-stone-100 font-medium">
                Available <span className="text-[10px] text-teal-400">(Simulated)</span>
              </span>
            </div>

            <div>
              <span className="text-stone-400 block text-[11px]">Emergency Context</span>
              <span className="text-stone-100 font-medium">Prepared Locally</span>
            </div>

            <div>
              <span className="text-stone-400 block text-[11px]">Trusted Contact</span>
              <span className="text-stone-100 font-medium">Pooja Verma</span>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-700/80 flex items-center justify-between text-[11px] text-stone-400">
            <span>Security: Device-local secure buffer</span>
            <span className="text-stone-300">Encrypted transmission ready</span>
          </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="mt-8 space-y-3.5">
          {/* Action 1: OFFICIAL HELP */}
          <button
            onClick={() => setShowHelplineModal(true)}
            className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl bg-rose-600 hover:bg-rose-500 active:scale-[0.99] text-white font-semibold text-base shadow-lg shadow-rose-950/40 transition-all cursor-pointer"
          >
            <PhoneCall className="w-5 h-5" />
            <span>OFFICIAL HELP</span>
          </button>

          {/* Action 2: I'M SAFE */}
          <button
            onClick={onMarkSafe}
            className="w-full flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl bg-stone-100 hover:bg-white active:scale-[0.99] text-stone-950 font-semibold text-sm transition-all cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-teal-700" />
            <span>I'M SAFE</span>
          </button>

          {/* Action 3: I STILL NEED HELP */}
          <button
            onClick={() => setShowDeescalationGuide(true)}
            className="w-full py-2.5 px-4 text-xs font-medium text-stone-400 hover:text-stone-200 transition-colors text-center cursor-pointer"
          >
            I STILL NEED HELP · View ground safety & backup options
          </button>
        </div>

        {/* Audible Beacon / Siren Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={toggleAudioBeacon}
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs transition-colors border ${
              audioSirenActive
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 animate-pulse'
                : 'bg-stone-800 text-stone-400 border-stone-700 hover:text-stone-200'
            }`}
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>{audioSirenActive ? 'Sound Beacon Active (Audible)' : 'Activate Audible Alarm / Beacon'}</span>
          </button>
        </div>
      </main>

      {/* Safety & Protocol Footer Notice */}
      <footer className="max-w-2xl mx-auto w-full pt-6 border-t border-stone-800 text-center space-y-1">
        <p className="text-[11px] text-stone-500">
          PROTOTYPE / DEMO: SAKHIBRIDGE does not secretly activate your microphone, camera, or GPS.
        </p>
        <p className="text-[11px] text-stone-600">
          Official police dispatch requires dialing local emergency services. You retain complete agency over what happens next.
        </p>
      </footer>

      {/* Helpline Modal */}
      {showHelplineModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 text-stone-100 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-500" />
                <h3 className="text-base font-semibold">Official Emergency Hotlines</h3>
              </div>
              <button
                onClick={() => setShowHelplineModal(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-400">
              Tap any line to initiate an immediate direct call through your device's cellular dialer:
            </p>

            <div className="space-y-2.5">
              <a
                href="tel:112"
                className="flex items-center justify-between p-3.5 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 transition-colors"
              >
                <div>
                  <span className="text-sm font-semibold text-white block">112 · National Emergency</span>
                  <span className="text-xs text-stone-400">All-in-one Police, Fire & Medical rescue</span>
                </div>
                <span className="text-xs font-mono font-semibold text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded border border-teal-800">
                  DIAL 112
                </span>
              </a>

              <a
                href="tel:1091"
                className="flex items-center justify-between p-3.5 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 transition-colors"
              >
                <div>
                  <span className="text-sm font-semibold text-white block">1091 · Women's Helpline</span>
                  <span className="text-xs text-stone-400">24/7 dedicated women crisis response</span>
                </div>
                <span className="text-xs font-mono font-semibold text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded border border-teal-800">
                  DIAL 1091
                </span>
              </a>

              <a
                href="tel:181"
                className="flex items-center justify-between p-3.5 rounded-xl bg-stone-800 hover:bg-stone-750 border border-stone-700 transition-colors"
              >
                <div>
                  <span className="text-sm font-semibold text-white block">181 · Domestic Abuse & Violence</span>
                  <span className="text-xs text-stone-400">Confidential shelter & legal intervention</span>
                </div>
                <span className="text-xs font-mono font-semibold text-teal-400 bg-teal-950/60 px-2.5 py-1 rounded border border-teal-800">
                  DIAL 181
                </span>
              </a>
            </div>

            <div className="p-3 bg-stone-950 rounded-lg border border-stone-800 text-[11px] text-stone-400">
              Note: This is a verified emergency protocol list. In live deployment, tel links connect to device telephony.
            </div>

            <button
              onClick={() => setShowHelplineModal(false)}
              className="w-full py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Safety & Grounding Guide Modal */}
      {showDeescalationGuide && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700 rounded-2xl max-w-md w-full p-6 text-stone-100 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <HeartHandshake className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-semibold">Immediate Safety Grounding</h3>
              </div>
              <button
                onClick={() => setShowDeescalationGuide(false)}
                className="text-stone-400 hover:text-white p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-stone-300">
              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700">
                <p className="font-semibold text-white mb-1">1. Move toward public visibility</p>
                <p>If you can safely walk, head toward a staffed shop, metro station counter, hospital lobby, or lit commercial desk.</p>
              </div>

              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700">
                <p className="font-semibold text-white mb-1">2. Trusted contact alert</p>
                <p>Your primary contact (Pooja Verma) was sent an encrypted SMS alert with your last verified check-in ping.</p>
              </div>

              <div className="p-3 rounded-lg bg-stone-800/80 border border-stone-700">
                <p className="font-semibold text-white mb-1">3. Regulate breathing</p>
                <p>Inhale for 4 seconds, hold for 4 seconds, exhale for 6 seconds. You are navigating this step by step.</p>
              </div>
            </div>

            <div className="pt-2 flex gap-3">
              <button
                onClick={() => {
                  setShowDeescalationGuide(false);
                  setShowHelplineModal(true);
                }}
                className="flex-1 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-medium text-xs text-center"
              >
                Call Helpline Now
              </button>
              <button
                onClick={() => setShowDeescalationGuide(false)}
                className="flex-1 py-2.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-medium text-center"
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
