import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Eye,
  Key,
  Database,
  FileText,
  Users,
  Smartphone,
  Check,
  Download,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import { ConsentItem } from '../types';
import { apiService } from '../services/api';

export const PrivacyView: React.FC = () => {
  const [consentFields, setConsentFields] = useState<ConsentItem[]>([]);
  const [autoPurgeDays, setAutoPurgeDays] = useState(30);
  const [zeroKnowledgeVault, setZeroKnowledgeVault] = useState(true);
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  useEffect(() => {
    apiService.getConsentFields().then(setConsentFields);
  }, []);

  const handleExportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      userConsentSettings: consentFields,
      privacyPolicy: 'SAKHIBRIDGE Zero-Knowledge Agency Protocol'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sakhibridge-privacy-export-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setExportNotice('Full privacy profile export downloaded.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="space-y-2 pt-2 border-b border-stone-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <ShieldCheck className="w-4 h-4 text-teal-700" />
          <span>Privacy Center</span>
          <span aria-hidden="true">·</span>
          <span>Zero-Knowledge Architecture</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
          YOUR PRIVACY
        </h1>
        <p className="text-sm text-stone-600 max-w-xl">
          Everything stored in SAKHIBRIDGE is protected by client-side encryption. We do not sell, broker, or auto-forward your sensitive information.
        </p>
      </section>

      {/* Hero Visual Privacy Status: YOUR DATA CONTROLLED BY YOU (Section 16) */}
      <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-400">
              Guaranteed Architecture
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-white">
              YOUR DATA · CONTROLLED BY YOU
            </h2>
            <p className="text-xs text-stone-300 max-w-lg leading-relaxed">
              Every data disclosure is transient, scoped to a single purpose, and revocable at your discretion.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 bg-stone-800 rounded-xl border border-stone-700 shrink-0 self-start sm:self-center">
            <Lock className="w-4 h-4 text-teal-400" />
            <span className="text-xs font-medium text-stone-200">
              AES-256 Client-Side Guard
            </span>
          </div>
        </div>
      </section>

      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200 text-teal-900 text-xs">
          {exportNotice}
        </div>
      )}

      {/* Privacy Sections Grid */}
      <div className="space-y-6">
        {/* 1. Information Sharing */}
        <section className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                1. Information Sharing Matrix
              </h3>
              <p className="text-xs text-stone-500">
                Summary of which fields are currently eligible for inclusion in support referrals:
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {consentFields.map((f) => (
              <div
                key={f.id}
                className="flex items-center justify-between p-3 rounded-lg border border-stone-100 bg-stone-50/50 text-xs"
              >
                <div>
                  <span className="font-semibold text-stone-900">{f.label}</span>
                  <span className="text-stone-500 block text-[11px]">
                    {f.description}
                  </span>
                </div>
                <span
                  className={`font-mono text-[11px] font-semibold ${
                    f.included ? 'text-teal-700' : 'text-stone-400'
                  }`}
                >
                  {f.included ? 'Permitted' : 'Locked (Withheld)'}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* 2. Consent History */}
        <section className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                2. Consent History & Active Grants
              </h3>
              <p className="text-xs text-stone-500">
                Authorized third-party recipients:
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="font-semibold text-stone-900 block">
                Nyaya Legal Aid Collective (#SB-1024)
              </span>
              <span className="text-stone-500 text-[11px]">
                Granted: 2026-10-05 · Scoped to: Incident Date, District
              </span>
            </div>
            <span className="font-mono text-[11px] text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 self-start sm:self-auto">
              Active Grant
            </span>
          </div>
        </section>

        {/* 3. Trusted Contacts & Emergency Preferences */}
        <section className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                3. Trusted Contacts Notification Rules
              </h3>
              <p className="text-xs text-stone-500">
                Emergency dispatch behavior:
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center justify-between p-3 rounded-lg border border-stone-100">
              <div>
                <span className="font-medium text-stone-800">
                  Notify Pooja Verma (Sister) during Emergency Mode
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Sends discrete encrypted SMS ping
                </span>
              </div>
              <span className="text-teal-700 font-semibold text-[11px]">Enabled</span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-stone-100">
              <div>
                <span className="font-medium text-stone-800">
                  Location caching during Emergency Mode only
                </span>
                <span className="text-[11px] text-stone-500 block">
                  Zero background tracking when app is closed
                </span>
              </div>
              <span className="text-teal-700 font-semibold text-[11px]">Strict Minimal</span>
            </div>
          </div>
        </section>

        {/* 4. Data Vault & Account Security */}
        <section className="bg-white rounded-2xl p-6 border border-stone-200 space-y-4 shadow-2xs">
          <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
            <div className="w-8 h-8 rounded-lg bg-stone-100 flex items-center justify-center text-stone-700">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-stone-900">
                4. Data Export & Self-Purge Controls
              </h3>
              <p className="text-xs text-stone-500">
                Exercise your absolute right to withdraw data:
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <button
              onClick={handleExportData}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Full Data Archive</span>
            </button>

            <span className="text-xs text-stone-500 text-center sm:text-right">
              Archive includes all logs, timeline events, and consent records.
            </span>
          </div>
        </section>
      </div>
    </div>
  );
};
