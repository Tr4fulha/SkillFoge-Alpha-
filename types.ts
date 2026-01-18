
export enum Difficulty {
  EASY = 'Iniciante',
  MEDIUM = 'Intermediário',
  HARD = 'Avançado',
}

export enum Category {
  DEV = 'Programação',
  NET = 'Redes',
  DB = 'Banco de Dados',
  LOGIC = 'Lógica',
}

export enum Rarity {
  COMMON = 'Comum',
  UNCOMMON = 'Incomum',
  RARE = 'Rara',
  EPIC = 'Épica',
  LEGENDARY = 'Lendária'
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: Rarity;
  points: number;
  reward?: string; // Ex: "Moldura Neon", "Bônus 2x XP"
  date?: string; // Data em que foi conquistada
  isUnlocked: boolean;
  progress?: number; // 0 a 100
}

export interface Hint {
  id: string;
  type: 'CONCEPT' | 'TECHNICAL' | 'REFINEMENT';
  title: string;
  content: string;
  minProgress: number;
  cost: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  pointsReward: number;
  costToUnlock: number;
  isLocked: boolean;
  author: string;
  companyId?: string;
  participants: number;
  hints?: Hint[];
  isDaily?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  date: string;
}

export interface UserProfile {
  id: string;
  name: string;
  role: 'Student' | 'Teacher' | 'Company';
  points: number;
  level: number;
  skills: {
    [key in Category]: number;
  };
  completedChallenges: string[];
  badges: Badge[];
  achievements: Achievement[];
  reputation: number;
  followers: number;
  following: number;
  isFollowing?: boolean;
  messages: Message[];
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  logoUrl: string;
  openPositions: number;
}

export interface Comment {
  id: string;
  challengeId: string;
  userName: string;
  userRole: string;
  text: string;
  timestamp: string;
  upvotes: number;
}

export interface Solution {
  id: string;
  challengeId: string;
  userName: string;
  userReputation: number;
  description: string;
  validations: number;
  status: 'PENDING' | 'VALIDATED' | 'REJECTED';
}
