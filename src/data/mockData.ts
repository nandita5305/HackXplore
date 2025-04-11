import { HackathonCard, InternshipCard, UserSkill, HackathonType } from '@/types';

// Mock data for skills
export const skillsOptions: UserSkill[] = [
  "JavaScript",
  "TypeScript",
  "React",
  "Node.js",
  "Python",
  "Java",
  "C++",
  "C#",
  "Angular",
  "MongoDB",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "UI/UX Design",
  "Blockchain",
  "Web3",
  "Solidity",
  "Data Analysis",
  "HTML",
  "CSS",
  "Machine Learning",
  "SQL",
  "Vue.js",
  "Git",
  "Figma",
  "Project Management",
  "Communication",
  "Problem Solving",
  "Leadership",
  "AI",
  "TensorFlow",
  "IoT",
  "Swift",
  "Objective-C",
  "iOS Development",
  "macOS Development",
  "PyTorch",
  "AI/ML",
  "Data Science",
  "Cloud Computing",
  "Cybersecurity",
  "Backend",
  "Mobile Development",
  "Software Development",
  "Computer Architecture",
  "Embedded Systems",
  ".NET",
  "Vue"
];

// Mock data for interest options
export const interestOptions: HackathonType[] = [
  "Web Development",
  "Mobile App Development", 
  "AI/ML",
  "Blockchain",
  "Web3",
  "Cybersecurity",
  "Cloud Computing",
  "IoT",
  "Game Development",
  "AR/VR",
  "HealthTech",
  "EdTech",
  "FinTech",
  "Sustainable Development"
];

// Partner logos
export const partnerLogos = [
  {
    name: "Microsoft",
    logo: "https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?q=80&w=150&h=150&auto=format&fit=crop",
    url: "https://microsoft.com"
  },
  {
    name: "Amazon",
    logo: "https://images.unsplash.com/photo-1602934445884-da0436954033?q=80&w=150&h=150&auto=format&fit=crop",
    url: "https://amazon.com"
  },
  {
    name: "Google",
    logo: "https://images.unsplash.com/photo-1600783245998-e7fe553fee8f?q=80&w=150&h=150&auto=format&fit=crop",
    url: "https://google.com"
  },
  {
    name: "Meta",
    logo: "https://images.unsplash.com/photo-1644419711997-0868be4f72d7?q=80&w=150&h=150&auto=format&fit=crop",
    url: "https://meta.com"
  }
];

// Testimonials data
export const testimonialsData = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Frontend Developer",
    company: "TechCorp",
    text: "I joined a hackathon team through HackXplore and ended up winning first place! Now I work full-time with my teammates at our own startup.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "UX Designer",
    company: "DesignHub",
    text: "Finding the right internship was always a struggle until I discovered HackXplore. Their platform connected me with opportunities that perfectly matched my skills.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    id: "3",
    name: "Sarah Williams",
    role: "Data Scientist",
    company: "DataWorks",
    text: "The team matching feature helped me find collaborators with complementary skills. We've now participated in three hackathons together!",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&h=150&auto=format&fit=crop"
  },
  {
    id: "4",
    name: "David Kim",
    role: "Full Stack Developer",
    company: "StartupX",
    text: "Through HackXplore, I found both a great internship and valuable connections in the industry. Highly recommend to all CS students!",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&h=150&auto=format&fit=crop"
  }
];

