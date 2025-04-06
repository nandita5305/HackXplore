export type UserSkill = 
  | "Frontend" 
  | "Backend" 
  | "UI/UX" 
  | "ML/AI" 
  | "DevOps" 
  | "Mobile" 
  | "IoT"
  | "Solidity"
  | "CSS"
  | "SQL"
  | "Figma"
  | "Adobe XD"
  | "Network Security"
  | "React Native"
  | "Unity"
  | "3D Modeling"
  | "Database"
  | "Docker"
  | "Kubernetes"
  | "AWS"
  | "AR/VR"
  | "C#"
  | "Embedded Systems";

export type HackathonType =
  | "Web"
  | "AI"
  | "Blockchain"
  | "Fintech"
  | "Health"
  | "EdTech"
  | "Cybersecurity"
  | "Data Science";

export interface User {
  id: string;
  email: string;
  name: string;
  skills: UserSkill[];
  interests: HackathonType[];
  preferredRole?: string;
  lookingFor: 'hackathons' | 'internships' | 'both';
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  avatarUrl?: string;
  dob?: string;
}

export interface Team {
  id: string;
  name: string;
  hackathonId: string;
  description: string;
  skills: UserSkill[];
  creator: string; // user id
  members: string[]; // user ids
  maxMembers: number;
  isOpen: boolean;
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
  mode: HackathonMode;
  description?: string;
  location?: string;
  prizePool?: string;
  type?: HackathonType[];
  teamSize?: number;
  skills?: UserSkill[];
  isBookmarked?: boolean;
}

export interface InternshipCard {
  id: string;
  title: string;
  company: string;
  location: string;
  deadline: string;
  duration: string;
  stipend: string;
  imageUrl: string;
  url: string;
  description?: string;
  skills?: UserSkill[];
  isBookmarked?: boolean;
  isRemote?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  text: string;
}

export interface PartnerLogo {
  id: string;
  name: string;
  logo: string;
  url: string;
}
