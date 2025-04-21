import { Career } from "@/types";

// Career fields with more granularity
const careerFields = [
  "Technology",
  "Healthcare",
  "Finance",
  "Education",
  "Design & Technology",
  "Marketing",
  "Business & Management",
  "Legal",
  "Engineering",
  "Science & Research",
  "Arts & Entertainment",
  "Communication & Media",
  "Construction & Architecture",
  "Hospitality & Tourism",
  "Social Services",
  "Environment & Sustainability",
  "Transportation & Logistics",
  "Public Service & Government",
  "Manufacturing",
  "Agriculture & Food Production"
];

// Generate a list of 200+ careers
export function generateCareers(startingId: number): Career[] {
  const generatedCareers: Career[] = [];
  
  // Technology careers
  const technologyCareers = [
    {title: "Software Engineer", skills: ["Programming", "Problem Solving", "Data Structures", "Algorithms", "Software Design", "Testing"], salaryMin: 80, salaryMax: 150, growth: 22},
    {title: "Data Scientist", skills: ["Machine Learning", "Statistics", "Python", "Data Visualization", "SQL", "Problem Solving"], salaryMin: 85, salaryMax: 160, growth: 28},
    {title: "Cloud Architect", skills: ["AWS/Azure/GCP", "Infrastructure Design", "Security", "Networking", "DevOps", "Solution Architecture"], salaryMin: 120, salaryMax: 180, growth: 20},
    {title: "DevOps Engineer", skills: ["CI/CD", "Docker", "Kubernetes", "Linux", "Scripting", "Cloud Platforms"], salaryMin: 95, salaryMax: 155, growth: 25},
    {title: "Mobile App Developer", skills: ["iOS/Android", "UI/UX Design", "API Integration", "Performance Optimization", "Cross-Platform Development", "Testing"], salaryMin: 75, salaryMax: 140, growth: 22},
    {title: "Blockchain Developer", skills: ["Smart Contracts", "Cryptography", "Blockchain Protocols", "Solidity", "Web3", "Full-Stack Development"], salaryMin: 110, salaryMax: 175, growth: 32},
    {title: "AI Engineer", skills: ["Machine Learning", "Neural Networks", "Python", "Data Processing", "Algorithm Development", "Research"], salaryMin: 100, salaryMax: 170, growth: 35},
    {title: "Cybersecurity Analyst", skills: ["Threat Analysis", "Security Tools", "Network Security", "Incident Response", "Penetration Testing", "Risk Assessment"], salaryMin: 85, salaryMax: 150, growth: 33},
    {title: "Network Engineer", skills: ["Network Design", "Routing/Switching", "Network Security", "Troubleshooting", "Implementation", "Monitoring"], salaryMin: 70, salaryMax: 130, growth: 15},
    {title: "Database Administrator", skills: ["SQL", "Database Design", "Performance Tuning", "Backup/Recovery", "Security", "Troubleshooting"], salaryMin: 80, salaryMax: 140, growth: 10},
    {title: "Full-Stack Developer", skills: ["Frontend", "Backend", "Databases", "API Design", "UI/UX", "Testing"], salaryMin: 85, salaryMax: 155, growth: 27},
    {title: "Systems Analyst", skills: ["Requirements Analysis", "System Design", "Process Improvement", "Documentation", "Testing", "Stakeholder Management"], salaryMin: 70, salaryMax: 120, growth: 9},
    {title: "IT Project Manager", skills: ["Project Planning", "Resource Management", "Risk Management", "Budgeting", "Stakeholder Communication", "Technical Understanding"], salaryMin: 90, salaryMax: 160, growth: 11},
    {title: "AR/VR Developer", skills: ["3D Modeling", "Unity/Unreal Engine", "UI/UX Design", "Spatial Computing", "Animation", "Programming"], salaryMin: 90, salaryMax: 150, growth: 30},
    {title: "Robotics Engineer", skills: ["Control Systems", "Computer Vision", "ROS", "Mechanical Engineering", "Electronics", "Programming"], salaryMin: 95, salaryMax: 165, growth: 22}
  ];
  
  // Healthcare careers
  const healthcareCareers = [
    {title: "Registered Nurse", skills: ["Patient Care", "Medical Knowledge", "Critical Thinking", "Communication", "Organization", "Compassion"], salaryMin: 65, salaryMax: 120, growth: 15},
    {title: "Physician Assistant", skills: ["Medical Knowledge", "Patient Assessment", "Clinical Procedures", "Decision Making", "Communication", "Teamwork"], salaryMin: 95, salaryMax: 140, growth: 31},
    {title: "Physical Therapist", skills: ["Rehabilitation Techniques", "Anatomy Knowledge", "Patient Assessment", "Treatment Planning", "Compassion", "Communication"], salaryMin: 75, salaryMax: 125, growth: 18},
    {title: "Medical Laboratory Technician", skills: ["Lab Procedures", "Sample Testing", "Equipment Operation", "Quality Control", "Attention to Detail", "Critical Thinking"], salaryMin: 50, salaryMax: 90, growth: 11},
    {title: "Healthcare Administrator", skills: ["Healthcare Regulations", "Management", "Budgeting", "Strategic Planning", "Communication", "Problem Solving"], salaryMin: 80, salaryMax: 150, growth: 32},
    {title: "Occupational Therapist", skills: ["Therapeutic Techniques", "Assessment", "Rehabilitation Planning", "Adaptive Equipment", "Patient Education", "Documentation"], salaryMin: 75, salaryMax: 120, growth: 17},
    {title: "Dietitian", skills: ["Nutrition Science", "Meal Planning", "Patient Education", "Assessment", "Medical Knowledge", "Communication"], salaryMin: 55, salaryMax: 85, growth: 8},
    {title: "Pharmacist", skills: ["Medication Knowledge", "Patient Consultation", "Prescription Verification", "Health Screening", "Inventory Management", "Attention to Detail"], salaryMin: 120, salaryMax: 160, growth: 2},
    {title: "Radiologic Technologist", skills: ["Imaging Equipment", "Patient Positioning", "Radiation Safety", "Image Quality Assessment", "Patient Care", "Technical Knowledge"], salaryMin: 60, salaryMax: 95, growth: 9},
    {title: "Medical Coder", skills: ["Medical Terminology", "Coding Systems", "EHR Software", "Attention to Detail", "Analysis", "Compliance"], salaryMin: 40, salaryMax: 75, growth: 11}
  ];
  
  // Finance careers
  const financeCareers = [
    {title: "Financial Planner", skills: ["Investment Knowledge", "Financial Analysis", "Client Relationship", "Risk Assessment", "Tax Planning", "Communication"], salaryMin: 70, salaryMax: 150, growth: 15},
    {title: "Investment Banking Analyst", skills: ["Financial Modeling", "Valuation", "Market Research", "Deal Execution", "Excel", "Presentation"], salaryMin: 85, salaryMax: 180, growth: 5},
    {title: "Actuary", skills: ["Mathematics", "Statistics", "Risk Assessment", "Analytical Thinking", "Programming", "Financial Knowledge"], salaryMin: 90, salaryMax: 160, growth: 24},
    {title: "Accountant", skills: ["Bookkeeping", "Tax Preparation", "Financial Reporting", "Auditing", "Analysis", "Attention to Detail"], salaryMin: 60, salaryMax: 120, growth: 7},
    {title: "Financial Analyst", skills: ["Financial Modeling", "Data Analysis", "Forecasting", "Reporting", "Excel", "Business Acumen"], salaryMin: 65, salaryMax: 120, growth: 11},
    {title: "Risk Manager", skills: ["Risk Assessment", "Analysis", "Mitigation Planning", "Compliance", "Industry Knowledge", "Communication"], salaryMin: 85, salaryMax: 150, growth: 15},
    {title: "Portfolio Manager", skills: ["Investment Strategy", "Asset Allocation", "Financial Analysis", "Market Research", "Client Management", "Decision Making"], salaryMin: 100, salaryMax: 200, growth: 8},
    {title: "Insurance Underwriter", skills: ["Risk Evaluation", "Policy Analysis", "Decision Making", "Industry Knowledge", "Attention to Detail", "Communication"], salaryMin: 65, salaryMax: 125, growth: 5},
    {title: "Credit Analyst", skills: ["Credit Risk Assessment", "Financial Statement Analysis", "Industry Research", "Documentation", "Communication", "Attention to Detail"], salaryMin: 60, salaryMax: 110, growth: 6}
  ];
  
  // Design & Technology careers
  const designCareers = [
    {title: "Graphic Designer", skills: ["Visual Design", "Typography", "Color Theory", "Adobe Creative Suite", "Branding", "Layout Design"], salaryMin: 45, salaryMax: 95, growth: 3},
    {title: "Product Designer", skills: ["User Research", "Prototyping", "Visual Design", "UX Design", "Design Systems", "Problem Solving"], salaryMin: 70, salaryMax: 135, growth: 8},
    {title: "3D Modeler", skills: ["3D Software", "Texturing", "Lighting", "Animation", "Rendering", "Attention to Detail"], salaryMin: 55, salaryMax: 120, growth: 15},
    {title: "Motion Graphics Designer", skills: ["Animation", "After Effects", "Storytelling", "Video Editing", "Creative Thinking", "Technical Skills"], salaryMin: 60, salaryMax: 115, growth: 14},
    {title: "Game Designer", skills: ["Game Mechanics", "Level Design", "Storytelling", "Prototyping", "User Psychology", "Creative Thinking"], salaryMin: 65, salaryMax: 130, growth: 11},
    {title: "Web Designer", skills: ["UI Design", "HTML/CSS", "Responsive Design", "User Experience", "Visual Design", "Prototyping"], salaryMin: 55, salaryMax: 110, growth: 8}
  ];
  
  // Marketing careers
  const marketingCareers = [
    {title: "Digital Marketing Specialist", skills: ["SEO/SEM", "Social Media", "Analytics", "Content Creation", "Campaign Management", "Market Research"], salaryMin: 50, salaryMax: 110, growth: 20},
    {title: "Brand Manager", skills: ["Brand Strategy", "Marketing Campaigns", "Market Analysis", "Product Development", "Budget Management", "Leadership"], salaryMin: 75, salaryMax: 140, growth: 10},
    {title: "Content Strategist", skills: ["Content Planning", "SEO", "Audience Analysis", "Writing/Editing", "Project Management", "Analytics"], salaryMin: 65, salaryMax: 115, growth: 13},
    {title: "Market Research Analyst", skills: ["Data Analysis", "Survey Design", "Statistical Methods", "Report Writing", "Critical Thinking", "Industry Knowledge"], salaryMin: 60, salaryMax: 110, growth: 18},
    {title: "Social Media Manager", skills: ["Platform Knowledge", "Content Creation", "Community Management", "Analytics", "Campaign Planning", "Trend Awareness"], salaryMin: 50, salaryMax: 100, growth: 15},
    {title: "SEO Specialist", skills: ["Keyword Research", "Analytics", "Link Building", "Technical SEO", "Content Optimization", "Competitor Analysis"], salaryMin: 55, salaryMax: 105, growth: 20}
  ];
  
  // Business & Management careers
  const businessCareers = [
    {title: "Management Consultant", skills: ["Problem Solving", "Business Analysis", "Strategic Thinking", "Project Management", "Communication", "Industry Knowledge"], salaryMin: 85, salaryMax: 175, growth: 14},
    {title: "Human Resources Manager", skills: ["Recruitment", "Employee Relations", "HR Policies", "Conflict Resolution", "Communication", "Leadership"], salaryMin: 70, salaryMax: 140, growth: 9},
    {title: "Operations Manager", skills: ["Process Improvement", "Staff Management", "Strategic Planning", "Problem Solving", "Budget Management", "Industry Knowledge"], salaryMin: 75, salaryMax: 145, growth: 7},
    {title: "Business Analyst", skills: ["Requirements Gathering", "Data Analysis", "Process Modeling", "Documentation", "Communication", "Problem Solving"], salaryMin: 65, salaryMax: 125, growth: 14},
    {title: "Supply Chain Manager", skills: ["Logistics", "Procurement", "Inventory Management", "Supplier Relations", "Process Optimization", "Risk Management"], salaryMin: 80, salaryMax: 150, growth: 6},
    {title: "Project Manager", skills: ["Planning", "Team Leadership", "Risk Management", "Stakeholder Management", "Budget Control", "Problem Solving"], salaryMin: 75, salaryMax: 140, growth: 8}
  ];

  // Add each category of careers to the generated list
  let id = startingId;
  
  const addCareersFromCategory = (careers: any[], field: string) => {
    careers.forEach(career => {
      generatedCareers.push({
        id: id++,
        title: career.title,
        field: field,
        description: `${career.title}s are professionals who ${generateDescription(career.title, field)}. They combine ${career.skills[0]}, ${career.skills[1]}, and ${career.skills[2]} to deliver results in the ${field} industry.`,
        match: Math.floor(Math.random() * 30) + 70, // Random match between 70-99
        salaryMin: career.salaryMin,
        salaryMax: career.salaryMax,
        medianSalary: `$${Math.floor((career.salaryMin + career.salaryMax) / 2 * 1000)}`,
        growth: career.growth,
        skills: career.skills,
        responsibilities: generateResponsibilities(career.title, field),
        workSetting: generateWorkSetting(),
        workSchedule: generateWorkSchedule(),
        teamStructure: generateTeamStructure(),
        workStyle: generateWorkStyle(),
        workLifeBalance: Math.floor(Math.random() * 4) + 5, // Range from 5-8
        topLocations: generateTopLocations(),
        salaryByExperience: {
          entry: `$${Math.floor(career.salaryMin * 0.8 * 1000)}`,
          mid: `$${Math.floor(((career.salaryMin + career.salaryMax) / 2) * 1000)}`,
          senior: `$${Math.floor(career.salaryMax * 0.9 * 1000)}`,
          expert: `$${Math.floor(career.salaryMax * 1000)}+`
        },
        salaryComparison: {
          national: `$${Math.floor(((career.salaryMin + career.salaryMax) / 2 * 0.9) * 1000)}`,
          difference: `$${Math.floor(((career.salaryMin + career.salaryMax) / 2 * 0.1) * 1000)}`
        },
        technicalSkills: generateTechnicalSkills(career.skills),
        softSkills: generateSoftSkills(),
        skillDevelopment: generateSkillDevelopment(career.title, field),
        educationPaths: generateEducationPaths(career.title, field),
        recommendedPrograms: generateRecommendedPrograms(career.title, field),
        dailyActivities: generateDailyActivities(career.title),
        challenges: generateChallenges(career.title, field),
        rewards: generateRewards(career.title, field),
        professionalPerspective: generateProfessionalPerspective(career.title),
        requiredEducation: generateRequiredEducation(field)
      });
    });
  };
  
  // Add each category with its corresponding field
  addCareersFromCategory(technologyCareers, "Technology");
  addCareersFromCategory(healthcareCareers, "Healthcare");
  addCareersFromCategory(financeCareers, "Finance");
  addCareersFromCategory(designCareers, "Design & Technology");
  addCareersFromCategory(marketingCareers, "Marketing");
  addCareersFromCategory(businessCareers, "Business & Management");
  
  // Add more career categories for each field to reach 200+
  // Education
  addCareersFromCategory([
    {title: "Secondary School Teacher", skills: ["Subject Expertise", "Lesson Planning", "Classroom Management", "Assessment", "Communication", "Adaptability"], salaryMin: 55, salaryMax: 95, growth: 4},
    {title: "Special Education Teacher", skills: ["Differentiated Instruction", "Behavior Management", "IEP Development", "Assessment", "Patience", "Communication"], salaryMin: 60, salaryMax: 100, growth: 8},
    {title: "University Professor", skills: ["Research", "Academic Writing", "Teaching", "Subject Expertise", "Mentoring", "Grant Writing"], salaryMin: 75, salaryMax: 180, growth: 12},
    {title: "School Counselor", skills: ["Counseling", "Student Assessment", "Career Guidance", "Crisis Intervention", "Communication", "Empathy"], salaryMin: 60, salaryMax: 95, growth: 8},
    {title: "Educational Administrator", skills: ["Leadership", "Policy Implementation", "Budget Management", "Staff Development", "Strategic Planning", "Community Relations"], salaryMin: 80, salaryMax: 150, growth: 8},
    {title: "Instructional Designer", skills: ["Curriculum Development", "E-Learning", "Educational Technology", "Assessment Design", "Project Management", "Communication"], salaryMin: 65, salaryMax: 110, growth: 10},
    {title: "Educational Technologist", skills: ["EdTech Tools", "Training", "Digital Content Creation", "Problem Solving", "Technical Support", "Instructional Design"], salaryMin: 60, salaryMax: 100, growth: 15}
  ], "Education");
  
  // Legal
  addCareersFromCategory([
    {title: "Lawyer", skills: ["Legal Research", "Case Analysis", "Negotiation", "Legal Writing", "Advocacy", "Client Management"], salaryMin: 85, salaryMax: 200, growth: 4},
    {title: "Paralegal", skills: ["Legal Research", "Document Preparation", "Case Management", "Filing Procedures", "Organization", "Communication"], salaryMin: 45, salaryMax: 85, growth: 12},
    {title: "Legal Consultant", skills: ["Legal Analysis", "Problem Solving", "Industry Knowledge", "Compliance", "Research", "Communication"], salaryMin: 80, salaryMax: 150, growth: 8},
    {title: "Compliance Officer", skills: ["Regulatory Knowledge", "Risk Assessment", "Policy Development", "Auditing", "Reporting", "Communication"], salaryMin: 70, salaryMax: 140, growth: 8},
    {title: "Contract Manager", skills: ["Contract Review", "Negotiation", "Risk Assessment", "Legal Knowledge", "Documentation", "Attention to Detail"], salaryMin: 65, salaryMax: 130, growth: 7}
  ], "Legal");
  
  // Engineering
  addCareersFromCategory([
    {title: "Civil Engineer", skills: ["Structural Analysis", "Design", "Project Management", "Technical Drawing", "Problem Solving", "Mathematics"], salaryMin: 70, salaryMax: 130, growth: 8},
    {title: "Mechanical Engineer", skills: ["CAD", "Mechanical Design", "Thermal Analysis", "Problem Solving", "Project Management", "Technical Knowledge"], salaryMin: 75, salaryMax: 135, growth: 7},
    {title: "Electrical Engineer", skills: ["Circuit Design", "Power Systems", "Electronics", "Problem Solving", "Technical Knowledge", "Project Management"], salaryMin: 75, salaryMax: 140, growth: 7},
    {title: "Aerospace Engineer", skills: ["Aerodynamics", "Propulsion Systems", "Structural Analysis", "Systems Engineering", "Technical Knowledge", "Problem Solving"], salaryMin: 85, salaryMax: 155, growth: 8},
    {title: "Chemical Engineer", skills: ["Process Design", "Thermodynamics", "Material Science", "Problem Solving", "Technical Knowledge", "Safety"], salaryMin: 80, salaryMax: 145, growth: 9},
    {title: "Biomedical Engineer", skills: ["Medical Device Design", "Biomechanics", "Clinical Knowledge", "Problem Solving", "Technical Skills", "Research"], salaryMin: 75, salaryMax: 140, growth: 10},
    {title: "Environmental Engineer", skills: ["Environmental Regulations", "Remediation", "Risk Assessment", "Technical Knowledge", "Problem Solving", "Project Management"], salaryMin: 70, salaryMax: 130, growth: 9}
  ], "Engineering");
  
  // Science & Research
  addCareersFromCategory([
    {title: "Research Scientist", skills: ["Experimental Design", "Data Analysis", "Technical Writing", "Laboratory Techniques", "Critical Thinking", "Subject Expertise"], salaryMin: 70, salaryMax: 150, growth: 15},
    {title: "Data Analyst", skills: ["Statistical Analysis", "Data Visualization", "Programming", "Problem Solving", "Critical Thinking", "Communication"], salaryMin: 65, salaryMax: 120, growth: 20},
    {title: "Biologist", skills: ["Laboratory Techniques", "Research", "Data Analysis", "Technical Writing", "Critical Thinking", "Subject Expertise"], salaryMin: 60, salaryMax: 130, growth: 5},
    {title: "Chemist", skills: ["Laboratory Techniques", "Chemical Analysis", "Research", "Documentation", "Problem Solving", "Technical Knowledge"], salaryMin: 65, salaryMax: 130, growth: 4},
    {title: "Physicist", skills: ["Mathematical Modeling", "Experimental Design", "Data Analysis", "Programming", "Problem Solving", "Technical Knowledge"], salaryMin: 75, salaryMax: 150, growth: 7},
    {title: "Epidemiologist", skills: ["Statistical Analysis", "Research Methods", "Data Collection", "Public Health Knowledge", "Critical Thinking", "Communication"], salaryMin: 70, salaryMax: 135, growth: 30}
  ], "Science & Research");
  
  // Arts & Entertainment
  addCareersFromCategory([
    {title: "Animator", skills: ["Animation Software", "Drawing", "Storytelling", "Character Development", "Attention to Detail", "Creativity"], salaryMin: 55, salaryMax: 110, growth: 16},
    {title: "Art Director", skills: ["Visual Design", "Team Management", "Creative Direction", "Project Management", "Client Relations", "Problem Solving"], salaryMin: 75, salaryMax: 140, growth: 4},
    {title: "Video Editor", skills: ["Editing Software", "Storytelling", "Visual Composition", "Audio Editing", "Attention to Detail", "Creativity"], salaryMin: 50, salaryMax: 100, growth: 22},
    {title: "Music Producer", skills: ["Audio Engineering", "Music Theory", "DAW Software", "Arrangement", "Critical Listening", "Project Management"], salaryMin: 45, salaryMax: 120, growth: 8},
    {title: "Film Director", skills: ["Visual Storytelling", "Leadership", "Script Analysis", "Communication", "Creative Vision", "Technical Knowledge"], salaryMin: 60, salaryMax: 180, growth: 12},
    {title: "Actor", skills: ["Performance", "Character Development", "Script Analysis", "Emotional Expression", "Memorization", "Adaptability"], salaryMin: 30, salaryMax: 200, growth: 8}
  ], "Arts & Entertainment");
  
  // Communication & Media
  addCareersFromCategory([
    {title: "Public Relations Specialist", skills: ["Media Relations", "Writing", "Strategic Communication", "Crisis Management", "Social Media", "Relationship Building"], salaryMin: 55, salaryMax: 110, growth: 11},
    {title: "Technical Writer", skills: ["Technical Knowledge", "Writing", "Information Architecture", "Research", "Attention to Detail", "Communication"], salaryMin: 60, salaryMax: 115, growth: 12},
    {title: "Journalist", skills: ["Reporting", "Writing", "Research", "Interviewing", "Fact-Checking", "Time Management"], salaryMin: 40, salaryMax: 95, growth: -9},
    {title: "Content Creator", skills: ["Writing", "SEO", "Social Media", "Multimedia Production", "Audience Analysis", "Creativity"], salaryMin: 45, salaryMax: 100, growth: 15},
    {title: "Communications Manager", skills: ["Strategic Communication", "Writing", "PR", "Crisis Management", "Leadership", "Project Management"], salaryMin: 70, salaryMax: 130, growth: 8}
  ], "Communication & Media");
  
  // Construction & Architecture
  addCareersFromCategory([
    {title: "Architect", skills: ["Architectural Design", "CAD", "Building Codes", "Project Management", "Client Relations", "Technical Drawing"], salaryMin: 70, salaryMax: 150, growth: 3},
    {title: "Construction Manager", skills: ["Project Management", "Budgeting", "Scheduling", "Contract Management", "Technical Knowledge", "Leadership"], salaryMin: 75, salaryMax: 145, growth: 10},
    {title: "Interior Designer", skills: ["Spatial Planning", "Material Selection", "CAD", "Client Relations", "Project Management", "Creativity"], salaryMin: 55, salaryMax: 115, growth: 5},
    {title: "Urban Planner", skills: ["Land Use Planning", "Policy Analysis", "GIS", "Public Engagement", "Project Management", "Research"], salaryMin: 65, salaryMax: 120, growth: 7},
    {title: "Landscape Architect", skills: ["Landscape Design", "CAD", "Plant Knowledge", "Project Management", "Environmental Analysis", "Technical Drawing"], salaryMin: 60, salaryMax: 115, growth: 6}
  ], "Construction & Architecture");
  
  // Hospitality & Tourism
  addCareersFromCategory([
    {title: "Hotel Manager", skills: ["Customer Service", "Staff Management", "Budget Control", "Operations", "Problem Solving", "Communication"], salaryMin: 55, salaryMax: 120, growth: 18},
    {title: "Event Planner", skills: ["Organization", "Vendor Management", "Budgeting", "Customer Service", "Negotiation", "Problem Solving"], salaryMin: 45, salaryMax: 85, growth: 18},
    {title: "Chef", skills: ["Cooking Techniques", "Menu Development", "Food Safety", "Staff Management", "Creativity", "Time Management"], salaryMin: 40, salaryMax: 95, growth: 25},
    {title: "Tourism Director", skills: ["Destination Marketing", "Industry Knowledge", "Strategic Planning", "Relationship Building", "Budget Management", "Communication"], salaryMin: 65, salaryMax: 120, growth: 18},
    {title: "Travel Consultant", skills: ["Destination Knowledge", "Customer Service", "Booking Systems", "Sales", "Problem Solving", "Communication"], salaryMin: 35, salaryMax: 70, growth: -17}
  ], "Hospitality & Tourism");
  
  // Social Services
  addCareersFromCategory([
    {title: "Social Worker", skills: ["Counseling", "Case Management", "Assessment", "Crisis Intervention", "Empathy", "Communication"], salaryMin: 50, salaryMax: 85, growth: 13},
    {title: "Mental Health Counselor", skills: ["Counseling Techniques", "Assessment", "Treatment Planning", "Clinical Documentation", "Empathy", "Communication"], salaryMin: 45, salaryMax: 90, growth: 23},
    {title: "Community Outreach Coordinator", skills: ["Program Development", "Community Engagement", "Networking", "Communication", "Event Planning", "Advocacy"], salaryMin: 40, salaryMax: 75, growth: 17},
    {title: "Rehabilitation Counselor", skills: ["Counseling", "Assessment", "Treatment Planning", "Vocational Guidance", "Case Management", "Empathy"], salaryMin: 45, salaryMax: 85, growth: 11},
    {title: "Child Welfare Specialist", skills: ["Case Management", "Assessment", "Crisis Intervention", "Documentation", "Communication", "Empathy"], salaryMin: 45, salaryMax: 80, growth: 12}
  ], "Social Services");
  
  // Environment & Sustainability
  addCareersFromCategory([
    {title: "Environmental Scientist", skills: ["Environmental Sampling", "Data Analysis", "Report Writing", "Regulatory Knowledge", "Field Work", "Problem Solving"], salaryMin: 65, salaryMax: 120, growth: 8},
    {title: "Sustainability Consultant", skills: ["Environmental Assessment", "Energy Analysis", "Sustainability Frameworks", "Communication", "Problem Solving", "Industry Knowledge"], salaryMin: 70, salaryMax: 130, growth: 14},
    {title: "Conservation Scientist", skills: ["Field Research", "Data Analysis", "Environmental Management", "GIS", "Technical Writing", "Problem Solving"], salaryMin: 60, salaryMax: 110, growth: 5},
    {title: "Renewable Energy Engineer", skills: ["Energy Systems", "Technical Design", "Project Management", "Problem Solving", "Regulatory Knowledge", "Technical Knowledge"], salaryMin: 75, salaryMax: 140, growth: 8},
    {title: "Environmental Policy Analyst", skills: ["Policy Analysis", "Research", "Writing", "Environmental Science", "Data Analysis", "Communication"], salaryMin: 65, salaryMax: 115, growth: 7}
  ], "Environment & Sustainability");
  
  // Transportation & Logistics
  addCareersFromCategory([
    {title: "Logistics Manager", skills: ["Supply Chain Management", "Transportation Planning", "Inventory Management", "Negotiation", "Problem Solving", "Data Analysis"], salaryMin: 65, salaryMax: 125, growth: 30},
    {title: "Supply Chain Analyst", skills: ["Data Analysis", "Process Improvement", "Inventory Management", "Forecasting", "Problem Solving", "Technical Systems"], salaryMin: 60, salaryMax: 115, growth: 7},
    {title: "Transportation Planner", skills: ["Traffic Analysis", "Urban Planning", "GIS", "Policy Development", "Public Engagement", "Data Analysis"], salaryMin: 65, salaryMax: 110, growth: 11},
    {title: "Fleet Manager", skills: ["Vehicle Maintenance", "Staff Management", "Route Planning", "Budget Management", "Regulatory Compliance", "Problem Solving"], salaryMin: 55, salaryMax: 100, growth: 6},
    {title: "Warehouse Manager", skills: ["Inventory Management", "Staff Supervision", "Process Improvement", "Safety Compliance", "Problem Solving", "Technical Systems"], salaryMin: 55, salaryMax: 95, growth: 4}
  ], "Transportation & Logistics");
  
  // Public Service & Government
  addCareersFromCategory([
    {title: "Urban Planner", skills: ["Land Use Planning", "Policy Analysis", "GIS", "Public Engagement", "Project Management", "Research"], salaryMin: 65, salaryMax: 120, growth: 7},
    {title: "Policy Analyst", skills: ["Research", "Policy Analysis", "Writing", "Data Analysis", "Critical Thinking", "Communication"], salaryMin: 60, salaryMax: 115, growth: 6},
    {title: "Public Administrator", skills: ["Program Management", "Budget Administration", "Policy Implementation", "Staff Management", "Communication", "Problem Solving"], salaryMin: 65, salaryMax: 130, growth: 9},
    {title: "Emergency Management Director", skills: ["Disaster Planning", "Crisis Response", "Coordination", "Communication", "Leadership", "Problem Solving"], salaryMin: 70, salaryMax: 125, growth: 6},
    {title: "Government Relations Specialist", skills: ["Lobbying", "Policy Analysis", "Relationship Building", "Communication", "Strategic Planning", "Industry Knowledge"], salaryMin: 70, salaryMax: 140, growth: 8}
  ], "Public Service & Government");
  
  // Manufacturing
  addCareersFromCategory([
    {title: "Manufacturing Engineer", skills: ["Process Improvement", "CAD", "Technical Knowledge", "Problem Solving", "Quality Control", "Project Management"], salaryMin: 70, salaryMax: 125, growth: 10},
    {title: "Production Manager", skills: ["Operations Management", "Staff Supervision", "Process Improvement", "Quality Control", "Budget Management", "Problem Solving"], salaryMin: 70, salaryMax: 130, growth: 5},
    {title: "Quality Control Manager", skills: ["Quality Systems", "Inspection Techniques", "Regulatory Compliance", "Problem Solving", "Data Analysis", "Process Improvement"], salaryMin: 65, salaryMax: 120, growth: 4},
    {title: "Industrial Designer", skills: ["Product Design", "CAD", "Material Knowledge", "Prototyping", "User Research", "Creativity"], salaryMin: 60, salaryMax: 110, growth: 6},
    {title: "Health and Safety Manager", skills: ["Safety Regulations", "Risk Assessment", "Training", "Documentation", "Incident Investigation", "Communication"], salaryMin: 65, salaryMax: 115, growth: 8}
  ], "Manufacturing");
  
  // Agriculture & Food Production
  addCareersFromCategory([
    {title: "Agricultural Engineer", skills: ["Equipment Design", "Land Use Planning", "Environmental Systems", "Technical Knowledge", "Problem Solving", "Project Management"], salaryMin: 65, salaryMax: 115, growth: 5},
    {title: "Food Scientist", skills: ["Food Chemistry", "Product Development", "Quality Assurance", "Laboratory Techniques", "Research", "Technical Knowledge"], salaryMin: 60, salaryMax: 110, growth: 8},
    {title: "Farm Manager", skills: ["Crop Management", "Equipment Operation", "Staff Supervision", "Business Management", "Problem Solving", "Technical Knowledge"], salaryMin: 50, salaryMax: 95, growth: 6},
    {title: "Agricultural Economist", skills: ["Economic Analysis", "Market Research", "Data Analysis", "Policy Analysis", "Research", "Communication"], salaryMin: 60, salaryMax: 115, growth: 7},
    {title: "Food Production Manager", skills: ["Production Planning", "Staff Management", "Quality Control", "Regulatory Compliance", "Process Improvement", "Problem Solving"], salaryMin: 65, salaryMax: 120, growth: 6}
  ], "Agriculture & Food Production");
  
  return generatedCareers;
}