// Mock data for hackathons
export const hackathonsDataById: { [id: string]: HackathonCard } = {
  "hackathon-1": {
    id: "hackathon-1",
    title: "Sui Overflow 2025",
    url: "https://sui-overflow-2025.devfolio.co/",
    imageUrl: "https://sui-overflow-2025.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fee91218f02d542d79c57d44e6d1f7700%2Fassets%2Fcover%2F835.png&w=1440&q=100",
    dates: "Apr 1 - May 11, 2025",
    startDate: "2025-04-01",
    endDate: "2025-05-11",
    organizer: "Devfolio",
    mode: "online",
    location: "",
    type: ["Blockchain Technology"] as HackathonType[],
    prizePool: "$50,000",
    description: "Build innovative applications on the Sui blockchain and compete for prizes in this online hackathon.",
    teamSize: 4,
    skills: ["JavaScript", "React"] as UserSkill[]
  },
  "hackathon-2": {
    id: "hackathon-2",
    title: "Bio x AI Hackathon 2025",
    url: "https://bio-x-ai-berlin.devfolio.co/",
    imageUrl: "https://bio-x-ai-berlin.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcef47ebfc13142cfb8110e750875d03f%2Fassets%2Fcover%2F861.png&w=1440&q=100",
    dates: "Apr 8 - Jun 6, 2025",
    startDate: "2025-04-08",
    endDate: "2025-06-06",
    organizer: "Devfolio",
    mode: "online",
    location: "Virtual Event",
    type: ["AI/ML", "Healthtech"] as HackathonType[],
    prizePool: "$40,000",
    description: "Leverage AI to solve complex healthcare problems in this extended online hackathon.",
    teamSize: 5,
    skills: ["Python", "TensorFlow", "PyTorch", "AI/ML"] as UserSkill[]
  },
  "hackathon-3": {
    id: "hackathon-3",
    title: "Hack On Hills 6.0",
    url: "https://hack-on-hills.devfolio.co/",
    imageUrl: "https://hack-on-hills.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F56f07f74a9bd4da492709b8aadd11d2a%2Fassets%2Fcover%2F699.png&w=1440&q=100",
    dates: "Apr 11 - 13, 2025",
    startDate: "2025-04-11",
    endDate: "2025-04-13",
    organizer: "Devfolio",
    mode: "in-person",
    location: "Himachal Pradesh, India",
    type: ["Open Innovation"] as HackathonType[],
    prizePool: "$30,000",
    description: "Join us in the beautiful hills for an in-person hackathon experience with great prizes and networking.",
    teamSize: 4,
    skills: ["JavaScript", "React", "Node.js", "UI/UX Design"] as UserSkill[]
  },
  "hackathon-4": {
    id: "hackathon-4",
    title: "Hackofiesta 6.1",
    url: "https://hackofiesta-6-1.devfolio.co/",
    imageUrl: "https://hackofiesta-6-1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fe6070be6ac9d4cfdaa601fb62c180589%2Fassets%2Fcover%2F882.png&w=1440&q=100",
    dates: "Apr 5 - 6, 2025",
    startDate: "2025-04-05",
    endDate: "2025-04-06",
    organizer: "Devfolio",
    mode: "hybrid",
    location: "Multiple Locations",
    type: ["Web Development", "Mobile Development"] as HackathonType[],
    prizePool: "$25,000",
    description: "A 48-hour coding extravaganza with multiple tracks and exciting challenges.",
    teamSize: 3,
    skills: ["JavaScript", "React", "Angular", "Vue"] as UserSkill[]
  },
  "hackathon-5": {
    id: "hackathon-5",
    title: "Metallurgica Tech Hackathon'25",
    url: "https://metallurgica-tech-hackathon.devfolio.co/",
    imageUrl: "https://metallurgica-tech-hackathon.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fb70d9e873a69479c875a8167da263345%2Fassets%2Fcover%2F241.jpeg&w=1440&q=100",
    dates: "Mar 30 - Apr 4, 2025",
    startDate: "2025-03-30",
    endDate: "2025-04-04",
    organizer: "Devfolio",
    mode: "online",
    location: "Virtual Event",
    type: ["IoT", "AI/ML"] as HackathonType[],
    prizePool: "$35,000",
    description: "Combine metallurgy with cutting-edge technology to solve industry challenges.",
    teamSize: 4,
    skills: ["Python", "IoT", "AI/ML", "Data Science"] as UserSkill[]
  },
  "hackathon-6": {
    id: "hackathon-6",
    title: "NITDGP Hacks 2.0",
    url: "https://nitdgp-hacks-2.devfolio.co/",
    imageUrl: "https://nitdgp-hacks-2.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F8f14d2f827304855a29a604ae8f1b503%2Fassets%2Fcover%2F892.png&w=1440&q=100",
    dates: "Apr 5 - 6, 2025",
    startDate: "2025-04-05",
    endDate: "2025-04-06",
    organizer: "Devfolio",
    mode: "in-person",
    location: "Durgapur, India",
    type: ["Open Innovation"] as HackathonType[],
    prizePool: "$20,000",
    description: "NIT Durgapur brings you an exciting opportunity to showcase your coding skills.",
    teamSize: 4,
    skills: ["JavaScript", "React", "Node.js", "Backend"] as UserSkill[]
  },
  "hackathon-7": {
    id: "hackathon-7",
    title: "HackBlitz 2k25",
    url: "https://hackblitz2k25.devfolio.co/",
    imageUrl: "https://hackblitz2k25.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Faacd658b01914278b141b8704a4e36e3%2Fassets%2Fcover%2F165.png&w=1440&q=100",
    dates: "Apr 26 - 27, 2025",
    startDate: "2025-04-26",
    endDate: "2025-04-27",
    organizer: "Devfolio",
    mode: "online",
    location: "Virtual Event",
    type: ["Web Development", "AI/ML"] as HackathonType[],
    prizePool: "$28,000",
    description: "A 36-hour hackathon focused on creating impactful solutions using modern technologies.",
    teamSize: 3,
    skills: ["JavaScript", "Python", "React", "AI/ML"] as UserSkill[]
  },
  "hackathon-8": {
    id: "hackathon-8",
    title: "GajShield KJSSE Hack 8",
    url: "https://gajshield-kjsse-hack8.devfolio.co/",
    imageUrl: "https://gajshield-kjsse-hack8.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F9affbc7d8b4946d584a31f6c478c1d57%2Fassets%2Fcover%2F349.png&w=1440&q=100",
    dates: "Apr 12 - 13, 2025",
    startDate: "2025-04-12",
    endDate: "2025-04-13",
    organizer: "Devfolio",
    mode: "hybrid",
    location: "Mumbai, India",
    type: ["Cybersecurity", "Fintech"] as HackathonType[],
    prizePool: "$32,000",
    description: "Focus on cybersecurity challenges and build innovative solutions to protect digital assets.",
    teamSize: 4,
    skills: ["Cybersecurity", "JavaScript", "Python", "Backend"] as UserSkill[]
  },
  "hackathon-9": {
    id: "hackathon-9",
    title: "HackVSIT6.0",
    url: "https://hackvsit-6.devfolio.co/",
    imageUrl: "https://hackvsit-6.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F40a650f1a6524982bdc6455d79c9ba54%2Fassets%2Fcover%2F423.png&w=1440&q=100",
    dates: "Apr 25 - 26, 2025",
    startDate: "2025-04-25",
    endDate: "2025-04-26",
    organizer: "Devfolio",
    mode: "in-person",
    location: "Delhi, India",
    type: ["Web Development", "Mobile Development"] as HackathonType[],
    prizePool: "$22,000",
    description: "VSIT brings you a 24-hour coding marathon with exciting prizes and networking opportunities.",
    teamSize: 4,
    skills: ["JavaScript", "React", "Mobile Development", "UI/UX Design"] as UserSkill[]
  },
  "hackathon-10": {
    id: "hackathon-10",
    title: "RotaTechX",
    url: "https://rotatechx-1.devfolio.co/",
    imageUrl: "https://rotatechx-1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fdb9c42c5c0bf476aaecd1331e40aa076%2Fassets%2Fcover%2F267.png&w=1440&q=100",
    dates: "Apr 12 - 13, 2025",
    startDate: "2025-04-12",
    endDate: "2025-04-13",
    organizer: "Devfolio",
    mode: "online",
    location: "Virtual Event",
    type: ["Social Impact", "Open Innovation"] as HackathonType[],
    prizePool: "$18,000",
    description: "Build solutions that create social impact and address real-world challenges.",
    teamSize: 5,
    skills: ["JavaScript", "Python", "React", "Data Science"] as UserSkill[]
  },
  "hackathon-11": {
    id: "hackathon-11",
    title: "Spectrum'25",
    url: "https://spectrum25.devfolio.co/",
    imageUrl: "https://spectrum25.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F04b5354a4b4e4761a2c9db42ae7ed089%2Fassets%2Fcover%2F316.png&w=1440&q=100",
    dates: "Apr 11 - 12, 2025",
    startDate: "2025-04-11",
    endDate: "2025-04-12",
    organizer: "Devfolio",
    mode: "online",
    location: "Virtual Event",
    type: ["Web Development", "AI/ML"] as HackathonType[],
    prizePool: "$25,000",
    description: "A 24-hour hackathon focused on creating innovative solutions using modern web technologies.",
    teamSize: 3,
    skills: ["JavaScript", "React", "Node.js", "AI/ML"] as UserSkill[]
  },
  "hackathon-12": {
    id: "hackathon-12",
    title: "Hack The Grid – LUKSO",
    url: "https://hack-the-grid-level.devfolio.co/",
    imageUrl: "https://hack-the-grid-level.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F95688d8dd80d4ebeb247dde86af66c5e%2Fassets%2Fcover%2F498.png&w=1440&q=100",
    dates: "Mar 25 - Apr 7, 2025",
    startDate: "2025-03-25",
    endDate: "2025-04-07",
    organizer: "Devfolio",
    mode: "online",
    location: "Virtual Event",
    type: ["Blockchain", "Web3"] as HackathonType[],
    prizePool: "$45,000",
    description: "Build on the LUKSO blockchain and create innovative applications for the future of Web3.",
    teamSize: 4,
    skills: ["JavaScript", "Blockchain", "Web3", "React"] as UserSkill[]
  },
  "hackathon-13": {
    id: "hackathon-13",
    title: "DoraHacks Global Hack 2025",
    url: "https://dorahacks.io/hackathon/global2025",
    imageUrl: "https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=1000",
    dates: "May 15 - Jun 30, 2025",
    startDate: "2025-05-15",
    endDate: "2025-06-30",
    organizer: "DoraHacks",
    mode: "online",
    location: "Virtual Event",
    type: ["Blockchain", "Web3", "AI/ML"] as HackathonType[],
    prizePool: "$100,000",
    description: "The largest global hackathon series bringing together developers from around the world.",
    teamSize: 5,
    skills: ["JavaScript", "Python", "Blockchain", "AI/ML"] as UserSkill[]
  },
  "hackathon-14": {
    id: "hackathon-14",
    title: "Web3 Infinity Hackathon",
    url: "https://dorahacks.io/hackathon/web3infinity",
    imageUrl: "https://plus.unsplash.com/premium_photo-1675062287160-ebb2dd150ccd?q=80&w=1000",
    dates: "Apr 20 - May 20, 2025",
    startDate: "2025-04-20",
    endDate: "2025-05-20",
    organizer: "DoraHacks",
    mode: "online",
    location: "Virtual Event",
    type: ["Blockchain", "Web3"] as HackathonType[],
    prizePool: "$70,000",
    description: "Build the future of Web3 with this exciting online hackathon featuring multiple tracks.",
    teamSize: 4,
    skills: ["JavaScript", "Blockchain", "Web3", "Solidity"] as UserSkill[]
  },
  "hackathon-15": {
    id: "hackathon-15",
    title: "DevTown AI/ML Championship",
    url: "https://devtown.io/hackathons/aiml-championship",
    imageUrl: "https://images.unsplash.com/photo-1677442135968-6bd548d6d060?q=80&w=1000",
    dates: "May 1 - May 15, 2025",
    startDate: "2025-05-01",
    endDate: "2025-05-15",
    organizer: "DevTown",
    mode: "online",
    location: "Virtual Event",
    type: ["AI/ML", "Data Science"] as HackathonType[],
    prizePool: "$30,000",
    description: "Showcase your AI/ML skills and solve real-world problems in this online championship.",
    teamSize: 3,
    skills: ["Python", "TensorFlow", "PyTorch", "Data Science"] as UserSkill[]
  },
  "hackathon-16": {
    id: "hackathon-16",
    title: "DevTown Web Dev Showdown",
    url: "https://devtown.io/hackathons/webdev-showdown",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1000",
    dates: "Jun 5 - Jun 12, 2025",
    startDate: "2025-06-05",
    endDate: "2025-06-12",
    organizer: "DevTown",
    mode: "online",
    location: "Virtual Event",
    type: ["Web Development"] as HackathonType[],
    prizePool: "$25,000",
    description: "Build innovative web applications and compete for glory in this exciting hackathon.",
    teamSize: 3,
    skills: ["JavaScript", "React", "Node.js", "UI/UX Design"] as UserSkill[]
  }
};

