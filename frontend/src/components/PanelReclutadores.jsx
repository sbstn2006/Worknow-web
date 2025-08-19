// src/components/PanelReclutadores.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PanelReclutadores.css';

function PanelReclutadores() {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCV, setSelectedCV] = useState(null);
  const [filterStatus, setFilterStatus] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchCVs();
  }, []);

  const fetchCVs = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/hojas-de-vida');
      // Agregar estado y comentarios simulados para demostración
      const cvsWithStatus = response.data.map(cv => ({
        ...cv,
        estado: cv.estado || 'pendiente',
        comentarios: cv.comentarios || [],
        rating: cv.rating || 0,
        fecha_revision: cv.fecha_revision || null
      }));
      setCvs(cvsWithStatus);
    } catch (error) {
      console.log('Usando datos simulados para el panel de reclutadores');
      // Datos simulados para demostración
      setCvs([
        {
          id: 1,
          nombre_completo: 'Juan Pérez',
          correo: 'juan.perez@email.com',
          telefono: '3001234567',
          experiencia_anios: 5,
          nivel_educativo: 'Universitario',
          estado: 'pendiente',
          comentarios: [],
          rating: 0,
          fecha_revision: null
        },
        {
          id: 2,
          nombre_completo: 'María García',
          correo: 'maria.garcia@email.com',
          telefono: '3009876543',
          experiencia_anios: 3,
          nivel_educativo: 'Técnico',
          estado: 'revisado',
          comentarios: ['Excelente perfil técnico', 'Buena experiencia en el área'],
          rating: 4,
          fecha_revision: '2024-01-15'
        },
        {
          id: 3,
          nombre_completo: 'Carlos López',
          correo: 'carlos.lopez@email.com',
          telefono: '3005555555',
          experiencia_anios: 7,
          nivel_educativo: 'Universitario',
          estado: 'aprobado',
          comentarios: ['Perfil muy completo', 'Experiencia sólida'],
          rating: 5,
          fecha_revision: '2024-01-10'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateCVStatus = async (cvId, newStatus) => {
    try {
      await axios.put(`http://localhost:3001/api/hojas-de-vida/${cvId}/estado`, {
        estado: newStatus,
        fecha_revision: new Date().toISOString()
      });
      
      setCvs(prevCvs => 
        prevCvs.map(cv => 
          cv.id === cvId 
            ? { ...cv, estado: newStatus, fecha_revision: new Date().toISOString() }
            : cv
        )
      );
    } catch (error) {
      console.log('Actualizando estado localmente');
      setCvs(prevCvs => 
        prevCvs.map(cv => 
          cv.id === cvId 
            ? { ...cv, estado: newStatus, fecha_revision: new Date().toISOString() }
            : cv
        )
      );
    }
  };

  const addComment = async (cvId) => {
    if (!comment.trim()) return;

    const newComment = {
      id: Date.now(),
      texto: comment,
      fecha: new Date().toISOString(),
      autor: 'Reclutador'
    };

    try {
      await axios.post(`http://localhost:3001/api/hojas-de-vida/${cvId}/comentarios`, {
        comentario: comment
      });
    } catch (error) {
      console.log('Agregando comentario localmente');
    }

    setCvs(prevCvs => 
      prevCvs.map(cv => 
        cv.id === cvId 
          ? { ...cv, comentarios: [...cv.comentarios, newComment] }
          : cv
      )
    );

    setComment('');
    setShowModal(false);
  };

  const updateRating = async (cvId, newRating) => {
    try {
      await axios.put(`http://localhost:3001/api/hojas-de-vida/${cvId}/rating`, {
        rating: newRating
      });
    } catch (error) {
      console.log('Actualizando rating localmente');
    }

    setCvs(prevCvs => 
      prevCvs.map(cv => 
        cv.id === cvId 
          ? { ...cv, rating: newRating }
          : cv
      )
    );
  };

  const filteredCVs = cvs.filter(cv => {
    const matchesStatus = filterStatus === 'todos' || cv.estado === filterStatus;
    const matchesSearch = cv.nombre_completo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cv.correo.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente': return 'warning';
      case 'revisado': return 'info';
      case 'aprobado': return 'success';
      case 'rechazado': return 'danger';
      default: return 'secondary';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pendiente': return '⏳ Pendiente';
      case 'revisado': return '👁️ Revisado';
      case 'aprobado': return '✅ Aprobado';
      case 'rechazado': return '❌ Rechazado';
      default: return status;
    }
  };

  if (loading) {
    return (
      <div className="panel-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando panel de reclutadores...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="panel-container">
      <header className="panel-header">
        <div className="header-content">
          <div>
            <h1>🎯 Panel de Reclutadores</h1>
            <p>Gestiona y evalúa las hojas de vida de los candidatos</p>
          </div>
          <Link to="/home" className="back-btn">← Volver al Inicio</Link>
        </div>
      </header>

      {/* Filtros y Búsqueda */}
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Buscar por nombre o correo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="status-filters">
          <button
            className={`filter-btn ${filterStatus === 'todos' ? 'active' : ''}`}
            onClick={() => setFilterStatus('todos')}
          >
            Todos ({cvs.length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'pendiente' ? 'active' : ''}`}
            onClick={() => setFilterStatus('pendiente')}
          >
            Pendientes ({cvs.filter(cv => cv.estado === 'pendiente').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'revisado' ? 'active' : ''}`}
            onClick={() => setFilterStatus('revisado')}
          >
            Revisados ({cvs.filter(cv => cv.estado === 'revisado').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'aprobado' ? 'active' : ''}`}
            onClick={() => setFilterStatus('aprobado')}
          >
            Aprobados ({cvs.filter(cv => cv.estado === 'aprobado').length})
          </button>
          <button
            className={`filter-btn ${filterStatus === 'rechazado' ? 'active' : ''}`}
            onClick={() => setFilterStatus('rechazado')}
          >
            Rechazados ({cvs.filter(cv => cv.estado === 'rechazado').length})
          </button>
        </div>
      </div>

      {/* Lista de CVs */}
      <div className="cvs-grid">
        {filteredCVs.map(cv => (
          <div key={cv.id} className="cv-card">
            <div className="cv-header">
              <h3>{cv.nombre_completo}</h3>
              <span className={`status-badge ${getStatusColor(cv.estado)}`}>
                {getStatusLabel(cv.estado)}
              </span>
            </div>

            <div className="cv-info">
              <p><strong>📧 Email:</strong> {cv.correo}</p>
              <p><strong>📱 Teléfono:</strong> {cv.telefono}</p>
              <p><strong>🎓 Educación:</strong> {cv.nivel_educativo}</p>
              <p><strong>💼 Experiencia:</strong> {cv.experiencia_anios} años</p>
              {cv.fecha_revision && (
                <p><strong>📅 Fecha revisión:</strong> {new Date(cv.fecha_revision).toLocaleDateString()}</p>
              )}
            </div>

            {/* Rating */}
            <div className="rating-section">
              <label>Calificación:</label>
              <div className="stars">
                {[1, 2, 3, 4, 5].map(star => (
                  <button
                    key={star}
                    className={`star ${star <= cv.rating ? 'filled' : ''}`}
                    onClick={() => updateRating(cv.id, star)}
                  >
                    ⭐
                  </button>
                ))}
                <span className="rating-text">({cv.rating}/5)</span>
              </div>
            </div>

            {/* Comentarios */}
            {cv.comentarios.length > 0 && (
              <div className="comments-section">
                <h4>💬 Comentarios:</h4>
                {cv.comentarios.map((comment, index) => (
                  <div key={index} className="comment">
                    <p>{comment.texto || comment}</p>
                    <small>{comment.fecha ? new Date(comment.fecha).toLocaleDateString() : ''}</small>
                  </div>
                ))}
              </div>
            )}

            {/* Acciones */}
            <div className="cv-actions">
              <button
                className="btn-primary"
                onClick={() => setSelectedCV(cv)}
              >
                📋 Ver Detalles
              </button>
              
              <button
                className="btn-secondary"
                onClick={() => setShowModal(true)}
              >
                💬 Agregar Comentario
              </button>

              <div className="status-actions">
                <button
                  className="btn-success"
                  onClick={() => updateCVStatus(cv.id, 'aprobado')}
                  disabled={cv.estado === 'aprobado'}
                >
                  ✅ Aprobar
                </button>
                <button
                  className="btn-warning"
                  onClick={() => updateCVStatus(cv.id, 'revisado')}
                  disabled={cv.estado === 'revisado'}
                >
                  👁️ Marcar Revisado
                </button>
                <button
                  className="btn-danger"
                  onClick={() => updateCVStatus(cv.id, 'rechazado')}
                  disabled={cv.estado === 'rechazado'}
                >
                  ❌ Rechazar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal para agregar comentario */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h3>💬 Agregar Comentario</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu comentario o feedback..."
              rows="4"
              className="comment-textarea"
            />
            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => addComment(selectedCV?.id || cvs[0]?.id)}
              >
                Agregar Comentario
              </button>
              <button
                className="btn-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de detalles del CV */}
      {selectedCV && (
        <div className="modal-overlay" onClick={() => setSelectedCV(null)}>
          <div className="modal-content large" onClick={e => e.stopPropagation()}>
            <h3>📋 Detalles del CV - {selectedCV.nombre_completo}</h3>
            
            <div className="cv-details">
              <div className="detail-row">
                <strong>Nombre Completo:</strong> {selectedCV.nombre_completo}
              </div>
              <div className="detail-row">
                <strong>Email:</strong> {selectedCV.correo}
              </div>
              <div className="detail-row">
                <strong>Teléfono:</strong> {selectedCV.telefono}
              </div>
              <div className="detail-row">
                <strong>Dirección:</strong> {selectedCV.direccion || 'No especificada'}
              </div>
              <div className="detail-row">
                <strong>Fecha de Nacimiento:</strong> {selectedCV.fecha_nacimiento || 'No especificada'}
              </div>
              <div className="detail-row">
                <strong>Nivel Educativo:</strong> {selectedCV.nivel_educativo}
              </div>
              <div className="detail-row">
                <strong>Experiencia:</strong> {selectedCV.experiencia_anios} años
              </div>
              <div className="detail-row">
                <strong>Perfil:</strong> {selectedCV.perfil || 'No especificado'}
              </div>
              <div className="detail-row">
                <strong>Estado Actual:</strong> 
                <span className={`status-badge ${getStatusColor(selectedCV.estado)}`}>
                  {getStatusLabel(selectedCV.estado)}
                </span>
              </div>
              {selectedCV.fecha_revision && (
                <div className="detail-row">
                  <strong>Última Revisión:</strong> {new Date(selectedCV.fecha_revision).toLocaleDateString()}
                </div>
              )}
            </div>

            <div className="modal-actions">
              <button
                className="btn-primary"
                onClick={() => setSelectedCV(null)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PanelReclutadores;
