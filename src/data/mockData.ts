import { HackathonCard, InternshipCard, Scholarship, PartnerLogo } from "@/types";

// Mock data for hackathons
export const hackathonsData: HackathonCard[] = [
  {
    id: "hackathon-1",
    title: "AI Innovation Challenge",
    organizer: "DoraHacks",
    startDate: "2024-07-15",
    endDate: "2024-07-17",
    location: "Online",
    mode: "Online",
    prizePool: 10000,
    tags: ["AI", "Innovation"],
    applicationDeadline: "2024-07-10",
    url: "https://dorahacks.com/events",
    image: "/hackathons/ai-hackathon.jpg",
    isPopular: true,
    type: "Themed"
  },
  {
    id: "hackathon-2",
    title: "Web3 Hackathon",
    organizer: "ETHGlobal",
    startDate: "2024-08-01",
    endDate: "2024-08-03",
    location: "New York, NY",
    mode: "In-person",
    prizePool: 15000,
    tags: ["Web3", "Blockchain"],
    applicationDeadline: "2024-07-25",
    url: "https://ethglobal.com/events",
    image: "/hackathons/web3-hackathon.jpg",
    isPopular: false,
    type: "Open"
  },
  {
    id: "hackathon-3",
    title: "Mobile App Development Challenge",
    organizer: "DevTown",
    startDate: "2024-09-10",
    endDate: "2024-09-12",
    location: "San Francisco, CA",
    mode: "Hybrid",
    prizePool: 12000,
    tags: ["Mobile", "Development"],
    applicationDeadline: "2024-09-05",
    url: "https://devtown.com/events",
    image: "/hackathons/mobile-hackathon.jpg",
    isPopular: true,
    type: "Themed"
  },
  {
    id: "hackathon-4",
    title: "Sustainable Solutions Hackathon",
    organizer: "HackGreen",
    startDate: "2024-10-01",
    endDate: "2024-10-03",
    location: "Berlin, Germany",
    mode: "In-person",
    prizePool: 18000,
    tags: ["Sustainability", "Environment"],
    applicationDeadline: "2024-09-25",
    url: "https://hackgreen.org/events",
    image: "/hackathons/sustainable-hackathon.jpg",
    isPopular: false,
    type: "Open"
  },
  {
    id: "hackathon-5",
    title: "Cybersecurity Innovation Challenge",
    organizer: "CyberTech",
    startDate: "2024-11-15",
    endDate: "2024-11-17",
    location: "Online",
    mode: "Online", // Changed from "Remote" to "Online"
    prizePool: 20000,
    tags: ["Cybersecurity", "Innovation"],
    applicationDeadline: "2024-11-10",
    url: "https://cybertech.com/events",
    image: "/hackathons/cybersecurity-hackathon.jpg",
    isPopular: true,
    type: "Themed"
  },
  {
    id: "hackathon-6",
    title: "Data Science Hackathon",
    organizer: "DataFest",
    startDate: "2024-12-01",
    endDate: "2024-12-03",
    location: "Boston, MA",
    mode: "Hybrid",
    prizePool: 15000,
    tags: ["Data Science", "Machine Learning"],
    applicationDeadline: "2024-11-25",
    url: "https://datafest.com/events",
    image: "/hackathons/data-science-hackathon.jpg",
    isPopular: false,
    type: "Open"
  },
  {
    id: "hackathon-7",
    title: "AR/VR Hackathon",
    organizer: "RealityHacks",
    startDate: "2025-01-10",
    endDate: "2025-01-12",
    location: "Online",
    mode: "Online", // Changed from "Remote" to "Online"
    prizePool: 12000,
    tags: ["AR", "VR"],
    applicationDeadline: "2025-01-05",
    url: "https://realityhacks.com/events",
    image: "/hackathons/ar-vr-hackathon.jpg",
    isPopular: true,
    type: "Themed"
  },
  {
    id: "hackathon-8",
    title: "IoT Hackathon",
    organizer: "IoTInnovate",
    startDate: "2025-02-15",
    endDate: "2025-02-17",
    location: "London, UK",
    mode: "In-person",
    prizePool: 18000,
    tags: ["IoT", "Innovation"],
    applicationDeadline: "2025-02-10",
    url: "https://iotinnovate.com/events",
    image: "/hackathons/iot-hackathon.jpg",
    isPopular: false,
    type: "Open"
  },
  {
    id: "hackathon-9",
    title: "Blockchain Hackathon",
    organizer: "BlockChainDevs",
    startDate: "2025-03-01",
    endDate: "2025-03-03",
    location: "Online",
    mode: "Online", // Changed from "Remote" to "Online"
    prizePool: 20000,
    tags: ["Blockchain", "Web3"],
    applicationDeadline: "2025-02-25",
    url: "https://blockchendevs.com/events",
    image: "/hackathons/blockchain-hackathon.jpg",
    isPopular: true,
    type: "Themed"
  },
  {
    id: "hackathon-10",
    title: "AI for Good Hackathon",
    organizer: "AI4Good",
    startDate: "2025-04-10",
    endDate: "2025-04-12",
    location: "Toronto, Canada",
    mode: "Hybrid",
    prizePool: 15000,
    tags: ["AI", "Social Impact"],
    applicationDeadline: "2025-04-05",
    url: "https://ai4good.com/events",
    image: "/hackathons/ai-for-good-hackathon.jpg",
    isPopular: false,
    type: "Open"
  }
];

