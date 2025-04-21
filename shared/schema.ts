import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  email: text("email"),
  savedCareers: jsonb("saved_careers").$type<number[]>(),
  likedCareers: jsonb("liked_careers").$type<number[]>(),
  quizCompleted: boolean("quiz_completed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Quiz results table
export const quizResults = pgTable("quiz_results", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  answers: jsonb("answers").$type<Record<number, string>>().notNull(),
  timestamp: timestamp("timestamp").defaultNow(),
});

// AI conversations table
export const conversations = pgTable("conversations", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  messages: jsonb("messages").$type<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: string; // Stored as string in database
  }[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// User schema validation
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  name: true,
  email: true,
});

// Quiz results schema validation
export const insertQuizResultSchema = createInsertSchema(quizResults).pick({
  userId: true,
  answers: true,
});

// Career elements that users can like
export const careerElements = pgTable("career_elements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  careerId: integer("career_id").notNull(),
  elementType: text("element_type").notNull(), // e.g., 'skill', 'responsibility', 'workSetting', etc.
  elementValue: text("element_value").notNull(), // The actual value of the element
  timestamp: timestamp("timestamp").defaultNow(),
});

// Career element schema validation
export const insertCareerElementSchema = createInsertSchema(careerElements).pick({
  userId: true,
  careerId: true,
  elementType: true,
  elementValue: true,
});

// AI conversation schema validation
export const insertConversationSchema = createInsertSchema(conversations).pick({
  userId: true,
  messages: true,
});

// Message schema for API requests
export const messageSchema = z.object({
  message: z.string().min(1, "Message cannot be empty"),
  conversationId: z.number().optional(),
});

// Type definitions
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;

export type InsertConversation = z.infer<typeof insertConversationSchema>;
export type Conversation = typeof conversations.$inferSelect;

export type InsertCareerElement = z.infer<typeof insertCareerElementSchema>;
export type CareerElement = typeof careerElements.$inferSelect;

export type Message = z.infer<typeof messageSchema>;
