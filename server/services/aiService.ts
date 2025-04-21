import { AIMessage } from "@/types";
import OpenAI from "openai";

// Initialize OpenAI client with the API key
const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

// Helper function to get human-readable info from quiz answers
function getQuizInfoFromAnswer(questionId: number, answerId: string): string {
  // Default response if answer is not found
  if (!answerId) return "No preference specified";
  
  const questionMapping: Record<number, Record<string, string>> = {
    1: { // Work environment preferences
      'a': "Corporate Office",
      'b': "Remote Work",
      'c': "Outdoors",
      'd': "Creative Studio"
    },
    2: { // Skills preferences
      'a': "Analytical Thinking",
      'b': "Creativity",
      'c': "Communication",
      'd': "Technical Skills"
    },
    3: { // Career priorities
      'a': "Work-Life Balance",
      'b': "High Income",
      'c': "Making an Impact",
      'd': "Career Growth"
    },
    4: { // Learning style
      'a': "Formal Education",
      'b': "Self-Directed Learning",
      'c': "Hands-on Experience",
      'd': "Mentorship"
    },
    5: { // Problem-solving preference
      'a': "Technical Challenges",
      'b': "Creative Challenges",
      'c': "People Challenges",
      'd': "Business Challenges"
    }
  };
  
  return questionMapping[questionId]?.[answerId] || "Preference not specified";
}

interface AIContext {
  conversationHistory: AIMessage[];
  quizResults?: Record<string, any>;
  likedCareers?: number[];
  careerContext?: {
    id: number;
    title: string;
    field: string;
  } | null;
}

/**
 * Generates a response from the AI assistant based on the user message and context
 */
export async function generateAIResponse(
  message: string,
  context: AIContext
): Promise<string> {
  try {
    // Build the chat history for context
    let systemPrompt = `You are a helpful career advisor assistant for CareerCanvas, a platform that helps users explore different career paths.
        Be friendly, informative, and concise. Focus on providing accurate career information and personalized advice.
        If asked about a specific career, provide insights about skills needed, education requirements, work-life balance, 
        job market outlook, and salary expectations.`;
    
    // Add personalized context from quiz results if available
    if (context.quizResults && Object.keys(context.quizResults).length > 0) {
      const quizAnswers = context.quizResults.answers || {};
      
      systemPrompt += `
        
        This user has completed our career assessment quiz with these results:
        - Work environment preference: ${getQuizInfoFromAnswer(1, quizAnswers[1])}
        - Skill preference: ${getQuizInfoFromAnswer(2, quizAnswers[2])}
        - Career priorities: ${getQuizInfoFromAnswer(3, quizAnswers[3])}
        - Learning style: ${getQuizInfoFromAnswer(4, quizAnswers[4])}
        - Problem-solving preference: ${getQuizInfoFromAnswer(5, quizAnswers[5])}
        
        When giving advice, consider these preferences and tailor your suggestions accordingly.`;
    }
    
    // Add information about careers the user has liked
    if (context.likedCareers && context.likedCareers.length > 0) {
      systemPrompt += `
        
        The user has shown interest in careers with these IDs: ${context.likedCareers.join(', ')}.
        Consider these interests when making recommendations.`;
    }
    
    // Add specific career context if provided (for CareerInsightAI component)
    if (context.careerContext) {
      systemPrompt += `
      
        The user is currently exploring the career: ${context.careerContext.title} in the field of ${context.careerContext.field}.
        Please provide specific, detailed information about this career path when answering questions.
        Focus particularly on educational requirements, day-to-day responsibilities, skills needed, 
        advancement opportunities, salary expectations, and industry trends for this specific role.`;
    }
    
    const messages = [
      {
        role: "system",
        content: systemPrompt
      }
    ];
    
    // Add conversation history
    if (context.conversationHistory && context.conversationHistory.length > 0) {
      context.conversationHistory.forEach(msg => {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.content
        });
      });
    }
    
    // Add user's current message
    messages.push({ role: "user", content: message });
    
    // Call the OpenAI API
    // the newest OpenAI model is "gpt-4o" which was released May 13, 2024. do not change this unless explicitly requested by the user
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages.map(msg => ({
        role: msg.role === "system" ? "system" : msg.role === "user" ? "user" : "assistant",
        content: msg.content
      })) as any[],
      temperature: 0.7,
      max_tokens: 500
    });
    
    return response.choices[0].message.content || getGenericResponse();
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    
    // Fall back to keyword-based responses if API call fails
    const lowerMessage = message.toLowerCase();
    
    // Get a relevant response based on keywords
    if (lowerMessage.includes("skill") || lowerMessage.includes("learn")) {
      return getSkillsResponse(lowerMessage);
    } else if (lowerMessage.includes("salary") || lowerMessage.includes("pay") || lowerMessage.includes("money")) {
      return getSalaryResponse(lowerMessage);
    } else if (lowerMessage.includes("education") || lowerMessage.includes("degree") || lowerMessage.includes("school")) {
      return getEducationResponse(lowerMessage);
    } else if (lowerMessage.includes("transition") || lowerMessage.includes("change career")) {
      return getCareerTransitionResponse(lowerMessage);
    } else if (lowerMessage.includes("work life") || lowerMessage.includes("balance")) {
      return getWorkLifeBalanceResponse();
    } else if (lowerMessage.includes("best city") || lowerMessage.includes("location") || lowerMessage.includes("where to work")) {
      return getBestLocationResponse(lowerMessage);
    } else {
      return getGenericResponse();
    }
  }
}

