import React, { useState } from 'react';
import Map from './components/Map';
import ChatLog from './components/ChatLog';
import UserInput from './components/UserInput';
import nlp from 'compromise';
import Speech from 'react-speech';

// GPT-3へのリクエストを送信する関数
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
  const [locationInfo, setLocationInfo] = useState(null);

  const handleUserInput = async (input) => {
    try {
      setMessages([...messages, { user: input, gpt: 'そーですね～' }]);

      const response = await sendToGPT(input);
      console.log('GPT response:', response);

      await updateMessages(response);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prevMessages) => {
        const updatedMessages = [...prevMessages];
        updatedMessages[updatedMessages.length - 1].gpt = '(' + error + ')';
        return updatedMessages;
      });
    }
  };

  const updateMessages = async (response) => {
    let currentResponse = '';

    for (let i = 0; i < response.length; i++) {
      currentResponse += response[i];
      await updateMessageResponse(currentResponse);
      await new Promise((resolve) => setTimeout(resolve, 50));
      console.log('Current response:', currentResponse);
    }

    const locationName = extractLocationName(response);

    if (locationName) {
      getLocationCoordinates(locationName)
        .then((coordinates) => {
          setLocationInfo(coordinates);
        })
        .catch((error) => {
          console.error('Error getting location coordinates:', error);
        });
    }
};

const updateMessageResponse = (currentResponse) => {
  setMessages((prevMessages) => {
    const updatedMessages = [...prevMessages];
    updatedMessages[updatedMessages.length - 1].gpt = currentResponse;
    console.log('Updated messages:', updatedMessages);
    return updatedMessages;
  });

  return (
      <Speech
        key={`speech`}
        text={messages.gpt}
        voice="Google 日本語"
        lang="ja-JP"
        speak={true}
      />
  );
};
// GPTの応答から場所の名前を抽出する関数
const extractLocationName = (response) => {
  const doc = nlp(response);
  const places = doc.places().out('array');

  if (places.length > 0) {
    console.log('Places:', places);
    // 最初の場所の名前を返す
    return places[0];
  }

  // 場所が見つからない場合は、GPTの応答全体を返す
  return response;
};
  // 場所の名前から緯度と経度を取得する関数
const getLocationCoordinates = async (locationName) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      locationName
    )}&key=AIzaSyC_fVLz8h1khvnkMo-Y2kiPvOjEM8VUs8w`
  );

  if (!response.ok) {
    console.log('Response:', response);
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  console.log('Location data:', data);

  if (data.results.length > 0) {
    const { lat, lng } = data.results[0].geometry.location;
    return { lat, lng };
  }

  // 緯度と経度が見つからない場合は、デフォルトの位置情報を返す
  return {
    lat: 35.6809591,
    lng: 139.7673068
  };
};

return (
  <div className='flex_box'>
    <Map locationInfo={locationInfo} />
    <div className='chat_box'>
      <ChatLog messages={messages} />
      <UserInput onSubmit={handleUserInput} />
      <Speech
        key={messages.length}
        text={messages[messages.length - 1]?.gpt || ''}
        voice="Google 日本語"
        lang="ja-JP"
        speak={true}
      />
    </div>
  </div>
);
}

export default App;