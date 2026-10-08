import React, { useState } from 'react';
import {
  Stethoscope,
  Scale,
  HeartPulse,
  Home,
  FileText,
  Coins,
  ArrowRight,
  CheckCircle2,
  Lock,
  ArrowLeft,
  ChevronRight,
  ShieldCheck,
  Building,
  Info
} from 'lucide-react';
import { SupportCategoryType, ViewState } from '../types';

interface SupportNavigatorViewProps {
  selectedCategory: SupportCategoryType | null;
  onSelectCategory: (cat: SupportCategoryType | null) => void;
  onStartReferral: (cat: SupportCategoryType) => void;
}

export const SupportNavigatorView: React.FC<SupportNavigatorViewProps> = ({
  selectedCategory,
  onSelectCategory,
  onStartReferral
}) => {
  const pathways: {
    id: SupportCategoryType;
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    leadTime: string;
    details: {
      overview: string;
      eligibility: string;
      safeguards: string[];
      steps: { number: string; title: string; desc: string }[];
    };
  }[] = [
    {
      id: 'legal',
      title: 'Legal Support',
      description: 'Explore legal-aid and protective order pathways.',
      icon: Scale,
      leadTime: 'Consultation within 24h',
      details: {
        overview:
          'Connect with dedicated women advocates and legal aid counselors. Receive confidential advice regarding domestic violence protection orders, maintenance, custody, and legal documentation without court pressure.',
        eligibility:
          'Open to any woman seeking legal orientation, protective orders, or legal advice.',
        safeguards: [
          'Strict attorney-client confidentiality',
          'Selective data disclosure (you approve what details are forwarded)',
          'No obligation to file an FIR or proceed with litigation'
        ],
        steps: [
          {
            number: '01',
            title: 'Understand available support',
            desc: 'Review verified legal aid options, rights summaries, and local jurisdiction.'
          },
          {
            number: '02',
            title: 'Choose what information to share',
            desc: 'Use the Consent Center to select only the facts you are comfortable providing.'
          },
          {
            number: '03',
            title: 'Review referral preview',
            desc: 'Examine the exact sanitized document that will be received by the advocate.'
          },
          {
            number: '04',
            title: 'Submit encrypted referral',
            desc: 'Dispatched securely to duty advocates at Nyaya Legal Aid Collective.'
          },
          {
            number: '05',
            title: 'Track follow-up & consultation',
            desc: 'Receive appointment confirmation and manage the case step-by-step.'
          }
        ]
      }
    },
    {
      id: 'medical',
      title: 'Medical Support',
      description: 'Find trauma-informed medical care and understand your next steps.',
      icon: Stethoscope,
      leadTime: 'Immediate triage · 24/7 care',
      details: {
        overview:
          'Access confidential clinical treatment, trauma evaluations, prophylactic medication (PEP), and forensic examination at designated One-Stop Crisis Centers (OSCC).',
        eligibility:
          'Any individual needing immediate medical treatment, injury care, or confidential forensic protocols.',
        safeguards: [
          'Immediate trauma care independent of legal filings',
          'Choice of female clinician wherever available',
          'Redaction of personal contacts until you consent'
        ],
        steps: [
          {
            number: '01',
            title: 'Understand clinical options',
            desc: 'Assess emergency wound treatment, prophylaxis, and discreet clinic options.'
          },
          {
            number: '02',
            title: 'Choose what information to share',
            desc: 'Disclose only medical injury symptoms without personal identifying history if desired.'
          },
          {
            number: '03',
            title: 'Review intake summary',
            desc: 'Confirm the clinical triage brief.'
          },
          {
            number: '04',
            title: 'Submit referral or obtain walk-in pass',
            desc: 'Secure priority expedited intake at designated partner center.'
          },
          {
            number: '05',
            title: 'Track follow-up healthcare',
            desc: 'Prescription refills, follow-up tests, and holistic medical recovery.'
          }
        ]
      }
    },
    {
      id: 'counselling',
      title: 'Counselling & Mental Health',
      description: 'Find emotional and psychological support with certified trauma therapists.',
      icon: HeartPulse,
      leadTime: 'Intake in 24 - 48h',
      details: {
        overview:
          'Connect with licensed psychologists trained in acute stress response, nervous system stabilization, and grief support. Available remotely via encrypted audio or in-person.',
        eligibility:
          'Open to anyone seeking empathetic emotional regulation and long-term recovery counseling.',
        safeguards: [
          'Zero judgment, survivor-centered counseling',
          'No institutional reporting obligations without your explicit request',
          'Flexible audio, text, or video sessions'
        ],
        steps: [
          {
            number: '01',
            title: 'Understand psychological care',
            desc: 'Choose between individual trauma therapy, crisis stabilization, or peer groups.'
          },
          {
            number: '02',
            title: 'Choose what information to share',
            desc: 'Share emotional goals while withholding sensitive identifying documents.'
          },
          {
            number: '03',
            title: 'Review practitioner match',
            desc: 'Verify provider credentials and modality (EMDR, CBT, Somatic).'
          },
          {
            number: '04',
            title: 'Submit intake request',
            desc: 'Receive scheduling link.'
          },
          {
            number: '05',
            title: 'Track ongoing therapy',
            desc: 'Private calendar notes and progress tracking.'
          }
        ]
      }
    },
    {
      id: 'accommodation',
      title: 'Safe Accommodation',
      description: 'Explore available accommodation and emergency shelter pathways.',
      icon: Home,
      leadTime: 'Same-day emergency evaluation',
      details: {
        overview:
          'Confidential shelter pathways for immediate safety, offering private rooms, security guards, hot meals, and assistance for accompanying children.',
        eligibility:
          'Women and dependent children needing immediate safe housing away from physical threat.',
        safeguards: [
          'Undisclosed locations with perimeter security',
          'Safe transportation coordination',
          'Full confidentiality of location to protect all residents'
        ],
        steps: [
          {
            number: '01',
            title: 'Understand shelter pathways',
            desc: 'Review accommodation types from immediate emergency shelter to transitional flats.'
          },
          {
            number: '02',
            title: 'Choose what information to share',
            desc: 'Provide basic party size (children/pets) without disclosing sensitive personal history.'
          },
          {
            number: '03',
            title: 'Review safety brief',
            desc: 'Confirm secure arrival procedures and transit point.'
          },
          {
            number: '04',
            title: 'Submit secure intake request',
            desc: 'A dedicated intake officer prepares room readiness.'
          },
          {
            number: '05',
            title: 'Track check-in & stay',
            desc: 'Coordinate duration, food, and long-term transitional support.'
          }
        ]
      }
    },
    {
      id: 'financial',
      title: 'Financial / Work',
      description: 'Explore support for rebuilding financial independence and livelihood.',
      icon: Coins,
      leadTime: '3 - 5 business days',
      details: {
        overview:
          'Financial independence is the bedrock of lasting safety. Connect with micro-grant programs, safe independent bank account setup, vocational certifications, and career placement.',
        eligibility:
          'Women seeking to establish economic autonomy, emergency relocation stipends, or employment.',
        safeguards: [
          'Private correspondence (no mail sent to home addresses)',
          'Independent banking guidance',
          'No partner access or notification'
        ],
        steps: [
          {
            number: '01',
            title: 'Understand economic options',
            desc: 'Explore relocation grants, independent banking, and career reskilling.'
          },
          {
            number: '02',
            title: 'Choose what information to share',
            desc: 'Share employment interests while keeping past marital/family history private.'
          },
          {
            number: '03',
            title: 'Review counselor brief',
            desc: 'Verify financial resilience goals.'
          },
          {
            number: '04',
            title: 'Submit application',
            desc: 'Connect with financial resilience mentor.'
          },
          {
            number: '05',
            title: 'Track grants & certifications',
            desc: 'Monitor milestone completion towards independence.'
          }
        ]
      }
    },
    {
      id: 'documentation',
      title: 'Documentation Vault',
      description: 'Organize important information, digital evidence, and legal records.',
      icon: FileText,
      leadTime: 'Instant · Client-side',
      details: {
        overview:
          'Securely store contemporaneous notes, threatening messages, photos, medical certificates, and identity cards in an encrypted device-local vault.',
        eligibility: 'Available to all users at zero cost.',
        safeguards: [
          'Zero-knowledge client-side encryption (AES-256)',
          'No automatic cloud synchronization without user passphrase',
          'Selective export allowing you to omit any page or field'
        ],
        steps: [
          {
            number: '01',
            title: 'Understand evidence preservation',
            desc: 'Learn what constitutes admissible contemporaneous records in court.'
          },
          {
            number: '02',
            title: 'Choose what to archive',
            desc: 'Select specific files, screenshots, or voice notes to preserve.'
          },
          {
            number: '03',
            title: 'Review timestamp validation',
            desc: 'Verify metadata and cryptographic hash integrity.'
          },
          {
            number: '04',
            title: 'Generate selective export',
            desc: 'Export clean PDFs with or without names for legal counsel.'
          },
          {
            number: '05',
            title: 'Track documentation log',
            desc: 'Maintain a pristine chronology for future proceedings.'
          }
        ]
      }
    }
  ];

  const currentCategory = pathways.find((p) => p.id === selectedCategory);

  // If a category is selected, render the SUPPORT JOURNEY DETAIL (Section 11)
  if (currentCategory) {
    const Icon = currentCategory.icon;

    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        {/* Back navigation */}
        <div className="flex items-center justify-between border-b border-stone-200/80 pb-4 pt-2">
          <button
            onClick={() => onSelectCategory(null)}
            className="inline-flex items-center gap-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Support Pathways</span>
          </button>
          <span className="text-xs font-mono text-stone-400">
            {currentCategory.leadTime}
          </span>
        </div>

        {/* Pathway Hero Header */}
        <section className="bg-white rounded-2xl p-6 sm:p-8 border border-stone-200 space-y-4 shadow-xs">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-800 flex items-center justify-center shrink-0">
              <Icon className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <span>Support Pathway</span>
                <span aria-hidden="true">·</span>
                <span>User-Directed</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-stone-900">
                {currentCategory.title}
              </h1>
              <p className="text-sm text-stone-600 max-w-2xl leading-relaxed">
                {currentCategory.details.overview}
              </p>
            </div>
          </div>

          {/* Key Safeguards */}
          <div className="pt-4 border-t border-stone-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentCategory.details.safeguards.map((sg, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-stone-600">
                <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                <span>{sg}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Your Next Steps - 5-Step Progress Flow (Section 11) */}
        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              Your next steps
            </h2>
            <p className="text-xs text-stone-500">
              Every step requires your conscious review. You decide when and what to proceed with.
            </p>
          </div>

          <div className="space-y-3">
            {currentCategory.details.steps.map((st, idx) => (
              <div
                key={st.number}
                className="bg-white p-5 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors flex items-start gap-4"
              >
                <span className="font-mono text-xs font-semibold text-teal-800 bg-teal-50 px-2 py-1 rounded border border-teal-200/60 shrink-0">
                  {st.number}
                </span>

                <div className="space-y-0.5 flex-1">
                  <h3 className="text-sm font-semibold text-stone-900">
                    {st.title}
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {st.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Primary CTA: START REFERRAL */}
        <section className="bg-stone-900 text-stone-100 rounded-2xl p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-semibold text-white">
              Ready to start your {currentCategory.title.toLowerCase()} request?
            </h3>
            <p className="text-xs text-stone-300 max-w-lg">
              Next, the Consent Center will let you choose exactly which details to share before anything is sent.
            </p>
          </div>

          <button
            onClick={() => onStartReferral(currentCategory.id)}
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 active:scale-[0.99] text-stone-950 font-semibold text-xs tracking-wide uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <span>START REFERRAL</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </div>
    );
  }

  // Support Navigator Main Directory (Section 10)
  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <section className="space-y-2 pt-2 border-b border-stone-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>Support Navigator</span>
          <span aria-hidden="true">·</span>
          <span>Dignity & Recovery Pathways</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
          What do you need now?
        </h1>
        <p className="text-sm text-stone-600 max-w-xl">
          You choose what happens next. Explore trusted medical, legal, emotional, and housing services designed around your pace and privacy.
        </p>
      </section>

      {/* Support Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pathways.map((path) => {
          const Icon = path.icon;
          return (
            <div
              key={path.id}
              onClick={() => onSelectCategory(path.id)}
              className="group bg-white rounded-2xl p-6 border border-stone-200/80 hover:border-stone-400 hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-stone-100 group-hover:bg-teal-50 group-hover:text-teal-700 text-stone-700 flex items-center justify-center mb-4 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-base font-semibold text-stone-900 group-hover:text-teal-950 transition-colors">
                  {path.title}
                </h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {path.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                <span className="text-stone-400 font-mono text-[11px]">
                  {path.leadTime}
                </span>
                <span className="text-stone-600 font-medium group-hover:text-stone-900 flex items-center gap-1 group-hover:translate-x-1 transition-all">
                  <span>Explore</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Philosophy banner */}
      <section className="p-6 bg-stone-100/70 rounded-2xl border border-stone-200 text-center space-y-2">
        <p className="text-xs uppercase tracking-widest font-semibold text-stone-500">
          The Sakhibridge Covenant
        </p>
        <p className="text-sm font-medium text-stone-800 max-w-lg mx-auto">
          "The emergency may end. Her journey doesn't have to."
        </p>
        <p className="text-xs text-stone-500 max-w-xl mx-auto">
          We do not rush you toward institutional procedures. Every pathway is transparent, voluntary, and entirely under your consent.
        </p>
      </section>
    </div>
  );
};
