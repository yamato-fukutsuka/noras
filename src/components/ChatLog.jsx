// ChatLog.js
import React from 'react';
import './chatLog.css';

const ChatLog = ({ messages }) => {
  return (
    <div className='chatHistory'>
      {messages.map((message, index) => (
        <div key={index}>
          <div className='yourMessage'>
            <strong>私:</strong>
            {message.user}
          </div>
          <div className='gptsMessage'>
            <strong>GPT:</strong>
            {message.gpt}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatLog;
