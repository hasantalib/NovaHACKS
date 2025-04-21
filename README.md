# CareerCanvas

An interactive career exploration platform that guides users through personalized career discovery using AI-powered recommendations and engaging user experiences.

## Project Overview

CareerCanvas is designed to help users explore career options through AI-driven personalization. The platform provides:

- Career exploration tools with detailed information on 1,200+ careers
- Personalized recommendations based on a 15-question assessment
- AI-powered insights based on user preferences and interactions
- Interactive career path visualization
- "Like" system for individual career elements to receive tailored recommendations

## Tech Stack

- **Frontend**: React, TypeScript, TailwindCSS, shadcn/ui components
- **Backend**: Node.js, Express
- **Database**: PostgreSQL with Drizzle ORM
- **AI Integration**: OpenAI GPT-4o API
- **Authentication**: Passport.js with session-based auth

## Project Structure

```
├── client/                  # Frontend React application
│   ├── src/
│   │   ├── components/      # UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # Utility functions and client setup
│   │   ├── pages/           # Page components
│   │   └── types/           # TypeScript type definitions
│   ├── index.html           # HTML entry point
│   └── public/              # Static assets
├── server/                  # Backend Express application
│   ├── data/                # Data sources and generators
│   ├── routes.ts            # API route definitions
│   ├── storage.ts           # Data storage interface
│   ├── auth.ts              # Authentication setup
│   ├── db.ts                # Database connection
│   ├── index.ts             # Server entry point
│   └── services/            # Business logic services
├── shared/                  # Shared code between client and server
│   └── schema.ts            # Database schema and types
├── drizzle.config.ts        # Drizzle ORM configuration
├── migrations/              # Database migrations
├── package.json             # Project dependencies
└── tsconfig.json            # TypeScript configuration
```

## Data Storage

### Database Structure

The application uses PostgreSQL for persistent data storage, with Drizzle ORM handling database interactions. The schema (in `shared/schema.ts`) defines the following tables:

1. **users**: Stores user account information
2. **quiz_results**: Stores user quiz responses and results
3. **conversations**: Stores user conversations with the AI assistant
4. **career_elements**: Stores user preferences for specific career elements

### In-Memory vs Persistent Storage

The application is designed to work with either in-memory storage (`MemStorage`) or persistent database storage (`DatabaseStorage`). Both implement the `IStorage` interface defined in `server/storage.ts`.

- **MemStorage**: Used for development and testing; keeps all data in memory
- **DatabaseStorage**: Used in production; stores data in PostgreSQL database

The current implementation uses `DatabaseStorage` for persistent data storage across sessions.

## Key Features

### Authentication Flow

1. New users start at the landing page
2. Register/Sign up creates an account
3. First-time users see a welcome screen
4. New users must complete the 15-question quiz
5. After quiz completion, users are directed to the dashboard with a guided tutorial

### Career Exploration

- Browse over 1,200 careers with detailed information
- Career cards show key information (salary, growth rate, etc.)
- Detailed career view shows:
  - Overview and responsibilities
  - Required skills (technical and soft skills)
  - Education and certification paths
  - Career development roadmap
  - Day in the life examples
  - FAQs and professional perspectives

### AI Integration

The AI assistant (powered by OpenAI's GPT-4o) provides:

- Career-specific insights and advice
- Answers to user questions about careers
- Personalized recommendations based on user preferences
- The AI maintains context awareness including:
  - Quiz results
  - Career preferences
  - Career-specific information
  - Previous conversation history

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Environment Variables

Create a `.env` file in the root directory with:

```
DATABASE_URL=postgresql://username:password@hostname:port/database
OPENAI_API_KEY=your_openai_api_key
SESSION_SECRET=your_session_secret
```

### Installation

1. Install dependencies:
```bash
npm install
```

2. Push the database schema to your PostgreSQL instance:
```bash
npm run db:push
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5000

## Deployment

The project can be deployed on any platform that supports Node.js applications with PostgreSQL databases.

## License

This project is licensed under the MIT License - see the LICENSE file for details.