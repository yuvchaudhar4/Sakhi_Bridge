import React, { useState, useEffect } from 'react';
import {
  User,
  Phone,
  Mail,
  Users,
  Shield,
  Plus,
  Trash2,
  Check,
  Lock,
  Smartphone,
  EyeOff
} from 'lucide-react';
import { UserProfile, TrustedContact } from '../types';
import { apiService } from '../services/api';

export const SettingsProfileView: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactRel, setNewContactRel] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');

  useEffect(() => {
    apiService.getProfile().then(setProfile);
  }, []);

  const handleToggleContactNotification = (id: string) => {
    if (!profile) return;
    const updatedContacts = profile.trustedContacts.map((c) =>
      c.id === id ? { ...c, notifyOnEmergency: !c.notifyOnEmergency } : c
    );
    const updated = { ...profile, trustedContacts: updatedContacts };
    setProfile(updated);
    apiService.updateProfile(updated);
  };

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !newContactName.trim() || !newContactPhone.trim()) return;

    const newContact: TrustedContact = {
      id: `tc-${Date.now()}`,
      name: newContactName.trim(),
      relationship: newContactRel.trim() || 'Trusted Supporter',
      phone: newContactPhone.trim(),
      notifyOnEmergency: true
    };

    const updated = {
      ...profile,
      trustedContacts: [...profile.trustedContacts, newContact]
    };
    setProfile(updated);
    apiService.updateProfile(updated);
    setNewContactName('');
    setNewContactRel('');
    setNewContactPhone('');
    setShowAddContact(false);
  };

  const handleDeleteContact = (id: string) => {
    if (!profile) return;
    const updated = {
      ...profile,
      trustedContacts: profile.trustedContacts.filter((c) => c.id !== id)
    };
    setProfile(updated);
    apiService.updateProfile(updated);
  };

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <section className="space-y-2 pt-2 border-b border-stone-200/80 pb-6">
        <div className="flex items-center gap-2 text-xs text-stone-500">
          <User className="w-4 h-4 text-stone-700" />
          <span>Profile & Safety Preferences</span>
          <span aria-hidden="true">·</span>
          <span>Verified Account</span>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
          Profile & Security Settings
        </h1>
        <p className="text-sm text-stone-600 max-w-xl">
          Manage your contact credentials, emergency dispatch preferences, and trusted circle.
        </p>
      </section>

      {/* Personal Identity Card */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 space-y-6 shadow-2xs">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-stone-900 text-stone-100 flex items-center justify-center text-lg font-bold">
            AS
          </div>
          <div>
            <h2 className="text-lg font-semibold text-stone-900">
              {profile.name}
            </h2>
            <p className="text-xs text-stone-500">
              Preferred Name: {profile.preferredName} · Account Verified
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/50">
            <span className="text-stone-400 block text-[11px] mb-1">Email Address</span>
            <span className="font-medium text-stone-800 flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-stone-500" />
              <span>{profile.email}</span>
            </span>
          </div>

          <div className="p-3.5 rounded-xl border border-stone-100 bg-stone-50/50">
            <span className="text-stone-400 block text-[11px] mb-1">Registered Phone</span>
            <span className="font-medium text-stone-800 flex items-center gap-2 font-mono">
              <Phone className="w-3.5 h-3.5 text-stone-500" />
              <span>{profile.phone}</span>
            </span>
          </div>
        </div>
      </section>

      {/* Trusted Contacts Section */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4">
          <div>
            <h3 className="text-base font-semibold text-stone-900">
              Trusted Contacts
            </h3>
            <p className="text-xs text-stone-500">
              Individuals alerted when you activate Emergency Mode:
            </p>
          </div>

          <button
            onClick={() => setShowAddContact(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-stone-900 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Contact</span>
          </button>
        </div>

        <div className="space-y-2.5">
          {profile.trustedContacts.map((contact) => (
            <div
              key={contact.id}
              className="flex items-center justify-between p-4 rounded-xl border border-stone-200 bg-stone-50/40 text-xs"
            >
              <div className="space-y-0.5">
                <span className="font-semibold text-stone-900 block">
                  {contact.name}
                  <span className="text-stone-500 font-normal ml-2">
                    ({contact.relationship})
                  </span>
                </span>
                <span className="font-mono text-stone-500 text-[11px]">
                  {contact.phone}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleContactNotification(contact.id)}
                  className={`px-3 py-1 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                    contact.notifyOnEmergency
                      ? 'bg-teal-50 text-teal-800 border border-teal-200'
                      : 'bg-stone-100 text-stone-400'
                  }`}
                >
                  {contact.notifyOnEmergency
                    ? 'Notify on Emergency: Yes'
                    : 'Notify on Emergency: No'}
                </button>

                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="text-stone-400 hover:text-rose-600 p-1"
                  title="Remove contact"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Emergency & Stealth Preferences */}
      <section className="bg-white rounded-2xl p-6 sm:p-7 border border-stone-200 space-y-4 shadow-2xs text-xs">
        <h3 className="text-base font-semibold text-stone-900 border-b border-stone-100 pb-3">
          Emergency & Stealth Preferences
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border border-stone-100">
            <div>
              <span className="font-semibold text-stone-900 block">
                Quick Exit Keyboard Shortcut (Escape)
              </span>
              <span className="text-stone-500">
                Immediately disguises the application as a neutral daily planner.
              </span>
            </div>
            <span className="font-mono text-teal-800 font-semibold">Enabled</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-lg border border-stone-100">
            <div>
              <span className="font-semibold text-stone-900 block">
                Location Cache Strategy
              </span>
              <span className="text-stone-500">
                Location gathered strictly during active Help Request; never in background.
              </span>
            </div>
            <span className="font-mono text-teal-800 font-semibold">
              Emergency Only
            </span>
          </div>
        </div>
      </section>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 border border-stone-200">
            <h3 className="text-base font-semibold text-stone-900">
              Add Trusted Contact
            </h3>
            <p className="text-xs text-stone-600">
              This person will receive an encrypted text ping with your last status if emergency mode is engaged.
            </p>

            <form onSubmit={handleAddContact} className="space-y-3 text-xs">
              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newContactName}
                  onChange={(e) => setNewContactName(e.target.value)}
                  placeholder="e.g. Meera Nair"
                  className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Relationship
                </label>
                <input
                  type="text"
                  value={newContactRel}
                  onChange={(e) => setNewContactRel(e.target.value)}
                  placeholder="e.g. Friend, Sister, Colleague"
                  className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900"
                />
              </div>

              <div>
                <label className="block text-stone-700 font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={newContactPhone}
                  onChange={(e) => setNewContactPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full p-2.5 rounded-lg border border-stone-300 focus:outline-none focus:ring-1 focus:ring-stone-900 font-mono"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="px-3.5 py-2 text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-lg font-semibold"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
