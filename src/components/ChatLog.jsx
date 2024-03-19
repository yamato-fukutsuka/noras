import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './chatLog.css';

const ChatLog = ({ messages, detectedObjects }) => {
  const [generatedResponse, setGeneratedResponse] = useState('');

  useEffect(() => {
    if(detectedObjects !== undefined){
      if (detectedObjects.length > 0) {
        const prompt = `次のような物体が検出されました: ${detectedObjects.join(', ')}。この情報を使って、対話を続けてください。`;
  
        // 言語生成モデル（例えばGPT-3）を使用して、プロンプトから言語を生成する
        axios.post('https://api.openai.com/v1/chat/completions', {
          prompt: prompt,
          max_tokens: 100,
          n: 1,
          stop: null,
          temperature: 0.7,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,
          }
        })
        .then(response => {
          const generatedText = response.data.choices[0].text.trim();
          setGeneratedResponse(generatedText);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }
    }
  }, [detectedObjects]);
  

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
      {generatedResponse && (
        <div>
          <div className='gptsMessage'>
            <strong>GPT:</strong>
            {generatedResponse}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatLog;