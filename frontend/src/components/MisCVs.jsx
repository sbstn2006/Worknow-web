import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './MisCVs.css';

function MisCVs() {
  const [cv, setCV] = useState(null);
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/hojas-de-vida'); // Filtra por el correo del usuario logueado
        setCV(res.data[0]); 
      } catch (error) {
        console.error('Error al cargar CV:', error);
      }
    };
    fetchCV();
  }, []);

  const handleDelete = async () => {
    if (!cv) return;
    if (!window.confirm('¿Estás seguro de eliminar tu hoja de vida?')) return;
    try {
      await axios.delete(`http://localhost:3001/api/hojas-de-vida/${cv.id}`);
      alert('Hoja de vida eliminada.');
      setCV(null);
    } catch (error) {
      console.error('Error al eliminar:', error);
    }
  };

  const handleChange = (e) => {
    setCV({ ...cv, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/api/hojas-de-vida/${cv.id}`, cv);
      alert('Actualizado correctamente');
      setEditando(false);
    } catch (error) {
      console.error('Error al actualizar:', error);
    }
  };

  if (!cv) return <p>No has enviado ninguna hoja de vida aún.</p>;

  return (
    <div className="container">
      <div className="header-content">
        <h2>Mi Hoja de Vida</h2>
        <Link to="/home" className="back-btn">← Volver al Inicio</Link>
      </div>
      {editando ? (
        <>
          <input name="nombre_completo" value={cv.nombre_completo} onChange={handleChange} />
          <input name="correo" value={cv.correo} onChange={handleChange} />
          <input name="telefono" value={cv.telefono} onChange={handleChange} />
          <input name="direccion" value={cv.direccion} onChange={handleChange} />
          <input name="fecha_nacimiento" value={cv.fecha_nacimiento} onChange={handleChange} />
          <input name="nivel_educativo" value={cv.nivel_educativo} onChange={handleChange} />
          <input name="experiencia_anios" value={cv.experiencia_anios} onChange={handleChange} />
          <textarea name="perfil" value={cv.perfil} onChange={handleChange} />
          <button onClick={handleUpdate}>Guardar</button>
          <button onClick={() => setEditando(false)}>Cancelar</button>
        </>
      ) : (
        <div>
          <p><strong>Nombre:</strong> {cv.nombre_completo}</p>
          <p><strong>Correo:</strong> {cv.correo}</p>
          <p><strong>Teléfono:</strong> {cv.telefono}</p>
          <p><strong>Dirección:</strong> {cv.direccion}</p>
          <p><strong>Nacimiento:</strong> {cv.fecha_nacimiento}</p>
          <p><strong>Educación:</strong> {cv.nivel_educativo}</p>
          <p><strong>Experiencia:</strong> {cv.experiencia_anios}</p>
          <p><strong>Perfil:</strong> {cv.perfil}</p>
          <button onClick={() => setEditando(true)}>Editar</button>
          <button onClick={handleDelete}>Eliminar</button>
        </div>
      )}
    </div>
  );
}

export default MisCVs;
