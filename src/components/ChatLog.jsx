// ChatLog.js
import React from 'react';

const ChatLog = ({ messages }) => {
  return (
    <div className='chatHistory'>
      {messages.map((message, index) => (
        <div key={index}>
          <div className='yourMessage'>
            <strong>YOU:</strong>
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