function getSkillsResponse(message: string): string {
  if (message.includes("ux") || message.includes("design")) {
    return "Based on current industry trends and your quiz results, I'd recommend focusing on these key UX design skills:\n\n" +
      "1. User research methods (interviews, surveys, usability testing)\n" +
      "2. Wireframing and prototyping (using Figma or Adobe XD)\n" +
      "3. Information architecture and user flows\n" +
      "4. Visual design fundamentals (typography, color theory, layout)\n" +
      "5. Interaction design patterns\n\n" +
      "To develop these skills, consider courses on platforms like Coursera, Udemy, or specialized UX bootcamps. Many successful UX designers also recommend building a portfolio of projects, even if they're self-initiated, to showcase your skills to potential employers.";
  } else if (message.includes("software") || message.includes("develop") || message.includes("coding")) {
    return "For software development, here are the most valuable skills to focus on based on your profile:\n\n" +
      "1. Programming fundamentals in languages like JavaScript, Python, or Java\n" +
      "2. Data structures and algorithms for problem-solving\n" +
      "3. Version control systems (Git)\n" +
      "4. Modern frameworks relevant to your interest area (React, Node.js, Django, etc.)\n" +
      "5. Database design and management\n" +
      "6. Testing methodologies\n\n" +
      "The best approach is to build projects that interest you while learning these skills. Platforms like GitHub, LeetCode, and HackerRank can help you practice and showcase your abilities.";
  } else if (message.includes("data") || message.includes("analytic")) {
    return "For a career in data science or analytics, I recommend developing these key skills:\n\n" +
      "1. Statistical analysis and applied mathematics\n" +
      "2. Programming in Python or R with data libraries (pandas, numpy, scikit-learn)\n" +
      "3. Data visualization (Tableau, PowerBI, or matplotlib)\n" +
      "4. SQL for database querying\n" +
      "5. Machine learning fundamentals\n" +
      "6. Domain knowledge in your industry of interest\n\n" +
      "Start with online courses from platforms like DataCamp, Kaggle competitions, and creating your own data analysis projects to build a portfolio.";
  } else {
    return "Based on your interests, I recommend focusing on developing these core skills:\n\n" +
      "1. Technical skills specific to your field of interest\n" +
      "2. Communication and presentation abilities\n" +
      "3. Problem-solving and critical thinking\n" +
      "4. Collaboration and teamwork\n" +
      "5. Time management and organization\n\n" +
      "In addition to these core skills, stay updated with the latest trends and technologies in your field through online courses, webinars, and industry publications. Would you like more specific recommendations for a particular career path?";
  }
}