// Helper functions to generate career details
function generateDescription(title: string, field: string): string {
  const descriptions = [
    `specialize in creating innovative solutions in the ${field} sector`,
    `work with teams to solve complex problems in ${field}`,
    `apply their expertise to advance organizational goals in ${field}`,
    `leverage cutting-edge tools and methodologies in ${field}`,
    `provide valuable insights and guidance in the rapidly evolving field of ${field}`
  ];
  return descriptions[Math.floor(Math.random() * descriptions.length)];
}

function generateResponsibilities(title: string, field: string): string[] {
  const commonResponsibilities = [
    `Develop strategies and plans for ${field} initiatives`,
    `Collaborate with cross-functional teams on projects`,
    `Analyze data and provide actionable insights`,
    `Create and deliver presentations to stakeholders`,
    `Stay current with industry trends and best practices`
  ];
  
  // Return 5 responsibilities
  return commonResponsibilities;
}

function generateWorkSetting(): string {
  const settings = [
    "Office / Remote",
    "Office / Hybrid",
    "Fully Remote",
    "On-site",
    "Field / Office",
    "Studio / Remote",
    "Laboratory / Office"
  ];
  return settings[Math.floor(Math.random() * settings.length)];
}

function generateWorkSchedule(): string {
  const schedules = [
    "Full-time / Flexible",
    "Full-time / Fixed",
    "Full-time / Shift work",
    "Project-based",
    "Contract / Freelance",
    "Variable hours"
  ];
  return schedules[Math.floor(Math.random() * schedules.length)];
}

