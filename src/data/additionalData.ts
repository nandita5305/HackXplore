
import { HackathonCard, InternshipCard, HackathonType, UserSkill } from "@/types";

// Additional hackathon data from DoraHacks
export const doraHacksData: HackathonCard[] = [
  {
    id: "dora-hacks-web3-2025",
    title: "Web3 Global Hackathon 2025",
    organizer: "DoraHacks",
    dates: "May 15 - June 30, 2025",
    startDate: "2025-05-15",
    endDate: "2025-06-30",
    location: "Global",
    imageUrl: "https://github.com/user-attachments/assets/6f7c776c-d250-4414-a100-dbb3670e47e5",
    url: "https://dorahacks.io/hackathon/web3-global",
    mode: "online",
    type: ["Blockchain Technology", "Web Development", "FinTech"] as HackathonType[],
    prizePool: "$500,000",
    teamSize: 5,
    skills: ["Solidity", "JavaScript", "React", "Node.js"] as UserSkill[],
    description: "Build the future of Web3. Focus areas include DeFi, NFTs, DAOs, and blockchain infrastructure.",
    source: "DoraHacks"
  },
  {
    id: "dora-hacks-ai-revolution",
    title: "AI Revolution Hackathon",
    organizer: "DoraHacks",
    dates: "July 10 - August 5, 2025",
    startDate: "2025-07-10",
    endDate: "2025-08-05",
    location: "Global",
    imageUrl: "https://github.com/user-attachments/assets/d754484f-5c13-4e28-b410-9db8594e945e",
    url: "https://dorahacks.io/hackathon/ai-revolution",
    mode: "online",
    type: ["AI & Machine Learning", "Data Science", "Cloud Computing"] as HackathonType[],
    prizePool: "$300,000",
    teamSize: 4,
    skills: ["Python", "TensorFlow", "AWS", "Data Analysis"] as UserSkill[],
    description: "Creating AI solutions for real-world problems. Solve challenges in healthcare, finance, and sustainability using machine learning.",
    source: "DoraHacks"
  },
  {
    id: "dora-hacks-gaming-metaverse",
    title: "Gaming & Metaverse Hackathon",
    organizer: "DoraHacks",
    dates: "August 20 - September 25, 2025",
    startDate: "2025-08-20",
    endDate: "2025-09-25",
    location: "San Francisco, CA",
    imageUrl: "https://github.com/user-attachments/assets/261f0c9d-53ae-4312-93ef-8dfb7764a5d3",
    url: "https://dorahacks.io/hackathon/gaming-metaverse",
    mode: "hybrid",
    type: ["Game Development", "AR/VR", "Blockchain Technology"] as HackathonType[],
    prizePool: "$250,000",
    teamSize: 5,
    skills: ["Unity", "C#", "JavaScript", "3D Modeling"] as UserSkill[],
    description: "Develop games, metaverse experiences, and interactive applications. Explore the future of entertainment and social interaction.",
    source: "DoraHacks"
  }
];

