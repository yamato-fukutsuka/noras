// App.js
import React, { useState } from 'react';
import { Container } from '@mui/material';
import Map from './components/Map';
import ChatLog from './components/ChatLog';
import UserInput from './components/UserInput';

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/chat/completions';

const sendToGPT = async (input) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful assistant.'
          },
          {
            role: 'user',
            content: input
          }
        ],
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error('Error in sendToGPT:', error);
    throw error;
  }
};

function App() {
  const [messages, setMessages] = useState([]);

  const handleUserInput = async (input) => {
    try {
      // リクエストを送信する前にメッセージを追加
      setMessages([...messages, { user: input, gpt: '(Waiting for response...)' }]);

      const response = await sendToGPT(input);

      // レスポンスを受け取った後、メッセージを更新
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].gpt = response;
        return updatedMessages;
      });
    } catch (error) {
      console.error('Error:', error);
      // エラーハンドリング
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].gpt = '(Error occurred)';
        return updatedMessages;
      });
    }
  };

  return (
    <div className='flex_box'>
      <Map />
      <div className='chat_box'>
      <ChatLog messages={messages} />
      <UserInput onSubmit={handleUserInput} />
      </div>
    </div>
  );
}

export default App;