// Mock data for internships
export const internshipsData: InternshipCard[] = [
  {
    id: "internship-1",
    title: "Software Engineering Intern",
    company: "Google",
    location: "Mountain View, CA",
    isRemote: false,
    stipend: 6000,
    duration: "3 months",
    applicationDeadline: "2024-05-15",
    url: "https://careers.google.com/students",
    logo: "/companies/google.svg",
    requiredSkills: ["Java", "Python", "Data Structures"],
    companySize: "Large",
    description: "Join Google as a Software Engineering Intern and work on cutting-edge projects."
  },
  {
    id: "internship-2",
    title: "Data Science Intern",
    company: "Microsoft",
    location: "Redmond, WA",
    isRemote: false,
    stipend: 5500,
    duration: "6 months",
    applicationDeadline: "2024-06-01",
    url: "https://careers.microsoft.com/students",
    logo: "/companies/microsoft.svg",
    requiredSkills: ["Python", "R", "Machine Learning"],
    companySize: "Large",
    description: "Work with Microsoft's Data Science team to analyze and interpret complex data sets."
  },
  {
    id: "internship-3",
    title: "Frontend Developer Intern",
    company: "Facebook",
    location: "Menlo Park, CA",
    isRemote: true,
    stipend: 5000,
    duration: "4 months",
    applicationDeadline: "2024-05-20",
    url: "https://careers.facebook.com/students",
    logo: "/companies/facebook.svg",
    requiredSkills: ["React", "JavaScript", "HTML", "CSS"],
    companySize: "Large",
    description: "Join Facebook as a Frontend Developer Intern and help build engaging user interfaces."
  },
  {
    id: "internship-4",
    title: "Backend Developer Intern",
    company: "Amazon",
    location: "Seattle, WA",
    isRemote: false,
    stipend: 6200,
    duration: "3 months",
    applicationDeadline: "2024-06-15",
    url: "https://www.amazon.jobs/en/teams/student-programs",
    logo: "/companies/amazon.svg",
    requiredSkills: ["Java", "AWS", "Databases"],
    companySize: "Large",
    description: "Work with Amazon's Backend Development team to build scalable and reliable systems."
  },
  {
    id: "internship-5",
    title: "UI/UX Design Intern",
    company: "Apple",
    location: "Cupertino, CA",
    isRemote: false,
    stipend: 5800,
    duration: "6 months",
    applicationDeadline: "2024-07-01",
    url: "https://www.apple.com/careers/us/students.html",
    logo: "/companies/apple.svg",
    requiredSkills: ["Figma", "Sketch", "User Research"],
    companySize: "Large",
    description: "Join Apple as a UI/UX Design Intern and create intuitive and visually appealing user interfaces."
  },
  {
    id: "internship-6",
    title: "Cybersecurity Intern",
    company: "IBM",
    location: "Armonk, NY",
    isRemote: true,
    stipend: 5200,
    duration: "4 months",
    applicationDeadline: "2024-06-20",
    url: "https://www.ibm.com/careers/us-en/students",
    logo: "/companies/ibm.svg",
    requiredSkills: ["Network Security", "Cryptography", "Penetration Testing"],
    companySize: "Large",
    description: "Join IBM as a Cybersecurity Intern and help protect critical systems and data."
  },
  {
    id: "internship-7",
    title: "Data Analyst Intern",
    company: "Netflix",
    location: "Los Gatos, CA",
    isRemote: false,
    stipend: 5700,
    duration: "3 months",
    applicationDeadline: "2024-07-15",
    url: "https://jobs.netflix.com/students",
    logo: "/companies/netflix.svg",
    requiredSkills: ["SQL", "Tableau", "Data Analysis"],
    companySize: "Large",
    description: "Join Netflix as a Data Analyst Intern and help drive business decisions with data-driven insights."
  },
  {
    id: "internship-8",
    title: "AI Research Intern",
    company: "NVIDIA",
    location: "Santa Clara, CA",
    isRemote: false,
    stipend: 6100,
    duration: "6 months",
    applicationDeadline: "2024-08-01",
    url: "https://www.nvidia.com/en-us/careers/students",
    logo: "/companies/nvidia.svg",
    requiredSkills: ["Python", "TensorFlow", "Deep Learning"],
    companySize: "Large",
    description: "Join NVIDIA as an AI Research Intern and contribute to cutting-edge research in artificial intelligence."
  },
  {
    id: "internship-9",
    title: "Cloud Computing Intern",
    company: "Salesforce",
    location: "San Francisco, CA",
    isRemote: true,
    stipend: 5400,
    duration: "4 months",
    applicationDeadline: "2024-07-20",
    url: "https://www.salesforce.com/company/careers/university-recruiting",
    logo: "/companies/salesforce.svg",
    requiredSkills: ["AWS", "Azure", "Cloud Computing"],
    companySize: "Large",
    description: "Join Salesforce as a Cloud Computing Intern and help build and maintain cloud-based infrastructure."
  },
  {
    id: "internship-10",
    title: "Mobile App Developer Intern",
    company: "Spotify",
    location: "New York, NY",
    isRemote: false,
    stipend: 5900,
    duration: "3 months",
    applicationDeadline: "2024-08-15",
    url: "https://www.lifeatspotify.com/students",
    logo: "/companies/spotify.svg",
    requiredSkills: ["Swift", "Kotlin", "Mobile Development"],
    companySize: "Large",
    description: "Join Spotify as a Mobile App Developer Intern and help create innovative mobile experiences."
  }
];

