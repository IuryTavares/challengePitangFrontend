/* eslint-disable no-param-reassign */
/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */
import React, { useEffect, useState } from 'react';
import {
  Badge, Space, Table, Title
} from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import axios from '../../services/api';

interface Appointment {
  id: string,
  name: string,
  birthDate: string,
  vaccineDate: string,
  hasVaccined: boolean
}

const Appointment = () => {
  const [appointments, setAppointment] = useState<Appointment[]>([]);

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
          {appointments.map((appointment, index) => (
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
                  onClick={async () => {
                    try {
                      await axios.put(`/appointment/${appointment.id}`, appointment).then((response) => {
                        const appointmentIndex = appointments.findIndex(
                          (element) => element.id === response.data.id
                        );
                        const appointmentsNew = [...appointments];
                        appointmentsNew[appointmentIndex] = response.data;
                        setAppointment(appointmentsNew);
                      });
                      showNotification({
                        message: 'Long live SUS',
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
                  }}
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
