import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const UserInput = () => {
  const [input, setInput] = useState('');

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    // ユーザー入力をGPT APIに送信する処理
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
        ↑
      </Button>
    </form>
  );
};

export default UserInput;