// Add scholarship types
export const scholarshipTypes = [
  "Merit-based",
  "Need-based",
  "Research",
  "STEM",
  "Diversity",
  "International",
  "Athletic",
  "Community Service",
  "Creative Arts"
];

// Add eligibility options
export const eligibilityOptions = [
  "Undergraduate Students",
  "Graduate Students",
  "High School Seniors",
  "First-Generation Students",
  "International Students",
  "Women in STEM",
  "Minorities in Tech",
  "LGBTQ+ Students",
  "Students with Disabilities",
  "Low-Income Households",
  "US Citizens",
  "GPA 3.0+",
  "GPA 3.5+",
  "Computer Science Majors",
  "Engineering Majors",
  "Business Majors",
  "Arts & Humanities Majors"
];

// Add interest options
export const interestOptions = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "Artificial Intelligence",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "Blockchain",
  "UI/UX Design",
  "Game Development",
  "Robotics",
  "IoT",
  "AR/VR",
  "Full Stack Development"
];

// Update partner logos to match the PartnerLogo interface
export const partnerLogos: PartnerLogo[] = [
  { name: "Microsoft", logo: "/partners/microsoft.svg", url: "https://microsoft.com" },
  { name: "Google", logo: "/partners/google.svg", url: "https://google.com" },
  { name: "Amazon", logo: "/partners/amazon.svg", url: "https://amazon.com" },
  { name: "Meta", logo: "/partners/meta.svg", url: "https://meta.com" },
  { name: "IBM", logo: "/partners/ibm.svg", url: "https://ibm.com" },
  { name: "NVIDIA", logo: "/partners/nvidia.svg", url: "https://nvidia.com" },
  { name: "Intel", logo: "/partners/intel.svg", url: "https://intel.com" },
  { name: "Apple", logo: "/partners/apple.svg", url: "https://apple.com" }
];

