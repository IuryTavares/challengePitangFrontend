import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout/Layout';

import Appointments from '../pages/appointments/Appointments';
import Register from '../pages/register/Register';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Register />} />
        <Route path="/appointments" element={<Appointments />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
export default Router;
