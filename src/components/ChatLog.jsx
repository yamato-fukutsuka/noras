// ChatLog.js
import React from 'react';
import { Typography } from '@mui/material';

const ChatLog = ({ messages }) => {
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <Typography variant="body1" gutterBottom>
            <strong>User:</strong> {message.user}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>GPT:</strong> {message.gpt}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default ChatLog;
