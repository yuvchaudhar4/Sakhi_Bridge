export type SupportCategoryType =
  | 'medical'
  | 'legal'
  | 'counselling'
  | 'accommodation'
  | 'documentation'
  | 'financial';

export type JourneyStepStatus = 'completed' | 'active' | 'upcoming';

export interface JourneyMilestone {
  id: string;
  step: number;
  title: string;
  description: string;
  status: JourneyStepStatus;
  timestamp?: string;
  category?: SupportCategoryType;
}

export interface IncidentEvent {
  id: string;
  time: string;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
  category?: string;
  actionRequired?: boolean;
}

export interface ConsentItem {
  id: string;
  label: string;
  description: string;
  included: boolean;
  sensitiveLevel: 'low' | 'medium' | 'high';
  previewValue: string;
}

export interface Referral {
  id: string;
  referenceNumber: string;
  category: SupportCategoryType;
  title: string;
  providerName: string;
  providerType: string;
  createdAt: string;
  submittedAt?: string;
  status:
    | 'draft'
    | 'information_reviewed'
    | 'submitted'
    | 'institution_received'
    | 'appointment_scheduled'
    | 'in_follow_up'
    | 'completed';
  statusLabel: string;
  nextExpectedStep: string;
  sharedFields: string[];
  intakeWindowEstimate: string;
  notes?: string;
}

export interface Provider {
  id: string;
  name: string;
  category: SupportCategoryType;
  categoryLabel: string;
  type: string;
  location: string;
  distance: string;
  contactMethod: string;
  intakeTime: string;
  description: string;
  services: string[];
  isDemoData: boolean;
  confidentialityLevel: string;
}

export interface TrustedContact {
  id: string;
  name: string;
  relationship: string;
  phone: string;
  notifyOnEmergency: boolean;
}

export interface UserProfile {
  name: string;
  preferredName: string;
  phone: string;
  email: string;
  emergencyPin: string;
  quickExitEnabled: boolean;
  locationPermission: 'granted_during_emergency_only' | 'disabled';
  trustedContacts: TrustedContact[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    targetView: string;
    payload?: any;
  };
}

export type ViewState =
  | 'dashboard'
  | 'emergency'
  | 'safe_confirmation'
  | 'timeline'
  | 'support_navigator'
  | 'support_detail'
  | 'consent_center'
  | 'referral_tracking'
  | 'provider_directory'
  | 'ai_navigator'
  | 'privacy'
  | 'profile';
