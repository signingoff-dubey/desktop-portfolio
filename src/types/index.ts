/* Types for the PY-OS Portfolio */

export interface WindowState {
  id: string;
  appId: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isFocused: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  techStack: string[];
  metrics?: string[];
  repoUrl?: string;
  demoUrl?: string;
}

export interface ExperienceEntry {
  id: string;
  dateRange: string;
  company: string;
  role: string;
  highlights: string[];
  techUsed: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Achievement {
  type: 'hackathon' | 'certification';
  title: string;
  organization: string;
  year?: number;
  place?: string;
  icon: string;
  image?: string;
  image2?: string;
  credentialId?: string;
}

export interface TimelineEntry {
  dateRange: string;
  title: string;
  organization: string;
  icon: string;
  type: 'education' | 'work';
}

export interface DesktopIconConfig {
  id: string;
  label: string;
  icon: string;
  appId: string;
}

export interface ClippyTip {
  message: string;
  emoji: string;
}