function getSalaryResponse(message: string): string {
  if (message.includes("software") || message.includes("developer")) {
    return "Software developers earn competitive salaries that vary by location, experience, and specialization. Here's a breakdown:\n\n" +
      "• Entry-level (0-2 years): $70,000 - $90,000\n" +
      "• Mid-level (3-5 years): $90,000 - $120,000\n" +
      "• Senior (6-10 years): $120,000 - $150,000\n" +
      "• Lead/Principal (10+ years): $150,000 - $200,000+\n\n" +
      "Specializations like machine learning, cloud architecture, or cybersecurity can command premium salaries. Tech hubs like San Francisco, Seattle, and New York offer higher compensation, but also have higher costs of living.";
  } else if (message.includes("data") || message.includes("scientist")) {
    return "Data Scientists are in high demand, with salaries reflecting their specialized skill set:\n\n" +
      "• Entry-level: $85,000 - $105,000\n" +
      "• Mid-level: $105,000 - $135,000\n" +
      "• Senior: $135,000 - $165,000\n" +
      "• Principal/Director: $165,000 - $250,000+\n\n" +
      "Companies in finance, technology, and healthcare often pay premium rates. Data scientists with domain expertise in specific industries can command higher salaries, as can those with strong machine learning engineering skills.";
  } else if (message.includes("ux") || message.includes("design")) {
    return "UX/UI Designers earn competitive salaries that have been rising with increased demand:\n\n" +
      "• Junior Designer: $60,000 - $80,000\n" +
      "• Mid-level Designer: $80,000 - $110,000\n" +
      "• Senior Designer: $110,000 - $140,000\n" +
      "• Lead/Director: $140,000 - $180,000+\n\n" +
      "Tech companies and product-focused organizations typically offer higher compensation. UX researchers may earn slightly more than UI-focused designers in some markets. Specialized skills in interaction design, motion design, or design systems can lead to higher compensation.";
  } else {
    return "Salaries vary widely across industries and roles, but here are some general ranges for popular career paths:\n\n" +
      "• Technology: $70,000 - $200,000+\n" +
      "• Healthcare: $60,000 - $300,000+\n" +
      "• Finance: $65,000 - $250,000+\n" +
      "• Marketing: $50,000 - $150,000+\n" +
      "• Education: $45,000 - $100,000+\n\n" +
      "Factors that influence salary include your location, years of experience, education level, specialized skills, and the size of the company. Would you like more specific salary information about a particular career?";
  }
}

