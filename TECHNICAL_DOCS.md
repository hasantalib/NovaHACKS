# CareerCanvas: Technical Documentation

This document provides detailed technical information about the CareerCanvas application, focusing on data storage, memory management, and internal architecture.

## Database Architecture

### Schema Design

The PostgreSQL database uses the following schema (defined in `shared/schema.ts`):

#### Users Table
```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  bio: text("bio"),
  profileImage: text("profile_image"),
  hasCompletedQuiz: boolean("has_completed_quiz").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

#### Quiz Results Table
```typescript
export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  results: jsonb("results").notNull(),
  recommendedCareers: jsonb("recommended_careers"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

#### Conversations Table
```typescript
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  messages: jsonb("messages").notNull(),
  context: jsonb("context"),
  careerId: integer("career_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
```

#### Career Elements Table
```typescript
export const careerElements = pgTable("career_elements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  careerId: integer("career_id").notNull(),
  elementType: text("element_type").notNull(), // 'skill', 'responsibility', 'education', etc.
  elementValue: text("element_value").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
```

### Database Connection

The database connection is managed in `server/db.ts`:

```typescript
import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle({ client: pool, schema });
```

## Storage Interface

The application uses a storage interface pattern to abstract data persistence. This allows for easy switching between in-memory storage and database storage.

### IStorage Interface

The `IStorage` interface (defined in `server/storage.ts`) declares all data operations:

```typescript
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
```

### MemStorage Implementation

The `MemStorage` class implements in-memory storage using JavaScript Maps:

```typescript
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
    
    // Set up in-memory session store
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // 24 hours
    });
  }
  
  // Implementation of all interface methods
  // ...
}
```

### DatabaseStorage Implementation

The `DatabaseStorage` class implements database storage using Drizzle ORM:

```typescript
export class DatabaseStorage implements IStorage {
  public sessionStore: any;

  constructor() {
    // Set up PostgreSQL session store
    const PostgresSessionStore = connectPg(session);
    this.sessionStore = new PostgresSessionStore({ 
      pool, 
      createTableIfMissing: true 
    });
  }
  
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }
  
  // Implementation of all other interface methods
  // ...
}
```

## Authentication System

The application uses Passport.js for authentication with session-based persistence.

### Authentication Setup

Authentication is set up in `server/auth.ts`:

```typescript
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

// Password hashing
async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  const [hashed, salt] = stored.split(".");
  const hashedBuf = Buffer.from(hashed, "hex");
  const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
  return timingSafeEqual(hashedBuf, suppliedBuf);
}

export function setupAuth(app: Express) {
  // Set up session middleware
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  // Configure local strategy
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      const user = await storage.getUserByUsername(username);
      if (!user || !(await comparePasswords(password, user.password))) {
        return done(null, false);
      } else {
        return done(null, user);
      }
    }),
  );

  // Serialize/deserialize user
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  // Auth routes
  // ...
}
```

## AI Integration

### OpenAI API Integration

The application integrates with OpenAI's GPT-4o model for AI-powered features:

```typescript
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate AI response
export async function generateAIResponse(message: string, context: AIContext) {
  try {
    const messages = [
      {
        role: "system",
        content: `You are CareerCanvas AI, a helpful career assistant...`
      },
      // Convert conversation history to message array
      ...context.conversationHistory.map(msg => ({
        role: msg.role,
        content: msg.content
      })),
      { role: "user", content: message }
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o", // The newest OpenAI model
      messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error generating AI response:", error);
    throw new Error("Failed to generate AI response");
  }
}
```

## Client-Side State Management

### React Query

The application uses TanStack Query (React Query) for client-side data fetching and state management:

```typescript
// queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || res.statusText);
  }
  return res;
}

export async function apiRequest(
  method: string,
  endpoint: string,
  data?: any
): Promise<Response> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const res = await fetch(endpoint, options);
  return throwIfResNotOk(res);
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});
```

### Authentication Hook

The `useAuth` hook manages authentication state:

```typescript
// use-auth.tsx
export function useAuth() {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | undefined, Error>({
    queryKey: ["/api/user"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const res = await apiRequest("POST", "/api/login", credentials);
      return await res.json();
    },
    onSuccess: (user: User) => {
      queryClient.setQueryData(["/api/user"], user);
    },
    // ...
  });

  // Other mutations...

  return {
    user: user ?? null,
    isLoading,
    error,
    loginMutation,
    logoutMutation,
    registerMutation,
  };
}
```

## Performance Considerations

### Database Optimization

- Indexes are created on frequently queried columns
- JSON fields (like `results` in quiz_results) are stored as JSONB for better query performance
- Session data is stored in a dedicated table for optimal authentication performance

### Memory Management

The application implements several memory optimization strategies:

1. **Pagination**: Career listing uses pagination to avoid loading all 1,200+ careers at once
2. **Lazy Loading**: Components and images use lazy loading to improve initial page load
3. **Memoization**: React's `useMemo` and `useCallback` are used to avoid redundant computations
4. **Query Caching**: TanStack Query caches API responses to reduce unnecessary network requests

### Resource Cleanup

- React effect hooks properly clean up resources on component unmount
- Database connections are managed by the connection pool
- WebSocket connections are properly closed when no longer needed

## Deployment Infrastructure

The application is deployed on Replit with:

- Node.js backend server
- PostgreSQL database
- Single-port deployment (Express serves both API and frontend)

## Troubleshooting

### Common Database Issues

- **Connection Errors**: Check if the DATABASE_URL environment variable is correctly set
- **Schema Issues**: Run `npm run db:push` to update the database schema

### Authentication Problems

- **Session Expiry**: Check session expiration settings in auth.ts
- **Login Failures**: Ensure credentials are correct and the user exists

### API Integration Errors

- **OpenAI API**: Verify that the OPENAI_API_KEY environment variable is set
- **Rate Limiting**: Handle rate limiting from OpenAI by implementing retries with exponential backoff

## Security Considerations

- **Password Storage**: Passwords are hashed using scrypt with salting
- **API Keys**: All API keys are stored as environment variables, never in the codebase
- **Input Validation**: Client and server-side validation using Zod schemas
- **CSRF Protection**: Express session with secure cookie settings
- **Content Security**: Appropriate headers to prevent XSS attacks