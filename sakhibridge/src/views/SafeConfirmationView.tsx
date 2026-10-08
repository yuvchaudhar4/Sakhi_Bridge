import React, { useState } from 'react';
import { ShieldCheck, AlertCircle, ArrowRight, Heart } from 'lucide-react';
import { Logo } from '../components/common/Logo';

interface SafeConfirmationViewProps {
  onConfirmSafe: () => void;
  onReturnToEmergency: () => void;
}

export const SafeConfirmationView: React.FC<SafeConfirmationViewProps> = ({
  onConfirmSafe,
  onReturnToEmergency
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      onConfirmSafe();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-stone-900 flex flex-col justify-between p-6 sm:p-12">
      <header className="max-w-xl mx-auto w-full flex items-center justify-between">
        <Logo size="sm" showTagline={false} />
        <span className="text-xs text-stone-500 font-mono">Status Check</span>
      </header>

      <main className="max-w-xl mx-auto w-full my-auto py-10 text-center space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-teal-50 border border-teal-200/80 text-teal-700 flex items-center justify-center mx-auto shadow-sm">
          <ShieldCheck className="w-8 h-8" />
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
            Are you safe now?
          </h1>
          <p className="text-base text-stone-600 max-w-md mx-auto leading-relaxed">
            Take a breath. You can pause here, or continue into your personalized support journey whenever you are ready.
          </p>
        </div>

        {/* Calm options card */}
        <div className="p-5 bg-white rounded-xl border border-stone-200 text-left space-y-3">
          <div className="flex items-start gap-3">
            <Heart className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <p className="text-xs text-stone-600 leading-relaxed">
              Confirming safety will update your emergency status log and notify your trusted contacts that you are out of immediate danger. Your emergency record is saved privately.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-4">
          <button
            onClick={handleConfirm}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm transition-all shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
          >
            {isSubmitting ? (
              <span>Updating status...</span>
            ) : (
              <>
                <span>YES, I'M SAFE</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <button
            onClick={onReturnToEmergency}
            className="w-full py-3.5 px-6 rounded-xl bg-transparent hover:bg-stone-100 text-stone-600 hover:text-stone-900 font-medium text-xs transition-colors cursor-pointer border border-transparent hover:border-stone-200"
          >
            I STILL NEED HELP · Return to Emergency Mode
          </button>
        </div>
      </main>

      <footer className="max-w-xl mx-auto w-full text-center text-xs text-stone-400">
        "I choose what happens next." · SAKHIBRIDGE
      </footer>
    </div>
  );
};
