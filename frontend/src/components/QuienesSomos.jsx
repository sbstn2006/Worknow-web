import React from 'react';
import { Link } from 'react-router-dom';
import './QuienesSomos.css';

function QuienesSomos() {
  return (
    <div className="quienes-somos-container">
      <header className="header">
        <h1 className="logo">WorkNow</h1>
        <Link to="/home" className="back-btn">← Volver al Inicio</Link>
      </header>

      <main className="main-content">
        <div className="hero-section">
          <h2>¿Quiénes Somos?</h2>
          <p className="tagline">Conectando talento con oportunidades</p>
        </div>

        <div className="content-sections">
          <section className="mission-section">
            <h3>Nuestra Misión</h3>
            <p>
              Facilitar la conexión entre profesionales talentosos y empresas innovadoras, 
              creando un ecosistema donde el talento encuentre su lugar ideal y las 
              organizaciones accedan a los mejores recursos humanos.
            </p>
          </section>

          <section className="vision-section">
            <h3>Nuestra Visión</h3>
            <p>
              Ser la plataforma líder en Latinoamérica para la gestión de talento, 
              reconocida por su innovación, transparencia y capacidad de generar 
              conexiones significativas entre personas y organizaciones.
            </p>
          </section>

          <section className="values-section">
            <h3>Nuestros Valores</h3>
            <div className="values-grid">
              <div className="value-item">
                <h4>Innovación</h4>
                <p>Utilizamos tecnología de vanguardia para mejorar la experiencia del usuario</p>
              </div>
              <div className="value-item">
                <h4>Transparencia</h4>
                <p>Procesos claros y comunicación honesta en todas nuestras interacciones</p>
              </div>
              <div className="value-item">
                <h4>Excelencia</h4>
                <p>Comprometidos con la calidad en cada aspecto de nuestro servicio</p>
              </div>
              <div className="value-item">
                <h4>Confianza</h4>
                <p>Construimos relaciones duraderas basadas en la confianza mutua</p>
              </div>
            </div>
          </section>

          <section className="services-section">
            <h3>Nuestros Servicios</h3>
            <div className="services-grid">
              <div className="service-item">
                <h4>Gestión de CVs</h4>
                <p>Plataforma intuitiva para subir y gestionar hojas de vida</p>
              </div>
              <div className="service-item">
                <h4>Publicación de Vacantes</h4>
                <p>Herramientas para empresas para publicar y gestionar ofertas laborales</p>
              </div>
              <div className="service-item">
                <h4>Matching Inteligente</h4>
                <p>Algoritmos que conectan candidatos con las mejores oportunidades</p>
              </div>
              <div className="service-item">
                <h4>Seguimiento de Postulaciones</h4>
                <p>Sistema completo para el seguimiento del proceso de selección</p>
              </div>
            </div>
          </section>

          <section className="contact-section">
            <h3>Contáctanos</h3>
            <div className="contact-info">
              <p><strong>Email:</strong> info@worknow.com</p>
              <p><strong>Teléfono:</strong> +57 (1) 123-4567</p>
              <p><strong>Dirección:</strong> Calle 123 #45-67, Bogotá, Colombia</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default QuienesSomos;
