
export type HackathonType =
  | "Open"
  | "Themed"
  | "Beginner-Friendly"
  | "AI/ML"
  | "Web3"
  | "Mobile"
  | "Hardware"
  | "Web Development"
  | "Cloud Computing"
  | "EdTech"
  | "HealthTech"
  | "Sustainable Development"
  | "Blockchain"
  | "Game Development"
  | "IoT"
  | "Robotics"
  | "AR/VR";

export interface HackathonCard {
  id: string;
  title: string;
  organizer: string;
  startDate: string;
  endDate: string;
  location: string;
  mode: "In-person" | "Online" | "Hybrid";
  prizePool?: number;
  tags: string[];
  applicationDeadline: string;
  url: string;
  image: string;
  isPopular: boolean;
  type: HackathonType | HackathonType[];
  description?: string;
}

export interface InternshipCard {
  id: string;
  title: string;
  company: string;
  location: string;
  isRemote: boolean;
  stipend?: number;
  duration: string;
  applicationDeadline: string;
  url: string;
  logo: string;
  requiredSkills: string[];
  companySize: "Startup" | "Small" | "Medium" | "Large";
  description?: string;
}

export type UserSkill =
  | "JavaScript"
  | "Python"
  | "Java"
  | "C++"
  | "C#"
  | "TypeScript"
  | "React"
  | "Angular"
  | "Vue.js"
  | "Node.js"
  | "Express.js"
  | "Django"
  | "Flask"
  | "Ruby on Rails"
  | "SQL"
  | "NoSQL"
  | "MongoDB"
  | "PostgreSQL"
  | "MySQL"
  | "AWS"
  | "Azure"
  | "Google Cloud"
  | "Docker"
  | "Kubernetes"
  | "Git"
  | "HTML"
  | "CSS"
  | "Sass"
  | "Less"
  | "UI/UX Design"
  | "Figma"
  | "Sketch"
  | "Adobe XD"
  | "Machine Learning"
  | "Deep Learning"
  | "Data Science"
  | "Data Analysis"
  | "Cybersecurity"
  | "Network Security"
  | "Cryptography"
  | "Penetration Testing"
  | "Blockchain"
  | "Web3"
  | "AR/VR"
  | "IoT"
  | "Robotics"
  | "Game Development"
  | "Mobile Development"
  | "Swift"
  | "Kotlin"
  | "React Native"
  | "Flutter";

export interface User {
  id: string;
  email: string;
}

export interface UserProfile {
  id?: string;
  userId: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  skills?: UserSkill[];
  interests?: HackathonType[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  preferredRole?: string;
  lookingFor?: 'hackathons' | 'internships' | 'both';
}

export interface Team {
  id: string;
  hackathonId: string;
  name: string;
  description: string;
  leaderId: string;
  members: string[];
  skillsNeeded: UserSkill[];
  maxMembers: number;
  isOpen: boolean;
  createdAt: string;
  updatedAt: string;
  creator?: {
    name: string;
    avatar: string;
  };
}

export interface TeamJoinRequest {
  id: string;
  teamId: string;
  userId: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export type ScholarshipType = 
  | "Merit-based"
  | "Need-based"
  | "Research"
  | "STEM"
  | "Diversity"
  | "International"
  | "Athletic"
  | "Community Service"
  | "Creative Arts";

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: number;
  deadline: string;
  type: ScholarshipType;
  eligibility: string[];
  link?: string;
  description?: string;
}

export interface ReminderItem {
  id: string;
  userId: string;
  title: string;
  date: string;
  type: "hackathon" | "internship" | "scholarship";
  notified: boolean;
  createdAt: string;
}

export interface PartnerLogo {
  name: string;
  logo: string;
  url: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  text: string;
}
