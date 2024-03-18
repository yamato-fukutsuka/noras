import React from 'react';
import { Container } from '@material-ui/core';
import Map from './components/Map';
import GPTResponse from './components/GPTResponse';
import UserInput from './components/UserInput';

function App() {
  return (
    <Container maxWidth="md">
      <Map />
      <GPTResponse />
      <UserInput />
    </Container>
  );
}

export default App;