// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import UploadForm from './components/UploadForm';
import MiHojaDeVida from './components/MiHojaDeVida';
import Vacantes from './components/Vacantes';
import Footer from './components/Footer';
import QuienesSomos from './components/QuienesSomos';
import BusquedaFiltros from './components/BusquedaFiltros';
import Notificaciones from './components/Notificaciones';

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/vacantes" element={<Vacantes />} />
            <Route path="/subir-cv" element={<UploadForm />} />
            <Route path="/mi-cv" element={<MiHojaDeVida />} />
            <Route path="/quienes-somos" element={<QuienesSomos />} />
            <Route path="/busqueda-filtros" element={<BusquedaFiltros />} />
            <Route path="/notificaciones" element={<Notificaciones />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
