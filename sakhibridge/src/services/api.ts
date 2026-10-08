import {
  UserProfile,
  Referral,
  IncidentEvent,
  Provider,
  ConsentItem,
  SupportCategoryType
} from '../types';

/**
 * SAKHIBRIDGE Service Layer
 * Structured for direct drop-in migration to FastAPI endpoints:
 * - GET /api/incidents
 * - POST /api/emergency/start
 * - POST /api/emergency/{id}/safe
 * - GET /api/support
 * - POST /api/referrals
 * - GET /api/referrals/{id}
 * - POST /api/consent
 */

const STORAGE_KEY_PREFIX = 'sakhibridge_data_';

const initialProfile: UserProfile = {
  name: 'Ananya Sharma',
  preferredName: 'Ananya',
  phone: '+91 98765 43210',
  email: 'ananya.sharma@example.com',
  emergencyPin: '2026',
  quickExitEnabled: true,
  locationPermission: 'granted_during_emergency_only',
  trustedContacts: [
    {
      id: 'tc-1',
      name: 'Pooja Verma',
      relationship: 'Sister',
      phone: '+91 98111 22334',
      notifyOnEmergency: true
    },
    {
      id: 'tc-2',
      name: 'Ritu Sen',
      relationship: 'Advocate & Friend',
      phone: '+91 98222 33445',
      notifyOnEmergency: true
    }
  ]
};

const initialTimelineEvents: IncidentEvent[] = [
  {
    id: 'evt-1',
    time: '16:42',
    title: 'Help request initiated',
    description: 'Emergency button triggered. Emergency packet assembled locally on device.',
    status: 'completed',
    category: 'Emergency'
  },
  {
    id: 'evt-2',
    time: '16:43',
    title: 'Emergency context prepared',
    description: 'Trusted contact Pooja Verma notified via secure link. Approximate location cached on device.',
    status: 'completed',
    category: 'Safety'
  },
  {
    id: 'evt-3',
    time: '16:45',
    title: 'Marked safe',
    description: 'User confirmed safety. Transitioned to post-crisis support flow.',
    status: 'completed',
    category: 'Status'
  },
  {
    id: 'evt-4',
    time: '16:47',
    title: 'Support navigation started',
    description: 'Legal support selected from Support Navigator.',
    status: 'completed',
    category: 'Navigation'
  },
  {
    id: 'evt-5',
    time: '16:54',
    title: 'Referral #SB-1024 submitted',
    description: 'Restricted consent grant sent to Nyaya Legal Aid Collective. 2 of 6 data fields shared.',
    status: 'active',
    category: 'Referral',
    actionRequired: false
  },
  {
    id: 'evt-6',
    time: 'Expected within 24h',
    title: 'Intake review by duty advocate',
    description: 'A dedicated pro-bono advocate will review the sanitized brief and confirm appointment slot.',
    status: 'upcoming',
    category: 'Intake'
  }
];

const initialReferrals: Referral[] = [
  {
    id: 'ref-1',
    referenceNumber: 'SB-1024',
    category: 'legal',
    title: 'Legal Aid & Protective Order Consultation',
    providerName: 'Nyaya Legal Aid Collective',
    providerType: 'Non-profit Legal Aid Society (Demo)',
    createdAt: 'Today, 16:50',
    submittedAt: 'Today, 16:54',
    status: 'submitted',
    statusLabel: 'Referral Submitted',
    nextExpectedStep: 'Intake confirmation from assigned counselor/advocate',
    intakeWindowEstimate: 'Within 24 hours (Business Days)',
    sharedFields: ['Incident Date & Approximate Time', 'General Area / District'],
    notes: 'Consent granted strictly for preliminary evaluation. Medical records and personal journal were withheld.'
  }
];

const initialConsentFields: ConsentItem[] = [
  {
    id: 'incident_date',
    label: 'Incident Date & Time',
    description: 'Essential for legal timelines and medical validity.',
    included: true,
    sensitiveLevel: 'low',
    previewValue: '2026-10-05 at 16:42'
  },
  {
    id: 'location',
    label: 'General Location / District',
    description: 'Helps match you with jurisdiction-appropriate local aid.',
    included: true,
    sensitiveLevel: 'low',
    previewValue: 'Central District, Ward 14'
  },
  {
    id: 'emergency_summary',
    label: 'Emergency Context Summary',
    description: 'High-level notes captured when help was requested.',
    included: false,
    sensitiveLevel: 'medium',
    previewValue: 'Physical safety threat in transit, exited safely to public place.'
  },
  {
    id: 'medical_details',
    label: 'Medical & Injury Observations',
    description: 'Clinical findings or immediate trauma notes.',
    included: false,
    sensitiveLevel: 'high',
    previewValue: 'No medical exam notes logged yet.'
  },
  {
    id: 'personal_notes',
    label: 'Personal Diary & Voice Memos',
    description: 'Your private chronological recollections.',
    included: false,
    sensitiveLevel: 'high',
    previewValue: 'Private journal entries (Encrypted locally).'
  },
  {
    id: 'documents',
    label: 'Supporting Identity / Incident Documents',
    description: 'Photos, messages, or formal paperwork.',
    included: false,
    sensitiveLevel: 'high',
    previewValue: '0 files selected.'
  }
];

