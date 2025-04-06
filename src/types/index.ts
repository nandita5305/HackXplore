
export type UserSkill = 
  | "JavaScript"
  | "Python"
  | "React"
  | "Node.js"
  | "HTML"
  | "CSS"
  | "Java"
  | "C++"
  | "C#"
  | "TypeScript"
  | "Vue.js"
  | "Angular"
  | "SQL"
  | "MongoDB"
  | "AWS"
  | "Azure"
  | "Docker"
  | "Kubernetes"
  | "Git"
  | "Figma"
  | "UI/UX Design"
  | "Project Management"
  | "Communication"
  | "Problem Solving"
  | "Leadership"
  | "Data Analysis"
  | "Machine Learning"
  | "AI"
  | "Blockchain"
  | "Solidity"
  | "Frontend" 
  | "Backend" 
  | "UI/UX" 
  | "ML/AI" 
  | "DevOps" 
  | "Mobile" 
  | "IoT"
  | "Adobe XD"
  | "Network Security"
  | "React Native"
  | "Unity"
  | "3D Modeling"
  | "Database"
  | "AR/VR"
  | "Embedded Systems"
  | "Express"
  | "Django"
  | "Flask"
  | "TensorFlow"
  | "PyTorch"
  | "AI/ML"
  | "Web3"
  | "Cloud Computing"
  | "Mobile Development"
  | "Game Development"
  | "Cybersecurity"
  | "Data Science"
  | "Fullstack"
  | ".NET"
  | "Swift"
  | "Kotlin"
  | "iOS Development"
  | "macOS Development"
  | "Software Development"
  | "Computer Architecture"
  | "Objective-C"
  | "Flutter";

export type HackathonType =
  | "Web Development"
  | "Mobile App Development"
  | "AI & Machine Learning"
  | "Blockchain Technology"
  | "Data Science"
  | "Cybersecurity"
  | "Cloud Computing"
  | "Game Development"
  | "UI/UX Design"
  | "E-commerce"
  | "Social Media"
  | "FinTech"
  | "HealthTech"
  | "EdTech"
  | "IoT (Internet of Things)"
  | "AR/VR"
  | "Robotics"
  | "Space Exploration"
  | "Renewable Energy"
  | "Sustainable Development"
  | "Web"
  | "AI"
  | "Blockchain"
  | "Fintech"
  | "Health"
  | "Cybersecurity"
  | "Web3"
  | "AI/ML"
  | "IoT"
  | "Open Innovation"
  | "Mobile Development"
  | "Social Impact"
  | "Healthtech"
  | "Mobile"
  | "UX/UI"
  | "App Development"
  | "Machine Learning"
  | "DeFi"
  | "Open Source";

export type HackathonMode = 
  | "online"
  | "in-person"
  | "hybrid";

export interface User {
  id: string;
  email: string;
  name?: string;
  skills?: UserSkill[];
  interests?: HackathonType[];
  preferredRole?: string;
  lookingFor?: 'hackathons' | 'internships' | 'both';
  bio?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  avatarUrl?: string;
  dob?: string;
}

// Alias UserProfile to User for backward compatibility
export type UserProfile = User;

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
  mode: HackathonMode | string;
  description?: string;
  location?: string;
  prizePool?: string;
  type?: HackathonType[] | string[];
  teamSize?: number;
  skills?: UserSkill[] | string[];
  isBookmarked?: boolean;
  onViewDetailsClick?: () => void;
  onFormTeamClick?: () => void;
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
  skills?: UserSkill[] | string[];
  isBookmarked?: boolean;
  isRemote?: boolean;
  onViewDetailsClick?: () => void;
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
  id?: string;
  name: string;
  logo: string;
  url: string;
}