export const hackathonsData: HackathonCard[] = Object.values(hackathonsDataById);

// Mock data for internships
export const internshipsDataById: { [id: string]: InternshipCard } = {
  "internship-1": {
    id: "internship-1",
    title: "AI Research Intern, Summer 2024",
    company: "Google",
    location: "Mountain View, CA",
    type: "Full-time",
    url: "https://careers.google.com/internships",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png",
    description: "Join Google's AI research team and work on cutting-edge projects. Contribute to the development of next-generation AI technologies.",
    skills: ["Python", "Machine Learning", "AI"] as UserSkill[],
    postedDate: "2024-01-15",
    duration: "12 weeks",
    deadline: "2024-03-15",
    stipend: "$8,000/month",
    isRemote: false,
  },
  "internship-2": {
    id: "internship-2",
    title: "Software Engineer Intern, Summer 2024",
    company: "Microsoft",
    location: "Redmond, WA",
    type: "Full-time",
    url: "https://careers.microsoft.com/internships",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2048px-Microsoft_logo_%282012%29.svg.png",
    description: "Develop innovative software solutions and work on real-world projects. Collaborate with experienced engineers and contribute to Microsoft products.",
    skills: ["C#", ".NET", "Azure", "Software Development"] as UserSkill[],
    postedDate: "2024-01-20",
    duration: "10 weeks",
    deadline: "2024-04-01",
    stipend: "$7,500/month",
    isRemote: false,
  },
  "internship-3": {
    id: "internship-3",
    title: "Data Science Intern, Summer 2024",
    company: "Amazon",
    location: "Seattle, WA",
    type: "Full-time",
    url: "https://www.amazon.jobs/en/internships",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    description: "Analyze large datasets and develop machine learning models. Contribute to Amazon's data-driven decision-making process.",
    skills: ["Python", "Data Analysis", "Machine Learning", "AWS"] as UserSkill[],
    postedDate: "2024-01-25",
    duration: "12 weeks",
    deadline: "2024-03-20",
    stipend: "$8,500/month",
    isRemote: false,
  },
  "internship-4": {
    id: "internship-4",
    title: "Software Engineer Intern, Summer 2024",
    company: "Meta",
    location: "Menlo Park, CA",
    type: "Full-time",
    url: "https://www.metacareers.com/internships/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
    description: "Build and maintain Meta's core products and services. Collaborate with experienced engineers and contribute to the company's mission.",
    skills: ["JavaScript", "React", "Node.js", "Software Development"] as UserSkill[],
    postedDate: "2024-01-30",
    duration: "12 weeks",
    deadline: "2024-03-25",
    stipend: "$9,000/month",
    isRemote: false,
  },
  "internship-5": {
    id: "internship-5",
    title: "Research Intern, Summer 2024",
    company: "IBM",
    location: "Yorktown Heights, NY",
    type: "Full-time",
    url: "https://www.research.ibm.com/careers/students/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
    description: "Conduct research in various areas of computer science. Contribute to IBM's research and development efforts.",
    skills: ["Python", "Data Science", "AI", "Cloud Computing"] as UserSkill[],
    postedDate: "2024-02-05",
    duration: "10 weeks",
    deadline: "2024-04-05",
    stipend: "$7,000/month",
    isRemote: false,
  },
  "internship-6": {
    id: "internship-6",
    title: "Software Engineer Intern, Summer 2024",
    company: "Apple",
    location: "Cupertino, CA",
    type: "Full-time",
    url: "https://www.apple.com/careers/us/students.html",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    description: "Develop innovative software solutions for Apple products. Collaborate with experienced engineers and contribute to the company's ecosystem.",
    skills: ["Swift", "Objective-C", "iOS Development", "macOS Development"] as UserSkill[],
    postedDate: "2024-02-10",
    duration: "12 weeks",
    deadline: "2024-04-10",
    stipend: "$9,500/month",
    isRemote: false,
  },
  "internship-7": {
    id: "internship-7",
    title: "Cloud Infrastructure Intern, Summer 2024",
    company: "Oracle",
    location: "Austin, TX",
    type: "Full-time",
    url: "https://www.oracle.com/corporate/careers/students-graduates/",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Oracle_logo.svg/2560px-Oracle_logo.svg.png",
    description: "Work on Oracle's cloud infrastructure and develop innovative solutions. Contribute to the company's cloud strategy.",
    skills: ["Java", "Cloud Computing", "AWS", "Azure"] as UserSkill[],
    postedDate: "2024-02-15",
    duration: "10 weeks",
    deadline: "2024-04-15",
    stipend: "$7,200/month",
    isRemote: false,
  },
  "internship-8": {
    id: "internship-8",
    title: "Software Engineer Intern, Summer 2024",
    company: "Intel",
    location: "Santa Clara, CA",
    type: "Full-time",
    url: "https://www.intel.com/content/www/us/en/jobs/students.html",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/2560px-Intel-logo.svg.png",
    description: "Develop software solutions for Intel's hardware products. Contribute to the company's innovation efforts.",
    skills: ["C++", "Software Development", "Computer Architecture", "Embedded Systems"] as UserSkill[],
    postedDate: "2024-02-20",
    duration: "12 weeks",
    deadline: "2024-04-20",
    stipend: "$8,000/month",
    isRemote: false,
  }
};

