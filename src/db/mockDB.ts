interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: Date;
  author: 'AI' | 'CUSTOMER';
}

class MockDB {
  private messages: Message[] = [];

  // Create
  async createMessage(userId: string, content: string, author: 'AI' | 'CUSTOMER'): Promise<Message> {
    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      userId,
      content,
      timestamp: new Date(),
      author
    };
    this.messages.push(newMessage);
    return newMessage;
  }

  // Read
  async getMessagesByUserId(userId: string): Promise<Message[]> {
    return this.messages.filter(msg => msg.userId === userId);
  }

  async getMessageById(id: string): Promise<Message | undefined> {
    return this.messages.find(msg => msg.id === id);
  }

  // Update
  async updateMessage(id: string, content: string): Promise<Message | undefined> {
    const messageIndex = this.messages.findIndex(msg => msg.id === id);
    if (messageIndex === -1) return undefined;

    this.messages[messageIndex] = {
      ...this.messages[messageIndex],
      content,
      timestamp: new Date()
    };

    return this.messages[messageIndex];
  }

  // Delete
  async deleteMessage(id: string): Promise<boolean> {
    const initialLength = this.messages.length;
    this.messages = this.messages.filter(msg => msg.id !== id);
    return this.messages.length !== initialLength;
  }
}

export const mockDB = new MockDB(); 