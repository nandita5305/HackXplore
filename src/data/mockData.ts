
import { HackathonCard, InternshipCard, PartnerLogo, Testimonial, UserSkill } from "@/types";
import { v4 as uuidv4 } from "uuid";

// Create proper IDs for each hackathon
export const hackathonsData: HackathonCard[] = [
  {
    id: uuidv4(),
    title: 'Sui Overflow 2025',
    url: 'https://sui-overflow-2025.devfolio.co/',
    imageUrl: 'https://sui-overflow-2025.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fee91218f02d542d79c57d44e6d1f7700%2Fassets%2Fcover%2F835.png&w=1440&q=100',
    dates: 'Apr 1 - May 11, 2025',
    startDate: 'Apr 1',
    endDate: 'May 11, 2025',
    organizer: 'Devfolio',
    mode: 'online',
    type: ['Blockchain', 'Web3'],
    prizePool: '$50,000',
    description: 'Build innovative applications on the Sui blockchain and compete for prizes in this online hackathon.',
    teamSize: 4,
    skills: ['JavaScript', 'Blockchain', 'Web3', 'React']
  },
  {
    id: uuidv4(),
    title: 'Bio x AI Hackathon 2025',
    url: 'https://bio-x-ai-berlin.devfolio.co/',
    imageUrl: 'https://bio-x-ai-berlin.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fcef47ebfc13142cfb8110e750875d03f%2Fassets%2Fcover%2F861.png&w=1440&q=100',
    dates: 'Apr 8 - Jun 6, 2025',
    startDate: 'Apr 8',
    endDate: 'Jun 6, 2025',
    organizer: 'Devfolio',
    mode: 'online',
    type: ['AI/ML', 'Healthtech'],
    prizePool: '$40,000',
    description: 'Leverage AI to solve complex healthcare problems in this extended online hackathon.',
    teamSize: 5,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'AI/ML']
  },
  {
    id: uuidv4(),
    title: 'Hack On Hills 6.0',
    url: 'https://hack-on-hills.devfolio.co/',
    imageUrl: 'https://hack-on-hills.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F56f07f74a9bd4da492709b8aadd11d2a%2Fassets%2Fcover%2F699.png&w=1440&q=100',
    dates: 'Apr 11 - 13, 2025',
    startDate: 'Apr 11',
    endDate: '13, 2025',
    organizer: 'Devfolio',
    mode: 'in-person',
    location: 'Himachal Pradesh, India',
    type: ['Open Innovation'],
    prizePool: '$30,000',
    description: 'Join us in the beautiful hills for an in-person hackathon experience with great prizes and networking.',
    teamSize: 4,
    skills: ['JavaScript', 'React', 'Node.js', 'UI/UX Design']
  },
  {
    id: uuidv4(),
    title: 'Hackofiesta 6.1',
    url: 'https://hackofiesta-6-1.devfolio.co/',
    imageUrl: 'https://hackofiesta-6-1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fe6070be6ac9d4cfdaa601fb62c180589%2Fassets%2Fcover%2F882.png&w=1440&q=100',
    dates: 'Apr 5 - 6, 2025',
    startDate: 'Apr 5',
    endDate: '6, 2025',
    organizer: 'Devfolio',
    mode: 'hybrid',
    location: 'Multiple Locations',
    type: ['Web Development', 'Mobile Development'],
    prizePool: '$25,000',
    description: 'A 48-hour coding extravaganza with multiple tracks and exciting challenges.',
    teamSize: 3,
    skills: ['JavaScript', 'React', 'Angular', 'Vue']
  },
  {
    id: uuidv4(),
    title: "Metallurgica Tech Hackathon'25",
    url: 'https://metallurgica-tech-hackathon.devfolio.co/',
    imageUrl: 'https://metallurgica-tech-hackathon.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fb70d9e873a69479c875a8167da263345%2Fassets%2Fcover%2F241.jpeg&w=1440&q=100',
    dates: 'Mar 30 - Apr 4, 2025',
    startDate: 'Mar 30',
    endDate: 'Apr 4, 2025',
    organizer: 'Devfolio',
    mode: 'online',
    type: ['IoT', 'AI/ML'],
    prizePool: '$35,000',
    description: 'Combine metallurgy with cutting-edge technology to solve industry challenges.',
    teamSize: 4,
    skills: ['Python', 'IoT', 'AI/ML', 'Data Science']
  },
  {
    id: uuidv4(),
    title: 'NITDGP Hacks 2.0',
    url: 'https://nitdgp-hacks-2.devfolio.co/',
    imageUrl: 'https://nitdgp-hacks-2.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F8f14d2f827304855a29a604ae8f1b503%2Fassets%2Fcover%2F892.png&w=1440&q=100',
    dates: 'Apr 5 - 6, 2025',
    startDate: 'Apr 5',
    endDate: '6, 2025',
    organizer: 'Devfolio',
    mode: 'in-person',
    location: 'Durgapur, India',
    type: ['Open Innovation'],
    prizePool: '$20,000',
    description: 'NIT Durgapur brings you an exciting opportunity to showcase your coding skills.',
    teamSize: 4,
    skills: ['JavaScript', 'React', 'Node.js', 'Backend']
  },
  {
    id: uuidv4(),
    title: 'HackBlitz 2k25',
    url: 'https://hackblitz2k25.devfolio.co/',
    imageUrl: 'https://hackblitz2k25.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Faacd658b01914278b141b8704a4e36e3%2Fassets%2Fcover%2F165.png&w=1440&q=100',
    dates: 'Apr 26 - 27, 2025',
    startDate: 'Apr 26',
    endDate: '27, 2025',
    organizer: 'Devfolio',
    mode: 'online',
    type: ['Web Development', 'AI/ML'],
    prizePool: '$28,000',
    description: 'A 36-hour hackathon focused on creating impactful solutions using modern technologies.',
    teamSize: 3,
    skills: ['JavaScript', 'Python', 'React', 'AI/ML']
  },
  {
    id: uuidv4(),
    title: 'GajShield KJSSE Hack 8',
    url: 'https://gajshield-kjsse-hack8.devfolio.co/',
    imageUrl: 'https://gajshield-kjsse-hack8.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F9affbc7d8b4946d584a31f6c478c1d57%2Fassets%2Fcover%2F349.png&w=1440&q=100',
    dates: 'Apr 12 - 13, 2025',
    startDate: 'Apr 12',
    endDate: '13, 2025',
    organizer: 'Devfolio',
    mode: 'hybrid',
    location: 'Mumbai, India',
    type: ['Cybersecurity', 'Fintech'],
    prizePool: '$32,000',
    description: 'Focus on cybersecurity challenges and build innovative solutions to protect digital assets.',
    teamSize: 4,
    skills: ['Cybersecurity', 'JavaScript', 'Python', 'Backend']
  },
  {
    id: uuidv4(),
    title: 'HackVSIT6.0',
    url: 'https://hackvsit-6.devfolio.co/',
    imageUrl: 'https://hackvsit-6.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F40a650f1a6524982bdc6455d79c9ba54%2Fassets%2Fcover%2F423.png&w=1440&q=100',
    dates: 'Apr 25 - 26, 2025',
    startDate: 'Apr 25',
    endDate: '26, 2025',
    organizer: 'Devfolio',
    mode: 'in-person',
    location: 'Delhi, India',
    type: ['Web Development', 'Mobile Development'],
    prizePool: '$22,000',
    description: 'VSIT brings you a 24-hour coding marathon with exciting prizes and networking opportunities.',
    teamSize: 4,
    skills: ['JavaScript', 'React', 'Mobile Development', 'UI/UX Design']
  },
  {
    id: uuidv4(),
    title: 'RotaTechX',
    url: 'https://rotatechx-1.devfolio.co/',
    imageUrl: 'https://rotatechx-1.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2Fdb9c42c5c0bf476aaecd1331e40aa076%2Fassets%2Fcover%2F267.png&w=1440&q=100',
    dates: 'Apr 12 - 13, 2025',
    startDate: 'Apr 12',
    endDate: '13, 2025',
    organizer: 'Devfolio',
    mode: 'online',
    type: ['Social Impact', 'Open Innovation'],
    prizePool: '$18,000',
    description: 'Build solutions that create social impact and address real-world challenges.',
    teamSize: 5,
    skills: ['JavaScript', 'Python', 'React', 'Data Science']
  },
  {
    id: uuidv4(),
    title: "Spectrum'25",
    url: 'https://spectrum25.devfolio.co/',
    imageUrl: 'https://spectrum25.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F04b5354a4b4e4761a2c9db42ae7ed089%2Fassets%2Fcover%2F316.png&w=1440&q=100',
    dates: 'Apr 11 - 12, 2025',
    startDate: 'Apr 11',
    endDate: '12, 2025',
    organizer: 'Devfolio',
    mode: 'online',
    type: ['Web Development', 'AI/ML'],
    prizePool: '$25,000',
    description: 'A 24-hour hackathon focused on creating innovative solutions using modern web technologies.',
    teamSize: 3,
    skills: ['JavaScript', 'React', 'Node.js', 'AI/ML']
  },
  {
    id: uuidv4(),
    title: 'Hack The Grid – LUKSO',
    url: 'https://hack-the-grid-level.devfolio.co/',
    imageUrl: 'https://hack-the-grid-level.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F95688d8dd80d4ebeb247dde86af66c5e%2Fassets%2Fcover%2F498.png&w=1440&q=100',
    dates: 'Mar 25 - Apr 7, 2025',
    startDate: 'Mar 25',
    endDate: 'Apr 7, 2025',
    organizer: 'Devfolio',
    mode: 'online',
    type: ['Blockchain', 'Web3'],
    prizePool: '$45,000',
    description: 'Build on the LUKSO blockchain and create innovative applications for the future of Web3.',
    teamSize: 4,
    skills: ['JavaScript', 'Blockchain', 'Web3', 'React']
  },
  {
    id: uuidv4(),
    title: 'DoraHacks Global Hack 2025',
    url: 'https://dorahacks.io/hackathon/global2025',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1679079456083-9f288e224e96?q=80&w=1000',
    dates: 'May 15 - Jun 30, 2025',
    startDate: 'May 15',
    endDate: 'Jun 30, 2025',
    organizer: 'DoraHacks',
    mode: 'online',
    type: ['Blockchain', 'Web3', 'AI/ML'],
    prizePool: '$100,000',
    description: 'The largest global hackathon series bringing together developers from around the world.',
    teamSize: 5,
    skills: ['JavaScript', 'Python', 'Blockchain', 'AI/ML']
  },
  {
    id: uuidv4(),
    title: 'Web3 Infinity Hackathon',
    url: 'https://dorahacks.io/hackathon/web3infinity',
    imageUrl: 'https://plus.unsplash.com/premium_photo-1675062287160-ebb2dd150ccd?q=80&w=1000',
    dates: 'Apr 20 - May 20, 2025',
    startDate: 'Apr 20',
    endDate: 'May 20, 2025',
    organizer: 'DoraHacks',
    mode: 'online',
    type: ['Blockchain', 'Web3'],
    prizePool: '$70,000',
    description: 'Build the future of Web3 with this exciting online hackathon featuring multiple tracks.',
    teamSize: 4,
    skills: ['JavaScript', 'Blockchain', 'Web3', 'Solidity']
  },
  {
    id: uuidv4(),
    title: 'DevTown AI/ML Championship',
    url: 'https://devtown.io/hackathons/aiml-championship',
    imageUrl: 'https://images.unsplash.com/photo-1677442135968-6bd548d6d060?q=80&w=1000',
    dates: 'May 1 - May 15, 2025',
    startDate: 'May 1',
    endDate: 'May 15, 2025',
    organizer: 'DevTown',
    mode: 'online',
    type: ['AI/ML', 'Data Science'],
    prizePool: '$30,000',
    description: 'Showcase your AI/ML skills and solve real-world problems in this online championship.',
    teamSize: 3,
    skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Science']
  },
  {
    id: uuidv4(),
    title: 'DevTown Web Dev Showdown',
    url: 'https://devtown.io/hackathons/webdev-showdown',
    imageUrl: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?q=80&w=1000',
    dates: 'Jun 5 - Jun 12, 2025',
    startDate: 'Jun 5',
    endDate: 'Jun 12, 2025',
    organizer: 'DevTown',
    mode: 'online',
    type: ['Web Development'],
    prizePool: '$25,000',
    description: 'Build innovative web applications and compete for glory in this exciting hackathon.',
    teamSize: 3,
    skills: ['JavaScript', 'React', 'Node.js', 'UI/UX Design']
  }
];

export const internshipsData: InternshipCard[] = [
  {
    id: uuidv4(),
    title: "AI Research Intern",
    company: "TechGiant Inc.",
    location: "Seattle",
    deadline: "2025-06-30",
    duration: "3 months",
    stipend: "$6,000/month",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1000",
    url: "#",
    description: "Join our AI research team to work on cutting-edge machine learning models and applications.",
    skills: ["Python", "TensorFlow", "PyTorch", "AI/ML"],
    isRemote: false
  },
  {
    id: uuidv4(),
    title: "Frontend Developer Intern",
    company: "WebDesign Co.",
    location: "Remote",
    deadline: "2025-07-15",
    duration: "4 months",
    stipend: "$4,800/month",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000",
    url: "#",
    description: "Work on responsive web applications using modern frontend frameworks and tools.",
    skills: ["JavaScript", "React", "CSS", "Frontend"],
    isRemote: true
  },
  {
    id: uuidv4(),
    title: "Data Science Intern",
    company: "AnalyticsPro",
    location: "Chicago",
    deadline: "2025-06-15",
    duration: "3 months",
    stipend: "$5,200/month",
    imageUrl: "https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=1000",
    url: "#",
    description: "Apply statistical methods and machine learning to solve complex business problems.",
    skills: ["Python", "Data Science", "SQL", "AI/ML"],
    isRemote: false
  },
  {
    id: uuidv4(),
    title: "UX/UI Design Intern",
    company: "CreativeStudio",
    location: "Los Angeles",
    deadline: "2025-07-10",
    duration: "3 months",
    stipend: "$4,500/month",
    imageUrl: "https://images.unsplash.com/photo-1587440871875-191322ee64b0?q=80&w=1000",
    url: "#",
    description: "Create beautiful and intuitive user interfaces for web and mobile applications.",
    skills: ["UI/UX Design", "Figma", "Adobe XD", "Frontend"],
    isRemote: false
  },
  {
    id: uuidv4(),
    title: "Cybersecurity Intern",
    company: "SecureTech",
    location: "Remote",
    deadline: "2025-06-15",
    duration: "3 months",
    stipend: "$5,000/month",
    imageUrl: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=1000",
    url: "#",
    description: "Help identify and mitigate security vulnerabilities in our systems and applications.",
    skills: ["Cybersecurity", "Python", "Network Security"],
    isRemote: true
  },
  {
    id: uuidv4(),
    title: "Mobile App Developer Intern",
    company: "AppWorks",
    location: "San Francisco",
    deadline: "2025-07-30",
    duration: "4 months",
    stipend: "$5,800/month",
    imageUrl: "https://images.unsplash.com/photo-1526925539332-aa3b66e35444?q=80&w=1000",
    url: "#",
    description: "Develop cross-platform mobile applications using React Native or Flutter.",
    skills: ["Mobile Development", "React Native", "JavaScript"],
    isRemote: false
  },
  {
    id: uuidv4(),
    title: "Blockchain Developer Intern",
    company: "CryptoInnovate",
    location: "Remote",
    deadline: "2025-06-20",
    duration: "3 months",
    stipend: "$5,500/month",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=1000",
    url: "#",
    description: "Work on blockchain projects and smart contract development for various applications.",
    skills: ["Blockchain", "Solidity", "Web3", "JavaScript"],
    isRemote: true
  },
  {
    id: uuidv4(),
    title: "Game Development Intern",
    company: "GameStudio",
    location: "Austin",
    deadline: "2025-07-05",
    duration: "4 months",
    stipend: "$5,200/month",
    imageUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000",
    url: "#",
    description: "Create engaging game experiences using Unity or Unreal Engine.",
    skills: ["Game Development", "C++", "Unity", "3D Modeling"],
    isRemote: false
  },
  {
    id: uuidv4(),
    title: "Backend Developer Intern",
    company: "ServerSolutions",
    location: "Remote",
    deadline: "2025-06-25",
    duration: "3 months",
    stipend: "$5,000/month",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?q=80&w=1000",
    url: "#",
    description: "Develop scalable and efficient backend services using modern technologies.",
    skills: ["Backend", "Node.js", "Python", "Database"],
    isRemote: true
  },
  {
    id: uuidv4(),
    title: "DevOps Intern",
    company: "CloudTech",
    location: "Boston",
    deadline: "2025-07-10",
    duration: "3 months",
    stipend: "$5,500/month",
    imageUrl: "https://images.unsplash.com/photo-1603695576504-b2b22b530869?q=80&w=1000",
    url: "#",
    description: "Streamline development workflows and infrastructure using modern DevOps practices.",
    skills: ["DevOps", "Docker", "Kubernetes", "AWS"],
    isRemote: false
  },
  {
    id: uuidv4(),
    title: "AR/VR Developer Intern",
    company: "ImmersiveTech",
    location: "Seattle",
    deadline: "2025-07-15",
    duration: "4 months",
    stipend: "$6,000/month",
    imageUrl: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?q=80&w=1000",
    url: "#",
    description: "Create immersive AR/VR experiences for education and entertainment.",
    skills: ["AR/VR", "Unity", "C#", "3D Modeling"],
    isRemote: false
  },
  {
    id: uuidv4(),
    title: "IoT Developer Intern",
    company: "ConnectedWorld",
    location: "Remote",
    deadline: "2025-06-30",
    duration: "3 months",
    stipend: "$5,200/month",
    imageUrl: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?q=80&w=1000",
    url: "#",
    description: "Develop applications for internet-connected devices and smart home solutions.",
    skills: ["IoT", "Python", "C++", "Embedded Systems"],
    isRemote: true
  }
];

