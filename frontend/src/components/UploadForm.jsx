import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './UploadForm.css';

function UploadForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre_completo: '',
    correo: '',
    telefono: '',
    direccion: '',
    fecha_nacimiento: '',
    nivel_educativo: '',
    experiencia_anios: '',
    perfil: '',
    archivo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, archivo: e.target.files[0] });
  };

  const clearForm = () => {
    setFormData({
      nombre_completo: '',
      correo: '',
      telefono: '',
      direccion: '',
      fecha_nacimiento: '',
      nivel_educativo: '',
      experiencia_anios: '',
      perfil: '',
      archivo: null
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    try {
      await axios.post('http://localhost:3001/api/upload', data);
      
      // Guardar el correo en localStorage para que esté disponible en el perfil
      localStorage.setItem('correo', formData.correo);
      
      alert('Hoja de vida enviada correctamente. Redirigiendo a tu perfil...');
      
      // Limpiar el formulario
      clearForm();
      
      // Redirigir al usuario a su perfil después de subir el CV
      setTimeout(() => {
        navigate('/mi-hoja-de-vida');
      }, 1500);
      
    } catch (error) {
      console.error('Error al subir CV:', error);
      alert('Error al subir hoja de vida.');
    }
  };

  return (
    <div className="upload-container">
      <div className="header-content">
        <h2>Subir Hoja de Vida</h2>
        <Link to="/home" className="back-btn">← Volver al Inicio</Link>
      </div>
      <form onSubmit={handleSubmit} className="upload-form">
        <label>Nombre completo *</label>
        <input name="nombre_completo" value={formData.nombre_completo} onChange={handleChange} required />

        <label>Correo *</label>
        <input name="correo" type="email" value={formData.correo} onChange={handleChange} required />

        <label>Teléfono *</label>
        <input name="telefono" value={formData.telefono} onChange={handleChange} required />

        <label>Dirección *</label>
        <input name="direccion" value={formData.direccion} onChange={handleChange} required />

        <label>Fecha de nacimiento *</label>
        <input name="fecha_nacimiento" type="date" value={formData.fecha_nacimiento} onChange={handleChange} required />

        <label>Nivel educativo *</label>
        <input name="nivel_educativo" value={formData.nivel_educativo} onChange={handleChange} required />

        <label>Años de experiencia *</label>
        <input name="experiencia_anios" value={formData.experiencia_anios} onChange={handleChange} required />

        <label>Perfil *</label>
        <textarea name="perfil" value={formData.perfil} onChange={handleChange} required></textarea>

        <label>Archivo PDF *</label>
        <input type="file" name="archivo" accept="application/pdf" onChange={handleFileChange} required />

        <div className="form-buttons">
          <button type="submit">Enviar</button>
          <button type="button" onClick={clearForm} className="clear-btn">Limpiar Formulario</button>
        </div>
      </form>
    </div>
  );
}

export default UploadForm;
