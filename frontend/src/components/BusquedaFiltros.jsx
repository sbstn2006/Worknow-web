import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BusquedaFiltros.css';

function BusquedaFiltros() {
  const [vacantes, setVacantes] = useState([]);
  const [filteredVacantes, setFilteredVacantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    categoria: '',
    ubicacion: '',
    tipoContrato: '',
    experiencia: '',
    salario: ''
  });

  useEffect(() => {
    cargarVacantes();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [searchTerm, filters, vacantes]);

  const cargarVacantes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/vacantes');
      setVacantes(response.data);
      setFilteredVacantes(response.data);
    } catch (error) {
      console.error('Error cargando vacantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const aplicarFiltros = () => {
    let resultado = [...vacantes];

    // Filtro por término de búsqueda
    if (searchTerm) {
      resultado = resultado.filter(vacante =>
        (vacante.titulo?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (vacante.empresa?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (vacante.descripcion?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      );
    }

    // Filtros adicionales
    if (filters.categoria) {
      resultado = resultado.filter(vacante => vacante.categoria === filters.categoria);
    }

    if (filters.ubicacion) {
      resultado = resultado.filter(vacante => vacante.ubicacion === filters.ubicacion);
    }

    if (filters.tipoContrato) {
      resultado = resultado.filter(vacante => vacante.tipoContrato === filters.tipoContrato);
    }

    if (filters.experiencia) {
      resultado = resultado.filter(vacante => vacante.experiencia === filters.experiencia);
    }

    if (filters.salario) {
      resultado = resultado.filter(vacante => {
        const salarioVacante = parseInt(vacante.salario) || 0;
        switch (filters.salario) {
          case '0-1000000':
            return salarioVacante <= 1000000;
          case '1000000-2000000':
            return salarioVacante > 1000000 && salarioVacante <= 2000000;
          case '2000000-3000000':
            return salarioVacante > 2000000 && salarioVacante <= 3000000;
          case '3000000+':
            return salarioVacante > 3000000;
          default:
            return true;
        }
      });
    }

    setFilteredVacantes(resultado);
  };

  const limpiarFiltros = () => {
    setSearchTerm('');
    setFilters({
      categoria: '',
      ubicacion: '',
      tipoContrato: '',
      experiencia: '',
      salario: ''
    });
  };

  const postularVacante = async (idVacante) => {
    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (!usuario) {
        alert('Debes iniciar sesión para postular');
        return;
      }

      await axios.post('http://localhost:3001/api/postular', {
        idUsuario: usuario.id,
        idVacante: idVacante
      });

      alert('¡Postulación enviada exitosamente!');
    } catch (error) {
      console.error('Error postulando:', error);
      alert('Error al enviar la postulación');
    }
  };

  const categorias = ['Desarrollo Web', 'Diseño', 'Marketing', 'Ventas', 'Administración', 'Recursos Humanos'];
  const ubicaciones = ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Remoto'];
  const tiposContrato = ['Tiempo Completo', 'Medio Tiempo', 'Por Proyecto', 'Freelance'];
  const experiencias = ['Sin Experiencia', '1-2 años', '3-5 años', '5+ años'];

  if (loading) {
    return (
      <div className="busqueda-container">
        <div className="loading">Cargando vacantes...</div>
      </div>
    );
  }

  return (
    <div className="busqueda-container">
      <header className="header">
        <h1 className="logo">WorkNow</h1>
        <Link to="/home" className="back-btn">← Volver al Inicio</Link>
      </header>

      <main className="main-content">
        <div className="search-section">
          <h2>Buscar y Filtrar Vacantes</h2>
          
          {/* Barra de búsqueda principal */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Buscar por título, empresa o descripción..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button className="search-btn">🔍</button>
          </div>

          {/* Filtros avanzados */}
          <div className="filters-section">
            <h3>Filtros Avanzados</h3>
            <div className="filters-grid">
              <div className="filter-group">
                <label>Categoría:</label>
                <select
                  value={filters.categoria}
                  onChange={(e) => setFilters({...filters, categoria: e.target.value})}
                >
                  <option value="">Todas las categorías</option>
                  {categorias.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Ubicación:</label>
                <select
                  value={filters.ubicacion}
                  onChange={(e) => setFilters({...filters, ubicacion: e.target.value})}
                >
                  <option value="">Todas las ubicaciones</option>
                  {ubicaciones.map(ub => (
                    <option key={ub} value={ub}>{ub}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Tipo de Contrato:</label>
                <select
                  value={filters.tipoContrato}
                  onChange={(e) => setFilters({...filters, tipoContrato: e.target.value})}
                >
                  <option value="">Todos los tipos</option>
                  {tiposContrato.map(tipo => (
                    <option key={tipo} value={tipo}>{tipo}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Experiencia:</label>
                <select
                  value={filters.experiencia}
                  onChange={(e) => setFilters({...filters, experiencia: e.target.value})}
                >
                  <option value="">Cualquier experiencia</option>
                  {experiencias.map(exp => (
                    <option key={exp} value={exp}>{exp}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Rango Salarial:</label>
                <select
                  value={filters.salario}
                  onChange={(e) => setFilters({...filters, salario: e.target.value})}
                >
                  <option value="">Cualquier salario</option>
                  <option value="0-1000000">$0 - $1,000,000</option>
                  <option value="1000000-2000000">$1,000,000 - $2,000,000</option>
                  <option value="2000000-3000000">$2,000,000 - $3,000,000</option>
                  <option value="3000000+">$3,000,000+</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button onClick={limpiarFiltros} className="clear-filters-btn">
                Limpiar Filtros
              </button>
              <span className="results-count">
                {filteredVacantes.length} vacantes encontradas
              </span>
            </div>
          </div>
        </div>

        {/* Resultados de la búsqueda */}
        <div className="results-section">
          <h3>Resultados de la Búsqueda</h3>
          
          {filteredVacantes.length === 0 ? (
            <div className="no-results">
              <p>No se encontraron vacantes con los criterios especificados.</p>
              <button onClick={limpiarFiltros} className="try-again-btn">
                Intentar con otros filtros
              </button>
            </div>
          ) : (
            <div className="vacantes-grid">
              {filteredVacantes.map((vacante) => (
                <div key={vacante.id} className="vacante-card">
                  <div className="vacante-header">
                    <h4>{vacante.titulo || 'Sin título'}</h4>
                    <span className="empresa">{vacante.empresa || 'Empresa no especificada'}</span>
                  </div>
                  
                  <div className="vacante-details">
                    <p className="descripcion">{vacante.descripcion || 'Sin descripción disponible'}</p>
                    <div className="tags">
                      <span className="tag categoria">{vacante.categoria || 'Sin categoría'}</span>
                      <span className="tag ubicacion">{vacante.ubicacion || 'Ubicación no especificada'}</span>
                      <span className="tag contrato">{vacante.tipoContrato || 'Tipo de contrato no especificado'}</span>
                    </div>
                    <div className="info-row">
                      <span>💰 ${vacante.salario?.toLocaleString() || 'No especificado'}</span>
                      <span>📅 {vacante.experiencia || 'No especificada'}</span>
                    </div>
                  </div>
                  
                  <div className="vacante-actions">
                    <button 
                      onClick={() => postularVacante(vacante.id)}
                      className="postular-btn"
                    >
                      Postular
                    </button>
                    <button className="ver-detalles-btn">
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default BusquedaFiltros;
