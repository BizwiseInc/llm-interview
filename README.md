# LLM Interview Boilerplate

This is a boilerplate project for the interview process. It includes a simple Express server with TypeScript, OpenAI integration, and a mock database.

## Features

- Express server with TypeScript
- OpenAI integration for LLM responses
- In-memory mock database with CRUD operations
- Environment variable configuration
- Development and production build scripts

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your OpenAI API key:
```
OPENAI_API_KEY=your_api_key_here
PORT=3000
```

3. Start the development server:
```bash
npm run dev
```

4. For production:
```bash
npm run build
npm start
```

## API Endpoint

### POST /api/message

Send a message to get an LLM response.

Request body:
```json
{
  "user_id": "string",
  "message": "string"
}
```

Response:
```json
{
  "reply": "string"
}
```

## Project Structure

- `src/server.ts` - Main server file
- `src/db/mockDB.ts` - Mock database implementation
- `src/llm/llmHelper.ts` - OpenAI integration
- `.env` - Environment variables
- `tsconfig.json` - TypeScript configuration 