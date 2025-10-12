export interface User {
  id: string;
  email: string;
  displayName: string;
  isAdmin: boolean;
  solvedProblems: string[];
  createdAt: Date;
  lastLogin: Date;
}

export interface Problem {
  id: string;
  problemNumber: number;
  title: string;
  category: ProblemCategory;
  difficulty: 1 | 2 | 3 | 4 | 5;
  problemText: string;
  hint?: string;
  solution: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: string;
}

export interface CurrentProblem {
  problemId: string;
  isLive: boolean;
  setAt: Date;
  setBy: string;
  liveStatus?: string;
}

export interface UserProgress {
  id?: string;
  userId: string;
  problemId: string;
  solved: boolean;
  solvedAt?: Date;
  attempts?: number;
}

export type ProblemCategory =
  | 'Kinematics'
  | 'Forces'
  | 'Energy'
  | 'Rotation'
  | 'Center of Mass'
  | 'Momentum'
  | 'Oscillations'
  | 'Thermodynamics'
  | 'Waves'
  | 'Electricity'
  | 'Magnetism'
  | 'Optics'
  | 'Modern Physics';

export interface CategoryProgress {
  category: ProblemCategory;
  totalProblems: number;
  solvedProblems: number;
  percentage: number;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}