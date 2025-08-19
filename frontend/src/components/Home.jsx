// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
  const [userStats, setUserStats] = useState({
    cvCount: 0,
    applicationsCount: 0,
    notificationsCount: 0,
    lastActivity: null
  });
  const [recentVacancies, setRecentVacancies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simular datos del dashboard (en un proyecto real, estos vendrían de la API)
        const userId = localStorage.getItem('userId') || '1';
        
        // Obtener estadísticas del usuario
        const statsResponse = await axios.get(`http://localhost:3001/api/user-stats/${userId}`);
        setUserStats(statsResponse.data);
        
        // Obtener vacantes recientes
        const vacanciesResponse = await axios.get('http://localhost:3001/api/vacantes');
        setRecentVacancies(vacanciesResponse.data.slice(0, 3)); // Solo las 3 más recientes
        
      } catch (error) {
        console.log('Usando datos simulados para el dashboard');
        // Datos simulados para demostración
        setUserStats({
          cvCount: 2,
          applicationsCount: 5,
          notificationsCount: 3,
          lastActivity: new Date().toLocaleDateString()
        });
        setRecentVacancies([
          { id: 1, titulo: 'Desarrollador Frontend', empresa: 'TechCorp', ubicacion: 'Bogotá' },
          { id: 2, titulo: 'Analista de Datos', empresa: 'DataSoft', ubicacion: 'Medellín' },
          { id: 3, titulo: 'Project Manager', empresa: 'InnovateLab', ubicacion: 'Cali' }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const quickActions = [
    { title: 'Subir CV', icon: '📄', link: '/subir-cv', color: 'primary' },
    { title: 'Ver Vacantes', icon: '💼', link: '/vacantes', color: 'success' },
    { title: 'Mi Perfil', icon: '👤', link: '/mi-cv', color: 'info' },
    { title: 'Búsqueda', icon: '🔍', link: '/busqueda-filtros', color: 'warning' },
    { title: 'Notificaciones', icon: '🔔', link: '/notificaciones', color: 'danger' },
    { title: 'Quiénes Somos', icon: 'ℹ️', link: '/quienes-somos', color: 'secondary' }
  ];

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">WorkNow</h1>
          <div className="user-info">
            <span className="welcome-text">¡Bienvenido de vuelta!</span>
            <Link to="/login" className="logout-btn">Cerrar Sesión</Link>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        {/* Sección de Bienvenida y Estadísticas */}
        <section className="welcome-section">
          <div className="welcome-card">
            <h2>Dashboard Personal</h2>
            <p>Gestiona tu carrera profesional desde un solo lugar</p>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📄</div>
              <div className="stat-content">
                <h3>{userStats.cvCount}</h3>
                <p>CVs Subidos</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-content">
                <h3>{userStats.applicationsCount}</h3>
                <p>Postulaciones</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">🔔</div>
              <div className="stat-content">
                <h3>{userStats.notificationsCount}</h3>
                <p>Notificaciones</p>
              </div>
            </div>
            
            <div className="stat-card">
              <div className="stat-icon">📅</div>
              <div className="stat-content">
                <h3>{userStats.lastActivity}</h3>
                <p>Última Actividad</p>
              </div>
            </div>
          </div>
        </section>

        {/* Accesos Rápidos */}
        <section className="quick-actions-section">
          <h3>Accesos Rápidos</h3>
          <div className="quick-actions-grid">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link} className={`quick-action-card ${action.color}`}>
                <div className="action-icon">{action.icon}</div>
                <h4>{action.title}</h4>
              </Link>
            ))}
          </div>
        </section>

        {/* Vacantes Recientes */}
        <section className="recent-vacancies-section">
          <h3>Vacantes Recientes</h3>
          <div className="vacancies-grid">
            {recentVacancies.map((vacancy) => (
              <div key={vacancy.id} className="vacancy-card">
                <h4>{vacancy.titulo}</h4>
                <p className="company">{vacancy.empresa}</p>
                <p className="location">📍 {vacancy.ubicacion}</p>
                <Link to="/vacantes" className="view-more-btn">Ver más vacantes</Link>
              </div>
            ))}
          </div>
        </section>

        {/* Actividad Reciente */}
        <section className="recent-activity-section">
          <h3>Actividad Reciente</h3>
          <div className="activity-timeline">
            <div className="activity-item">
              <div className="activity-icon">📤</div>
              <div className="activity-content">
                <p>Subiste tu CV actualizado</p>
                <span className="activity-time">Hace 2 horas</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">📝</div>
              <div className="activity-content">
                <p>Te postulaste a "Desarrollador Frontend"</p>
                <span className="activity-time">Ayer</span>
              </div>
            </div>
            
            <div className="activity-item">
              <div className="activity-icon">👁️</div>
              <div className="activity-content">
                <p>Revisaste 5 nuevas vacantes</p>
                <span className="activity-time">Hace 3 días</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Home;
