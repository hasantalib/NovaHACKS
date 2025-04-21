import { Career } from "@/types";
import { generateCareers } from "./careerGenerator";

// Career data for the application
const careers: Career[] = [
  {
    id: 1,
    title: "UX/UI Designer",
    field: "Design & Technology",
    description: "Create intuitive, engaging interfaces for digital products and services. UX/UI Designers combine user research, visual design principles, and interaction patterns to create seamless user experiences across websites, apps, and other digital platforms.",
    match: 95,
    salaryMin: 75,
    salaryMax: 120,
    medianSalary: "92,000",
    growth: 24,
    skills: ["User Research", "Wireframing", "Prototyping", "Visual Design", "User Testing", "Information Architecture"],
    
    responsibilities: [
      "Conduct user research and usability testing",
      "Create wireframes, prototypes, and user flows",
      "Design visual elements and interactive components",
      "Collaborate with developers and stakeholders",
      "Stay updated on design trends and best practices"
    ],
    workSetting: "Office / Remote",
    workSchedule: "Full-time / Flexible",
    teamStructure: "Collaborative",
    workStyle: "Creative / Analytical",
    workLifeBalance: 8,
    topLocations: ["San Francisco", "New York", "Seattle", "Austin"],
    
    salaryByExperience: {
      entry: "70,000",
      mid: "92,000",
      senior: "125,000",
      expert: "150,000+"
    },
    salaryComparison: {
      national: "75,000",
      difference: "17,000"
    },
    
    technicalSkills: [
      { name: "Figma", level: 9 },
      { name: "Adobe XD", level: 8 },
      { name: "Sketch", level: 7 },
      { name: "InVision", level: 6 },
      { name: "HTML/CSS", level: 5 },
      { name: "JavaScript", level: 4 }
    ],
    softSkills: [
      "Communication",
      "Empathy",
      "Problem-solving",
      "Creativity",
      "Collaboration",
      "Attention to detail"
    ],
    skillDevelopment: [
      "Complete UX/UI design bootcamp or online courses",
      "Build a portfolio of personal and client projects",
      "Join design communities like Dribbble or Behance",
      "Attend design workshops and conferences",
      "Find a mentor in the field"
    ],
    
    educationPaths: [
      {
        name: "Bachelor's Degree",
        description: "Formal education in Graphic Design, Human-Computer Interaction, or related field",
        timeframe: "4 years"
      },
      {
        name: "UX/UI Design Bootcamp",
        description: "Intensive, hands-on training focused specifically on UX/UI design skills",
        timeframe: "3-6 months"
      },
      {
        name: "Self-Taught + Certification",
        description: "Online courses combined with industry certifications",
        timeframe: "6-12 months"
      }
    ],
    recommendedPrograms: [
      {
        name: "UX Design Professional Certificate",
        provider: "Google (via Coursera)",
        type: "Certificate",
        duration: "6 months",
        cost: "$39/month"
      },
      {
        name: "UX/UI Design Bootcamp",
        provider: "General Assembly",
        type: "Bootcamp",
        duration: "12 weeks",
        cost: "$14,950"
      },
      {
        name: "Bachelor of Design",
        provider: "Rhode Island School of Design",
        type: "Degree",
        duration: "4 years",
        cost: "$52,000/year"
      }
    ],
    alternativePaths: [
      "Transition from graphic design or web development",
      "Start with internships or freelance projects",
      "Build skills through volunteer work for non-profits",
      "Create case studies by redesigning existing products"
    ],
    certifications: [
      {
        name: "Certified User Experience Professional",
        organization: "Nielsen Norman Group"
      },
      {
        name: "Interaction Design Foundation Certification",
        organization: "IDF"
      },
      {
        name: "Adobe Certified Professional",
        organization: "Adobe"
      }
    ],
    
    dailyActivities: [
      {
        time: "9:00 AM - 10:00 AM",
        description: "Team stand-up meeting and project planning"
      },
      {
        time: "10:00 AM - 12:00 PM",
        description: "User research analysis or stakeholder interviews"
      },
      {
        time: "1:00 PM - 3:00 PM",
        description: "Wireframing and prototyping in Figma"
      },
      {
        time: "3:00 PM - 4:00 PM",
        description: "Collaboration with developers on implementation"
      },
      {
        time: "4:00 PM - 5:00 PM",
        description: "User testing sessions or design reviews"
      }
    ],
    challenges: [
      "Balancing user needs with business requirements",
      "Justifying design decisions to stakeholders",
      "Keeping up with rapidly evolving design tools and trends",
      "Working within technical constraints",
      "Managing multiple projects and deadlines"
    ],
    rewards: [
      "Seeing your designs used by real people",
      "Solving complex problems through creative thinking",
      "Continuous learning and skill development",
      "Collaborative work environment",
      "High demand across many industries"
    ],
    professionalPerspective: {
      name: "Sarah Johnson",
      yearsExperience: "8",
      quote: "What I love most about UX/UI design is how it combines creativity with problem-solving. Every project requires deep thinking about human behavior and needs, while also creating something visually compelling. It's challenging but incredibly rewarding to see users intuitively interact with something you've designed."
    },
    requiredEducation: "Bachelor's or Certificate"
  },
  
  {
    id: 2,
    title: "Software Developer",
    field: "Technology",
    description: "Create, maintain, and improve software applications and systems with strong problem-solving skills. Software developers write code, debug programs, and collaborate with teams to build digital products and services that meet user needs.",
    match: 92,
    salaryMin: 85,
    salaryMax: 150,
    medianSalary: "110,000",
    growth: 22,
    skills: ["Python", "JavaScript", "Problem Solving", "Git", "Agile Methodology", "Testing"],
    
    responsibilities: [
      "Write clean, maintainable code in various programming languages",
      "Debug and fix software issues",
      "Collaborate with teams on software design and architecture",
      "Implement new features and functionality",
      "Optimize applications for performance and scalability"
    ],
    workSetting: "Office / Remote",
    workSchedule: "Full-time / Flexible",
    teamStructure: "Collaborative",
    workStyle: "Analytical / Technical",
    workLifeBalance: 7,
    topLocations: ["San Francisco", "Seattle", "Austin", "New York", "Boston"],
    
    salaryByExperience: {
      entry: "80,000",
      mid: "110,000",
      senior: "140,000",
      expert: "180,000+"
    },
    salaryComparison: {
      national: "75,000",
      difference: "35,000"
    },
    
    technicalSkills: [
      { name: "JavaScript", level: 9 },
      { name: "Python", level: 8 },
      { name: "SQL", level: 8 },
      { name: "DevOps", level: 6 },
      { name: "Cloud Services", level: 7 },
      { name: "React", level: 8 }
    ],
    softSkills: [
      "Problem-solving",
      "Communication",
      "Teamwork",
      "Time management",
      "Adaptability",
      "Attention to detail"
    ],
    skillDevelopment: [
      "Complete a computer science degree or coding bootcamp",
      "Build personal projects and contribute to open source",
      "Practice algorithms and data structures",
      "Learn industry-specific frameworks and tools",
      "Participate in coding challenges and hackathons"
    ],
    
    educationPaths: [
      {
        name: "Bachelor's in Computer Science",
        description: "Traditional degree covering fundamentals and theoretical concepts",
        timeframe: "4 years"
      },
      {
        name: "Coding Bootcamp",
        description: "Intensive training focused on practical development skills",
        timeframe: "3-6 months"
      },
      {
        name: "Self-Taught Path",
        description: "Online courses, documentation, and personal projects",
        timeframe: "6-18 months"
      }
    ],
    recommendedPrograms: [
      {
        name: "Computer Science Degree",
        provider: "Georgia Tech",
        type: "Degree",
        duration: "4 years",
        cost: "$33,000/year"
      },
      {
        name: "Software Engineering Bootcamp",
        provider: "App Academy",
        type: "Bootcamp",
        duration: "16 weeks",
        cost: "$17,000"
      },
      {
        name: "Full-Stack Engineer Path",
        provider: "Codecademy",
        type: "Online Course",
        duration: "6 months",
        cost: "$20/month"
      }
    ],
    alternativePaths: [
      "Start in QA or testing roles and transition to development",
      "Learn through online platforms like freeCodeCamp or The Odin Project",
      "Contribute to open source projects to build experience",
      "Participate in hackathons and coding competitions"
    ],
    certifications: [
      {
        name: "AWS Certified Developer",
        organization: "Amazon Web Services"
      },
      {
        name: "Microsoft Certified: Azure Developer Associate",
        organization: "Microsoft"
      },
      {
        name: "Oracle Certified Professional, Java SE Programmer",
        organization: "Oracle"
      }
    ],
    
    dailyActivities: [
      {
        time: "9:00 AM - 9:30 AM",
        description: "Team stand-up meeting to discuss tasks and blockers"
      },
      {
        time: "9:30 AM - 12:00 PM",
        description: "Focused coding time for implementing features"
      },
      {
        time: "1:00 PM - 2:00 PM",
        description: "Code reviews and pull request management"
      },
      {
        time: "2:00 PM - 4:00 PM",
        description: "Collaborative problem-solving and debugging"
      },
      {
        time: "4:00 PM - 5:00 PM",
        description: "Documentation and planning for next day's tasks"
      }
    ],
    challenges: [
      "Keeping up with rapidly evolving technologies and frameworks",
      "Debugging complex issues across different environments",
      "Managing technical debt in legacy systems",
      "Balancing speed of delivery with code quality",
      "Communicating technical concepts to non-technical stakeholders"
    ],
    rewards: [
      "Building products used by thousands or millions of people",
      "Constant intellectual challenges and problem-solving",
      "High demand across virtually all industries",
      "Strong compensation and benefits",
      "Opportunities for remote work and flexibility"
    ],
    professionalPerspective: {
      name: "Alex Chen",
      yearsExperience: "6",
      quote: "Software development is like solving puzzles every day, but you're creating something useful in the process. What I love most is the continuous learning—there's always a new language, framework, or approach to master. The field rewards curiosity and persistence more than anything else."
    },
    requiredEducation: "Bachelor's or Self-taught"
  },
  
  {
    id: 3,
    title: "Data Scientist",
    field: "Technology & Analytics",
    description: "Extract insights from large datasets to inform strategic business decisions and product innovation. Data scientists combine statistical analysis, programming, and domain knowledge to solve complex problems and create predictive models.",
    match: 89,
    salaryMin: 95,
    salaryMax: 160,
    medianSalary: "120,000",
    growth: 31,
    skills: ["Python", "Machine Learning", "Statistics", "SQL", "Data Visualization", "Big Data"],
    
    responsibilities: [
      "Collect, clean, and process large datasets",
      "Build statistical models and machine learning algorithms",
      "Analyze data to identify patterns and trends",
      "Create visualizations and reports to communicate findings",
      "Work with stakeholders to identify business questions and solutions"
    ],
    workSetting: "Office / Remote",
    workSchedule: "Full-time / Project-based",
    teamStructure: "Collaborative",
    workStyle: "Analytical / Research-oriented",
    workLifeBalance: 7,
    topLocations: ["San Francisco", "New York", "Seattle", "Boston", "Chicago"],
    
    salaryByExperience: {
      entry: "90,000",
      mid: "120,000",
      senior: "150,000",
      expert: "180,000+"
    },
    salaryComparison: {
      national: "75,000",
      difference: "45,000"
    },
    
    technicalSkills: [
      { name: "Python", level: 9 },
      { name: "SQL", level: 8 },
      { name: "Machine Learning", level: 9 },
      { name: "Statistics", level: 8 },
      { name: "Data Visualization", level: 7 },
      { name: "Big Data Tools", level: 6 }
    ],
    softSkills: [
      "Analytical thinking",
      "Problem-solving",
      "Communication",
      "Business acumen",
      "Curiosity",
      "Attention to detail"
    ],
    skillDevelopment: [
      "Master programming languages for data analysis (Python, R)",
      "Build a strong foundation in statistics and probability",
      "Learn machine learning algorithms and frameworks",
      "Develop data visualization skills",
      "Complete real-world projects with messy datasets"
    ],
    
    educationPaths: [
      {
        name: "Master's in Data Science",
        description: "Specialized graduate degree covering statistics, programming, and machine learning",
        timeframe: "1-2 years"
      },
      {
        name: "Bachelor's + Self-Study",
        description: "Undergraduate degree in quantitative field plus focused online learning",
        timeframe: "4+ years"
      },
      {
        name: "Data Science Bootcamp",
        description: "Intensive, hands-on training in core data science skills",
        timeframe: "3-6 months"
      }
    ],
    recommendedPrograms: [
      {
        name: "Master of Science in Data Science",
        provider: "UC Berkeley",
        type: "Degree",
        duration: "2 years",
        cost: "$60,000 total"
      },
      {
        name: "Data Science Career Track",
        provider: "Springboard",
        type: "Bootcamp",
        duration: "6 months",
        cost: "$8,500"
      },
      {
        name: "IBM Data Science Professional Certificate",
        provider: "IBM (via Coursera)",
        type: "Certificate",
        duration: "4-6 months",
        cost: "$39/month"
      }
    ],
    alternativePaths: [
      "Transition from statistics, mathematics, or analysis roles",
      "Start in data analytics and progress to more predictive work",
      "Contribute to open source data science projects",
      "Participate in data science competitions on Kaggle"
    ],
    certifications: [
      {
        name: "Microsoft Certified: Azure Data Scientist Associate",
        organization: "Microsoft"
      },
      {
        name: "Google Professional Data Engineer",
        organization: "Google Cloud"
      },
      {
        name: "Certified Data Scientist",
        organization: "IBM"
      }
    ],
    
    dailyActivities: [
      {
        time: "9:00 AM - 10:00 AM",
        description: "Review project status and planning with team"
      },
      {
        time: "10:00 AM - 12:00 PM",
        description: "Data collection, cleaning, and preprocessing"
      },
      {
        time: "1:00 PM - 3:00 PM",
        description: "Model development and testing"
      },
      {
        time: "3:00 PM - 4:00 PM",
        description: "Stakeholder meetings to discuss findings"
      },
      {
        time: "4:00 PM - 5:00 PM",
        description: "Documentation and research on new techniques"
      }
    ],
    challenges: [
      "Working with messy, incomplete, or biased data",
      "Translating complex statistical concepts for non-technical audiences",
      "Balancing accuracy with interpretability in models",
      "Keeping up with rapidly evolving tools and techniques",
      "Ensuring ethical use of data and algorithms"
    ],
    rewards: [
      "Solving complex, impactful problems across industries",
      "Continuous intellectual challenges and learning",
      "High demand and strong compensation",
      "Combining technical skills with business impact",
      "Opportunities to work with cutting-edge technologies"
    ],
    professionalPerspective: {
      name: "Priya Sharma",
      yearsExperience: "5",
      quote: "Data science is the perfect field for the perpetually curious. Every day brings new puzzles to solve and insights to uncover. What I find most rewarding is translating complex analyses into actionable insights that drive real business decisions. It's both technically challenging and creatively satisfying."
    },
    requiredEducation: "Master's (preferred)"
  },
  
  {
    id: 4,
    title: "Digital Marketing Manager",
    field: "Marketing",
    description: "Drive brand awareness, lead generation, and customer engagement through digital channels. Digital Marketing Managers develop strategies across social media, content marketing, email, SEO, and paid advertising to achieve business goals.",
    match: 84,
    salaryMin: 65,
    salaryMax: 120,
    medianSalary: "85,000",
    growth: 18,
    skills: ["SEO", "Content Marketing", "Social Media", "Email Marketing", "Analytics", "Campaign Management"],
    
    responsibilities: [
      "Develop and implement digital marketing strategies",
      "Manage campaigns across multiple channels",
      "Analyze performance metrics and optimize campaigns",
      "Create and curate engaging content",
      "Manage marketing budget and ROI tracking"
    ],
    workSetting: "Office / Remote",
    workSchedule: "Full-time / Flexible",
    teamStructure: "Collaborative",
    workStyle: "Creative / Data-driven",
    workLifeBalance: 6,
    topLocations: ["New York", "Chicago", "Los Angeles", "Austin", "Atlanta"],
    
    salaryByExperience: {
      entry: "55,000",
      mid: "85,000",
      senior: "110,000",
      expert: "140,000+"
    },
    salaryComparison: {
      national: "75,000",
      difference: "10,000"
    },
    
    technicalSkills: [
      { name: "Google Analytics", level: 9 },
      { name: "Social Media Platforms", level: 9 },
      { name: "SEO Tools", level: 8 },
      { name: "Email Marketing Software", level: 8 },
      { name: "Content Management Systems", level: 7 },
      { name: "Paid Advertising Platforms", level: 8 }
    ],
    softSkills: [
      "Communication",
      "Creativity",
      "Analytical thinking",
      "Project management",
      "Adaptability",
      "Strategic planning"
    ],
    skillDevelopment: [
      "Gain experience with major digital marketing platforms",
      "Learn data analysis and performance measurement",
      "Develop content creation and copywriting skills",
      "Stay updated on digital marketing trends and algorithm changes",
      "Complete certifications from Google, Facebook, etc."
    ],
    
    educationPaths: [
      {
        name: "Bachelor's in Marketing",
        description: "Traditional degree covering marketing principles and business fundamentals",
        timeframe: "4 years"
      },
      {
        name: "Digital Marketing Certificate",
        description: "Focused training on digital marketing skills and platforms",
        timeframe: "3-6 months"
      },
      {
        name: "Self-Guided + Certifications",
        description: "Learning through online resources and platform-specific certifications",
        timeframe: "6-12 months"
      }
    ],
    recommendedPrograms: [
      {
        name: "Bachelor of Business Administration in Marketing",
        provider: "NYU Stern",
        type: "Degree",
        duration: "4 years",
        cost: "$54,000/year"
      },
      {
        name: "Digital Marketing Nanodegree",
        provider: "Udacity",
        type: "Certificate",
        duration: "3 months",
        cost: "$399/month"
      },
      {
        name: "Digital Marketing Specialization",
        provider: "University of Illinois (via Coursera)",
        type: "Certificate",
        duration: "8 months",
        cost: "$49/month"
      }
    ],
    alternativePaths: [
      "Start in a specific channel (social media, SEO, content) and expand skills",
      "Move from traditional marketing into digital specialties",
      "Begin with marketing assistant roles and grow with experience",
      "Build a portfolio through freelance or volunteer marketing work"
    ],
    certifications: [
      {
        name: "Google Analytics Certification",
        organization: "Google"
      },
      {
        name: "Facebook Blueprint Certification",
        organization: "Meta"
      },
      {
        name: "HubSpot Content Marketing Certification",
        organization: "HubSpot"
      }
    ],
    
    dailyActivities: [
      {
        time: "9:00 AM - 9:30 AM",
        description: "Review performance metrics and campaign status"
      },
      {
        time: "9:30 AM - 11:00 AM",
        description: "Content planning and review with team"
      },
      {
        time: "11:00 AM - 12:00 PM",
        description: "Stakeholder meetings for upcoming campaigns"
      },
      {
        time: "1:00 PM - 3:00 PM",
        description: "Campaign optimization and budget management"
      },
      {
        time: "3:00 PM - 5:00 PM",
        description: "Strategic planning and performance analysis"
      }
    ],
    challenges: [
      "Keeping up with constantly changing platforms and algorithms",
      "Balancing creativity with data-driven decision making",
      "Demonstrating ROI and value to stakeholders",
      "Managing campaigns across multiple channels simultaneously",
      "Staying ahead of competitors in crowded markets"
    ],
    rewards: [
      "Seeing immediate impact of campaigns on business results",
      "Combination of creative and analytical work",
      "Opportunities for continuous learning and growth",
      "High demand across virtually all industries",
      "Potential for remote work and flexibility"
    ],
    professionalPerspective: {
      name: "Marcus Johnson",
      yearsExperience: "7",
      quote: "What I love about digital marketing is the perfect blend of creativity and analytics. You can come up with innovative campaign ideas in the morning and measure their performance by the afternoon. It's fast-paced and always evolving, which keeps the work exciting and challenging."
    },
    requiredEducation: "Bachelor's (preferred)"
  },
  
  {
    id: 5,
    title: "Nurse Practitioner",
    field: "Healthcare",
    description: "Provide primary and specialty healthcare with more autonomy than registered nurses. Nurse practitioners diagnose conditions, prescribe medications, develop treatment plans, and offer preventative care advice to patients.",
    match: 78,
    salaryMin: 95,
    salaryMax: 140,
    medianSalary: "115,000",
    growth: 45,
    skills: ["Patient Assessment", "Diagnosis", "Treatment Planning", "Medication Management", "Patient Education", "Clinical Documentation"],
    
    responsibilities: [
      "Conduct comprehensive patient assessments",
      "Diagnose acute and chronic conditions",
      "Prescribe medications and treatments",
      "Order and interpret diagnostic tests",
      "Provide patient education and preventative care"
    ],
    workSetting: "Clinical / Hospital / Private Practice",
    workSchedule: "Varies (shifts or regular hours)",
    teamStructure: "Collaborative Healthcare Team",
    workStyle: "People-focused / Detail-oriented",
    workLifeBalance: 6,
    topLocations: ["California", "Texas", "New York", "Florida", "Massachusetts"],
    
    salaryByExperience: {
      entry: "95,000",
      mid: "115,000",
      senior: "130,000",
      expert: "150,000+"
    },
    salaryComparison: {
      national: "75,000",
      difference: "40,000"
    },
    
    technicalSkills: [
      { name: "Clinical Assessment", level: 9 },
      { name: "Pharmacology", level: 9 },
      { name: "Electronic Health Records", level: 8 },
      { name: "Diagnostic Procedures", level: 8 },
      { name: "Medical Equipment", level: 7 },
      { name: "Treatment Protocols", level: 9 }
    ],
    softSkills: [
      "Empathy",
      "Communication",
      "Critical thinking",
      "Attention to detail",
      "Time management",
      "Stress management"
    ],
    skillDevelopment: [
      "Earn RN licensure and clinical experience",
      "Complete an accredited Nurse Practitioner program",
      "Obtain national certification in your specialty",
      "Pursue continuing education in specialized areas",
      "Develop leadership and communication skills"
    ],
    
    educationPaths: [
      {
        name: "Master of Science in Nursing (MSN)",
        description: "Graduate-level nursing program with NP specialization",
        timeframe: "2-3 years after BSN"
      },
      {
        name: "Doctor of Nursing Practice (DNP)",
        description: "Terminal practice-focused nursing degree",
        timeframe: "3-4 years after BSN"
      },
      {
        name: "RN to NP Bridge Program",
        description: "Accelerated pathway for experienced RNs",
        timeframe: "2-4 years"
      }
    ],
    recommendedPrograms: [
      {
        name: "Master of Science in Nursing - Family Nurse Practitioner",
        provider: "Johns Hopkins University",
        type: "Degree",
        duration: "2 years",
        cost: "$45,000 total"
      },
      {
        name: "Doctor of Nursing Practice",
        provider: "University of Washington",
        type: "Degree",
        duration: "3-4 years",
        cost: "$35,000/year"
      },
      {
        name: "Post-Master's NP Certificate",
        provider: "Vanderbilt University",
        type: "Certificate",
        duration: "1-2 years",
        cost: "$30,000 total"
      }
    ],
    alternativePaths: [
      "Start as a Registered Nurse and advance through experience",
      "Bridge programs for career-changers with non-nursing backgrounds",
      "Accelerated options for those with prior healthcare experience",
      "Part-time study while continuing to work as an RN"
    ],
    certifications: [
      {
        name: "Family Nurse Practitioner (FNP-BC)",
        organization: "American Nurses Credentialing Center"
      },
      {
        name: "Adult-Gerontology Nurse Practitioner",
        organization: "American Association of Nurse Practitioners"
      },
      {
        name: "Psychiatric Mental Health Nurse Practitioner",
        organization: "American Nurses Credentialing Center"
      }
    ],
    
    dailyActivities: [
      {
        time: "8:00 AM - 9:00 AM",
        description: "Review patient charts and prepare for appointments"
      },
      {
        time: "9:00 AM - 12:00 PM",
        description: "Patient examinations, diagnoses, and treatment planning"
      },
      {
        time: "1:00 PM - 3:00 PM",
        description: "Follow-up appointments and medication management"
      },
      {
        time: "3:00 PM - 4:00 PM",
        description: "Consult with physicians on complex cases"
      },
      {
        time: "4:00 PM - 5:00 PM",
        description: "Complete clinical documentation and follow-ups"
      }
    ],
    challenges: [
      "Managing high patient loads while providing quality care",
      "Keeping up with evolving medical knowledge and best practices",
      "Navigating regulatory requirements and scope of practice limits",
      "Dealing with emotionally challenging patient situations",
      "Balancing autonomy with collaborative care models"
    ],
    rewards: [
      "Making a direct impact on patients' health and wellbeing",
      "Strong job security and high demand across the country",
      "Opportunities for specialization in many areas of medicine",
      "Meaningful relationships with patients and care teams",
      "Intellectual challenges and continuous learning"
    ],
    professionalPerspective: {
      name: "Emily Rodriguez, FNP",
      yearsExperience: "9",
      quote: "Being a nurse practitioner combines the best aspects of nursing and medicine. I have the autonomy to diagnose and treat patients, while still maintaining the holistic, patient-centered approach that drew me to healthcare. Every day brings different challenges, but helping patients improve their health and quality of life makes it incredibly rewarding."
    },
    requiredEducation: "Master's Degree"
  },
  
  {
    id: 6,
    title: "Financial Analyst",
    field: "Finance",
    description: "Evaluate financial data to help organizations make informed business decisions. Financial analysts assess investment opportunities, analyze market trends, create financial models, and provide recommendations to guide strategy.",
    match: 72,
    salaryMin: 65,
    salaryMax: 110,
    medianSalary: "85,000",
    growth: 15,
    skills: ["Financial Modeling", "Data Analysis", "Excel", "Forecasting", "Financial Reporting", "Business Acumen"],
    
    responsibilities: [
      "Analyze financial data and performance metrics",
      "Create financial models and forecasts",
      "Evaluate investment opportunities and risks",
      "Prepare reports and presentations for stakeholders",
      "Monitor industry trends and market conditions"
    ],
    workSetting: "Office / Hybrid",
    workSchedule: "Full-time / Regular hours",
    teamStructure: "Departmental",
    workStyle: "Analytical / Detail-oriented",
    workLifeBalance: 5,
    topLocations: ["New York", "Chicago", "Boston", "Charlotte", "San Francisco"],
    
    salaryByExperience: {
      entry: "65,000",
      mid: "85,000",
      senior: "110,000",
      expert: "140,000+"
    },
    salaryComparison: {
      national: "75,000",
      difference: "10,000"
    },
    
    technicalSkills: [
      { name: "Excel/Spreadsheets", level: 9 },
      { name: "Financial Modeling", level: 9 },
      { name: "Business Intelligence Tools", level: 7 },
      { name: "SQL/Database Queries", level: 6 },
      { name: "Accounting Principles", level: 8 },
      { name: "Financial Analysis Software", level: 7 }
    ],
    softSkills: [
      "Analytical thinking",
      "Attention to detail",
      "Communication",
      "Problem-solving",
      "Time management",
      "Business acumen"
    ],
    skillDevelopment: [
      "Master financial modeling and analysis techniques",
      "Develop advanced Excel and data analysis skills",
      "Learn financial reporting and accounting principles",
      "Build industry-specific knowledge",
      "Improve presentation and communication abilities"
    ],
    
    educationPaths: [
      {
        name: "Bachelor's in Finance or Economics",
        description: "Undergraduate degree covering financial principles and analysis",
        timeframe: "4 years"
      },
      {
        name: "Master's in Finance",
        description: "Advanced degree with specialized financial training",
        timeframe: "1-2 years"
      },
      {
        name: "MBA with Finance Concentration",
        description: "Business administration degree with finance focus",
        timeframe: "2 years"
      }
    ],
    recommendedPrograms: [
      {
        name: "Bachelor of Science in Finance",
        provider: "Wharton School, UPenn",
        type: "Degree",
        duration: "4 years",
        cost: "$60,000/year"
      },
      {
        name: "Master of Finance",
        provider: "MIT Sloan",
        type: "Degree",
        duration: "1 year",
        cost: "$80,000 total"
      },
      {
        name: "Financial Analysis Specialization",
        provider: "University of Michigan (via Coursera)",
        type: "Certificate",
        duration: "4 months",
        cost: "$49/month"
      }
    ],
    alternativePaths: [
      "Start in accounting or banking roles and transition to analysis",
      "Begin in financial operations and move to strategic analysis",
      "Leverage quantitative backgrounds from other fields",
      "Start as a financial research assistant or associate"
    ],
    certifications: [
      {
        name: "Chartered Financial Analyst (CFA)",
        organization: "CFA Institute"
      },
      {
        name: "Financial Risk Manager (FRM)",
        organization: "Global Association of Risk Professionals"
      },
      {
        name: "Certified Financial Planner (CFP)",
        organization: "CFP Board"
      }
    ],
    
    dailyActivities: [
      {
        time: "8:30 AM - 9:30 AM",
        description: "Review financial performance metrics and market data"
      },
      {
        time: "9:30 AM - 11:30 AM",
        description: "Update financial models and forecasts"
      },
      {
        time: "11:30 AM - 12:30 PM",
        description: "Prepare for or attend stakeholder meetings"
      },
      {
        time: "1:30 PM - 3:30 PM",
        description: "Analyze investment opportunities or business cases"
      },
      {
        time: "3:30 PM - 5:00 PM",
        description: "Generate reports and draft recommendations"
      }
    ],
    challenges: [
      "Managing tight deadlines, especially during reporting periods",
      "Balancing accuracy with timeliness in financial analysis",
      "Communicating complex financial concepts to non-financial stakeholders",
      "Adapting to changing regulations and reporting requirements",
      "Maintaining objectivity when stakeholders have different preferences"
    ],
    rewards: [
      "Directly influencing business strategy and investment decisions",
      "Clear career progression path with advancement opportunities",
      "Exposure to senior leadership and strategic planning",
      "Intellectually stimulating work with tangible impacts",
      "Developing transferable skills valued across industries"
    ],
    professionalPerspective: {
      name: "Michael Tran",
      yearsExperience: "8",
      quote: "Financial analysis is all about turning numbers into narratives that drive decisions. What I find most rewarding is connecting financial insights to business strategy—showing how data tells a story about opportunities and risks. There's something deeply satisfying about creating clarity from complexity, especially when you see your analysis shape important business decisions."
    },
    requiredEducation: "Bachelor's Degree"
  }
];

// Add 200+ more careers starting from ID 7 (after the existing ones)
const additionalCareers = generateCareers(7);
const allCareers = [...careers, ...additionalCareers];

// Get all careers
export function getCareers(): Career[] {
  return allCareers;
}

// Get a specific career by ID
export function getCareerById(id: number): Career | undefined {
  return allCareers.find(career => career.id === id);
}