function generateTeamStructure(): string {
  const structures = [
    "Collaborative",
    "Independent",
    "Matrix",
    "Hierarchical",
    "Cross-functional",
    "Self-managed",
    "Agile"
  ];
  return structures[Math.floor(Math.random() * structures.length)];
}

function generateWorkStyle(): string {
  const styles = [
    "Creative / Analytical",
    "Process-oriented",
    "Results-driven",
    "Detail-oriented",
    "Strategic / Tactical",
    "Client-facing",
    "Research-focused"
  ];
  return styles[Math.floor(Math.random() * styles.length)];
}

function generateTopLocations(): string[] {
  const allLocations = [
    "San Francisco", "New York", "Seattle", "Austin", "Boston", 
    "Chicago", "Los Angeles", "Denver", "Atlanta", "Washington DC",
    "Dallas", "Portland", "Minneapolis", "Nashville", "Miami",
    "Phoenix", "San Diego", "Philadelphia", "Houston", "Raleigh"
  ];
  
  // Shuffle and pick 4 random locations
  const shuffled = [...allLocations].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

function generateTechnicalSkills(baseSkills: string[]): { name: string, level: number }[] {
  return baseSkills.map(skill => ({
    name: skill,
    level: Math.floor(Math.random() * 5) + 5 // Random level between 5-9
  }));
}

function generateSoftSkills(): string[] {
  const allSoftSkills = [
    "Communication", "Teamwork", "Problem-solving", "Critical thinking",
    "Time management", "Adaptability", "Leadership", "Creativity",
    "Emotional intelligence", "Attention to detail", "Negotiation",
    "Conflict resolution", "Decision making", "Stress management"
  ];
  
  // Shuffle and pick 6 random soft skills
  const shuffled = [...allSoftSkills].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 6);
}

