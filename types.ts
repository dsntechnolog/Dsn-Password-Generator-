export enum Tab {
  HOME = 'HOME',
  ADVICE = 'ADVICE',
  AI = 'AI',
  ABOUT = 'ABOUT',
}

export enum PasswordType {
  RANDOM = 'Random',
  MEMORABLE = 'Memorable',
  DASHED = 'Dashed',
}

export interface PasswordOptions {
  length: number;
  lowercase: boolean;
  uppercase: boolean;
  numbers: boolean;
  symbols: boolean;
  type: PasswordType;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}

export interface AISuggestion {
  password: string;
  type: string;
  explanation: string;
}