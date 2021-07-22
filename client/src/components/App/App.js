import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import DateTimeForm from '../DateTimeForm/DateTimeForm.js';
import DataContainer from '../DataContainer/DataContainer.js';
import { Divider } from 'semantic-ui-react'

function App() {
  const [dateTimeString, setDateTimeString] = useState('');

  const [ordersAndVaccines, setOrdersAndVaccines] = useState({});
  return (
    <div className="App">
      <Header />
      <main>
        <DateTimeForm
          onDateTimeStringChange={setDateTimeString}
          onOrdersAndVaccinesChange={setOrdersAndVaccines}
        />
        <Divider section />
        <DataContainer
          dateTimeString={dateTimeString}
          orders={ordersAndVaccines}
        />
      </main>
    </div>
  );
}

export default App;
