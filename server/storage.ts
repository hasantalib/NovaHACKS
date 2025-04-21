import { 
  users, quizResults, conversations, careerElements,
  type User, type InsertUser, 
  type QuizResult, type InsertQuizResult, 
  type Conversation, type InsertConversation,
  type CareerElement, type InsertCareerElement
} from "@shared/schema";
import { getCareers, getCareerById } from "./data/careers";
import { Career } from "@/types";
import session from "express-session";
import { db, pool } from "./db";
import { eq, and, inArray, or, desc, sql } from "drizzle-orm";
import connectPg from "connect-pg-simple";
import createMemoryStore from "memorystore";

// Create session stores
const MemoryStore = createMemoryStore(session);
const PostgresSessionStore = connectPg(session);

// Define storage interface
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  
  // Quiz methods
  saveQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResultsByUserId(userId: number): Promise<QuizResult[]>;
  
  // Career methods
  getCareers(): Promise<Career[]>;
  getCareerById(id: number): Promise<Career | undefined>;
  getSavedCareers(userId: number): Promise<Career[]>;
  getLikedCareers(userId: number): Promise<Career[]>;
  getRelatedCareers(careerId: number, limit?: number): Promise<Career[]>;
  
  // Career elements methods
  likeCareerElement(element: InsertCareerElement): Promise<CareerElement>;
  unlikeCareerElement(userId: number, careerId: number, elementType: string, elementValue: string): Promise<boolean>;
  getLikedElements(userId: number): Promise<CareerElement[]>;
  getLikedElementsByType(userId: number, elementType: string): Promise<CareerElement[]>;
  getCareersByLikedElements(userId: number): Promise<Career[]>;
  
  // AI conversation methods
  createConversation(conversation: InsertConversation): Promise<Conversation>;
  getConversation(id: number): Promise<Conversation | undefined>;
  updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined>;
  getConversationsByUserId(userId: number): Promise<Conversation[]>;
  
  // Session store for auth
  sessionStore: any;
}

// Memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private quizResults: Map<number, QuizResult>;
  private conversations: Map<number, Conversation>;
  private careerElements: Map<number, CareerElement>;
  private userIdCounter: number;
  private quizResultIdCounter: number;
  private conversationIdCounter: number;
  private careerElementIdCounter: number;
  public sessionStore: any;

  constructor() {
    this.users = new Map();
    this.quizResults = new Map();
    this.conversations = new Map();
    this.careerElements = new Map();
    this.userIdCounter = 1;
    this.quizResultIdCounter = 1;
    this.conversationIdCounter = 1;
    this.careerElementIdCounter = 1;
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { 
      ...insertUser, 
      id,
      savedCareers: [],
      likedCareers: [],
      quizCompleted: false,
      createdAt: new Date(),
      name: insertUser.name || null,
      email: insertUser.email || null
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = await this.getUser(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Quiz methods
  async saveQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const id = this.quizResultIdCounter++;
    const quizResult: QuizResult = {
      ...result,
      id,
      timestamp: new Date(),
    };
    this.quizResults.set(id, quizResult);
    
    // Update user's quiz completion status
    const user = await this.getUser(result.userId);
    if (user) {
      await this.updateUser(user.id, { quizCompleted: true });
    }
    
    return quizResult;
  }

  async getQuizResultsByUserId(userId: number): Promise<QuizResult[]> {
    return Array.from(this.quizResults.values()).filter(
      (result) => result.userId === userId
    );
  }

  // Career methods
  async getCareers(): Promise<Career[]> {
    // Get careers from imported data
    return getCareers();
  }

  async getCareerById(id: number): Promise<Career | undefined> {
    // Get career by ID from imported data
    return getCareerById(id);
  }

  async getSavedCareers(userId: number): Promise<Career[]> {
    const user = await this.getUser(userId);
    if (!user || !user.savedCareers || user.savedCareers.length === 0) {
      return [];
    }
    
    const careers = await this.getCareers();
    return careers.filter(career => 
      user.savedCareers?.includes(career.id)
    ).map(career => ({
      ...career,
      isSaved: true
    }));
  }

  async getLikedCareers(userId: number): Promise<Career[]> {
    const user = await this.getUser(userId);
    if (!user || !user.likedCareers || user.likedCareers.length === 0) {
      return [];
    }
    
    const careers = await this.getCareers();
    return careers.filter(career => 
      user.likedCareers?.includes(career.id)
    ).map(career => ({
      ...career,
      isLiked: true
    }));
  }
  
  async getRelatedCareers(careerId: number, limit: number = 3): Promise<Career[]> {
    const career = await this.getCareerById(careerId);
    if (!career) return [];
    
    // Get all careers
    const allCareers = await this.getCareers();
    
    // Filter out the current career
    const otherCareers = allCareers.filter(c => c.id !== careerId);
    
    // Sort careers by relevance:
    // 1. Same field gets highest priority
    // 2. Similar skill sets get secondary priority
    // 3. Similar salary range gets tertiary priority
    return otherCareers
      .map(c => {
        let relevanceScore = 0;
        
        // Same field is a strong indicator
        if (c.field === career.field) {
          relevanceScore += 100;
        }
        
        // Skill overlap
        if (career.skills && c.skills) {
          const overlapCount = career.skills.filter(skill => 
            c.skills.includes(skill)
          ).length;
          relevanceScore += overlapCount * 20;
        }
        
        // Similar salary range
        const careerAvgSalary = (career.salaryMin + career.salaryMax) / 2;
        const cAvgSalary = (c.salaryMin + c.salaryMax) / 2;
        const salaryDiff = Math.abs(careerAvgSalary - cAvgSalary);
        if (salaryDiff < 10) relevanceScore += 30;
        else if (salaryDiff < 20) relevanceScore += 20;
        else if (salaryDiff < 30) relevanceScore += 10;
        
        return { 
          ...c, 
          relevanceScore 
        };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
      .map(({ relevanceScore, ...career }) => career); // Remove the temp field
  }
  
  async likeCareerElement(element: InsertCareerElement): Promise<CareerElement> {
    // Check if element already exists
    const existingElement = Array.from(this.careerElements.values()).find(
      el => 
        el.userId === element.userId && 
        el.careerId === element.careerId &&
        el.elementType === element.elementType &&
        el.elementValue === element.elementValue
    );
    
    if (existingElement) {
      return existingElement;
    }
    
    // Create a new element
    const id = this.careerElementIdCounter++;
    const newElement: CareerElement = {
      ...element,
      id,
      timestamp: new Date()
    };
    
    this.careerElements.set(id, newElement);
    return newElement;
  }
  
  async unlikeCareerElement(userId: number, careerId: number, elementType: string, elementValue: string): Promise<boolean> {
    // Find the element to unlike
    const elementToRemove = Array.from(this.careerElements.values()).find(
      el => 
        el.userId === userId && 
        el.careerId === careerId &&
        el.elementType === elementType &&
        el.elementValue === elementValue
    );
    
    if (!elementToRemove) {
      return false; // Element wasn't found, nothing to unlike
    }
    
    // Remove the element
    this.careerElements.delete(elementToRemove.id);
    return true;
  }
  
  async getLikedElements(userId: number): Promise<CareerElement[]> {
    return Array.from(this.careerElements.values())
      .filter(element => element.userId === userId)
      .sort((a, b) => {
        const aTime = a.timestamp?.getTime() || 0;
        const bTime = b.timestamp?.getTime() || 0;
        return bTime - aTime;
      });
  }
  
  async getLikedElementsByType(userId: number, elementType: string): Promise<CareerElement[]> {
    return Array.from(this.careerElements.values())
      .filter(element => 
        element.userId === userId && 
        element.elementType === elementType
      )
      .sort((a, b) => {
        const aTime = a.timestamp?.getTime() || 0;
        const bTime = b.timestamp?.getTime() || 0;
        return bTime - aTime;
      });
  }
  
  async getCareersByLikedElements(userId: number): Promise<Career[]> {
    // Get all liked elements for this user
    const likedElements = await this.getLikedElements(userId);
    if (likedElements.length === 0) {
      return this.getCareers(); // Return all careers if no likes yet
    }
    
    // Compile all the career IDs from liked elements
    const likedCareerIds = Array.from(
      new Set(likedElements.map(el => el.careerId))
    );
    
    // Get all careers and organize by field, skills, and other attributes
    const allCareers = await this.getCareers();
    
    // Get element types and values the user has liked
    const likedTypes = Array.from(
      new Set(likedElements.map(el => el.elementType))
    );
    
    const likedValuesByType: Record<string, string[]> = {};
    likedTypes.forEach(type => {
      likedValuesByType[type] = Array.from(
        new Set(
          likedElements
            .filter(el => el.elementType === type)
            .map(el => el.elementValue)
        )
      );
    });
    
    // Score each career based on user's preferences
    return allCareers
      .map(career => {
        let score = 0;
        
        // Direct likes for this career get highest weight
        if (likedCareerIds.includes(career.id)) {
          score += 100;
        }
        
        // Match liked skills
        if (career.skills && likedValuesByType['skill']) {
          const skillMatches = career.skills.filter(skill => 
            likedValuesByType['skill'].includes(skill)
          ).length;
          score += skillMatches * 20;
        }
        
        // Match field preference
        if (likedValuesByType['field'] && likedValuesByType['field'].includes(career.field)) {
          score += 50;
        }
        
        // Match responsibilities
        if (career.responsibilities && likedValuesByType['responsibility']) {
          const respMatches = career.responsibilities.filter(resp => 
            likedValuesByType['responsibility'].some(liked => resp.includes(liked))
          ).length;
          score += respMatches * 15;
        }
        
        // Match work settings
        if (career.workSetting && likedValuesByType['workSetting'] && 
            likedValuesByType['workSetting'].includes(career.workSetting)) {
          score += 40;
        }
        
        return {
          ...career,
          matchScore: score
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .map(({ matchScore, ...rest }) => rest); // Remove temp scoring field
  }

  // AI conversation methods
  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const id = this.conversationIdCounter++;
    const now = new Date();
    const newConversation: Conversation = {
      ...conversation,
      id,
      createdAt: now,
      updatedAt: now,
    };
    
    this.conversations.set(id, newConversation);
    return newConversation;
  }

  async getConversation(id: number): Promise<Conversation | undefined> {
    return this.conversations.get(id);
  }

  async updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined> {
    const conversation = await this.getConversation(id);
    if (!conversation) return undefined;
    
    const updatedConversation: Conversation = {
      ...conversation,
      ...updates,
      updatedAt: new Date(),
    };
    
    this.conversations.set(id, updatedConversation);
    return updatedConversation;
  }

  async getConversationsByUserId(userId: number): Promise<Conversation[]> {
    return Array.from(this.conversations.values()).filter(
      (conversation) => conversation.userId === userId
    );
  }
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  public sessionStore: any;

  constructor() {
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        username: insertUser.username,
        password: insertUser.password,
        name: insertUser.name || null,
        email: insertUser.email || null,
        savedCareers: [],
        likedCareers: [],
        quizCompleted: false
      })
      .returning();
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [updated] = await db
      .update(users)
      .set(updates)
      .where(eq(users.id, id))
      .returning();
    return updated;
  }
  
  async saveQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const [quizResult] = await db
      .insert(quizResults)
      .values({
        userId: result.userId,
        answers: result.answers
      })
      .returning();
    
    // Update user.quizCompleted to true
    if (result.userId) {
      await this.updateUser(result.userId, { quizCompleted: true });
    }
    
    return quizResult;
  }
  
  async getQuizResultsByUserId(userId: number): Promise<QuizResult[]> {
    return db
      .select()
      .from(quizResults)
      .where(eq(quizResults.userId, userId))
      .orderBy(quizResults.timestamp);
  }
  
  async getCareers(): Promise<Career[]> {
    // Use the static data from the file for now
    // In the future, this could be stored in the database too
    return getCareers();
  }
  
  async getCareerById(id: number): Promise<Career | undefined> {
    return getCareerById(id);
  }
  
  async getSavedCareers(userId: number): Promise<Career[]> {
    const user = await this.getUser(userId);
    if (!user || !user.savedCareers || user.savedCareers.length === 0) {
      return [];
    }
    
    return (await this.getCareers()).filter(career => 
      user.savedCareers?.includes(career.id)
    ).map(career => ({
      ...career,
      isSaved: true
    }));
  }
  
  async getLikedCareers(userId: number): Promise<Career[]> {
    const user = await this.getUser(userId);
    if (!user || !user.likedCareers || user.likedCareers.length === 0) {
      return [];
    }
    
    return (await this.getCareers()).filter(career => 
      user.likedCareers?.includes(career.id)
    ).map(career => ({
      ...career,
      isLiked: true
    }));
  }
  
  async getRelatedCareers(careerId: number, limit: number = 3): Promise<Career[]> {
    const career = await this.getCareerById(careerId);
    if (!career) return [];
    
    // Get all careers
    const allCareers = await this.getCareers();
    
    // Filter out the current career
    const otherCareers = allCareers.filter(c => c.id !== careerId);
    
    // Sort careers by relevance:
    // 1. Same field gets highest priority
    // 2. Similar skill sets get secondary priority
    // 3. Similar salary range gets tertiary priority
    return otherCareers
      .map(c => {
        let relevanceScore = 0;
        
        // Same field is a strong indicator
        if (c.field === career.field) {
          relevanceScore += 100;
        }
        
        // Skill overlap
        if (career.skills && c.skills) {
          const overlapCount = career.skills.filter(skill => 
            c.skills.includes(skill)
          ).length;
          relevanceScore += overlapCount * 20;
        }
        
        // Similar salary range
        const careerAvgSalary = (career.salaryMin + career.salaryMax) / 2;
        const cAvgSalary = (c.salaryMin + c.salaryMax) / 2;
        const salaryDiff = Math.abs(careerAvgSalary - cAvgSalary);
        if (salaryDiff < 10) relevanceScore += 30;
        else if (salaryDiff < 20) relevanceScore += 20;
        else if (salaryDiff < 30) relevanceScore += 10;
        
        return { 
          ...c, 
          relevanceScore 
        };
      })
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, limit)
      .map(({ relevanceScore, ...career }) => career); // Remove the temp field
  }
  
  async likeCareerElement(element: InsertCareerElement): Promise<CareerElement> {
    // Check if element already exists
    const [existing] = await db
      .select()
      .from(careerElements)
      .where(
        and(
          eq(careerElements.userId, element.userId),
          eq(careerElements.careerId, element.careerId),
          eq(careerElements.elementType, element.elementType),
          eq(careerElements.elementValue, element.elementValue)
        )
      );
      
    if (existing) {
      return existing; // Element already liked, return it
    }
    
    // Insert the new liked element
    const [newElement] = await db
      .insert(careerElements)
      .values({
        userId: element.userId,
        careerId: element.careerId,
        elementType: element.elementType,
        elementValue: element.elementValue
      })
      .returning();
      
    return newElement;
  }
  
  async unlikeCareerElement(userId: number, careerId: number, elementType: string, elementValue: string): Promise<boolean> {
    // Find the element first to check if it exists
    const [existing] = await db
      .select()
      .from(careerElements)
      .where(
        and(
          eq(careerElements.userId, userId),
          eq(careerElements.careerId, careerId),
          eq(careerElements.elementType, elementType),
          eq(careerElements.elementValue, elementValue)
        )
      );
      
    if (!existing) {
      return false; // Element doesn't exist
    }
    
    // Delete the element
    await db
      .delete(careerElements)
      .where(eq(careerElements.id, existing.id));
      
    return true;
  }
  
  async getLikedElements(userId: number): Promise<CareerElement[]> {
    return db
      .select()
      .from(careerElements)
      .where(eq(careerElements.userId, userId))
      .orderBy(desc(careerElements.timestamp));
  }
  
  async getLikedElementsByType(userId: number, elementType: string): Promise<CareerElement[]> {
    return db
      .select()
      .from(careerElements)
      .where(
        and(
          eq(careerElements.userId, userId),
          eq(careerElements.elementType, elementType)
        )
      )
      .orderBy(desc(careerElements.timestamp));
  }
  
  async getCareersByLikedElements(userId: number): Promise<Career[]> {
    // Get all liked elements for this user
    const likedElements = await this.getLikedElements(userId);
    if (likedElements.length === 0) {
      return this.getCareers(); // Return all careers if no likes yet
    }
    
    // Compile all the career IDs from liked elements
    const likedCareerIds = [...new Set(likedElements.map(el => el.careerId))];
    
    // Get all careers and organize by field, skills, and other attributes
    const allCareers = await this.getCareers();
    
    // Get element types and values the user has liked
    const likedTypes = [...new Set(likedElements.map(el => el.elementType))];
    const likedValuesByType: Record<string, string[]> = {};
    
    likedTypes.forEach(type => {
      likedValuesByType[type] = [
        ...new Set(
          likedElements
            .filter(el => el.elementType === type)
            .map(el => el.elementValue)
        )
      ];
    });
    
    // Score each career based on user's preferences
    return allCareers
      .map(career => {
        let score = 0;
        
        // Direct likes for this career get highest weight
        if (likedCareerIds.includes(career.id)) {
          score += 100;
        }
        
        // Match liked skills
        if (career.skills && likedValuesByType['skill']) {
          const skillMatches = career.skills.filter(skill => 
            likedValuesByType['skill'].includes(skill)
          ).length;
          score += skillMatches * 20;
        }
        
        // Match field preference
        if (likedValuesByType['field'] && likedValuesByType['field'].includes(career.field)) {
          score += 50;
        }
        
        // Match responsibilities
        if (career.responsibilities && likedValuesByType['responsibility']) {
          const respMatches = career.responsibilities.filter(resp => 
            likedValuesByType['responsibility'].some(liked => resp.includes(liked))
          ).length;
          score += respMatches * 15;
        }
        
        // Match work settings
        if (career.workSetting && likedValuesByType['workSetting'] && 
            likedValuesByType['workSetting'].includes(career.workSetting)) {
          score += 40;
        }
        
        // Add more matches for other element types...
        
        return {
          ...career,
          matchScore: score
        };
      })
      .sort((a, b) => b.matchScore - a.matchScore)
      .map(({ matchScore, ...rest }) => rest); // Remove temp scoring field
  }
  
  async createConversation(conversation: InsertConversation): Promise<Conversation> {
    const [newConversation] = await db
      .insert(conversations)
      .values({
        userId: conversation.userId,
        messages: conversation.messages
      })
      .returning();
    
    return newConversation;
  }
  
  async getConversation(id: number): Promise<Conversation | undefined> {
    const [conversation] = await db
      .select()
      .from(conversations)
      .where(eq(conversations.id, id));
      
    return conversation;
  }
  
  async updateConversation(id: number, updates: Partial<Conversation>): Promise<Conversation | undefined> {
    const [updated] = await db
      .update(conversations)
      .set({
        ...updates,
        updatedAt: new Date()
      })
      .where(eq(conversations.id, id))
      .returning();
      
    return updated;
  }
  
  async getConversationsByUserId(userId: number): Promise<Conversation[]> {
    return db
      .select()
      .from(conversations)
      .where(eq(conversations.userId, userId))
      .orderBy(conversations.updatedAt);
  }
}

// Export database storage instance
export const storage = new DatabaseStorage();