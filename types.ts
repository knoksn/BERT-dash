
export interface FineTuningData {
  prompt: string;
  completion: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
}

export type AppStep = 'PREP' | 'TUNING' | 'CHAT';
export type StoryStep = 'PREMISE' | 'STYLE' | 'WRITE';
export type CarbertStep = 'PROFILE' | 'CALIBRATION' | 'QA';
export type BartholomewStep = 'RESEARCH' | 'INDEXING' | 'INQUIRY';
export type AnniBERTStep = 'DETAILS' | 'REFINING' | 'PLANNING';
export type LaBERTStep = 'BRIEF' | 'RESEARCH' | 'QA';
export type LiveBertStep = 'CONCEPT' | 'PREPRODUCTION' | 'SHOW_CONTROL';
export type RoBERTaStep = 'INTAKE' | 'OPTIMIZATION' | 'INTERVIEW_PREP';
export type RoBERToStep = 'INGREDIENTS' | 'PREP' | 'COOKING';
export type FitBERTStep = 'GOALS' | 'ADAPTATION' | 'COACHING';
export type DocuBERTStep = 'UPLOAD' | 'INDEXING' | 'QA';
export type TravelBERTStep = 'DESTINATION' | 'BOOKING' | 'CONCIERGE';
export type FinanceBERTStep = 'SETUP' | 'PROVISIONING' | 'INTEGRATION';

export type AppMode = 'TOOL_SUITE' | 'DARKBERT' | 'ARTIST' | 'STORYBERT' | 'CARBERT' | 'ANNIBERT' | 'BARTHOLOMEW' | 'LABERT' | 'LIVEBERT' | 'ROBERTA' | 'ROBERTO' | 'FITBERT' | 'DOCUBERT' | 'TRAVELBERT' | 'FINANCEBERT';

export type ToolCosts = {
  [key in AppMode]?: number;
};

export interface CreditContextType {
  credits: number;
  spendCredits: (amount: number) => void;
  addCredits: (amount: number) => void;
  showPaywall: () => void;
  hidePaywall: () => void;
}

export interface ScamAnalysisResult {
  likelihood: 'Low' | 'Medium' | 'High' | 'Critical';
  analysis: string;
  redFlags: string[];
  recommendations: string[];
}

export interface StoryPremise {
    title: string;
    logline: string;
    characters: {
        name: string;
        description: string;
    }[];
    setting: {
        name: string;
        description: string;
    };
    plotPoints: string[];
}

export interface VehicleProfile {
    modelName: string;
    year: number;
    manufacturer: string;
    history: string;
    specifications: {
        key: string;
        value: string;
    }[];
    designNotes: string;
}

export interface AnniversaryPlan {
    occasion: string;
    recipient: string;
    interests: string;
    budget: string;
    giftIdeas: {
        idea: string;
        description: string;
    }[];
    activitySuggestions: {
        activity: string;
        description: string;
    }[];
    messageStarters: string[];
}

export interface ResearchBrief {
    topic: string;
    summary: string;
    keyFigures: {
        name: string;
        significance: string;
    }[];
    timeline: {
        date: string;
        event: string;
    }[];
    researchQuestions: string[];
}

export interface CaseBrief {
    caseTitle: string;
    partiesInvolved: {
        role: string;
        name: string;
    }[];
    summaryOfFacts: string;
    identifiedLegalIssues: string[];
    relevantAreasOfLaw: string[];
    initialQuestions: string[];
}

export interface ProductionPlan {
    eventTitle: string;
    eventType: string;
    personnel: {
        role: string;
        responsibilities: string;
    }[];
    equipment: {
        department: string;
        items: string[];
    }[];
    runOfShow: {
        time: string;
        action: string;
    }[];
}

export interface ResumeProfile {
    contactInfo: {
        name: string;
        email: string;
        phone: string;
        linkedin: string;
    };
    summary: string;
    workExperience: {
        role: string;
        company: string;
        duration: string;
        responsibilities: string[];
    }[];
    education: {
        degree: string;
        institution: string;
        year: string;
    }[];
    skills: string[];
}

export interface RecipeProfile {
    dishName: string;
    description: string;
    ingredients: {
        amount: string;
        name: string;
    }[];
    instructions: string[];
    prepTime: string;
    cookTime: string;
}

export interface WorkoutPlan {
    planName: string;
    goal: string;
    duration: string;
    schedule: {
        day: string;
        exercises: {
            name: string;
            sets: string;
            reps: string;
        }[];
    }[];
    nutritionTips: string[];
    warmup: string;
    cooldown: string;
}

export interface DocumentSummary {
    title: string;
    abstract: string;
    keyTopics: string[];
    takeaways: string[];
}

export interface Itinerary {
    tripName: string;
    destination: string;
    duration: string;
    budget: string;
    dailyPlan: {
        day: number;
        theme: string;
        activities: {
            name:string;
            description: string;
        }[];
    }[];
    packingSuggestions: string[];
    localTips: string[];
}

export interface PaymentGatewayConfig {
    companyName: string;
    currency: string;
    providers: string[];
    apiKeys: {
        provider: string;
        publicKey: string;
        secretKey: string;
    }[];
    backendCode: string;
    frontendCode: string;
}
