
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
  | "Angular" 
  | "MongoDB" 
  | "AWS" 
  | "Azure" 
  | "Docker" 
  | "Kubernetes" 
  | "UI/UX Design" 
  | "Blockchain" 
  | "Web3" 
  | "Solidity" 
  | "Data Analysis" 
  | "HTML" 
  | "CSS" 
  | "Machine Learning" 
  | "SQL" 
  | "Vue.js" 
  | "Git" 
  | "Figma" 
  | "Project Management" 
  | "Communication" 
  | "Problem Solving" 
  | "Leadership" 
  | "AI" 
  | "TensorFlow" 
  | "IoT"
  | "Swift"
  | "Objective-C"
  | "iOS Development"
  | "macOS Development"
  | "PyTorch"
  | "AI/ML"
  | "Data Science"
  | "Cloud Computing"
  | "Cybersecurity"
  | "Backend"
  | "Mobile Development"
  | "Software Development"
  | "Computer Architecture"
  | "Embedded Systems"
  | ".NET"
  | "Vue";

export type HackathonType = 
  | "Web Development" 
  | "Mobile App Development" 
  | "AI/ML" 
  | "Blockchain" 
  | "Web3" 
  | "Open Innovation"
  | "Social Impact"
  | "Cybersecurity"
  | "IoT"
  | "Cloud Computing"
  | "Data Science"
  | "HealthTech"
  | "EdTech"
  | "FinTech"
  | "Blockchain Technology"
  | "AI & Machine Learning"
  | "AR/VR"
  | "IoT (Internet of Things)"
  | "Hardware"
  | "Sustainable Development"
  | "Game Development"
  | "Mobile Development"
  | "Fintech"
  | "Healthtech"
  | "UI/UX Design"
  | "E-commerce"
  | "Social Media"
  | "Robotics"
  | "Space Exploration"
  | "Renewable Energy";

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
  source?: string;
}

export interface HackathonCardProps extends Partial<HackathonCard> {
  id: string;
  title: string;
  url: string;
  imageUrl: string;
  location: string;
  isDetailed?: boolean;
  onViewDetails?: () => void;
  onFormTeam?: () => void;
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
  deadline?: string;
  stipend?: string;
  isRemote?: boolean;
}

export interface InternshipCardProps extends Partial<InternshipCard> {
  id: string;
  title: string;
  company: string;
  location: string;
  onViewDetailsClick?: () => void;
}

export interface Bookmark {
  id: string;
  createdAt: string;
  userId: string;
  itemId: string;
  itemType: 'hackathon' | 'internship';
}

export interface Reminder {
  id: string;
  userId: string;
  internshipId: string;
  internshipTitle: string;
  company: string;
  reminderDate: string;
  note?: string;
  isNotified: boolean;
}

export interface TeamJoinRequest {
  id: string;
  teamId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}
