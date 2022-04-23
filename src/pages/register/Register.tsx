import React, { useState } from 'react';
import { showNotification } from '@mantine/notifications';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from 'date-fns/setHours';
import setMinutes from 'date-fns/setMinutes';

import {
  Button, TextInput, Text, Group
} from '@mantine/core';
import { User } from 'tabler-icons-react';
import axios from '../../services/api';

const Register = () => {
  const hour = new Date().getHours();
  const [birthDate, setBirthDate] = useState(new Date());
  const [vaccineDate, setVaccineDate] = useState(
    setHours(setMinutes(new Date(), 0), hour + 1)
  );
  const [name, setName] = useState<string>();

  const filterPassedTime = (time: Date) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const onSubmit = async () => {
    const appointment = {
      name,
      birthDate: birthDate.toISOString(),
      vaccineDate: vaccineDate.toISOString()
    };

    try {
      await axios.post('/appointment', appointment);
      showNotification({
        message: 'Appointment created with success',
        title: 'Success',
        color: 'green'
      });
    } catch (error) {
      showNotification({
        message: error.response.data.message,
        title: 'Error',
        color: 'red'
      });
    }
  };

  return (
    <div>
      <Text weight={500} mb={8}>Full name</Text>
      <TextInput
        id="name"
        value={sessionStorage.getItem('name')?.toString() ? sessionStorage.getItem('nameLoad')?.toString() : name}
        mb={8}
        placeholder="Your name"
        required
        icon={<User size={16} />}
        onChange={(event) => {
          setName(event.target.value);
          sessionStorage.setItem('name', event.target.value);
        }}
      />

      <Text weight={500} mb={8}>Birth date</Text>
      <DatePicker
        id="birthDate"
        selected={birthDate}
        onChange={(date) => date && setBirthDate(date)}
      />

      <Text weight={500} mb={8} mt={8}>Vaccine appointments</Text>
      <DatePicker
        id="vaccineDate"
        selected={vaccineDate}
        onChange={(date) => (date) && setVaccineDate(date)}
        minDate={new Date()}
        showTimeSelect
        onChangeRaw={(e) => e.preventDefault()}
        timeIntervals={60}
        filterTime={filterPassedTime}
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy HH:mm"
      />

      <Group mt={16}>
        <Button onClick={onSubmit}>Submit</Button>
      </Group>

    </div>
  );
};

export default Register;
