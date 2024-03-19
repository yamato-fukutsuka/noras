// GPTResponse.js
import React from 'react';
import { Typography } from '@mui/material';
import './GPTResponse.module.css';

const GPTResponse = ({ response }) => {
  return (
    <Typography variant="body1" gutterBottom>
      {response}
    </Typography>
  );
};

export default GPTResponse;