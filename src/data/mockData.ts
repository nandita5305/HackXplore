import { UserSkill, HackathonType } from "@/types";

export const skillsOptions = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "HTML",
  "CSS",
  "Java",
  "C++",
  "C#",
  "TypeScript",
  "Vue.js",
  "Angular",
  "SQL",
  "MongoDB",
  "AWS",
  "Azure",
  "Docker",
  "Kubernetes",
  "Git",
  "Figma",
  "UI/UX Design",
  "Project Management",
  "Communication",
  "Problem Solving",
  "Leadership",
  "Data Analysis",
  "Machine Learning",
  "AI",
  "Blockchain",
  "Solidity",
] as const;

export const interestOptions = [
  "Web Development",
  "Mobile App Development",
  "AI & Machine Learning",
  "Blockchain Technology",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "Game Development",
  "UI/UX Design",
  "E-commerce",
  "Social Media",
  "FinTech",
  "HealthTech",
  "EdTech",
  "IoT (Internet of Things)",
  "AR/VR",
  "Robotics",
  "Space Exploration",
  "Renewable Energy",
  "Sustainable Development",
] as const;

export const interestsOptions = interestOptions;

export const hackathonsData = [
  {
    id: "future-innovators-2024",
    title: "Future Innovators Hackathon 2024",
    organizer: "Tech Innovators Inc.",
    dates: "November 8-10, 2024",
    endDate: "2024-11-10",
    startDate: "2024-11-08",
    location: "New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47a04ca0ecd8?q=80&w=2070&auto=format&fit=crop",
    url: "https://techinnovators.com/hackathon2024",
    mode: "in-person",
    type: ["AI", "Web Development", "Mobile"],
    prizePool: "$10,000",
    teamSize: 4,
    skills: ["JavaScript", "React", "Node.js", "Python"],
    description: "Join us for a weekend of innovation and collaboration. Build the future with cutting-edge technology and compete for amazing prizes."
  },
  {
    id: "global-code-fest-2024",
    title: "Global CodeFest 2024",
    organizer: "CodeFest Global",
    dates: "December 1-3, 2024",
    endDate: "2024-12-03",
    startDate: "2024-12-01",
    location: "Online",
    imageUrl: "https://images.unsplash.com/photo-1588508065120-2c5d3381a5ca?q=80&w=2070&auto=format&fit=crop",
    url: "https://codefestglobal.com",
    mode: "online",
    type: ["Web Development", "AI", "Blockchain"],
    prizePool: "$15,000",
    teamSize: 5,
    skills: ["JavaScript", "React", "Solidity", "AI"],
    description: "Participate in the world's largest online coding competition. Solve real-world problems and showcase your skills to a global audience."
  },
  {
    id: "ai-innovation-challenge-2024",
    title: "AI Innovation Challenge 2024",
    organizer: "AI Innovators",
    dates: "October 20-22, 2024",
    endDate: "2024-10-22",
    startDate: "2024-10-20",
    location: "San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop",
    url: "https://aiinnovators.com/challenge2024",
    mode: "in-person",
    type: ["AI", "Machine Learning", "Data Science"],
    prizePool: "$20,000",
    teamSize: 3,
    skills: ["Python", "Machine Learning", "TensorFlow", "Data Analysis"],
    description: "Develop innovative AI solutions and compete for top prizes. Connect with industry leaders and learn from the best in the field."
  },
  {
    id: "mobile-app-dev-2024",
    title: "Mobile App Development Hackathon 2024",
    organizer: "AppDev Inc.",
    dates: "November 15-17, 2024",
    endDate: "2024-11-17",
    startDate: "2024-11-15",
    location: "Los Angeles, CA",
    imageUrl: "https://images.unsplash.com/photo-1555059386-419ac3517510?q=80&w=1974&auto=format&fit=crop",
    url: "https://appdevinc.com/hackathon2024",
    mode: "in-person",
    type: ["Mobile", "UX/UI", "App Development"],
    prizePool: "$12,000",
    teamSize: 4,
    skills: ["React Native", "Swift", "Kotlin", "UI/UX Design"],
    description: "Create the next big mobile app and win amazing prizes. Open to all skill levels and platforms."
  },
  {
    id: "dora-hack-ai-2025",
    title: "DoraHacks AI Summit 2025",
    organizer: "DoraHacks",
    dates: "August 15-17, 2025",
    endDate: "2025-08-17",
    startDate: "2025-08-15",
    location: "San Francisco, CA",
    imageUrl: "https://images.unsplash.com/photo-1591696331111-ef9586a5b17a?q=80&w=2070&auto=format&fit=crop",
    url: "https://dorahacks.io/ai-summit-2025",
    mode: "in-person",
    type: ["AI", "Machine Learning", "Web3"],
    prizePool: "$50,000",
    teamSize: 4,
    skills: ["Python", "Machine Learning", "React", "AI"],
    description: "Join us for the premier AI hackathon of 2025. Build cutting-edge AI solutions and compete for top prizes. Connect with industry leaders and innovators."
  },
  {
    id: "devtown-code-fest-2025",
    title: "DevTown CodeFest 2025",
    organizer: "DevTown",
    dates: "June 10-12, 2025",
    endDate: "2025-06-12",
    startDate: "2025-06-10",
    location: "Bangalore, India",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070&auto=format&fit=crop",
    url: "https://devtown.in/codefest-2025",
    mode: "hybrid",
    type: ["Web Development", "Mobile", "Open Source"],
    prizePool: "$25,000",
    teamSize: 3,
    skills: ["JavaScript", "React", "Node.js", "MongoDB"],
    description: "DevTown's flagship coding festival brings together developers from across India for an intense hackathon experience. Build, learn, and network with the best in the industry."
  },
  {
    id: "dora-hacks-web3-2025",
    title: "DoraHacks Web3 Challenge",
    organizer: "DoraHacks",
    dates: "September 5-7, 2025",
    endDate: "2025-09-07",
    startDate: "2025-09-05",
    location: "Online",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?q=80&w=2070&auto=format&fit=crop",
    url: "https://dorahacks.io/web3-challenge",
    mode: "online",
    type: ["Blockchain", "Web3", "DeFi"],
    prizePool: "$75,000",
    teamSize: 5,
    skills: ["Solidity", "JavaScript", "React", "Blockchain"],
    description: "Build the future of Web3 with DoraHacks. This challenge focuses on decentralized applications, smart contracts, and innovative blockchain solutions."
  },
  {
    id: "devtown-app-jam-2025",
    title: "DevTown App Jam 2025",
    organizer: "DevTown",
    dates: "July 20-22, 2025",
    endDate: "2025-07-22",
    startDate: "2025-07-20",
    location: "Delhi, India",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1974&auto=format&fit=crop",
    url: "https://devtown.in/app-jam-2025",
    mode: "in-person",
    type: ["Mobile", "UX/UI", "App Development"],
    prizePool: "$20,000",
    teamSize: 4,
    skills: ["React Native", "Flutter", "UI/UX", "Swift"],
    description: "India's biggest mobile app development hackathon. Design and develop innovative mobile applications that solve real-world problems. Open to all skill levels."
  }
];

