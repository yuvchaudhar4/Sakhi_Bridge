import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Check,
  X,
  Eye,
  Lock,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
  FileCheck,
  Building,
  HelpCircle
} from 'lucide-react';
import { ConsentItem, SupportCategoryType, Referral } from '../types';
import { apiService } from '../services/api';

interface ConsentCenterViewProps {
  category: SupportCategoryType;
  onSubmitted: (referral: Referral) => void;
  onGoBack: () => void;
}

export const ConsentCenterView: React.FC<ConsentCenterViewProps> = ({
  category,
  onSubmitted,
  onGoBack
}) => {
  const [fields, setFields] = useState<ConsentItem[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);

  useEffect(() => {
    apiService.getConsentFields().then(setFields);
  }, []);

  const toggleField = (id: string) => {
    const updated = fields.map((f) =>
      f.id === id ? { ...f, included: !f.included } : f
    );
    setFields(updated);
    apiService.updateConsentFields(updated);
  };

  const getRecipientInfo = () => {
    switch (category) {
      case 'legal':
        return {
          name: 'Nyaya Legal Aid Collective',
          type: 'Accredited Legal Aid Society',
          serviceName: 'Legal Aid & Protective Consultation'
        };
      case 'medical':
        return {
          name: 'Asha One-Stop Crisis Health Center',
          type: 'Designated Health & Trauma OSCC',
          serviceName: 'Emergency Medical & Clinical Care'
        };
      case 'counselling':
        return {
          name: 'Samvad Psychological Care & Healing',
          type: 'Licensed Trauma Psychology Practice',
          serviceName: 'Confidential Psychological Consultation'
        };
      case 'accommodation':
        return {
          name: 'Sakhi Safe Haven Network',
          type: 'Secure Safehouse Intake Registry',
          serviceName: 'Safe Emergency Accommodation'
        };
      case 'financial':
        return {
          name: 'Unnati Financial Resilience Initiative',
          type: 'Economic Independence Program',
          serviceName: 'Financial Autonomy & Micro-grant'
        };
      default:
        return {
          name: 'Satya Safe Evidence Archive',
          type: 'Client-side Cryptographic Vault',
          serviceName: 'Encrypted Documentation Record'
        };
    }
  };

  const recipient = getRecipientInfo();
  const includedFields = fields.filter((f) => f.included);
  const excludedFields = fields.filter((f) => !f.included);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const newRef = await apiService.createReferral({
        category,
        providerName: recipient.name,
        providerType: recipient.type,
        title: recipient.serviceName,
        sharedFieldIds: includedFields.map((f) => f.id),
        notes: `User-selected selective consent with ${includedFields.length} of ${fields.length} data fields approved.`
      });
      setIsSubmitting(false);
      onSubmitted(newRef);
    } catch (err) {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/80 pb-6 pt-2">
        <button
          onClick={onGoBack}
          className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Go Back</span>
        </button>
        <div className="flex items-center gap-2 text-xs font-mono text-stone-500">
          <Lock className="w-3.5 h-3.5 text-teal-700" />
          <span>Zero-Knowledge Scoping Protocol</span>
        </div>
      </section>

      {/* Main Title Banner */}
      <section className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-800">
          <ShieldCheck className="w-4 h-4" />
          <span>Consent Center</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
          YOU CHOOSE WHAT TO SHARE.
        </h1>
        <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
          Only the information you explicitly approve can be included in your support request. Everything else remains strictly confidential and stored only on your local device.
        </p>
      </section>

      {/* Recipient Notice */}
      <section className="p-4 bg-white rounded-xl border border-stone-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
            <Building className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-stone-400 block">Recipient Organization</span>
            <span className="text-sm font-semibold text-stone-900">
              {recipient.name}
            </span>
            <span className="text-xs text-stone-500 ml-2">· {recipient.type}</span>
          </div>
        </div>
        <span className="text-xs font-mono text-teal-800 bg-teal-50 px-2.5 py-1 rounded border border-teal-200 self-start sm:self-center">
          {includedFields.length} of {fields.length} fields selected
        </span>
      </section>

      {/* Information Fields Selection */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-stone-500">
            Information Granularity Control
          </h2>
          <span className="text-xs text-stone-500">
            Toggle switches to approve or withhold
          </span>
        </div>

        <div className="space-y-2.5">
          {fields.map((f) => (
            <div
              key={f.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                f.included
                  ? 'bg-white border-teal-600/60 shadow-2xs'
                  : 'bg-stone-50/70 border-stone-200 text-stone-500'
              }`}
            >
              <div className="flex items-start sm:items-center justify-between gap-4">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm font-semibold text-stone-900">
                      {f.label}
                    </span>
                    {f.sensitiveLevel === 'high' && (
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                        High Sensitivity
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {f.description}
                  </p>
                  <p className="text-[11px] font-mono text-stone-400 pt-0.5">
                    Preview: {f.previewValue}
                  </p>
                </div>

                {/* State Toggle Button */}
                <button
                  onClick={() => toggleField(f.id)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 ${
                    f.included
                      ? 'bg-teal-700 hover:bg-teal-800 text-white'
                      : 'bg-stone-200 hover:bg-stone-300 text-stone-700'
                  }`}
                >
                  {f.included ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>SHARED</span>
                    </>
                  ) : (
                    <>
                      <X className="w-3.5 h-3.5" />
                      <span>NOT SHARED</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Before You Continue: Live Preview Card (Section 12) */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-teal-400 block mb-1">
            Before you continue
          </span>
          <h2 className="text-xl font-semibold text-white">
            Exact Referral Data Preview
          </h2>
          <p className="text-xs text-stone-300 mt-1">
            This is the verbatim document that will be received by {recipient.name}:
          </p>
        </div>

        {/* Live Preview Box */}
        <div className="bg-stone-950 p-5 rounded-xl border border-stone-800 font-sans text-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone-800 pb-3">
            <div>
              <span className="text-stone-400 block text-[11px]">SHARED WITH</span>
              <span className="text-sm font-semibold text-white">
                {recipient.name}
              </span>
            </div>
            <span className="text-teal-400 text-xs font-mono">
              Status: Draft Sanitized Request
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold text-teal-300 mb-2 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Information included:
              </p>
              {includedFields.length === 0 ? (
                <p className="text-stone-500 italic text-[11px]">
                  No information selected yet.
                </p>
              ) : (
                <ul className="space-y-1.5 text-stone-200">
                  {includedFields.map((f) => (
                    <li key={f.id} className="flex items-center gap-2">
                      <span className="text-teal-400">✓</span>
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold text-rose-300 mb-2 flex items-center gap-1.5">
                <X className="w-3.5 h-3.5" /> Not included (Withheld):
              </p>
              {excludedFields.length === 0 ? (
                <p className="text-stone-500 italic text-[11px]">
                  All fields currently enabled.
                </p>
              ) : (
                <ul className="space-y-1.5 text-stone-400">
                  {excludedFields.map((f) => (
                    <li key={f.id} className="flex items-center gap-2">
                      <span className="text-stone-600">✕</span>
                      <span>{f.label}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-stone-800">
          <button
            onClick={onGoBack}
            className="text-xs text-stone-400 hover:text-white transition-colors cursor-pointer self-start sm:self-center"
          >
            ← GO BACK
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || includedFields.length === 0}
            className={`w-full sm:w-auto px-7 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
              includedFields.length === 0
                ? 'bg-stone-800 text-stone-500 cursor-not-allowed'
                : 'bg-teal-500 hover:bg-teal-400 text-stone-950 shadow-md active:scale-[0.99]'
            }`}
          >
            {isSubmitting ? (
              <span>Encrypting & Submitting...</span>
            ) : (
              <>
                <span>REVIEW & SUBMIT</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};
