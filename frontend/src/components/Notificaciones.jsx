import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Notificaciones.css';

function Notificaciones() {
  const [notificaciones, setNotificaciones] = useState([]);
  const [notificacionesNoLeidas, setNotificacionesNoLeidas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('todas');
  const [preferencias, setPreferencias] = useState({
    email: true,
    push: true,
    vacantes: true,
    postulaciones: true,
    mensajes: true
  });

  useEffect(() => {
    cargarNotificaciones();
    cargarPreferencias();
    // Simular notificaciones en tiempo real
    const interval = setInterval(simularNotificacion, 30000); // Cada 30 segundos
    return () => clearInterval(interval);
  }, []);

  const cargarNotificaciones = async () => {
    try {
      setLoading(true);
      // Simular datos de notificaciones (en un proyecto real vendrían de la API)
      const notificacionesSimuladas = [
        {
          id: 1,
          tipo: 'postulacion',
          titulo: 'Postulación Revisada',
          mensaje: 'Tu CV para "Desarrollador Frontend" ha sido revisado por la empresa.',
          fecha: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
          leida: false,
          prioridad: 'alta'
        },
        {
          id: 2,
          tipo: 'vacante',
          titulo: 'Nueva Vacante Disponible',
          mensaje: 'Se ha publicado una nueva vacante de "Diseñador UX/UI" que coincide con tu perfil.',
          fecha: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
          leida: true,
          prioridad: 'media'
        },
        {
          id: 3,
          tipo: 'mensaje',
          titulo: 'Mensaje del Reclutador',
          mensaje: 'El reclutador de Google ha enviado un mensaje sobre tu postulación.',
          fecha: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 día atrás
          leida: false,
          prioridad: 'alta'
        },
        {
          id: 4,
          tipo: 'sistema',
          titulo: 'Actualización del Sistema',
          mensaje: 'Hemos actualizado nuestro sistema de búsqueda de empleo.',
          fecha: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 días atrás
          leida: true,
          prioridad: 'baja'
        }
      ];
      
      setNotificaciones(notificacionesSimuladas);
      setNotificacionesNoLeidas(notificacionesSimuladas.filter(n => !n.leida));
    } catch (error) {
      console.error('Error cargando notificaciones:', error);
    } finally {
      setLoading(false);
    }
  };

  const cargarPreferencias = async () => {
    try {
      // En un proyecto real, esto vendría de la API
      const prefsGuardadas = localStorage.getItem('preferenciasNotificaciones');
      if (prefsGuardadas) {
        setPreferencias(JSON.parse(prefsGuardadas));
      }
    } catch (error) {
      console.error('Error cargando preferencias:', error);
    }
  };

  const simularNotificacion = () => {
    const nuevasNotificaciones = [
      'Nueva vacante de "Desarrollador Backend" disponible',
      'Tu CV ha sido visto por 3 empresas',
      'Actualización en el estado de tu postulación',
      'Recomendación de vacante personalizada'
    ];
    
    const notificacionAleatoria = nuevasNotificaciones[Math.floor(Math.random() * nuevasNotificaciones.length)];
    
    const nuevaNotif = {
      id: Date.now(),
      tipo: 'sistema',
      titulo: 'Notificación en Tiempo Real',
      mensaje: notificacionAleatoria,
      fecha: new Date(),
      leida: false,
      prioridad: 'media'
    };
    
    setNotificaciones(prev => [nuevaNotif, ...prev]);
    setNotificacionesNoLeidas(prev => [nuevaNotif, ...prev]);
  };

  const marcarComoLeida = async (id) => {
    try {
      // En un proyecto real, esto se enviaría a la API
      setNotificaciones(prev => 
        prev.map(n => n.id === id ? { ...n, leida: true } : n)
      );
      setNotificacionesNoLeidas(prev => 
        prev.filter(n => n.id !== id)
      );
    } catch (error) {
      console.error('Error marcando notificación como leída:', error);
    }
  };

  const marcarTodasComoLeidas = async () => {
    try {
      setNotificaciones(prev => 
        prev.map(n => ({ ...n, leida: true }))
      );
      setNotificacionesNoLeidas([]);
    } catch (error) {
      console.error('Error marcando todas como leídas:', error);
    }
  };

  const eliminarNotificacion = async (id) => {
    try {
      setNotificaciones(prev => prev.filter(n => n.id !== id));
      setNotificacionesNoLeidas(prev => prev.filter(n => n.id !== id));
    } catch (error) {
      console.error('Error eliminando notificación:', error);
    }
  };

  const actualizarPreferencias = async (nuevaPreferencias) => {
    try {
      setPreferencias(nuevaPreferencias);
      localStorage.setItem('preferenciasNotificaciones', JSON.stringify(nuevaPreferencias));
      // En un proyecto real, esto se enviaría a la API
    } catch (error) {
      console.error('Error actualizando preferencias:', error);
    }
  };

  const obtenerIconoTipo = (tipo) => {
    switch (tipo) {
      case 'postulacion': return '📝';
      case 'vacante': return '💼';
      case 'mensaje': return '💬';
      case 'sistema': return '⚙️';
      default: return '🔔';
    }
  };

  const obtenerColorPrioridad = (prioridad) => {
    switch (prioridad) {
      case 'alta': return '#ff4757';
      case 'media': return '#ffa502';
      case 'baja': return '#2ed573';
      default: return '#747d8c';
    }
  };

  const formatearFecha = (fecha) => {
    const ahora = new Date();
    const diff = ahora - fecha;
    const minutos = Math.floor(diff / (1000 * 60));
    const horas = Math.floor(diff / (1000 * 60 * 60));
    const dias = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutos < 60) return `Hace ${minutos} min`;
    if (horas < 24) return `Hace ${horas} horas`;
    if (dias < 7) return `Hace ${dias} días`;
    return fecha.toLocaleDateString();
  };

  const notificacionesFiltradas = activeTab === 'todas' 
    ? notificaciones 
    : activeTab === 'no-leidas' 
    ? notificacionesNoLeidas 
    : notificaciones.filter(n => n.tipo === activeTab);

  if (loading) {
    return (
      <div className="notificaciones-container">
        <div className="loading">Cargando notificaciones...</div>
      </div>
    );
  }

  return (
    <div className="notificaciones-container">
      <header className="header">
        <h1 className="logo">WorkNow</h1>
        <Link to="/home" className="back-btn">← Volver al Inicio</Link>
      </header>

      <main className="main-content">
        <div className="notificaciones-header">
          <h2>Sistema de Notificaciones</h2>
          <div className="stats">
            <span className="stat-item">
              📊 Total: {notificaciones.length}
            </span>
            <span className="stat-item unread">
              🔴 No leídas: {notificacionesNoLeidas.length}
            </span>
          </div>
        </div>

        {/* Tabs de navegación */}
        <div className="tabs-container">
          <button 
            className={`tab ${activeTab === 'todas' ? 'active' : ''}`}
            onClick={() => setActiveTab('todas')}
          >
            Todas ({notificaciones.length})
          </button>
          <button 
            className={`tab ${activeTab === 'no-leidas' ? 'active' : ''}`}
            onClick={() => setActiveTab('no-leidas')}
          >
            No Leídas ({notificacionesNoLeidas.length})
          </button>
          <button 
            className={`tab ${activeTab === 'postulacion' ? 'active' : ''}`}
            onClick={() => setActiveTab('postulacion')}
          >
            Postulaciones
          </button>
          <button 
            className={`tab ${activeTab === 'vacante' ? 'active' : ''}`}
            onClick={() => setActiveTab('vacante')}
          >
            Vacantes
          </button>
          <button 
            className={`tab ${activeTab === 'mensaje' ? 'active' : ''}`}
            onClick={() => setActiveTab('mensaje')}
          >
            Mensajes
          </button>
          <button 
            className={`tab ${activeTab === 'sistema' ? 'active' : ''}`}
            onClick={() => setActiveTab('sistema')}
          >
            Sistema
          </button>
        </div>

        {/* Acciones rápidas */}
        <div className="quick-actions">
          <button 
            onClick={marcarTodasComoLeidas}
            className="action-btn mark-all-read"
            disabled={notificacionesNoLeidas.length === 0}
          >
            ✅ Marcar todas como leídas
          </button>
          <button 
            onClick={simularNotificacion}
            className="action-btn simulate"
          >
            🔔 Simular notificación
          </button>
        </div>

        {/* Lista de notificaciones */}
        <div className="notificaciones-list">
          {notificacionesFiltradas.length === 0 ? (
            <div className="no-notifications">
              <p>No hay notificaciones en esta categoría.</p>
            </div>
          ) : (
            notificacionesFiltradas.map((notif) => (
              <div 
                key={notif.id} 
                className={`notificacion-card ${!notif.leida ? 'unread' : ''}`}
              >
                <div className="notificacion-icon">
                  {obtenerIconoTipo(notif.tipo)}
                </div>
                
                <div className="notificacion-content">
                  <div className="notificacion-header">
                    <h4>{notif.titulo}</h4>
                    <div className="notificacion-meta">
                      <span 
                        className="prioridad-badge"
                        style={{ backgroundColor: obtenerColorPrioridad(notif.prioridad) }}
                      >
                        {notif.prioridad}
                      </span>
                      <span className="fecha">{formatearFecha(notif.fecha)}</span>
                    </div>
                  </div>
                  
                  <p className="mensaje">{notif.mensaje}</p>
                  
                  <div className="notificacion-actions">
                    {!notif.leida && (
                      <button 
                        onClick={() => marcarComoLeida(notif.id)}
                        className="action-btn mark-read"
                      >
                        Marcar como leída
                      </button>
                    )}
                    <button 
                      onClick={() => eliminarNotificacion(notif.id)}
                      className="action-btn delete"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Configuración de preferencias */}
        <div className="preferencias-section">
          <h3>Configuración de Notificaciones</h3>
          <div className="preferencias-grid">
            <div className="preferencia-item">
              <label>
                <input
                  type="checkbox"
                  checked={preferencias.email}
                  onChange={(e) => actualizarPreferencias({
                    ...preferencias,
                    email: e.target.checked
                  })}
                />
                Notificaciones por Email
              </label>
            </div>
            
            <div className="preferencia-item">
              <label>
                <input
                  type="checkbox"
                  checked={preferencias.push}
                  onChange={(e) => actualizarPreferencias({
                    ...preferencias,
                    push: e.target.checked
                  })}
                />
                Notificaciones Push
              </label>
            </div>
            
            <div className="preferencia-item">
              <label>
                <input
                  type="checkbox"
                  checked={preferencias.vacantes}
                  onChange={(e) => actualizarPreferencias({
                    ...preferencias,
                    vacantes: e.target.checked
                  })}
                />
                Nuevas Vacantes
              </label>
            </div>
            
            <div className="preferencia-item">
              <label>
                <input
                  type="checkbox"
                  checked={preferencias.postulaciones}
                  onChange={(e) => actualizarPreferencias({
                    ...preferencias,
                    postulaciones: e.target.checked
                  })}
                />
                Estado de Postulaciones
              </label>
            </div>
            
            <div className="preferencia-item">
              <label>
                <input
                  type="checkbox"
                  checked={preferencias.mensajes}
                  onChange={(e) => actualizarPreferencias({
                    ...preferencias,
                    mensajes: e.target.checked
                  })}
                />
                Mensajes de Reclutadores
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Notificaciones;
