import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import DateTimeForm from '../DateTimeForm/DateTimeForm.js';
import DataContainer from '../DataContainer/DataContainer.js';
import { Divider } from 'semantic-ui-react'

function App() {
  const [dateTimeString, setDateTimeString] = useState('');
  const [ordersJSON, setOrdersJSON] = useState(null);
  const [vaccinationsJSON, setVaccinationsJSON] = useState(null);
  return (
    <div className="App">
      <Header />
      <main>
        <DateTimeForm
          onDateTimeStringChange={setDateTimeString}
          onOrdersJSONChange={setOrdersJSON}
          onVaccinationsJSONChange={setVaccinationsJSON}
        />
        <Divider section />
        <DataContainer
          dateTimeString={dateTimeString}
          ordersJSON={ordersJSON}
          vaccinationsJSON={vaccinationsJSON}
        />
      </main>
    </div>
  );
}

export default App;
