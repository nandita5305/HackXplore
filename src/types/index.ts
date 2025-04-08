export interface User {
  id: string;
  email: string;
  name?: string;
  skills?: UserSkill[];
  interests?: HackathonType[];
  avatarUrl?: string;
}

export interface UserProfile {
  name: string;
  skills: UserSkill[];
  interests: HackathonType[];
  lookingFor: 'hackathons' | 'internships' | 'both';
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  preferredRole?: string;
  bio?: string;
}

export type UserSkill = 
  | "JavaScript" 
  | "TypeScript" 
  | "React" 
  | "Node.js" 
  | "Python" 
  | "Java" 
  | "C++" 
  | "C#" 
  | "PHP" 
  | "Ruby" 
  | "Go" 
  | "Rust" 
  | "Flutter" 
  | "Kotlin" 
  | "Swift" 
  | "Objective-C" 
  | "iOS Development" 
  | "macOS Development" 
  | "Android" 
  | "Vue" 
  | "Angular" 
  | "MongoDB" 
  | "MySQL" 
  | "PostgreSQL" 
  | "GraphQL" 
  | "AWS" 
  | "Azure" 
  | "GCP" 
  | "DevOps" 
  | "Docker" 
  | "Kubernetes" 
  | "UI/UX Design" 
  | "Product Management" 
  | "Technical Writing" 
  | "AI/ML" 
  | "PyTorch" 
  | "Data Science" 
  | "Cybersecurity" 
  | "Blockchain" 
  | "Web3" 
  | "IoT" 
  | "Backend" 
  | ".NET" 
  | "Software Development" 
  | "Computer Architecture" 
  | "Embedded Systems" 
  | "Cloud Computing" 
  | "Mobile Development";

export type HackathonType = 
  | "Web Development" 
  | "Mobile App Development" 
  | "Game Development" 
  | "HealthTech" 
  | "EdTech" 
  | "FinTech" 
  | "Sustainability" 
  | "Social Impact" 
  | "Open Innovation" 
  | "AI/ML" 
  | "Blockchain" 
  | "Web3" 
  | "IoT" 
  | "Healthtech"
  | "Fintech"
  | "Mobile Development";

export interface Team {
  id: string;
  createdAt: string;
  name: string;
  hackathonId: string;
  description: string;
  skillsNeeded: UserSkill[];
  creator: string;
  maxMembers: number;
  isOpen: boolean;
  members: string[];
}

export interface HackathonCard {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  dates: string;
  startDate: string;
  endDate: string;
  organizer: string;
  mode: "online" | "in-person" | "hybrid";
  type: HackathonType[];
  prizePool: string;
  description: string;
  teamSize: number;
  skills: UserSkill[];
  location: string;
}

export interface HackathonCardProps extends Partial<HackathonCard> {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  location: string;
}

export interface InternshipCard {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  url: string;
  imageUrl: string;
  description: string;
  skills: UserSkill[];
  postedDate: string;
  duration: string;
}

export interface Bookmark {
  id: string;
  createdAt: string;
  userId: string;
  itemId: string;
  itemType: 'hackathon' | 'internship';
}
