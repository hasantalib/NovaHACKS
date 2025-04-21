import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertQuizResultSchema, insertCareerElementSchema, messageSchema } from "@shared/schema";
import { generateAIResponse } from "./services/aiService";
import { getCareers, getCareerById } from "./data/careers";
import { nanoid } from "nanoid";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { setupAuth, isAuthenticated } from "./auth";

// Helper for validating request body with zod
const validateBody = <T>(schema: z.ZodType<T>) => {
  return (req: Request, res: Response, next: Function) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve architecture diagram directly
  app.get('/architecture-diagram', (req, res) => {
    res.sendFile('architecture-diagram.html', { root: '.' });
  });
  
  // Set up authentication
  setupAuth(app);
  // Route to get current authenticated user
  app.get("/api/users/me", isAuthenticated, (req, res) => {
    // Now using the actual authenticated user from the session
    const { password: _, ...userWithoutPassword } = req.user as Express.User;
    res.json(userWithoutPassword);
  });

  // Quiz routes - protected by authentication
  app.post("/api/quiz-results", isAuthenticated, async (req, res) => {
    try {
      // Add userId to the quiz result data
      const userId = (req.user as Express.User).id;
      
      console.log("Quiz data received:", JSON.stringify(req.body));
      console.log("User ID:", userId);
      
      const quizData = {
        userId: userId,
        answers: req.body.answers
      };
      
      console.log("Processed quiz data:", JSON.stringify(quizData));
      
      // Manually validate
      const parseResult = insertQuizResultSchema.safeParse(quizData);
      if (!parseResult.success) {
        console.error("Validation error:", parseResult.error);
        return res.status(400).json({ error: parseResult.error.errors });
      }
      
      const quizResult = await storage.saveQuizResult(quizData);
      res.status(201).json(quizResult);
    } catch (error) {
      console.error("Error saving quiz result:", error);
      res.status(500).json({ error: "Failed to save quiz result" });
    }
  });

  app.get("/api/quiz-results/:userId", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const results = await storage.getQuizResultsByUserId(userId);
      res.json(results);
    } catch (error) {
      console.error("Error getting quiz results:", error);
      res.status(500).json({ error: "Failed to get quiz results" });
    }
  });

  // Career routes
  app.get("/api/careers", async (req, res) => {
    try {
      const careers = await getCareers();
      
      // Add "personalized" career recommendations for demo
      // In a real app, this would use the quiz results to filter/rank careers
      res.json(careers);
    } catch (error) {
      console.error("Error getting careers:", error);
      res.status(500).json({ error: "Failed to get careers" });
    }
  });

  app.get("/api/careers/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid career ID" });
      }
      
      const career = await getCareerById(id);
      if (!career) {
        return res.status(404).json({ error: "Career not found" });
      }
      
      res.json(career);
    } catch (error) {
      console.error("Error getting career:", error);
      res.status(500).json({ error: "Failed to get career" });
    }
  });

  app.get("/api/users/:userId/saved-careers", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const savedCareers = await storage.getSavedCareers(userId);
      res.json(savedCareers);
    } catch (error) {
      console.error("Error getting saved careers:", error);
      res.status(500).json({ error: "Failed to get saved careers" });
    }
  });

  app.get("/api/users/:userId/liked-careers", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const likedCareers = await storage.getLikedCareers(userId);
      res.json(likedCareers);
    } catch (error) {
      console.error("Error getting liked careers:", error);
      res.status(500).json({ error: "Failed to get liked careers" });
    }
  });

  // Career elements routes
  app.post("/api/career-elements/like", isAuthenticated, async (req, res) => {
    try {
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const { careerId, elementType, elementValue, action = 'toggle' } = req.body;
      const existingElements = await storage.getLikedElementsByType(userId, elementType);
      
      const alreadyLiked = existingElements.some(el => 
        el.careerId === careerId && 
        el.elementValue === elementValue
      );
      
      let result;
      
      // If already liked and action is 'toggle' or 'unlike', unlike it
      if (alreadyLiked && (action === 'toggle' || action === 'unlike')) {
        result = await storage.unlikeCareerElement(userId, careerId, elementType, elementValue);
        return res.json({ action: 'unliked', result });
      }
      
      // If not liked and action is 'toggle' or 'like', like it
      if ((!alreadyLiked && action === 'toggle') || action === 'like') {
        const elementData = {
          userId,
          careerId,
          elementType,
          elementValue
        };
        
        // Validate the data
        const parseResult = insertCareerElementSchema.safeParse(elementData);
        if (!parseResult.success) {
          return res.status(400).json({ error: parseResult.error.errors });
        }
        
        const element = await storage.likeCareerElement(elementData);
        return res.status(201).json({ action: 'liked', element });
      }
      
      // If no action was taken
      res.status(400).json({ error: "Invalid action" });
    } catch (error) {
      console.error("Error handling career element like/unlike:", error);
      res.status(500).json({ error: "Failed to process career element action" });
    }
  });

  app.get("/api/users/:userId/liked-elements", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const { type } = req.query;
      let elements;
      
      if (type && typeof type === 'string') {
        elements = await storage.getLikedElementsByType(userId, type);
      } else {
        elements = await storage.getLikedElements(userId);
      }
      
      res.json(elements);
    } catch (error) {
      console.error("Error getting liked elements:", error);
      res.status(500).json({ error: "Failed to get liked elements" });
    }
  });
  
  app.get("/api/users/:userId/check-liked-element", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const { careerId, elementType, elementValue } = req.query;
      
      if (!careerId || !elementType || !elementValue || 
          typeof careerId !== 'string' || 
          typeof elementType !== 'string' || 
          typeof elementValue !== 'string') {
        return res.status(400).json({ error: "Missing or invalid parameters" });
      }
      
      const careerIdNum = parseInt(careerId);
      if (isNaN(careerIdNum)) {
        return res.status(400).json({ error: "Invalid career ID" });
      }
      
      const elements = await storage.getLikedElementsByType(userId, elementType);
      const isLiked = elements.some(el => 
        el.careerId === careerIdNum && 
        el.elementValue === elementValue
      );
      
      res.json({ isLiked });
    } catch (error) {
      console.error("Error checking if element is liked:", error);
      res.status(500).json({ error: "Failed to check if element is liked" });
    }
  });

  app.get("/api/users/:userId/personalized-feed", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      // Get personalized career recommendations based on liked elements
      const careers = await storage.getCareersByLikedElements(userId);
      res.json(careers);
    } catch (error) {
      console.error("Error getting personalized feed:", error);
      res.status(500).json({ error: "Failed to get personalized feed" });
    }
  });

  app.get("/api/careers/:careerId/related", async (req, res) => {
    try {
      const careerId = parseInt(req.params.careerId);
      if (isNaN(careerId)) {
        return res.status(400).json({ error: "Invalid career ID" });
      }
      
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 3;
      const relatedCareers = await storage.getRelatedCareers(careerId, limit);
      res.json(relatedCareers);
    } catch (error) {
      console.error("Error getting related careers:", error);
      res.status(500).json({ error: "Failed to get related careers" });
    }
  });

  // AI chat routes
  app.post("/api/chat", isAuthenticated, async (req, res) => {
    try {
      const { message, conversationId, context } = req.body;
      const userId = (req.user as Express.User).id;
      const careerContext = context?.careerContext;
      
      // Get existing conversation or create a new one
      let conversation;
      if (conversationId) {
        conversation = await storage.getConversation(conversationId);
        if (!conversation) {
          return res.status(404).json({ error: "Conversation not found" });
        }
      } else {
        // Create a new conversation with initial user message
        conversation = await storage.createConversation({
          userId,
          messages: [{
            id: nanoid(),
            role: 'user',
            content: message,
            timestamp: new Date().toISOString()
          }]
        });
      }
      
      // Get the user's quiz results and career preferences
      const quizResults = await storage.getQuizResultsByUserId(userId);
      const likedCareers = await storage.getLikedCareers(userId);
      
      // Generate AI response with personalized context
      const aiResponse = await generateAIResponse(message, {
        conversationHistory: conversation.messages,
        quizResults: quizResults.length > 0 ? quizResults[0] : {},
        likedCareers: likedCareers.map(career => career.id),
        careerContext: careerContext || null
      });
      
      // Add AI response to conversation
      const updatedMessages = [
        ...conversation.messages,
        // If we created a new conversation, the user message is already included
        ...(conversationId ? [{
          id: nanoid(),
          role: 'user' as const,
          content: message,
          timestamp: new Date().toISOString()
        }] : []),
        {
          id: nanoid(),
          role: 'assistant' as const,
          content: aiResponse,
          timestamp: new Date().toISOString()
        }
      ];
      
      // Update conversation in storage
      await storage.updateConversation(conversation.id, {
        messages: updatedMessages
      });
      
      // Return the AI response
      res.json({
        response: aiResponse,
        conversationId: conversation.id
      });
    } catch (error) {
      console.error("Error in AI chat:", error);
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  app.get("/api/conversations/:userId", isAuthenticated, async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      if (isNaN(userId)) {
        return res.status(400).json({ error: "Invalid user ID" });
      }
      
      const conversations = await storage.getConversationsByUserId(userId);
      res.json(conversations);
    } catch (error) {
      console.error("Error getting conversations:", error);
      res.status(500).json({ error: "Failed to get conversations" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
