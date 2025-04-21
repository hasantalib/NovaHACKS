// Quiz related types
export interface QuizOption {
  id: string;
  text: string;
  description: string;
  icon: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: QuizOption[];
}

export interface QuizResult {
  userId: number;
  answers: Record<number, string>;
  timestamp: Date;
}

// Career related types
export interface Career {
  id: number;
  title: string;
  field: string;
  description: string;
  match: number;
  salaryMin: number;
  salaryMax: number;
  medianSalary?: string;
  growth: number;
  growthDescription?: string;
  skills: string[];
  isLiked?: boolean;
  isSaved?: boolean;
  
  // Optional detailed data
  responsibilities?: string[];
  workSetting?: string;
  workSchedule?: string;
  teamStructure?: string;
  workStyle?: string;
  workLifeBalance?: number;
  topLocations?: string[];
  salaryByExperience?: {
    entry: string;
    mid: string;
    senior: string;
    expert: string;
  };
  salaryComparison?: {
    national: string;
    difference: string;
  };
  technicalSkills?: {
    name: string;
    level: number; // 1-10
  }[];
  softSkills?: string[];
  skillDevelopment?: string[];
  educationPaths?: {
    name: string;
    description: string;
    timeframe: string;
  }[];
  recommendedPrograms?: {
    name: string;
    provider: string;
    type: string;
    duration: string;
    cost: string;
  }[];
  alternativePaths?: string[];
  certifications?: {
    name: string;
    organization: string;
  }[];
  dailyActivities?: {
    time: string;
    description: string;
  }[];
  challenges?: string[];
  rewards?: string[];
  professionalPerspective?: {
    name: string;
    yearsExperience: string;
    quote: string;
  };
  requiredEducation?: string;
}

// User related types
export interface User {
  id: number;
  username: string;
  name?: string;
  email?: string;
  savedCareers?: number[];
  likedCareers?: number[];
  quizCompleted?: boolean;
}

// AI related types
export interface AIMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string; // Stored as string in database
}

export interface AIConversation {
  id: number;
  userId: number;
  messages: AIMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIRequest {
  message: string;
  userId?: number;
  conversationId?: number;
  context?: {
    quizResults?: QuizResult;
    viewedCareers?: number[];
    likedCareers?: number[];
  };
}

export interface AIResponse {
  response: string;
  conversationId: number;
}
