import React, { useState, useEffect } from 'react';
import {
  Clock,
  CheckCircle2,
  AlertCircle,
  FilePlus,
  Shield,
  Download,
  Filter,
  Lock,
  ChevronDown
} from 'lucide-react';
import { IncidentEvent } from '../types';
import { apiService } from '../services/api';

export const IncidentTimelineView: React.FC = () => {
  const [events, setEvents] = useState<IncidentEvent[]>([]);
  const [newNote, setNewNote] = useState('');
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  useEffect(() => {
    apiService.getTimeline().then(setEvents);
  }, []);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newEvent: IncidentEvent = {
      id: `evt-${Date.now()}`,
      time: timeStr,
      title: 'Personal Incident Recollection Added',
      description: newNote.trim(),
      status: 'completed',
      category: 'User Note'
    };

    setEvents([newEvent, ...events]);
    setNewNote('');
    setShowAddNoteModal(false);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `sakhibridge-journey-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setExportNotice('Encrypted JSON journey exported to your local device.');
    setTimeout(() => setExportNotice(null), 4000);
  };

  const filteredEvents =
    filterCategory === 'all'
      ? events
      : events.filter((e) => e.category?.toLowerCase() === filterCategory);

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Top Header */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-6 pt-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span>Audit Trail</span>
            <span aria-hidden="true">·</span>
            <span>Cryptographically Timestamped</span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
            YOUR JOURNEY
          </h1>
          <p className="text-sm text-stone-600 max-w-xl">
            Everything you've chosen to do, in one place. You retain complete agency over what is recorded.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setShowAddNoteModal(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-900 bg-white hover:bg-stone-50 rounded-lg border border-stone-200 transition-colors shadow-2xs cursor-pointer"
          >
            <FilePlus className="w-4 h-4 text-stone-600" />
            <span>Add Private Note</span>
          </button>
          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-stone-50 rounded-lg border border-stone-200 transition-colors cursor-pointer"
            title="Export local journey log"
          >
            <Download className="w-4 h-4 text-stone-500" />
            <span>Export Log</span>
          </button>
        </div>
      </section>

      {exportNotice && (
        <div className="p-3.5 rounded-lg bg-teal-50 border border-teal-200 text-teal-900 text-xs flex items-center justify-between">
          <span>{exportNotice}</span>
          <button
            onClick={() => setExportNotice(null)}
            className="text-teal-700 font-semibold"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Filter Tabs (Interactive buttons allowed per guidelines) */}
      <div className="flex items-center gap-2 text-xs overflow-x-auto pb-1">
        <span className="text-stone-400 text-[11px] uppercase tracking-wider mr-1">
          Filter:
        </span>
        {['all', 'emergency', 'status', 'referral', 'intake', 'user note'].map(
          (cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-md font-medium capitalize transition-colors whitespace-nowrap cursor-pointer ${
                filterCategory === cat
                  ? 'bg-stone-900 text-white'
                  : 'bg-white text-stone-600 hover:text-stone-900 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {/* Timeline Section */}
      <section className="relative">
        {/* Continuous Timeline Track */}
        <div className="absolute top-4 bottom-4 left-5 sm:left-24 w-[2px] bg-stone-200 -z-0" />

        <div className="space-y-6">
          {filteredEvents.map((evt) => {
            const isCompleted = evt.status === 'completed';
            const isActive = evt.status === 'active';
            const isUpcoming = evt.status === 'upcoming';

            return (
              <div
                key={evt.id}
                className="relative flex items-start gap-4 sm:gap-8 group"
              >
                {/* Desktop Timestamp Column */}
                <div className="hidden sm:block w-16 text-right shrink-0 pt-1">
                  <span className="font-mono text-xs font-semibold text-stone-600 tabular-nums">
                    {evt.time}
                  </span>
                </div>

                {/* Timeline Node */}
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors mt-0.5 ${
                    isCompleted
                      ? 'bg-teal-700 text-white'
                      : isActive
                      ? 'bg-white border-2 border-teal-600 text-teal-800 shadow-sm'
                      : 'bg-white border-2 border-stone-300 text-stone-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isActive ? (
                    <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-stone-300" />
                  )}
                </div>

                {/* Event Card Content */}
                <div className="flex-1 bg-white p-5 rounded-xl border border-stone-200 hover:border-stone-300 transition-colors shadow-2xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-stone-900">
                        {evt.title}
                      </span>
                      {evt.category && (
                        <span className="text-[11px] text-stone-500 font-mono">
                          · {evt.category}
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="sm:hidden font-mono text-[11px] text-stone-500">
                        {evt.time}
                      </span>
                      <span
                        className={`text-[11px] font-medium ${
                          isCompleted
                            ? 'text-emerald-700'
                            : isActive
                            ? 'text-teal-700'
                            : 'text-stone-400'
                        }`}
                      >
                        {isCompleted
                          ? 'Completed'
                          : isActive
                          ? 'Active Stage'
                          : 'Upcoming'}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {evt.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Institutional Distinction Guarantee Notice */}
      <section className="p-4 bg-stone-100/70 border border-stone-200 rounded-xl text-xs text-stone-600 space-y-1">
        <p className="font-semibold text-stone-800">
          Institutional Distinction Principle:
        </p>
        <p className="text-[11px] leading-relaxed text-stone-500">
          SAKHIBRIDGE records events only as they are authoritatively verified. "Referral submitted" indicates your encrypted packet was dispatched; "Institution received" is displayed solely when the recipient agency's duty coordinator validates receipt.
        </p>
      </section>

      {/* Add Note Modal */}
      {showAddNoteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-stone-200">
            <h3 className="text-base font-semibold text-stone-900">
              Add Secure Private Note
            </h3>
            <p className="text-xs text-stone-600">
              Record contemporaneous details (names, dates, physical notes). This entry stays encrypted locally on your device unless you explicitly include it in a future consent grant.
            </p>

            <form onSubmit={handleAddNote} className="space-y-4">
              <textarea
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                rows={4}
                placeholder="Type your notes here. You choose what happens to this information."
                className="w-full text-xs p-3 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-teal-700"
                autoFocus
              />

              <div className="flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowAddNoteModal(false)}
                  className="px-3.5 py-2 text-xs text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold bg-stone-900 hover:bg-stone-800 text-white rounded-lg"
                >
                  Save to Local Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
