import React, { useState } from 'react';
import '../styles/Chat.css';
import config from '../config';

const Chat = ({ initialData }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    const newMessage = { user: 'You', text: input };
    console.log("Sending message:", newMessage);
    setMessages([...messages, newMessage]);
    setInput('');

    const response = await fetch(`${config.backendUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: input, data: initialData }),
    });

    const result = await response.json();
    console.log("Received response:", result);
    setMessages([...messages, newMessage, { user: 'Bot', text: result.answer }]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.user === 'You' ? 'chat-message user' : 'chat-message bot'}>
            <p><strong>{msg.user}:</strong> {msg.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Ask a question..." 
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;