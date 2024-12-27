import React, { useState } from 'react';
import config from '../config';
import '../styles/Chat.css';

const Chat = ({ initialData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    console.log('Sending message:', input);
    const newMessage = { user: 'You', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    try {
      const response = await fetch(`${config.backendUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: input, data: initialData }),
      });

      if (!response.ok) {
        console.error('Error in chat API response:', response.status);
        throw new Error('Chat API error');
      }

      const result = await response.json();
      setMessages([...messages, newMessage, { user: 'Bot', text: result.answer }]);
    } catch (error) {
      console.error('Error during chat interaction:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.user === 'You' ? 'user-message' : 'bot-message'}`}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Ask a question..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chat;