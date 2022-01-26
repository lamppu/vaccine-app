import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import DateTimeForm from '../DateTimeForm/DateTimeForm.js';
import DataContainer from '../DataContainer/DataContainer.js';
import ErrorContainer from '../ErrorContainer/ErrorContainer.js';
import { Divider } from 'semantic-ui-react'

function App() {
  const [iso, setIso] = useState('2021-01-02T23:59:59.999999Z');
  const [error, setError] = useState({error: false, msg: null})
  
  return (
    <div className="App">
      <Header />
      <main>
        <DateTimeForm
          onIsoChange={setIso}
        />
        <ErrorContainer
          error={error}
        />
        <Divider section />
        <DataContainer
          iso={iso}
          error={error}
          onErrorChange={setError}
        />
      </main>
    </div>
  );
}

export default App;