export const internshipsData: InternshipCard[] = Object.values(internshipsDataById);

// Ensure all hackathons have a location field
export const generateHackathonData = (id: string) => {
  return {
    id,
    title: `Hackathon ${id}`,
    url: `https://example.com/hackathon-${id}`,
    imageUrl: `/placeholder.svg`,
    dates: "July 15-17, 2023",
    startDate: "2023-07-15",
    endDate: "2023-07-17",
    organizer: "TechCrunch",
    mode: "online" as const,
    type: ["Web Development", "AI/ML"] as HackathonType[],
    prizePool: "$10,000",
    description: "Join this amazing hackathon and showcase your skills to win amazing prizes.",
    teamSize: 4,
    skills: ["JavaScript", "React", "Node.js"] as UserSkill[],
    location: "Virtual Event",
  };
};

// Fix all hackathon entries to include location field
Object.keys(hackathonsDataById).forEach(id => {
  if (!hackathonsDataById[id].location) {
    hackathonsDataById[id].location = "Virtual Event";
  }
});

// Ensure all internships have type and postedDate fields
export const generateInternshipData = (id: string) => {
  return {
    id,
    title: `Software Engineer Intern`,
    company: `Tech Company ${id}`,
    location: "San Francisco, CA",
    type: "Full-time",
    url: `https://example.com/internship-${id}`,
    imageUrl: `/placeholder.svg`,
    description: "Join our team as a software engineering intern and work on exciting projects.",
    skills: ["JavaScript", "React", "Node.js"] as UserSkill[],
    postedDate: "2023-06-01",
    duration: "3 months",
    deadline: "2023-06-30",
    stipend: "$5000/month",
    isRemote: false,
  };
};

