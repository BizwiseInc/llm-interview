import express, { Request, Response } from 'express';
import { mockDB } from './db/mockDB';
import { getLLMResponse } from './llm/llmHelper';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

interface MessageRequest {
  user_id: string;
  message: string;
}

app.post('/api/message', async (req: Request, res: Response) => {
  try {
    const { user_id, message } = req.body as MessageRequest;

    if (!user_id || !message) {
      return res.status(400).json({ error: 'user_id and message are required' });
    }

    // Store the message in the mock database
    await mockDB.createMessage(user_id, message, 'CUSTOMER');

    // Get response from LLM
    const llmResponse = await getLLMResponse(message);

    // Store the response in the mock database
    await mockDB.createMessage(user_id, llmResponse, 'AI');

    // Return the response
    res.json({
      reply: llmResponse
    });
  } catch (error) {
    console.error('Error processing message:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 