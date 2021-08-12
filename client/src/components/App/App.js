import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import DateTimeForm from '../DateTimeForm/DateTimeForm.js';
import DataContainer from '../DataContainer/DataContainer.js';
import ErrorContainer from '../ErrorContainer/ErrorContainer.js';
import { Divider } from 'semantic-ui-react'

function App() {
  const [dateTimeString, setDateTimeString] = useState('');
  const [dataset, setDataset] = useState({"success": null, "data": null, "error": null});
  return (
    <div className="App">
      <Header />
      <main>
        <DateTimeForm
          onDateTimeStringChange={setDateTimeString}
          onDatasetChange={setDataset}
        />
        <ErrorContainer
          success={dataset.success}
          msg={dataset.error}
        />
        <Divider section />
        <DataContainer
          dateTimeString={dateTimeString}
          dataset={dataset}
        />
      </main>
    </div>
  );
}

export default App;
