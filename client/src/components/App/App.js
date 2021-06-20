import React, { useState } from 'react';
import './App.css';
import Header from '../Header/Header.js';
import DateTimeForm from '../DateTimeForm/DateTimeForm.js';

function App() {
  const [dateTimeString, setDateTimeString] = useState('');
  const [selectedDate, setSelectedDate] = useState('2021-01-02');
  const [selectedTime, setSelectedTime] = useState('');
  return (
    <div className="App">
      <Header />
      <main>
        <DateTimeForm
          onDateTimeStringChange={setDateTimeString}
          selectedDate={selectedDate}
          onSelectedDateChange={setSelectedDate}
          selectedTime={selectedTime}
          onSelectedTimeChange={setSelectedTime}
        />
        <div>
          Just testing {dateTimeString}
        </div>
      </main>
    </div>
  );
}

export default App;