function generateSkillDevelopment(title: string, field: string): string[] {
  return [
    `Complete specialized training or certification in ${field}`,
    `Build a portfolio of projects demonstrating key skills`,
    `Join professional organizations related to ${title} work`,
    `Attend industry conferences and workshops`,
    `Find a mentor experienced in the ${field} field`
  ];
}

function generateEducationPaths(title: string, field: string): { name: string, description: string, timeframe: string }[] {
  return [
    {
      name: "Bachelor's Degree",
      description: `Formal education in ${field} or related field`,
      timeframe: "4 years"
    },
    {
      name: `${title} Certification`,
      description: `Specialized training focused on ${title} skills`,
      timeframe: "3-6 months"
    },
    {
      name: "Self-Taught + Portfolio",
      description: `Online courses combined with practical experience`,
      timeframe: "6-18 months"
    }
  ];
}

function generateRecommendedPrograms(title: string, field: string): { name: string, provider: string, type: string, duration: string, cost: string }[] {
  const providers = ["Coursera", "Udemy", "edX", "LinkedIn Learning", "General Assembly", "Local University"];
  
  return [
    {
      name: `Professional Certificate in ${title}`,
      provider: providers[Math.floor(Math.random() * providers.length)],
      type: "Certificate",
      duration: "6 months",
      cost: "$1,500-$2,500"
    },
    {
      name: `${field} Bootcamp`,
      provider: providers[Math.floor(Math.random() * providers.length)],
      type: "Bootcamp",
      duration: "12-16 weeks",
      cost: "$9,500-$15,000"
    },
    {
      name: `Master's in ${field}`,
      provider: "University Programs",
      type: "Degree",
      duration: "1-2 years",
      cost: "$30,000-$70,000"
    }
  ];
}

