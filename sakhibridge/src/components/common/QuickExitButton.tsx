import React, { useState, useEffect } from 'react';
import { LogOut, CloudSun, ArrowLeft } from 'lucide-react';

interface QuickExitButtonProps {
  onTrigger?: () => void;
  className?: string;
}

export const QuickExitButton: React.FC<QuickExitButtonProps> = ({
  onTrigger,
  className = ''
}) => {
  const [isCamouflageActive, setIsCamouflageActive] = useState(false);

  const activateExit = () => {
    setIsCamouflageActive(true);
    if (onTrigger) onTrigger();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Escape key triggers quick exit
      if (e.key === 'Escape') {
        activateExit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  if (isCamouflageActive) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F5F5F3] text-stone-800 p-8 flex flex-col justify-between font-sans">
        <div className="max-w-2xl mx-auto w-full pt-12">
          <div className="flex items-center justify-between border-b border-stone-200 pb-4 mb-6">
            <div className="flex items-center gap-2">
              <CloudSun className="w-6 h-6 text-amber-500" />
              <span className="text-xl font-medium tracking-tight">Weather & Daily Planner</span>
            </div>
            <span className="text-xs text-stone-500">Updated just now</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            <div className="p-5 bg-white rounded-lg border border-stone-200">
              <p className="text-xs uppercase tracking-wider text-stone-400">Current Forecast</p>
              <h2 className="text-3xl font-light text-stone-900 mt-2">26°C</h2>
              <p className="text-sm text-stone-600 mt-1">Partly Cloudy · Humidity 52%</p>
            </div>
            <div className="p-5 bg-white rounded-lg border border-stone-200">
              <p className="text-xs uppercase tracking-wider text-stone-400">Daily Tip</p>
              <p className="text-sm text-stone-700 mt-2">Stay hydrated and keep notes organized for weekly review.</p>
            </div>
          </div>

          <div className="p-5 bg-white rounded-lg border border-stone-200 mb-8">
            <h3 className="text-sm font-semibold text-stone-800 mb-3">Weekly Schedule Overview</h3>
            <ul className="text-xs text-stone-600 space-y-2">
              <li className="flex justify-between border-b border-stone-100 pb-1.5">
                <span>Morning Routine & Review</span>
                <span className="font-mono">08:30 AM</span>
              </li>
              <li className="flex justify-between border-b border-stone-100 pb-1.5">
                <span>Team Sync Call</span>
                <span className="font-mono">11:00 AM</span>
              </li>
              <li className="flex justify-between">
                <span>Grocery & Household errands</span>
                <span className="font-mono">05:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center pb-6">
          <button
            onClick={() => setIsCamouflageActive(false)}
            className="flex items-center gap-2 text-xs text-stone-400 hover:text-stone-700 px-4 py-2 rounded-lg border border-stone-200 bg-white transition-colors"
            title="Resume SAKHIBRIDGE session"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to workspace</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={activateExit}
      title="Quick Exit (Escape) - Instantly hides sensitive screens"
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors border border-stone-200/80 whitespace-nowrap cursor-pointer ${className}`}
    >
      <LogOut className="w-3.5 h-3.5 text-stone-500" />
      <span>Quick Exit</span>
      <kbd className="hidden sm:inline-block text-[10px] text-stone-400 bg-white px-1 py-0.5 rounded border border-stone-200">
        Esc
      </kbd>
    </button>
  );
};