// Fix all internship entries to include type and postedDate fields
Object.keys(internshipsDataById).forEach(id => {
  if (!internshipsDataById[id].type) {
    internshipsDataById[id].type = "Full-time";
  }
  if (!internshipsDataById[id].postedDate) {
    internshipsDataById[id].postedDate = "2023-06-01";
  }
});

// Additional hackathons data
export const additionalHackathonsData: HackathonCard[] = [
  {
    id: "hackathon-extra-1",
    title: "CloudHacks",
    url: "https://cloudhacks.tech",
    imageUrl: "/placeholder.svg",
    dates: "September 15-17, 2023",
    startDate: "2023-09-15",
    endDate: "2023-09-17",
    organizer: "Cloud Computing Alliance",
    mode: "online",
    type: ["Cloud Computing", "Web Development"] as HackathonType[],
    prizePool: "$15,000",
    description: "A cloud-focused hackathon where participants build innovative solutions using cloud technologies.",
    teamSize: 5,
    skills: ["AWS", "Azure", "Node.js", "Docker"] as UserSkill[],
    location: "Virtual Event",
    source: "Devpost"
  },
  {
    id: "hackathon-extra-2",
    title: "HealthTech Innovate",
    url: "https://healthtechinnovate.org",
    imageUrl: "/placeholder.svg",
    dates: "October 20-22, 2023",
    startDate: "2023-10-20",
    endDate: "2023-10-22",
    organizer: "HealthTech Foundation",
    mode: "hybrid",
    type: ["HealthTech", "AI/ML"] as HackathonType[],
    prizePool: "$20,000",
    description: "Create solutions that address challenges in healthcare using technology.",
    teamSize: 4,
    skills: ["Python", "Machine Learning", "Data Analysis"] as UserSkill[],
    location: "Boston, MA + Virtual",
    source: "MLH"
  },
  {
    id: "hackathon-extra-3",
    title: "EduHack",
    url: "https://eduhack.co",
    imageUrl: "/placeholder.svg",
    dates: "November 5-7, 2023",
    startDate: "2023-11-05",
    endDate: "2023-11-07",
    organizer: "EdTech Consortium",
    mode: "in-person",
    type: ["EdTech", "Web Development"] as HackathonType[],
    prizePool: "$10,000",
    description: "Developing innovative solutions to improve education and learning.",
    teamSize: 3,
    skills: ["JavaScript", "React", "Node.js"] as UserSkill[],
    location: "San Francisco, CA",
    source: "Devpost"
  },
  {
    id: "hackathon-extra-4",
    title: "Blockchain Summit Hackathon",
    url: "https://blockchainsummit.dev",
    imageUrl: "/placeholder.svg",
    dates: "December 1-3, 2023",
    startDate: "2023-12-01",
    endDate: "2023-12-03",
    organizer: "Blockchain Developers Association",
    mode: "online",
    type: ["Blockchain", "Web3"] as HackathonType[],
    prizePool: "$25,000",
    description: "Build decentralized applications and smart contracts to solve real-world problems.",
    teamSize: 4,
    skills: ["Solidity", "Web3", "JavaScript", "Blockchain"] as UserSkill[],
    location: "Virtual Event",
    source: "Devpost"
  },
  {
    id: "hackathon-extra-5",
    title: "Sustainable Tech Challenge",
    url: "https://sustainabletechx.org",
    imageUrl: "/placeholder.svg",
    dates: "January 15-17, 2024",
    startDate: "2024-01-15",
    endDate: "2024-01-17",
    organizer: "Climate Tech Initiative",
    mode: "hybrid",
    type: ["Sustainable Development", "IoT"] as HackathonType[],
    prizePool: "$18,000",
    description: "Develop technical solutions to environmental challenges and promote sustainability.",
    teamSize: 5,
    skills: ["IoT", "Python", "Data Analysis"] as UserSkill[],
    location: "Portland, OR + Virtual",
    source: "MLH"
  },
  {
    id: "hackathon-extra-6",
    title: "GameDevJam",
    url: "https://gamedevjam.io",
    imageUrl: "/placeholder.svg",
    dates: "February 8-10, 2024",
    startDate: "2024-02-08",
    endDate: "2024-02-10",
    organizer: "Game Developers Network",
    mode: "online",
    type: ["Game Development"] as HackathonType[],
    prizePool: "$12,000",
    description: "Create a game from scratch in 48 hours based on a surprise theme.",
    teamSize: 4,
    skills: ["Unity", "C#", "JavaScript", "3D Modeling"] as UserSkill[],
    location: "Virtual Event",
    source: "itch.io"
  }
];