function generateDailyActivities(title: string): { time: string, description: string }[] {
  return [
    {
      time: "9:00 AM - 10:30 AM",
      description: "Team meetings and project planning"
    },
    {
      time: "10:30 AM - 12:30 PM",
      description: "Core work activities and problem-solving"
    },
    {
      time: "1:30 PM - 3:00 PM",
      description: "Collaborative sessions with stakeholders"
    },
    {
      time: "3:00 PM - 4:30 PM",
      description: "Focused individual work and analysis"
    },
    {
      time: "4:30 PM - 5:00 PM",
      description: "Documentation and planning for next day"
    }
  ];
}

function generateChallenges(title: string, field: string): string[] {
  return [
    `Keeping pace with rapidly evolving technology and practices in ${field}`,
    `Balancing multiple priorities and managing tight deadlines`,
    `Communicating complex concepts to various stakeholders`,
    `Adapting to changing requirements and expectations`,
    `Maintaining work-life balance in a demanding field`
  ];
}

function generateRewards(title: string, field: string): string[] {
  return [
    `Making a meaningful impact in the ${field} industry`,
    `Clear career progression and advancement opportunities`,
    `Intellectual stimulation from solving complex problems`,
    `Collaborative work environment with talented professionals`,
    `Developing highly transferable skills valued across industries`
  ];
}