// Additional hackathon data from DevTown
export const devTownData: HackathonCard[] = [
  {
    id: "devtown-fullstack-2025",
    title: "FullStack Developer Hackathon 2025",
    organizer: "DevTown",
    dates: "April 25 - May 15, 2025",
    startDate: "2025-04-25",
    endDate: "2025-05-15",
    location: "Bangalore, India",
    imageUrl: "https://github.com/user-attachments/assets/2825dd90-8aff-42ea-9107-255c64a26daf",
    url: "https://devtown.in/hackathons/fullstack-2025",
    mode: "in-person",
    type: ["Web Development", "Mobile App Development", "UI/UX Design"] as HackathonType[],
    prizePool: "$50,000",
    teamSize: 4,
    skills: ["JavaScript", "React", "Node.js", "MongoDB"] as UserSkill[],
    description: "Build innovative applications with modern full-stack technologies. Create responsive, scalable solutions for real-world challenges.",
    source: "DevTown"
  },
  {
    id: "devtown-iot-solutions",
    title: "IoT Solutions Challenge",
    organizer: "DevTown",
    dates: "June 5 - June 25, 2025",
    startDate: "2025-06-05",
    endDate: "2025-06-25",
    location: "Delhi, India",
    imageUrl: "https://github.com/user-attachments/assets/6f7c776c-d250-4414-a100-dbb3670e47e5",
    url: "https://devtown.in/hackathons/iot-solutions",
    mode: "in-person",
    type: ["IoT (Internet of Things)", "Hardware", "Cloud Computing"] as HackathonType[],
    prizePool: "$30,000",
    teamSize: 3,
    skills: ["Python", "C++", "Arduino", "Cloud Computing"] as UserSkill[],
    description: "Create IoT solutions that solve everyday problems. Build smart devices, automation systems, and connected technology.",
    source: "DevTown"
  },
  {
    id: "devtown-edtech-innovation",
    title: "EdTech Innovation Challenge",
    organizer: "DevTown",
    dates: "July 15 - August 10, 2025",
    startDate: "2025-07-15",
    endDate: "2025-08-10",
    location: "Virtual",
    imageUrl: "https://github.com/user-attachments/assets/d754484f-5c13-4e28-b410-9db8594e945e",
    url: "https://devtown.in/hackathons/edtech-innovation",
    mode: "online",
    type: ["EdTech", "Web Development", "AI & Machine Learning"] as HackathonType[],
    prizePool: "$40,000",
    teamSize: 4,
    skills: ["JavaScript", "React", "Python", "UI/UX Design"] as UserSkill[],
    description: "Revolutionize education with technology. Develop platforms, tools, and applications that enhance learning experiences.",
    source: "DevTown"
  }
];

// Additional internship data
export const additionalInternships: InternshipCard[] = [
  {
    id: "devtown-frontend-intern",
    title: "Frontend Developer Intern",
    company: "DevTown",
    location: "Bangalore, India",
    deadline: "May 30, 2025",
    duration: "3 months",
    stipend: "₹25,000/month",
    imageUrl: "https://github.com/user-attachments/assets/2825dd90-8aff-42ea-9107-255c64a26daf",
    url: "https://devtown.in/careers/frontend-intern",
    description: "Work on building responsive UIs for web applications using React and related technologies.",
    skills: ["JavaScript", "React", "HTML", "CSS"] as UserSkill[],
    isRemote: false
  },
  {
    id: "dorahacks-blockchain-intern",
    title: "Blockchain Developer Intern",
    company: "DoraHacks",
    location: "Remote",
    deadline: "June 15, 2025",
    duration: "6 months",
    stipend: "$2,000/month",
    imageUrl: "https://github.com/user-attachments/assets/d754484f-5c13-4e28-b410-9db8594e945e",
    url: "https://dorahacks.io/careers/blockchain-intern",
    description: "Develop smart contracts and decentralized applications. Learn about Web3 technologies.",
    skills: ["Solidity", "JavaScript", "Web3.js", "React"] as UserSkill[],
    isRemote: true
  },
  {
    id: "devtown-data-science-intern",
    title: "Data Science Intern",
    company: "DevTown",
    location: "Delhi, India",
    deadline: "July 10, 2025",
    duration: "4 months",
    stipend: "₹30,000/month",
    imageUrl: "https://github.com/user-attachments/assets/261f0c9d-53ae-4312-93ef-8dfb7764a5d3",
    url: "https://devtown.in/careers/data-science-intern",
    description: "Analyze data, build models, and extract insights. Work on real-world projects in various domains.",
    skills: ["Python", "Data Analysis", "Machine Learning", "SQL"] as UserSkill[],
    isRemote: false
  },
  {
    id: "dorahacks-fullstack-intern",
    title: "Full Stack Developer Intern",
    company: "DoraHacks",
    location: "San Francisco, CA",
    deadline: "May 25, 2025",
    duration: "5 months",
    stipend: "$2,500/month",
    imageUrl: "https://github.com/user-attachments/assets/6f7c776c-d250-4414-a100-dbb3670e47e5",
    url: "https://dorahacks.io/careers/fullstack-intern",
    description: "Develop and maintain web applications. Work on both frontend and backend components.",
    skills: ["JavaScript", "React", "Node.js", "MongoDB"] as UserSkill[],
    isRemote: false
  }
];
