import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import DateTimeForm from '../DateTimeForm/DateTimeForm.js';
import DataContainer from '../DataContainer/DataContainer.js';
import { Divider } from 'semantic-ui-react'

function App() {
  const [dateTimeString, setDateTimeString] = useState('');
  const [dataset1, setDataset1] = useState(null);
  return (
    <div className="App">
      <Header />
      <main>
        <DateTimeForm
          onDateTimeStringChange={setDateTimeString}
          onDataset1Change={setDataset1}
        />
        <Divider section />
        <DataContainer
          dateTimeString={dateTimeString}
          dataset1={dataset1}
        />
      </main>
    </div>
  );
}

export default App;