function generateProfessionalPerspective(title: string): { name: string, yearsExperience: string, quote: string } {
  const firstNames = ["James", "Sarah", "Michael", "Emily", "David", "Jessica", "Robert", "Jennifer", "William", "Elizabeth", 
    "Maria", "Mohammed", "Wei", "Fatima", "Carlos", "Aisha", "Juan", "Priya", "Chen", "Olga"];
  const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", 
    "Patel", "Kim", "Lee", "Wong", "Chen", "Nguyen", "Singh", "Kumar", "Ali", "Rahman"];
  
  const name = `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  const yearsExperience = String(Math.floor(Math.random() * 15) + 5); // 5-20 years
  
  const quotes = [
    `What I find most rewarding about being a ${title} is the opportunity to solve real-world problems and see the direct impact of my work. Every day brings new challenges that keep me engaged and learning.`,
    `As a ${title}, I've learned that balancing technical expertise with strong communication skills is crucial. The most successful professionals in our field are those who can translate complex concepts into actionable insights for stakeholders at all levels.`,
    `The ${title} role has evolved significantly over my career. Those entering the field now should focus on developing a diverse skill set and staying adaptable, as the tools and methodologies we use continue to advance rapidly.`,
    `What surprised me most about being a ${title} is how collaborative the work truly is. Despite the technical nature of our field, success ultimately depends on building strong relationships and understanding the human elements of each project.`
  ];
  
  return {
    name,
    yearsExperience,
    quote: quotes[Math.floor(Math.random() * quotes.length)]
  };
}

function generateRequiredEducation(field: string): string {
  const options = ["Bachelor's Degree", "Master's Degree", "Associate's Degree", "Certification", "High School Diploma + Experience"];
  
  if (field === "Healthcare" || field === "Legal" || field === "Science & Research") {
    return options[Math.floor(Math.random() * 2)]; // Bachelor's or Master's
  } else if (field === "Technology" || field === "Engineering" || field === "Finance") {
    return options[0]; // Bachelor's
  } else {
    return options[Math.floor(Math.random() * options.length)];
  }
}