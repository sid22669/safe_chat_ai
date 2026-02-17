export type MessageCategory = 'Normal' | 'Spam' | 'Harassment' | 'Scam' | 'Promotional';
export type MessageAction = 'Allow' | 'Warn' | 'Block' | 'Report';
export type Screen = 'onboarding' | 'login' | 'home' | 'reports' | 'settings' | 'notifications' | 'category-detail';

export interface Message {
  id: string;
  content: string;
  category: MessageCategory;
  confidence: number;
  flaggedPatterns: string[];
  action: MessageAction | null;
  timestamp: string;
}

export interface UserProfile {
  name: string;
  avatar: string;
  onboarded: boolean;
}

export interface ClassifyResponse {
  category: MessageCategory;
  confidence: number;
  flagged_patterns: string[];
}
