// UserInput.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const UserInput = ({ onSubmit }) => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== '') {
      onSubmit(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="質問を入力する"
        value={input}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button type="submit" variant="contained" color="primary">
        送信
      </Button>
    </form>
  );
};

export default UserInput;



