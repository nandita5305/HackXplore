export type HackathonType =
  | "Open"
  | "Themed"
  | "Beginner-Friendly"
  | "AI/ML"
  | "Web3"
  | "Mobile"
  | "Hardware";

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
  type: HackathonType;
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
  | "Web Development"
  | "Mobile Development"
  | "Data Science"
  | "Machine Learning"
  | "Artificial Intelligence"
  | "Cybersecurity"
  | "Cloud Computing"
  | "DevOps"
  | "Blockchain"
  | "UI/UX Design"
  | "Game Development"
  | "Robotics"
  | "IoT"
  | "AR/VR"
  | "Full Stack Development"
  | "Frontend Development"
  | "Backend Development"
  | "Database Management"
  | "Network Administration"
  | "Project Management"
  | "Product Management"
  | "Digital Marketing"
  | "Graphic Design"
  | "Technical Writing"
  | "Sales"
  | "Customer Support"
  | "Business Analysis"
  | "Financial Analysis"
  | "Human Resources"
  | "Legal"
  | "Teaching"
  | "Research"
  | "Content Creation"
  | "Video Editing"
  | "Animation"
  | "3D Modeling"
  | "Data Analysis"
  | "Cloud Architecture"
  | "Network Security"
  | "Penetration Testing"
  | "Incident Response"
  | "Security Auditing"
  | "Risk Management"
  | "Compliance"
  | "Data Visualization"
  | "Statistical Analysis"
  | "Predictive Modeling"
  | "Natural Language Processing"
  | "Computer Vision"
  | "Deep Learning"
  | "Reinforcement Learning"
  | "Big Data"
  | "Data Mining"
  | "Data Warehousing"
  | "ETL"
  | "Data Governance"
  | "Data Integration"
  | "Data Quality"
  | "Data Security"
  | "Data Privacy"
  | "Data Ethics"
  | "Data Literacy"
  | "Data Storytelling"
  | "Data Strategy"
  | "Data Architecture"
  | "Data Engineering"
  | "Data Science as a Service"
  | "Machine Learning as a Service"
  | "Artificial Intelligence as a Service";

export interface UserProfile {
  id?: string;
  userId: string;
  name?: string;
  avatarUrl?: string;
  bio?: string;
  location?: string;
  skills?: UserSkill[];
  interests?: string[];
  githubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  preferredRole?: string;
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
