
// Add or update the User type to include id and email fields
export interface User {
  id: string;
  email: string;
  name: string;
  skills: UserSkill[];
  interests: HackathonType[];
  lookingFor: "hackathons" | "internships" | "both";
  avatarUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

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
  | "Solidity";

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
  | "Sustainable Development";

export interface HackathonCard {
  id: string;
  title: string;
  organizer: string;
  dates: string;
  endDate: string;
  startDate: string;
  location: string;
  imageUrl: string;
  url: string;
  mode: "online" | "in-person" | "hybrid";
  type: HackathonType[];
  prizePool: string;
  teamSize: number;
  skills: UserSkill[];
  description: string;
  isBookmarked?: boolean;
}

// Add InternshipCard interface
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
  description: string;
  skills: UserSkill[];
  isRemote: boolean;
}

// Add Team interface for teamService
export interface Team {
  id: string;
  hackathonId: string;
  name: string;
  description: string;
  skillsNeeded: UserSkill[];
  members: string[];
  createdBy: string;
  createdAt: string;
}
