import React, { useState } from 'react';
import './DateTimeForm.css';
import { Form, Input, Icon, Popup } from 'semantic-ui-react';

const DateTimeForm = ({onIsoChange}) => {
  const [selectedDate, setSelectedDate] = useState('2021-01-02');
  const [selectedTime, setSelectedTime] = useState('23:59:59');
  const selectedMicros = '999999';
  const [dateError, setDateError] = useState(null);

  const handleDateChange = (e) => {
    let date = e.target.value;
    if(!date || date.trim() === '') {
      setDateError({
        content: 'Please select a date',
        pointing: 'below'
      })
    } else {
        try {
          const d = new Date(date);

          if(isNaN(d.valueOf())) {
            setDateError({
              content: 'Please select a valid date',
              pointing: 'below'
            })
          } else if (d.valueOf() < 1609545600000 || d.valueOf() >= 1620864000000) {
            setDateError({
              content: 'Please select a date between January 2nd and May 12th 2021',
              pointing: 'below'
            })
          } else {
            onIsoChange(date + 'T' + selectedTime + '.' + selectedMicros + 'Z');
            setSelectedDate(date);
            setDateError(null);
          }
        } catch (e) {
          setDateError({
            content: 'Please select a valid date',
            pointing: 'below'
          })
        }
    }

  }

  const handleTimeChange = (e) => {
    let time = e.target.value;
    if (!time || (time).trim() === '') {
      setSelectedTime('00:00:00');
      onIsoChange(selectedDate + 'T00:00:00.' + selectedMicros + 'Z');
    } else {
      setSelectedTime(time);
      onIsoChange(selectedDate + 'T' + time + '.' + selectedMicros + 'Z');
    }
  }

  return (
    <Form className='DateTimeForm'>
      <label>
        Choose a date and time between January 2<sup>nd</sup> and
        May 12<sup>th</sup> 2021
        <Popup
          trigger={<Icon name='info circle' data-testid='icon'/>}
          content='The dates are treated as UTC'
          position='right center'
        />
      </label>
      <Form.Field
        control={Input}
        label='Date'
        type='date'
        min='2021-01-02'
        max='2021-05-12'
        defaultValue={selectedDate}
        onChange={handleDateChange}
        error={dateError}
        data-testid='dateInput'
      />
      <Form.Field
        control={Input}
        label="Time"
        type='time'
        step='1'
        defaultValue={selectedTime}
        onChange={handleTimeChange}
        data-testid='timeInput'
      />
    </Form>
  )
}

export default DateTimeForm;
