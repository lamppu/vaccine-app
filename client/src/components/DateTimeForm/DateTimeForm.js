import React, { useState } from 'react';
import './DateTimeForm.css';
import { Form, Icon, Button, Popup } from 'semantic-ui-react';

const DateTimeForm = ({onDateTimeStringChange, onDatasetChange}) => {
  const [selectedDate, setSelectedDate] = useState('2021-01-02');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedMicros, setSelectedMicros] = useState('');

  const getMicrosString = (micros) => {
    if (micros/100000 >= 1) return (micros);
    if (micros/10000 >= 1) return ('0' + micros);
    if (micros/1000 >= 1) return ('00' + micros);
    if (micros/100 >= 1) return ('000' + micros);
    if (micros/10 >= 1) return ('0000' + micros);
    return ('00000' + micros);
  }

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  }

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  }

  const handleMicrosChange = (e) => {
    let micros = (e.target.value).trim();
    if (micros !== '' && !isNaN(micros)) {
      micros = parseInt(micros);
      setSelectedMicros(getMicrosString(micros))
    } else {
      setSelectedMicros(micros)
    }
  }

  const handleSubmit = async () => {
    if (!selectedDate || selectedDate === '""') {
      onDatasetChange({"success": false, "data": null, "error": "Please select a date"});
    } else if (!selectedTime && selectedMicros) {
      onDatasetChange({"success": false, "data": null, "error": "Please select a time"});
    } else if (isNaN(selectedMicros)) {
      onDatasetChange({"success": false, "data": null, "error": "Please choose a valid value in microseconds input (000000-999999)"});
    } else {
      const time = (selectedTime !== '') ? selectedTime : '23:59:59';
      const micros = (selectedTime !== '' && selectedMicros === '') ? '000000' : (selectedMicros !== '') ? selectedMicros : '999999';
      const dateString = selectedDate + 'T' + time + '.' + micros + 'Z';

      const d = new Date(dateString);
      if (d === "Invalid Date") {
        onDatasetChange({"success": false, "data": null, "error": "Invalid Date"});
      } else {
        const datasetUrl = 'http://localhost:3001/data?date=' + dateString;
        let result = await fetch(datasetUrl);
        result = await result.json();
        onDatasetChange(result);
        onDateTimeStringChange(dateString);
      }
    }
  }

  return (
    <Form className='DateTimeForm'>
      <label>
        Choose a date (and time) between January 2<sup>nd</sup> and
        May 12<sup>th</sup> 2021
        <Popup
          trigger={<Icon name='info circle' data-testid='icon'/>}
          content='The dates are treated as UTC'
          position='right center'
        />
      </label>
      <div className='FormGroup'>
        <Form.Input
          label='Date'
          type='date'
          min='2021-01-02'
          max='2021-05-12'
          defaultValue={selectedDate}
          onChange={handleDateChange}
          data-testid='dateInput'
        />
        <Form.Input
          label="Time"
          type='time'
          step='1'
          defaultValue={selectedTime}
          onChange={handleTimeChange}
          data-testid='timeInput'
        />
        <Form.Input
          label="Microseconds"
          type='text'
          maxLength='6'
          defaultValue={selectedMicros}
          onChange={handleMicrosChange}
          data-testid='microsInput'
        />
        <Button type='submit' onClick={handleSubmit}>Show data for chosen date</Button>
      </div>

    </Form>
  )
}

export default DateTimeForm;
