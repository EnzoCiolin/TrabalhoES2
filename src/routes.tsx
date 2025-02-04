import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignupForm from './pages/Cadastro/index'; // Página de Login/Cadastro
import App from './pages/Home/App'; // Menu principal (página pós-login)
import HomeAdmin from './pages/HomeAdmin';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<SignupForm />} />
      <Route path="/menu" element={<App />} />
      <Route path="/homeAdmin" element={<HomeAdmin />} />
    </Routes>
  );
};

export default AppRoutes;
