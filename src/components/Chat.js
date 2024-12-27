import React, { useState } from 'react';
import config from '../config';

const Chat = ({ initialData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessage = { user: 'You', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    const response = await fetch(`${config.backendUrl}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input, data: initialData }),
    });

    const result = await response.json();
    setMessages([...messages, newMessage, { user: 'Bot', text: result.answer }]);
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
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