export const internshipsData = [
  {
    id: "google-ai-intern-2024",
    title: "AI Research Intern, Summer 2024",
    company: "Google",
    location: "Mountain View, CA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png",
    url: "https://careers.google.com/internships",
    deadline: "2024-03-15",
    duration: "12 weeks",
    stipend: "$8,000/month",
    isRemote: false,
    skills: ["Python", "TensorFlow", "Machine Learning", "AI"],
    description: "Join Google's AI research team and work on cutting-edge projects. Contribute to the development of next-generation AI technologies."
  },
  {
    id: "microsoft-software-intern-2024",
    title: "Software Engineer Intern, Summer 2024",
    company: "Microsoft",
    location: "Redmond, WA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2048px-Microsoft_logo_%282012%29.svg.png",
    url: "https://careers.microsoft.com/internships",
    deadline: "2024-04-01",
    duration: "10 weeks",
    stipend: "$7,500/month",
    isRemote: false,
    skills: ["C#", ".NET", "Azure", "Software Development"],
    description: "Develop innovative software solutions and work on real-world projects. Collaborate with experienced engineers and contribute to Microsoft products."
  },
  {
    id: "amazon-data-science-intern-2024",
    title: "Data Science Intern, Summer 2024",
    company: "Amazon",
    location: "Seattle, WA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    url: "https://www.amazon.jobs/en/internships",
    deadline: "2024-03-20",
    duration: "12 weeks",
    stipend: "$8,500/month",
    isRemote: false,
    skills: ["Python", "Data Analysis", "Machine Learning", "AWS"],
    description: "Analyze large datasets and develop machine learning models. Contribute to Amazon's data-driven decision-making process."
  },
  {
    id: "meta-software-engineer-intern-2024",
    title: "Software Engineer Intern, Summer 2024",
    company: "Meta",
    location: "Menlo Park, CA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/2021_Facebook_icon.svg/2048px-2021_Facebook_icon.svg.png",
    url: "https://www.metacareers.com/internships/",
    deadline: "2024-03-25",
    duration: "12 weeks",
    stipend: "$9,000/month",
    isRemote: false,
    skills: ["JavaScript", "React", "Node.js", "Software Development"],
    description: "Build and maintain Meta's core products and services. Collaborate with experienced engineers and contribute to the company's mission."
  },
  {
    id: "ibm-research-intern-2024",
    title: "Research Intern, Summer 2024",
    company: "IBM",
    location: "Yorktown Heights, NY",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/IBM_logo.svg/2560px-IBM_logo.svg.png",
    url: "https://www.research.ibm.com/careers/students/",
    deadline: "2024-04-05",
    duration: "10 weeks",
    stipend: "$7,000/month",
    isRemote: false,
    skills: ["Python", "Data Science", "AI", "Cloud Computing"],
    description: "Conduct research in various areas of computer science. Contribute to IBM's research and development efforts."
  },
  {
    id: "apple-software-intern-2024",
    title: "Software Engineer Intern, Summer 2024",
    company: "Apple",
    location: "Cupertino, CA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1667px-Apple_logo_black.svg.png",
    url: "https://www.apple.com/careers/us/students.html",
    deadline: "2024-04-10",
    duration: "12 weeks",
    stipend: "$9,500/month",
    isRemote: false,
    skills: ["Swift", "Objective-C", "iOS Development", "macOS Development"],
    description: "Develop innovative software solutions for Apple products. Collaborate with experienced engineers and contribute to the company's ecosystem."
  },
  {
    id: "oracle-cloud-intern-2024",
    title: "Cloud Infrastructure Intern, Summer 2024",
    company: "Oracle",
    location: "Austin, TX",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Oracle_logo.svg/2560px-Oracle_logo.svg.png",
    url: "https://www.oracle.com/corporate/careers/students-graduates/",
    deadline: "2024-04-15",
    duration: "10 weeks",
    stipend: "$7,200/month",
    isRemote: false,
    skills: ["Java", "Cloud Computing", "AWS", "Azure"],
    description: "Work on Oracle's cloud infrastructure and develop innovative solutions. Contribute to the company's cloud strategy."
  },
  {
    id: "intel-software-intern-2024",
    title: "Software Engineer Intern, Summer 2024",
    company: "Intel",
    location: "Santa Clara, CA",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Intel-logo.svg/2560px-Intel-logo.svg.png",
    url: "https://www.intel.com/content/www/us/en/jobs/students.html",
    deadline: "2024-04-20",
    duration: "12 weeks",
    stipend: "$8,000/month",
    isRemote: false,
    skills: ["C++", "Software Development", "Computer Architecture", "Embedded Systems"],
    description: "Develop software solutions for Intel's hardware products. Contribute to the company's innovation efforts."
  }
];