function getEducationResponse(message: string): string {
  if (message.includes("ux") || message.includes("design")) {
    return "For UX/UI design careers, formal degrees aren't always necessary, but education paths can include:\n\n" +
      "1. Bachelor's degrees in Design, HCI, Psychology, or related fields\n" +
      "2. Specialized UX/UI bootcamps (like General Assembly, Designlab, or Springboard)\n" +
      "3. Online certificate programs through platforms like Coursera or Interaction Design Foundation\n" +
      "4. Self-directed learning combined with a strong portfolio\n\n" +
      "Many successful designers have diverse educational backgrounds. What truly matters is building a strong portfolio demonstrating your design process and problem-solving skills. Consider supplementing any education with networking and mentorship opportunities.";
  } else if (message.includes("data") || message.includes("science")) {
    return "For data science careers, education options include:\n\n" +
      "1. Bachelor's or Master's degrees in Computer Science, Statistics, Mathematics, or Data Science\n" +
      "2. Specialized data science bootcamps (like Metis, Flatiron School, or Lambda School)\n" +
      "3. Online specialization programs through Coursera, edX, or similar platforms\n" +
      "4. Self-directed learning combined with practical projects\n\n" +
      "While advanced degrees are common in data science, many professionals have demonstrated that project-based learning and practical experience can be equally valuable. Focus on building a portfolio of data projects that showcase your technical skills and analytical thinking.";
  } else if (message.includes("software") || message.includes("develop")) {
    return "For software development careers, education paths include:\n\n" +
      "1. Bachelor's degrees in Computer Science, Software Engineering, or related fields\n" +
      "2. Coding bootcamps (like App Academy, Hack Reactor, or Fullstack Academy)\n" +
      "3. Online learning platforms (Udemy, Pluralsight, freeCodeCamp)\n" +
      "4. Self-directed learning with personal projects\n\n" +
      "The tech industry has become increasingly open to non-traditional education paths. Many successful developers are self-taught or bootcamp graduates. What's most important is demonstrating your coding abilities through projects, contributions to open source, and solving technical challenges.";
  } else {
    return "Education requirements vary widely between careers, but here are the common pathways:\n\n" +
      "1. Traditional university degrees (associate's, bachelor's, master's, doctoral)\n" +
      "2. Vocational or technical training programs\n" +
      "3. Industry-specific certifications\n" +
      "4. Bootcamps and intensive training programs\n" +
      "5. Self-directed learning and experience\n\n" +
      "Many fields are placing increasing value on skills and experience rather than formal education. Consider what specific career you're interested in, and I can provide more tailored advice about the education requirements and alternative pathways available.";
  }
}

function getCareerTransitionResponse(message: string): string {
  if (message.includes("marketing") && message.includes("product")) {
    return "Transitioning from marketing to product management is a natural shift since both roles focus on understanding customer needs. Here's a strategic approach:\n\n" +
      "1. Leverage your marketing experience in understanding customers and markets\n" +
      "2. Develop technical knowledge through courses on product management (like those from Product School)\n" +
      "3. Build analytical skills with data tools like SQL, Excel, and product analytics platforms\n" +
      "4. Shadow product managers or take on product-related projects in your current role\n" +
      "5. Consider a transitional role like Product Marketing Manager\n\n" +
      "Focus on telling your story about why your marketing background makes you well-suited for product management. Many successful PMs come from marketing because they understand how to position products effectively.";
  } else if (message.includes("teacher") || message.includes("education")) {
    return "Transitioning from education to another field lets you leverage valuable transferable skills:\n\n" +
      "1. Communication and presentation (great for roles in training, sales, or content creation)\n" +
      "2. Organization and planning (valuable in project management)\n" +
      "3. Coaching and developing others (applicable in HR or management)\n" +
      "4. Curriculum design (useful in instructional design or L&D roles)\n\n" +
      "Consider roles in corporate training, educational technology companies, instructional design, or content creation. Many former educators also excel in customer success roles where they can continue to help others learn and grow. Would you like specific guidance on a particular transition path?";
  } else {
    return "Career transitions are becoming increasingly common. Here's a general framework for making a successful change:\n\n" +
      "1. Identify transferable skills from your current role\n" +
      "2. Find the skill gaps and develop a learning plan\n" +
      "3. Build a portfolio of relevant projects (even if they're self-initiated)\n" +
      "4. Network with professionals in your target field\n" +
      "5. Consider transitional roles that bridge your current and desired careers\n" +
      "6. Reframe your resume to highlight relevant experience\n\n" +
      "Most importantly, craft a compelling narrative about why you're making the change and how your unique background brings value. Would you like more specific guidance about transitioning to a particular field?";
  }
}

function getWorkLifeBalanceResponse(): string {
  return "Work-life balance varies significantly across careers and companies. Here's how various fields typically compare:\n\n" +
    "**Better Work-Life Balance (typically):**\n" +
    "• Government and public sector roles\n" +
    "• Many corporate roles with established companies\n" +
    "• Technology companies with flexible work policies\n" +
    "• Education (outside of grading periods)\n" +
    "• Some healthcare administration roles\n\n" +
    
    "**More Challenging Work-Life Balance (often):**\n" +
    "• Investment banking and finance\n" +
    "• Law (especially at large firms)\n" +
    "• Healthcare (clinical roles)\n" +
    "• Startup environments\n" +
    "• Consulting with heavy travel\n\n" +
    
    "Remember that individual companies and teams within these fields can vary dramatically. When interviewing, ask about typical hours, flexibility, and how the team handles busy periods. Also consider looking at company reviews on platforms like Glassdoor for insights about work-life balance from current and former employees.";
}

