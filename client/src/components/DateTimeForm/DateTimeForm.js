import React from 'react';
import './DateTimeForm.css';


import { Form, Icon, Button, Popup } from 'semantic-ui-react';


const DateTimeForm = ({onDateTimeStringChange, selectedDate, selectedTime, onSelectedDateChange, onSelectedTimeChange}) => {
  const handleDateChange = (e) => {
    onSelectedDateChange(e.target.value);
  }
  const handleTimeChange = (e) => {
    onSelectedTimeChange(e.target.value);
  }
  //2021-01-02T16:25:03.693461Z
  const handleSubmit = () => {
    const time = (selectedTime !== '') ? selectedTime : '23:59:59';
    onDateTimeStringChange(selectedDate + 'T' + time + 'Z');
  }
  return (
    <Form className='DateTimeForm'>
      <label>
        Choose a date and time between January 2<sup>nd</sup> and
        April 12<sup>th</sup> 2021
        <Popup
          trigger={<Icon name='info circle'/>}
          content='Please note that this app uses mock data'
          position='right center'
        />
      </label>
      <Form.Group inline>
        <Form.Input
          label='Date'
          type='date'
          min='2021-01-02'
          max='2021-04-12'
          defaultValue={selectedDate}
          onChange={handleDateChange}
        />
        <Form.Input
          label="Time (optional)"
          type='time'
          step='1'
          defaultValue={selectedTime}
          onChange={handleTimeChange}
        />
        <Button type='submit' onClick={handleSubmit}>Show data for chosen date</Button>
      </Form.Group>

    </Form>
  )
}

export default DateTimeForm;