// Additional internships data
export const additionalInternshipsData: InternshipCard[] = [
  {
    id: "internship-extra-1",
    title: "Machine Learning Research Intern",
    company: "DeepMind AI",
    location: "London, UK",
    type: "Full-time",
    url: "https://deepmind.com/careers",
    imageUrl: "/placeholder.svg",
    description: "Work on cutting-edge ML research projects and contribute to the advancement of AI.",
    skills: ["Python", "TensorFlow", "Machine Learning", "AI"] as UserSkill[],
    postedDate: "2023-09-10",
    duration: "6 months",
    deadline: "2023-10-15",
    stipend: "$6,000/month",
    isRemote: false
  },
  {
    id: "internship-extra-2",
    title: "Blockchain Developer Intern",
    company: "Ethereum Foundation",
    location: "Zurich, Switzerland",
    type: "Full-time",
    url: "https://ethereum.org/jobs",
    imageUrl: "/placeholder.svg",
    description: "Contribute to the Ethereum ecosystem by working on core protocols and tools.",
    skills: ["Solidity", "Web3", "JavaScript", "Blockchain"] as UserSkill[],
    postedDate: "2023-09-05",
    duration: "4 months",
    deadline: "2023-10-10",
    stipend: "$5,500/month",
    isRemote: true
  },
  {
    id: "internship-extra-3",
    title: "Data Science Intern",
    company: "Spotify",
    location: "Stockholm, Sweden",
    type: "Full-time",
    url: "https://spotify.com/jobs",
    imageUrl: "/placeholder.svg",
    description: "Work with large datasets to improve music recommendations and user experience.",
    skills: ["Python", "SQL", "Machine Learning", "Data Analysis"] as UserSkill[],
    postedDate: "2023-09-15",
    duration: "3 months",
    deadline: "2023-10-20",
    stipend: "$4,500/month",
    isRemote: false
  },
  {
    id: "internship-extra-4",
    title: "Cloud Engineering Intern",
    company: "Cloudflare",
    location: "San Francisco, CA",
    type: "Full-time",
    url: "https://cloudflare.com/careers",
    imageUrl: "/placeholder.svg",
    description: "Help build and maintain global cloud infrastructure and improve network performance.",
    skills: ["AWS", "Docker", "Kubernetes", "Go"] as UserSkill[],
    postedDate: "2023-09-20",
    duration: "6 months",
    deadline: "2023-10-25",
    stipend: "$6,500/month",
    isRemote: false
  }
];
