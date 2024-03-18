const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

export const sendToGPT = async (input) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${API_KEY}`
    },
    body: JSON.stringify({
      prompt: input,
      max_tokens: 100,
      n: 1,
      stop: null,
      temperature: 0.7
    })
  });

  const data = await response.json();
  return data.choices[0].text.trim();
};