export const partnerLogos = [
  {
    name: "Microsoft",
    logo: "https://logos-world.net/wp-content/uploads/2020/09/Microsoft-Logo-700x394.png",
    url: "https://microsoft.com"
  },
  {
    name: "Google",
    logo: "https://logos-world.net/wp-content/uploads/2020/09/Google-Logo-700x394.png",
    url: "https://google.com"
  },
  {
    name: "Amazon",
    logo: "https://logos-world.net/wp-content/uploads/2020/09/Amazon-Logo-700x394.png",
    url: "https://amazon.com"
  },
  {
    name: "Meta",
    logo: "https://logos-world.net/wp-content/uploads/2021/10/Meta-Logo-700x394.png",
    url: "https://meta.com"
  },
  {
    name: "IBM",
    logo: "https://logos-world.net/wp-content/uploads/2020/09/IBM-Logo-700x394.png",
    url: "https://ibm.com"
  },
  {
    name: "Apple",
    logo: "https://logos-world.net/wp-content/uploads/2020/09/Apple-Logo-700x394.png",
    url: "https://apple.com"
  },
  {
    name: "Oracle",
    logo: "https://logos-world.net/wp-content/uploads/2020/09/Oracle-Logo-700x394.png",
    url: "https://oracle.com"
  },
  {
    name: "Intel",
    logo: "https://logos-world.net/wp-content/uploads/2020/07/Intel-Logo-700x394.png",
    url: "https://intel.com"
  }
];

export const testimonialsData = [
  {
    id: "testimonial-1",
    name: "Alex Johnson",
    role: "Computer Science Student",
    company: "Stanford University",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "HackXplore helped me find my first hackathon, which led to an internship at a top tech company. The platform's recommendations were spot-on!"
  },
  {
    id: "testimonial-2",
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "I was looking for opportunities to enhance my skills, and HackXplore connected me with perfect hackathons that matched my experience level."
  },
  {
    id: "testimonial-3",
    name: "Marcus Williams",
    role: "Data Science Intern",
    company: "Amazon",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    text: "The AI recommendations feature is amazing! It found me an internship that perfectly aligned with my career goals in data science."
  },
  {
    id: "testimonial-4",
    name: "Priya Patel",
    role: "UX Designer",
    company: "Figma",
    image: "https://randomuser.me/api/portraits/women/62.jpg",
    text: "As a designer looking to collaborate with developers, HackXplore has been invaluable in finding hackathons where I can showcase my UX skills."
  }
];
