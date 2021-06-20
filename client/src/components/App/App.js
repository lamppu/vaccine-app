import React from 'react';
import './App.css';
import Header from '../Header/Header.js';
import DateTimeForm from '../DateTimeForm/DateTimeForm.js';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <DateTimeForm />
      </main>
    </div>
  );
}

export default App;
