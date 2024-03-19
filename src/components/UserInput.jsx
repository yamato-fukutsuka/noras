// UserInput.js
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import './userInput.css';

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
        label="おはなしする"
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