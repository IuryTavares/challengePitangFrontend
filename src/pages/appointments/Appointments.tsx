/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  Badge, Space, Table, Title
} from '@mantine/core';
import axios from '../../services/api';

interface Appointment {
  name: string,
  birthDate: string,
  vaccineDate: string,
  hasVaccined: boolean
}

const Appointment = () => {
  const [appointment, setAppointment] = useState<Appointment[]>([]);

  useEffect(() => {
    axios.get('/appointment').then((response) => setAppointment(response.data));
  }, []);

  return (
    <>
      <Title>
        Appointments
      </Title>

      <Space h="xl" />

      <Table highlightOnHover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Birth Date</th>
            <th>Vaccine Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {appointment.map((appointment, index) => (
            <tr key={index}>
              <td>{appointment.name}</td>
              <td>
                {`${new Date(appointment.birthDate).getDate()}/
                  ${new Date(appointment.birthDate).getMonth() + 1}/
                  ${new Date(appointment.birthDate).getFullYear()}`}
              </td>
              <td>
                {`${new Date(appointment.vaccineDate).getDate()}/
                  ${new Date(appointment.vaccineDate).getMonth() + 1}/
                  ${new Date(appointment.vaccineDate).getFullYear()} -
                  ${new Date(appointment.vaccineDate).getHours()}:00`}
              </td>
              <td>
                <Badge
                  variant="gradient"
                  gradient={{ from: '#6F2DA8', to: '#510F8A', deg: 35 }}
                >
                  {appointment.hasVaccined ? 'Vaccined' : 'No Vaccined'}

                </Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default Appointment;