export const partnerLogosData: PartnerLogo[] = [
  {
    id: "1",
    name: "Devfolio",
    logo: "/devfolio.png",
    url: "https://devfolio.co"
  },
  {
    id: "2",
    name: "Unstop",
    logo: "/unstop.png",
    url: "https://unstop.com"
  },
  {
    id: "3",
    name: "DoraHacks",
    logo: "/dorahacks.png",
    url: "https://dorahacks.io"
  },
  {
    id: "4",
    name: "Devpost",
    logo: "/devpost.png",
    url: "https://devpost.com"
  },
  {
    id: "5",
    name: "HackerEarth",
    logo: "/hackerearth.png",
    url: "https://hackerearth.com"
  },
  {
    id: "6",
    name: "Hack2Skill",
    logo: "/hack2skill.png",
    url: "https://hack2skill.com"
  }
];

export const testimonialsData: Testimonial[] = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Software Engineer",
    company: "Microsoft",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "HackXplore helped me find the perfect hackathon to showcase my skills, which eventually led to my current job at Microsoft. The platform's filtering options made it easy to find events that matched my interests."
  },
  {
    id: "2",
    name: "Sophia Chen",
    role: "Data Scientist",
    company: "Google",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I discovered my dream internship through HackXplore and it kickstarted my career in data science. The team formation feature also helped me connect with talented individuals who are now my colleagues."
  },
  {
    id: "3",
    name: "Jamal Williams",
    role: "Frontend Developer",
    company: "Airbnb",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "The AI-powered recommendations on HackXplore are spot on! I found a remote internship that perfectly matched my skills and interests, which eventually converted into a full-time role."
  },
  {
    id: "4",
    name: "Priya Sharma",
    role: "Blockchain Developer",
    company: "Coinbase",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
    text: "As someone interested in blockchain technology, HackXplore made it incredibly easy to filter and find hackathons specific to my field. The platform's comprehensive listings saved me countless hours of searching."
  }
];

export const skillsOptions: UserSkill[] = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "React",
  "Angular",
  "Vue",
  "Node.js",
  "Express",
  "Django",
  "Flask",
  "TensorFlow",
  "PyTorch",
  "AI/ML",
  "Blockchain",
  "Web3",
  "Cloud Computing",
  "DevOps",
  "Mobile Development",
  "UI/UX Design",
  "Game Development",
  "Cybersecurity",
  "Data Science",
  "Backend",
  "Frontend",
  "Fullstack"
];

export const interestOptions: HackathonType[] = [
  "Web Development",
  "Mobile Development",
  "AI/ML",
  "Blockchain",
  "Web3",
  "Game Development",
  "IoT",
  "Fintech",
  "Healthtech",
  "EdTech",
  "Social Impact",
  "Open Innovation"
];