function getBestLocationResponse(message: string): string {
  if (message.includes("software") || message.includes("developer") || message.includes("tech")) {
    return "The best cities for software developers in 2023-2024 include:\n\n" +
      "1. **Austin, TX** - Growing tech hub with lower cost of living than Silicon Valley\n" +
      "2. **Seattle, WA** - Home to Amazon, Microsoft, and many startups\n" +
      "3. **Raleigh-Durham, NC** - Part of the Research Triangle with strong tech ecosystem\n" +
      "4. **Atlanta, GA** - Emerging tech hub with diverse opportunities\n" +
      "5. **Denver/Boulder, CO** - Growing tech scene with excellent quality of life\n\n" +
      
      "Other strong options include Boston, MA; Washington DC; Salt Lake City, UT; and Minneapolis, MN. Remote work has also expanded opportunities dramatically, allowing developers to live in more affordable areas while working for companies based anywhere.\n\n" +
      
      "When evaluating locations, consider: salary relative to cost of living, tech ecosystem strength, types of companies (startups vs. established), and lifestyle factors important to you.";
  } else if (message.includes("finance") || message.includes("banking")) {
    return "For finance and banking careers, these cities offer the strongest opportunities:\n\n" +
      "1. **New York City** - The financial capital with the highest concentration of opportunities\n" +
      "2. **Chicago** - Strong in trading, commodities, and financial services\n" +
      "3. **Boston** - Hub for asset management and fintech\n" +
      "4. **Charlotte, NC** - Major banking center with lower cost of living\n" +
      "5. **San Francisco** - Leader in fintech and venture capital\n\n" +
      
      "International hubs include London, Singapore, Hong Kong, Tokyo, and Frankfurt. Each specializes in different areas of finance and offers varying lifestyles. When choosing a location, consider specialization opportunities, career growth potential, and whether the city's culture aligns with your preferences.";
  } else {
    return "When considering the best locations for your career, evaluate these factors:\n\n" +
      "1. **Industry concentration** - Cities with a high concentration of companies in your field\n" +
      "2. **Salary to cost of living ratio** - Where your earnings will provide the best lifestyle\n" +
      "3. **Career growth opportunities** - Places with multiple potential employers for advancement\n" +
      "4. **Quality of life** - Factors like commute times, outdoor activities, and cultural offerings\n" +
      "5. **Remote work options** - Whether location flexibility is available in your field\n\n" +
      
      "Many careers are seeing geographic shifts. Healthcare opportunities are growing in the South and Southwest. Technology is expanding beyond Silicon Valley to places like Austin, Denver, and Raleigh. Creative industries are thriving in more affordable cities like Nashville, Portland, and Atlanta.\n\n" +
      
      "Would you like location recommendations for a specific career field?";
  }
}

function getGenericResponse(): string {
  const responses = [
    "I'd be happy to help with your career questions! Could you provide more details about what specific information you're looking for?",
    
    "Based on your career interests, I can provide insights on salary expectations, educational requirements, growth opportunities, and more. What specific aspects would you like to explore?",
    
    "I'm your CareerCanvas AI assistant, designed to help with all your career-related questions. What would you like to know about career paths, skills, education, or job markets?",
    
    "I can help you discover career opportunities that match your skills and interests. To provide more personalized guidance, could you share more about your background or what aspects of career exploration interest you most?",
    
    "I'm here to provide career guidance tailored to your needs. Would you like information about specific industries, job roles, educational pathways, or career transition strategies?"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
}
