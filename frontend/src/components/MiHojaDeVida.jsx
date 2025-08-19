import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './MiHojaDeVida.css';

function MiHojaDeVida() {
  const [cv, setCv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const navigate = useNavigate();
  const correo = localStorage.getItem('correo');

  useEffect(() => {
    if (!correo) {
      setLoading(false);
      setError('No hay sesión activa. Por favor, sube tu CV primero.');
      return; 
    }

    const fetchCV = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:3001/api/hojas-de-vida/${correo}`);
        setCv(res.data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener CV:', error);
        if (error.response?.status === 404) {
          setError('No se encontró una hoja de vida para tu correo. Por favor, sube tu CV primero.');
        } else {
          setError('Error al cargar tu hoja de vida. Intenta de nuevo.');
        }
        setCv(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, [correo]);

  const handleChange = (e) => {
    setCv({ ...cv, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:3001/api/hojas-de-vida/${cv.id}`, cv);
      alert('CV actualizado correctamente');
      setEditMode(false);
    } catch (error) {
      console.error('Error al actualizar:', error);
      alert('Error al actualizar el CV');
    }
  };

  const handleDelete = async () => {
    if (window.confirm('¿Seguro que quieres eliminar tu hoja de vida?')) {
      try {
        await axios.delete(`http://localhost:3001/api/hojas-de-vida/${cv.id}`);
        setCv(null);
        localStorage.removeItem('correo');
        alert('CV eliminado correctamente');
        navigate('/upload');
      } catch (error) {
        console.error('Error al eliminar:', error);
        alert('Error al eliminar el CV');
      }
    }
  };

  const handleGoToUpload = () => {
    navigate('/upload');
  };

  if (loading) {
    return (
      <div className="container">
        <div className="header-content">
          <h2>Mi Hoja de Vida</h2>
          <Link to="/home" className="back-btn">← Volver al Inicio</Link>
        </div>
        <div className="loading">Cargando tu perfil...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="header-content">
          <h2>Mi Hoja de Vida</h2>
          <Link to="/home" className="back-btn">← Volver al Inicio</Link>
        </div>
        <div className="error-message">
          <p>{error}</p>
          <button onClick={handleGoToUpload} className="upload-btn">
            Subir mi CV
          </button>
        </div>
      </div>
    );
  }

  if (!cv) {
    return (
      <div className="container">
        <div className="header-content">
          <h2>Mi Hoja de Vida</h2>
          <Link to="/home" className="back-btn">← Volver al Inicio</Link>
        </div>
        <div className="no-cv-message">
          <p>No has subido una hoja de vida aún.</p>
          <button onClick={handleGoToUpload} className="upload-btn">
            Subir mi CV
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="header-content">
        <h2>Mi Hoja de Vida</h2>
        <div className="header-buttons">
          <button onClick={() => window.location.reload()} className="refresh-btn">
            🔄 Refrescar
          </button>
          <Link to="/home" className="back-btn">← Volver al Inicio</Link>
        </div>
      </div>
      {editMode ? (
        <>
          <input name="nombre_completo" value={cv.nombre_completo} onChange={handleChange} />
          <input name="telefono" value={cv.telefono} onChange={handleChange} />
          <input name="direccion" value={cv.direccion} onChange={handleChange} />
          <input type="date" name="fecha_nacimiento" value={cv.fecha_nacimiento} onChange={handleChange} />
          <input name="nivel_educativo" value={cv.nivel_educativo} onChange={handleChange} />
          <input name="experiencia_anios" value={cv.experiencia_anios} onChange={handleChange} />
          <textarea name="perfil" value={cv.perfil} onChange={handleChange} />
          <button onClick={handleUpdate}>Guardar cambios</button>
        </>
      ) : (
        <>
          <p><strong>Nombre:</strong> {cv.nombre_completo}</p>
          <p><strong>Teléfono:</strong> {cv.telefono}</p>
          <p><strong>Dirección:</strong> {cv.direccion}</p>
          <p><strong>Nacimiento:</strong> {cv.fecha_nacimiento}</p>
          <p><strong>Educación:</strong> {cv.nivel_educativo}</p>
          <p><strong>Experiencia:</strong> {cv.experiencia_anios}</p>
          <p><strong>Perfil:</strong> {cv.perfil}</p>
          <p><a href={`http://localhost:3001/uploads/${cv.archivo}`} target="_blank" rel="noreferrer">Ver archivo PDF</a></p>
          <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
            ¿Quieres actualizar el archivo PDF? Elimina esta hoja de vida y vuelve a subirla.
          </p>
        </>
      )}
      <br />
      <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Cancelar' : 'Editar'}</button>
      <button onClick={handleDelete} style={{ marginLeft: '10px', backgroundColor: 'red' }}>Eliminar</button>
    </div>
  );
}

export default MiHojaDeVida;
