import React, { useState, useEffect } from 'react';
import {
  Search,
  Filter,
  MapPin,
  Clock,
  Shield,
  ArrowRight,
  Building,
  CheckCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { Provider, SupportCategoryType } from '../types';
import { apiService } from '../services/api';

interface ProviderDirectoryViewProps {
  onSelectProviderForReferral: (cat: SupportCategoryType) => void;
}

export const ProviderDirectoryView: React.FC<ProviderDirectoryViewProps> = ({
  onSelectProviderForReferral
}) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  useEffect(() => {
    apiService.getProviders().then(setProviders);
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All Resources' },
    { id: 'medical', label: 'Medical' },
    { id: 'legal', label: 'Legal' },
    { id: 'counselling', label: 'Counselling' },
    { id: 'accommodation', label: 'Accommodation' },
    { id: 'financial', label: 'Financial' }
  ];

  const filtered = providers.filter((p) => {
    const matchesFilter =
      selectedFilter === 'all' || p.category === selectedFilter;
    const matchesSearch =
      searchQuery === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.services.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="space-y-2 pt-2 border-b border-stone-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <span>Resource Directory</span>
          <span aria-hidden="true">·</span>
          <span>Verified Partner Network</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-stone-900">
          FIND THE RIGHT SUPPORT
        </h1>
        <p className="text-sm text-stone-600 max-w-xl">
          Search specialized non-profits, designated health centers, safehouses, and legal aid societies. All data shown is for demonstration.
        </p>
      </section>

      {/* Search & Category Filter Controls */}
      <section className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search support, service or location..."
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white border border-stone-200 text-xs sm:text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-1 focus:ring-stone-900 shadow-2xs"
          />
        </div>

        {/* Filter Segmented Buttons (Functional buttons per guidelines) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedFilter === tab.id
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Provider Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.length === 0 ? (
          <div className="col-span-2 py-12 text-center bg-white rounded-2xl border border-stone-200 space-y-2">
            <p className="text-sm font-semibold text-stone-800">
              No matching resources found
            </p>
            <p className="text-xs text-stone-500">
              Try adjusting your search terms or selecting another category.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="mt-2 text-xs font-semibold text-teal-800 hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filtered.map((prv) => (
            <div
              key={prv.id}
              className="bg-white rounded-2xl p-6 border border-stone-200 hover:border-stone-300 transition-all shadow-2xs flex flex-col justify-between space-y-5"
            >
              <div className="space-y-3">
                {/* Card Header with Unboxed Metadata */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                      <span className="font-medium text-teal-800">
                        {prv.categoryLabel}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span>{prv.type}</span>
                    </div>
                    <h3 className="text-base font-semibold text-stone-900 leading-snug">
                      {prv.name}
                    </h3>
                  </div>

                  {prv.isDemoData && (
                    <span className="text-[10px] font-mono text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded border border-stone-200 shrink-0">
                      Demo Provider
                    </span>
                  )}
                </div>

                <p className="text-xs text-stone-600 leading-relaxed">
                  {prv.description}
                </p>

                {/* Services list (clean inline tags) */}
                <div className="space-y-1">
                  <span className="text-[11px] font-semibold uppercase text-stone-400 block">
                    Specialized Services:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {prv.services.map((svc, i) => (
                      <span
                        key={i}
                        className="text-[11px] text-stone-700 bg-stone-100 px-2 py-0.5 rounded"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Practical Details */}
                <div className="space-y-1.5 text-xs text-stone-600 pt-2 border-t border-stone-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>
                      {prv.location} · <span className="font-mono">{prv.distance}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    <span>Intake timeframe: {prv.intakeTime}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="text-[11px] text-stone-500">
                      {prv.confidentialityLevel}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button: Start Referral */}
              <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                <span className="text-[11px] text-stone-400">
                  Selective Consent Guaranteed
                </span>

                <button
                  onClick={() => onSelectProviderForReferral(prv.category)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <span>Request Referral</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Trust & Transparency Footnote */}
      <section className="p-4 bg-stone-100/70 border border-stone-200 rounded-xl text-xs text-stone-500 text-center">
        Note: Organizations displayed here are illustrative demo partners. SAKHIBRIDGE only lists vetted non-profits and government one-stop crisis centers that undergo periodic independent audits.
      </section>
    </div>
  );
};