const initialProviders: Provider[] = [
  {
    id: 'prv-1',
    name: 'Nyaya Legal Aid Collective',
    category: 'legal',
    categoryLabel: 'Legal Support',
    type: 'Non-profit Legal Aid Society',
    location: 'District Court Complex, South Wing',
    distance: '3.2 km away',
    contactMethod: 'Encrypted Digital Referral / In-person appointment',
    intakeTime: 'Within 24 hours',
    description: 'Specialized women advocates offering free legal counsel, protection order filing, and civil remedies.',
    services: ['Protection Orders', 'Court Representation', 'Confidential Legal Counseling', 'FIR Assistance'],
    isDemoData: true,
    confidentialityLevel: 'Attorney-Client Privilege Protocol'
  },
  {
    id: 'prv-2',
    name: 'Asha Crisis Intervention & Health Care',
    category: 'medical',
    categoryLabel: 'Medical Support',
    type: 'Designated One-Stop Crisis Center (OSCC)',
    location: 'Metropolitan General Hospital, Gate 4',
    distance: '1.8 km away',
    contactMethod: 'Direct Intake Desk / Tele-Triage',
    intakeTime: 'Immediate walk-in or within 1 hour',
    description: 'Trauma-informed female physicians and forensic nurses providing discreet examination, PEP, and emotional care.',
    services: ['Emergency First Care', 'Forensic Documentation', 'Post-Exposure Prophylaxis', 'Trauma Assessment'],
    isDemoData: true,
    confidentialityLevel: 'Strict Medical Privacy & Redaction Standard'
  },
  {
    id: 'prv-3',
    name: 'Samvad Psychological Care & Healing',
    category: 'counselling',
    categoryLabel: 'Emotional & Psychological',
    type: 'Accredited Mental Health Practice',
    location: 'Shanti Vihar, Block C',
    distance: '4.5 km away (or Remote Audio/Video)',
    contactMethod: 'Secure Video or In-person Clinic',
    intakeTime: '24 - 48 hours',
    description: 'Certified clinical psychologists specializing in gender-based trauma, acute stress recovery, and nervous system regulation.',
    services: ['PTSD Recovery', 'Nervous System Grounding', 'Weekly Psychotherapy', 'Survivor Support Groups'],
    isDemoData: true,
    confidentialityLevel: 'Clinical Confidentiality Protocol'
  },
  {
    id: 'prv-4',
    name: 'Sakhi Safe Haven & Transitional Housing',
    category: 'accommodation',
    categoryLabel: 'Safe Accommodation',
    type: 'Verified Non-governmental Shelter Network',
    location: 'Confidential Secure Location',
    distance: 'Secure transit arranged upon intake',
    contactMethod: 'Confidential Verification Officer',
    intakeTime: 'Same-day intake evaluation',
    description: 'Round-the-clock secured accommodation with private rooms, childcare support, and hot meals for women and children.',
    services: ['Emergency Shelter (1-14 days)', 'Transitional Housing', 'Security Guards & Access Control', 'Childcare & Meals'],
    isDemoData: true,
    confidentialityLevel: 'Undisclosed Safehouse Protocol'
  },
  {
    id: 'prv-5',
    name: 'Unnati Livelihood & Financial Resilience',
    category: 'financial',
    categoryLabel: 'Financial & Work Support',
    type: 'Economic Independence Initiative',
    location: 'Skill & Livelihood Center, Sector 9',
    distance: '6.1 km away (Remote consultations available)',
    contactMethod: 'Digital intake & Financial Coach',
    intakeTime: '3 - 5 business days',
    description: 'Emergency micro-grants, independent banking setup, skill certifications, and safe workplace placement.',
    services: ['Independent Bank Account Setup', 'Emergency Relocation Stipend', 'Job Placement Program', 'Financial Literacy Coaching'],
    isDemoData: true,
    confidentialityLevel: 'Private Financial Escrow Standard'
  },
  {
    id: 'prv-6',
    name: 'Satya Evidence & Safe Documentation Vault',
    category: 'documentation',
    categoryLabel: 'Documentation Support',
    type: 'Certified Legal Evidence Archive',
    location: 'Cloud Encrypted & Device Local',
    distance: 'Zero network transfer without key',
    contactMethod: 'Client-side Cryptographic Vault',
    intakeTime: 'Instant / Always available',
    description: 'Cryptographically timestamped incident logging, tamper-evident metadata preservation, and selective export for court or police.',
    services: ['Metadata Preservation', 'Selective Redaction Export', 'Audio & Photo Vault', 'Zero-Knowledge Archiving'],
    isDemoData: true,
    confidentialityLevel: 'End-to-End Encrypted (AES-256)'
  }
];

