import React, { useState, useEffect } from 'react';
import {
  FileText,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Building2,
  Calendar,
  AlertTriangle,
  RotateCcw,
  ExternalLink,
  ChevronRight,
  Lock
} from 'lucide-react';
import { Referral } from '../types';
import { apiService } from '../services/api';

interface ReferralTrackingViewProps {
  initialReferralId?: string;
  onNavigateSupport: () => void;
}

export const ReferralTrackingView: React.FC<ReferralTrackingViewProps> = ({
  initialReferralId,
  onNavigateSupport
}) => {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [selectedId, setSelectedId] = useState<string>('');
  const [showRevokeModal, setShowRevokeModal] = useState(false);
  const [revokeSuccess, setRevokeSuccess] = useState(false);

  useEffect(() => {
    apiService.getReferrals().then((list) => {
      setReferrals(list);
      if (initialReferralId && list.some((r) => r.id === initialReferralId)) {
        setSelectedId(initialReferralId);
      } else if (list.length > 0) {
        setSelectedId(list[0].id);
      }
    });
  }, [initialReferralId]);

  const activeReferral = referrals.find((r) => r.id === selectedId) || referrals[0];

  const timelineSteps = [
    { id: 'created', label: 'Request created', done: true },
    { id: 'reviewed', label: 'Information reviewed', done: true },
    { id: 'submitted', label: 'Referral submitted', done: true },
    { id: 'received', label: 'Institution received', done: false, note: 'Awaiting intake desk confirmation' },
    { id: 'appointment', label: 'Appointment scheduled', done: false },
    { id: 'follow_up', label: 'Follow-up consultation', done: false }
  ];

  const handleRevokeConsent = () => {
    setShowRevokeModal(false);
    setRevokeSuccess(true);
    setTimeout(() => setRevokeSuccess(false), 5000);
  };

  if (!activeReferral) {
    return (
      <div className="max-w-3xl mx-auto py-16 text-center space-y-4">
        <h2 className="text-xl font-semibold text-stone-900">No active support requests</h2>
        <p className="text-xs text-stone-500">
          Your support journey will appear here when you start one.
        </p>
        <button
          onClick={onNavigateSupport}
          className="px-4 py-2 bg-stone-900 text-white rounded-lg text-xs font-semibold"
        >
          EXPLORE SUPPORT
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Case Management</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-teal-800">
              Referral #{activeReferral.referenceNumber}
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900 uppercase">
            {activeReferral.category} Support
          </h1>
          <p className="text-xs text-stone-600">
            Tracking referral status and intake communications.
          </p>
        </div>

        {referrals.length > 1 && (
          <div className="flex items-center gap-1.5 p-1 bg-stone-100 rounded-lg">
            {referrals.map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedId(r.id)}
                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                  activeReferral.id === r.id
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                #{r.referenceNumber}
              </button>
            ))}
          </div>
        )}
      </section>

      {revokeSuccess && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700" />
            <span>
              Consent revoked. Recipient organization has been issued a formal data purge order.
            </span>
          </div>
          <button
            onClick={() => setRevokeSuccess(false)}
            className="text-amber-800 font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Main Status & Timeline Overview */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200/90 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-5">
          <div className="space-y-1">
            <span className="text-xs text-stone-400 uppercase tracking-wider block font-semibold">
              Assigned Provider
            </span>
            <h2 className="text-lg font-semibold text-stone-900">
              {activeReferral.providerName}
            </h2>
            <p className="text-xs text-stone-500">
              {activeReferral.providerType}
            </p>
          </div>

          <div className="flex flex-col sm:items-end">
            <span className="text-xs text-stone-400 uppercase tracking-wider block">
              Current Status
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-teal-800 mt-0.5">
              <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
              <span>{activeReferral.statusLabel}</span>
            </span>
          </div>
        </div>

        {/* Visual Step-by-Step Referral Status Progression (Section 13) */}
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
            Progress Milestones
          </h3>

          <div className="space-y-3">
            {timelineSteps.map((step) => (
              <div
                key={step.id}
                className="flex items-start gap-3 p-3.5 rounded-xl border border-stone-100 bg-stone-50/50"
              >
                <div className="mt-0.5">
                  {step.done ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2 border-stone-300" />
                  )}
                </div>

                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <span
                    className={`text-xs ${
                      step.done
                        ? 'font-semibold text-stone-900'
                        : 'text-stone-500'
                    }`}
                  >
                    {step.label}
                  </span>

                  {step.note && (
                    <span className="text-[11px] font-mono text-stone-400">
                      {step.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metadata Details Grid */}
        <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div>
            <span className="text-stone-400 block text-[11px]">Submitted</span>
            <span className="font-mono text-stone-700 font-medium mt-0.5 block tabular-nums">
              {activeReferral.submittedAt || 'Today, 16:54'}
            </span>
          </div>

          <div>
            <span className="text-stone-400 block text-[11px]">Expected Intake Window</span>
            <span className="text-stone-700 font-medium mt-0.5 block">
              {activeReferral.intakeWindowEstimate}
            </span>
          </div>

          <div>
            <span className="text-stone-400 block text-[11px]">Next Expected Step</span>
            <span className="text-stone-700 font-medium mt-0.5 block">
              {activeReferral.nextExpectedStep}
            </span>
          </div>
        </div>
      </section>

      {/* Shared Information Scope Box */}
      <section className="bg-stone-50 p-6 rounded-2xl border border-stone-200/80 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-teal-700" />
            <h3 className="text-sm font-semibold text-stone-900">
              Approved Shared Information Scope
            </h3>
          </div>
          <span className="text-xs text-stone-500">
            Enforced by SAKHIBRIDGE Consent Guard
          </span>
        </div>

        <div className="p-4 bg-white rounded-xl border border-stone-200 text-xs space-y-2">
          <p className="text-stone-600 font-medium">Fields included in this dispatch:</p>
          <ul className="list-disc list-inside text-stone-700 space-y-1">
            {activeReferral.sharedFields.map((field, i) => (
              <li key={i}>{field}</li>
            ))}
          </ul>
          <p className="text-[11px] text-stone-400 pt-1">
            Note: Personal notes, audio journals, and sensitive identity files were withheld by your choice.
          </p>
        </div>

        {/* Actions: Revoke Consent / Cancel */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <p className="text-xs text-stone-500">
            Changed your mind? You can revoke access at any time before the appointment.
          </p>
          <button
            onClick={() => setShowRevokeModal(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-rose-700 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors cursor-pointer self-start sm:self-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Revoke Referral Consent</span>
          </button>
        </div>
      </section>

      {/* Revoke Confirmation Modal */}
      {showRevokeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-stone-200">
            <div className="flex items-center gap-2 text-rose-700">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="text-base font-semibold">Revoke Consent for #{activeReferral.referenceNumber}?</h3>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              This will immediately cancel the pending referral with {activeReferral.providerName}. The recipient will be notified that the inquiry was withdrawn and your forwarded data fields will be decommissioned.
            </p>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRevokeModal(false)}
                className="px-4 py-2 text-xs text-stone-600 hover:text-stone-900"
              >
                Keep Active
              </button>
              <button
                onClick={handleRevokeConsent}
                className="px-4 py-2 text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white rounded-lg"
              >
                Confirm Revocation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
