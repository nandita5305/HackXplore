
export type UserSkill = 
  | "JavaScript" 
  | "Python" 
  | "Java" 
  | "C++" 
  | "React" 
  | "Angular" 
  | "Vue" 
  | "Node.js" 
  | "Express" 
  | "Django" 
  | "Flask" 
  | "TensorFlow" 
  | "PyTorch" 
  | "AI/ML" 
  | "Blockchain" 
  | "Web3" 
  | "Cloud Computing" 
  | "DevOps" 
  | "Mobile Development" 
  | "UI/UX Design" 
  | "Game Development" 
  | "Cybersecurity" 
  | "Data Science" 
  | "Backend" 
  | "Frontend" 
  | "Fullstack";

export type HackathonType = 
  | "Web Development" 
  | "Mobile Development" 
  | "AI/ML" 
  | "Blockchain" 
  | "Web3" 
  | "Game Development" 
  | "IoT" 
  | "Fintech" 
  | "Healthtech" 
  | "EdTech" 
  | "Social Impact" 
  | "Open Innovation";

export type HackathonMode = "online" | "in-person" | "hybrid";

export interface User {
  id: string;
  email: string;
  name: string;
  skills: UserSkill[];
  interests: HackathonType[];
  preferredRole?: string;
  lookingFor: "hackathons" | "internships" | "both";
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  avatarUrl?: string;
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