class SakhibridgeService {
  private profile: UserProfile = { ...initialProfile };
  private timeline: IncidentEvent[] = [...initialTimelineEvents];
  private referrals: Referral[] = [...initialReferrals];
  private consentFields: ConsentItem[] = [...initialConsentFields];
  private isEmergencyActive: boolean = false;
  private emergencyStartedAt: string | null = null;

  async getProfile(): Promise<UserProfile> {
    return { ...this.profile };
  }

  async updateProfile(updates: Partial<UserProfile>): Promise<UserProfile> {
    this.profile = { ...this.profile, ...updates };
    return { ...this.profile };
  }

  async getTimeline(): Promise<IncidentEvent[]> {
    return [...this.timeline];
  }

  async getReferrals(): Promise<Referral[]> {
    return [...this.referrals];
  }

  async getProviders(category?: SupportCategoryType): Promise<Provider[]> {
    if (!category) return [...initialProviders];
    return initialProviders.filter((p) => p.category === category);
  }

  async getConsentFields(): Promise<ConsentItem[]> {
    return [...this.consentFields];
  }

  async updateConsentFields(fields: ConsentItem[]): Promise<ConsentItem[]> {
    this.consentFields = [...fields];
    return [...this.consentFields];
  }

  async startEmergency(): Promise<{ id: string; time: string }> {
    this.isEmergencyActive = true;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    this.emergencyStartedAt = timeStr;

    // Add to timeline
    const newEvent: IncidentEvent = {
      id: `evt-${Date.now()}`,
      time: timeStr,
      title: 'Help request active',
      description: 'Emergency state activated by user. Context gathered on device.',
      status: 'active',
      category: 'Emergency'
    };
    this.timeline = [newEvent, ...this.timeline];

    return { id: `emg-${Date.now()}`, time: timeStr };
  }

  async markSafe(): Promise<{ success: boolean; time: string }> {
    this.isEmergencyActive = false;
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    // Mark previous active events as completed
    this.timeline = this.timeline.map((evt) =>
      evt.status === 'active' ? { ...evt, status: 'completed' as const } : evt
    );

    const safeEvent: IncidentEvent = {
      id: `evt-${Date.now()}`,
      time: timeStr,
      title: 'User marked safe',
      description: 'User affirmed safety. Transitioning to recovery pathways.',
      status: 'completed',
      category: 'Status'
    };
    this.timeline = [safeEvent, ...this.timeline];

    return { success: true, time: timeStr };
  }

  async createReferral(params: {
    category: SupportCategoryType;
    providerName: string;
    providerType: string;
    title: string;
    sharedFieldIds: string[];
    notes?: string;
  }): Promise<Referral> {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const dateStr = 'Today, ' + timeStr;
    const refNum = `SB-${Math.floor(1000 + Math.random() * 9000)}`;

    const sharedNames = this.consentFields
      .filter((f) => params.sharedFieldIds.includes(f.id))
      .map((f) => f.label);

    const newReferral: Referral = {
      id: `ref-${Date.now()}`,
      referenceNumber: refNum,
      category: params.category,
      title: params.title,
      providerName: params.providerName,
      providerType: params.providerType,
      createdAt: dateStr,
      submittedAt: dateStr,
      status: 'submitted',
      statusLabel: 'Referral Submitted',
      nextExpectedStep: 'Intake confirmation from assigned coordinator',
      intakeWindowEstimate: 'Within 24 hours (Business Days)',
      sharedFields: sharedNames,
      notes: params.notes || 'User approved specific data sharing scope.'
    };

    this.referrals = [newReferral, ...this.referrals];

    // Add timeline milestone
    const timelineEntry: IncidentEvent = {
      id: `evt-${Date.now()}`,
      time: timeStr,
      title: `Referral #${refNum} submitted to ${params.providerName}`,
      description: `${sharedNames.length} data fields approved by user. Case created.`,
      status: 'active',
      category: 'Referral'
    };
    this.timeline = [timelineEntry, ...this.timeline];

    return newReferral;
  }
}

export const apiService = new SakhibridgeService();