// Add testimonials data
export const testimonialsData = [
  {
    id: "1",
    name: "Alex Johnson",
    role: "Software Engineer at Google",
    avatar: "/avatars/avatar-1.png",
    text: "HackXplore helped me find my first hackathon which led to an internship at Google! The team formation feature was especially useful as I connected with talented peers who became long-term collaborators.",
    company: "Google",
    image: "/avatars/avatar-1.png"
  },
  {
    id: "2",
    name: "Sophia Chen",
    role: "Product Manager at Microsoft",
    avatar: "/avatars/avatar-2.png",
    text: "As a student looking to break into product management, the internship listings on HackXplore were incredibly valuable. I found my Microsoft internship here, and the rest is history!",
    company: "Microsoft",
    image: "/avatars/avatar-2.png"
  },
  {
    id: "3",
    name: "Marcus Williams",
    role: "Full Stack Developer",
    avatar: "/avatars/avatar-3.png",
    text: "The scholarship section on HackXplore was a game-changer for me. I discovered and secured funding that helped me complete my degree without financial stress. Now I'm working at my dream job!",
    company: "Freelance",
    image: "/avatars/avatar-3.png"
  }
];

// Add scholarship data
export const scholarshipsData = [
  {
    id: "scholarship-1",
    title: "Google Generation Scholarship",
    provider: "Google",
    amount: 10000,
    deadline: "2025-06-15",
    type: "STEM",
    eligibility: [
      "Undergraduate Students", 
      "Computer Science Majors", 
      "GPA 3.5+", 
      "Underrepresented Groups in Tech"
    ],
    link: "https://buildyourfuture.withgoogle.com/scholarships",
    description: "The Google Generation Scholarship was established to help aspiring students pursuing computer science degrees excel in technology and become leaders in the field. Selected students will receive a $10,000 USD scholarship for the academic year."
  },
  {
    id: "scholarship-2",
    title: "Microsoft Scholarship Program",
    provider: "Microsoft",
    amount: 15000,
    deadline: "2025-07-01",
    type: "Diversity",
    eligibility: [
      "Undergraduate Students",
      "Computer Science Majors",
      "Women in STEM",
      "GPA 3.0+"
    ],
    link: "https://careers.microsoft.com/students/us/en/usscholarshipprogram",
    description: "Microsoft is committed to increasing access to education through technology, grants, partnerships, and programs. The Microsoft Scholarship Program supports underrepresented students pursuing studies in STEM fields."
  },
  {
    id: "scholarship-3",
    title: "Amazon Future Engineer Scholarship",
    provider: "Amazon",
    amount: 40000,
    deadline: "2025-05-20",
    type: "Merit-based",
    eligibility: [
      "High School Seniors",
      "Computer Science Intent",
      "Financial Need",
      "GPA 3.0+"
    ],
    link: "https://www.amazonfutureengineer.com/scholarships",
    description: "The Amazon Future Engineer Scholarship provides $40,000 over four years to students from underrepresented communities who plan to study computer science in college."
  },
  {
    id: "scholarship-4",
    title: "Adobe Research Women-in-Technology Scholarship",
    provider: "Adobe",
    amount: 10000,
    deadline: "2025-08-10",
    type: "Diversity",
    eligibility: [
      "Undergraduate Female Students",
      "Computer Science or Engineering Majors",
      "GPA 3.0+"
    ],
    link: "https://research.adobe.com/scholarship/",
    description: "This scholarship recognizes outstanding female students in the field of technology. The Adobe Research Women-in-Technology Scholarship provides recipients with a $10,000 grant and a mentoring opportunity with an Adobe researcher."
  },
  {
    id: "scholarship-5",
    title: "Meta Global Fellowship",
    provider: "Meta",
    amount: 5000,
    deadline: "2025-09-30",
    type: "Research",
    eligibility: [
      "PhD Students",
      "Research Focus in AI, VR, or Privacy",
      "International Students"
    ],
    link: "https://research.fb.com/fellowship/",
    description: "The Meta Fellowship is a global program designed to encourage and support promising doctoral students engaged in innovative and relevant research across computer science and engineering."
  },
  {
    id: "scholarship-6",
    title: "Intel Diversity Scholars Program",
    provider: "Intel",
    amount: 20000,
    deadline: "2025-04-30",
    type: "Diversity",
    eligibility: [
      "Undergraduate Students",
      "Engineering or Computer Science Majors",
      "Minorities in Tech",
      "GPA 3.0+"
    ],
    link: "https://www.intel.com/content/www/us/en/diversity/diversity-overview.html",
    description: "Intel is committed to supporting diversity in the tech industry. This scholarship aims to increase the representation of women and underrepresented minorities in STEM fields through financial support and mentorship."
  },
  {
    id: "scholarship-7",
    title: "IBM Thomas J. Watson Memorial Scholarship",
    provider: "IBM",
    amount: 25000,
    deadline: "2025-05-15",
    type: "Merit-based",
    eligibility: [
      "Undergraduate Students",
      "Computer Science or Engineering Majors",
      "Demonstrated Leadership",
      "GPA 3.5+"
    ],
    link: "https://www.ibm.com/services/volunteers/grant-programs.html",
    description: "Named after IBM's founder, this prestigious scholarship rewards academic excellence and leadership potential in students pursuing degrees in computer science, engineering, or a related field with a focus on technology innovation."
  },
  {
    id: "scholarship-8",
    title: "Apple HBCU Scholars Program",
    provider: "Apple",
    amount: 15000,
    deadline: "2025-03-31",
    type: "Diversity",
    eligibility: [
      "Students at HBCUs",
      "STEM Majors",
      "GPA 3.0+",
      "US Citizens"
    ],
    link: "https://www.apple.com/diversity/",
    description: "Apple's HBCU Scholars Program provides scholarships to students from Historically Black Colleges and Universities. Recipients receive a scholarship and a summer internship at Apple headquarters."
  },
  {
    id: "scholarship-9",
    title: "NVIDIA Graduate Fellowship",
    provider: "NVIDIA",
    amount: 50000,
    deadline: "2025-11-15",
    type: "Research",
    eligibility: [
      "PhD Students",
      "Research in AI, Graphics, or High-Performance Computing",
      "International Students"
    ],
    link: "https://www.nvidia.com/en-us/research/graduate-fellowships/",
    description: "The NVIDIA Graduate Fellowship Program provides funding to PhD students who are conducting research in graphics processing unit (GPU) computing, computer graphics, AI, robotics, computer vision, or related fields."
  }
];

// Skills options
export const skillsOptions = [
  "JavaScript",
  "Python",
  "Java",
  "C++",
  "C#",
  "TypeScript",
  "React",
  "Angular",
  "Vue.js",
  "Node.js",
  "Express.js",
  "Django",
  "Flask",
  "Ruby on Rails",
  "SQL",
  "NoSQL",
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "AWS",
  "Azure",
  "Google Cloud",
  "Docker",
  "Kubernetes",
  "Git",
  "HTML",
  "CSS",
  "Sass",
  "Less",
  "UI/UX Design",
  "Figma",
  "Sketch",
  "Adobe XD",
  "Machine Learning",
  "Deep Learning",
  "Data Science",
  "Data Analysis",
  "Cybersecurity",
  "Network Security",
  "Cryptography",
  "Penetration Testing",
  "Blockchain",
  "Web3",
  "AR/VR",
  "IoT",
  "Robotics",
  "Game Development",
  "Mobile Development",
  "Swift",
  "Kotlin",
  "React Native",
  "Flutter"
];
