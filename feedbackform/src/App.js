import React from 'react';
import './index.css';
import Main from './Component/MainComponent';
import {BrowserRouter} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Main/>
    </BrowserRouter>
  );
}

export default App;
