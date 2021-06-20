import React, { useState } from 'react';
import './DateTimeForm.css';

import { Form, Icon, Button, Popup } from 'semantic-ui-react';


const DateTimeForm = () => {
  const [selectedDate, setSelectedDate] = useState('2021-01-02');
  const [selectedTime, setSelectedTime] = useState('');
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
          onChange={e => setSelectedDate(e.target.value)}
        />
        <Form.Input
          label="Time (optional)"
          type='time'
          step='1'
          defaultValue={selectedTime}
          onChange={e => setSelectedTime(e.target.value)}
        />
        <Button type='submit'>Submit</Button>
      </Form.Group>

    </Form>
  )
}

export default DateTimeForm;
