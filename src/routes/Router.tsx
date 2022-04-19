import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Appointments from '../pages/appointments/Appointments';
import Register from '../pages/register/Register';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route index element={<Register />} />
      <Route path="/appointments" element={<Appointments />} />
    </Routes>
  </BrowserRouter>
);
export default Router;
