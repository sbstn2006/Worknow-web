import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Vacantes.css';

function Vacantes() {
  const [vacantes, setVacantes] = useState([]);
  const [filteredVacantes, setFilteredVacantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedVacante, setSelectedVacante] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [sortBy, setSortBy] = useState('fecha');
  const [sortOrder, setSortOrder] = useState('desc');

  // Filtros avanzados
  const [filters, setFilters] = useState({
    categoria: '',
    ubicacion: '',
    tipoContrato: '',
    experiencia: '',
    salario: '',
    empresa: ''
  });

  // Opciones para los filtros
  const filterOptions = {
    categorias: ['Desarrollo', 'Diseño', 'Marketing', 'Ventas', 'Administración', 'Recursos Humanos', 'Finanzas', 'Otros'],
    ubicaciones: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga', 'Pereira', 'Manizales', 'Remoto', 'Híbrido'],
    tiposContrato: ['Tiempo Completo', 'Medio Tiempo', 'Por Proyecto', 'Freelance', 'Práctica'],
    experiencias: ['Sin Experiencia', '1-2 años', '3-5 años', '6-10 años', '10+ años'],
    rangosSalario: ['$0 - $1.000.000', '$1.000.000 - $2.000.000', '$2.000.000 - $3.000.000', '$3.000.000 - $5.000.000', '$5.000.000+']
  };

  useEffect(() => {
    fetchVacantes();
    loadFavorites();
  }, []);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [searchTerm, filters, vacantes, sortBy, sortOrder]);

  const fetchVacantes = async () => {
    try {
      setLoading(true);
      const res = await axios.get('http://localhost:3001/api/vacantes');
      
      // Agregar datos simulados si la API no devuelve suficiente información
      const vacantesEnriquecidas = res.data.map(vacante => ({
        ...vacante,
        categoria: vacante.categoria || 'Desarrollo',
        tipoContrato: vacante.tipoContrato || 'Tiempo Completo',
        experiencia: vacante.experiencia || '3-5 años',
        salario: vacante.salario || '2000000',
        empresa: vacante.empresa || 'Empresa S.A.',
        fecha_publicacion: vacante.fecha_publicacion || new Date().toISOString().split('T')[0],
        beneficios: vacante.beneficios || ['Seguro médico', 'Capacitación', 'Horario flexible'],
        requisitos: vacante.requisitos || ['Experiencia en el área', 'Buenas habilidades de comunicación'],
        responsabilidades: vacante.responsabilidades || ['Desarrollar soluciones', 'Colaborar con el equipo']
      }));
      
      setVacantes(vacantesEnriquecidas);
    } catch (error) {
      console.error('Error al cargar vacantes:', error);
      // Datos simulados para demostración
      setVacantes([
        {
          id: 1,
          titulo: 'Desarrollador Frontend Senior',
          descripcion: 'Buscamos un desarrollador frontend con experiencia en React, Vue.js y tecnologías modernas.',
          empresa: 'TechCorp',
          ubicacion: 'Bogotá',
          categoria: 'Desarrollo',
          tipoContrato: 'Tiempo Completo',
          experiencia: '6-10 años',
          salario: '4000000',
          fecha_publicacion: '2024-01-15',
          beneficios: ['Seguro médico', 'Capacitación', 'Horario flexible', 'Trabajo remoto'],
          requisitos: ['React, Vue.js, JavaScript', 'Experiencia en proyectos grandes', 'Inglés intermedio'],
          responsabilidades: ['Desarrollar interfaces de usuario', 'Mentorear desarrolladores junior', 'Colaborar con UX/UI']
        },
        {
          id: 2,
          titulo: 'Diseñador UX/UI',
          descripcion: 'Diseñador creativo para crear experiencias de usuario excepcionales.',
          empresa: 'DesignLab',
          ubicacion: 'Medellín',
          categoria: 'Diseño',
          tipoContrato: 'Tiempo Completo',
          experiencia: '3-5 años',
          salario: '3000000',
          fecha_publicacion: '2024-01-14',
          beneficios: ['Seguro médico', 'Capacitación', 'Horario flexible'],
          requisitos: ['Figma, Adobe Creative Suite', 'Portfolio sólido', 'Experiencia en investigación de usuarios'],
          responsabilidades: ['Diseñar interfaces', 'Realizar investigación de usuarios', 'Prototipar soluciones']
        },
        {
          id: 3,
          titulo: 'Analista de Marketing Digital',
          descripcion: 'Analista para optimizar campañas digitales y mejorar ROI.',
          empresa: 'MarketingPro',
          ubicacion: 'Cali',
          categoria: 'Marketing',
          tipoContrato: 'Tiempo Completo',
          experiencia: '3-5 años',
          salario: '2500000',
          fecha_publicacion: '2024-01-13',
          beneficios: ['Seguro médico', 'Bonos por resultados', 'Capacitación'],
          requisitos: ['Google Analytics', 'Facebook Ads', 'Experiencia en análisis de datos'],
          responsabilidades: ['Analizar campañas', 'Optimizar presupuestos', 'Generar reportes']
        },
        {
          id: 4,
          titulo: 'Project Manager',
          descripcion: 'Gestor de proyectos para coordinar equipos de desarrollo.',
          empresa: 'ProjectCorp',
          ubicacion: 'Barranquilla',
          categoria: 'Administración',
          tipoContrato: 'Tiempo Completo',
          experiencia: '6-10 años',
          salario: '5000000',
          fecha_publicacion: '2024-01-12',
          beneficios: ['Seguro médico', 'Capacitación', 'Horario flexible', 'Bonos por proyectos'],
          requisitos: ['PMP certificado', 'Experiencia en metodologías ágiles', 'Liderazgo de equipos'],
          responsabilidades: ['Gestionar proyectos', 'Coordinar equipos', 'Reportar a stakeholders']
        },
        {
          id: 5,
          titulo: 'Desarrollador Backend',
          descripcion: 'Desarrollador backend para construir APIs robustas y escalables.',
          empresa: 'BackendTech',
          ubicacion: 'Remoto',
          categoria: 'Desarrollo',
          tipoContrato: 'Tiempo Completo',
          experiencia: '3-5 años',
          salario: '3500000',
          fecha_publicacion: '2024-01-11',
          beneficios: ['Seguro médico', 'Trabajo remoto', 'Capacitación', 'Horario flexible'],
          requisitos: ['Node.js, Python, Java', 'Bases de datos SQL/NoSQL', 'Experiencia en APIs'],
          responsabilidades: ['Desarrollar APIs', 'Optimizar bases de datos', 'Implementar seguridad']
        },
        {
          id: 6,
          titulo: 'Recruiter IT',
          descripcion: 'Reclutador especializado en perfiles tecnológicos.',
          empresa: 'TalentHub',
          ubicacion: 'Bogotá',
          categoria: 'Recursos Humanos',
          tipoContrato: 'Tiempo Completo',
          experiencia: '1-2 años',
          salario: '2000000',
          fecha_publicacion: '2024-01-10',
          beneficios: ['Seguro médico', 'Comisiones', 'Capacitación'],
          requisitos: ['Experiencia en reclutamiento', 'Conocimiento del sector IT', 'Buenas habilidades de comunicación'],
          responsabilidades: ['Sourcer candidatos', 'Conducir entrevistas', 'Gestionar procesos de selección']
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = () => {
    const savedFavorites = localStorage.getItem('vacantesFavoritas');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  };

  const saveFavorites = (newFavorites) => {
    localStorage.setItem('vacantesFavoritas', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  const toggleFavorite = (vacanteId) => {
    const newFavorites = favorites.includes(vacanteId)
      ? favorites.filter(id => id !== vacanteId)
      : [...favorites, vacanteId];
    saveFavorites(newFavorites);
  };

  const applyFiltersAndSearch = () => {
    let resultado = [...vacantes];

    // Filtro por término de búsqueda
    if (searchTerm) {
      resultado = resultado.filter(vacante =>
        vacante.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vacante.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vacante.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vacante.categoria.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Aplicar filtros
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        resultado = resultado.filter(vacante => {
          if (key === 'salario') {
            const salarioVacante = parseInt(vacante.salario) || 0;
            switch (filters[key]) {
              case '$0 - $1.000.000':
                return salarioVacante <= 1000000;
              case '$1.000.000 - $2.000.000':
                return salarioVacante > 1000000 && salarioVacante <= 2000000;
              case '$2.000.000 - $3.000.000':
                return salarioVacante > 2000000 && salarioVacante <= 3000000;
              case '$3.000.000 - $5.000.000':
                return salarioVacante > 3000000 && salarioVacante <= 5000000;
              case '$5.000.000+':
                return salarioVacante > 5000000;
              default:
                return true;
            }
          }
          return vacante[key] === filters[key];
        });
      }
    });

    // Ordenamiento
    resultado.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'fecha':
          aValue = new Date(a.fecha_publicacion);
          bValue = new Date(b.fecha_publicacion);
          break;
        case 'salario':
          aValue = parseInt(a.salario) || 0;
          bValue = parseInt(b.salario) || 0;
          break;
        case 'titulo':
          aValue = a.titulo.toLowerCase();
          bValue = b.titulo.toLowerCase();
          break;
        case 'empresa':
          aValue = a.empresa.toLowerCase();
          bValue = b.empresa.toLowerCase();
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredVacantes(resultado);
    setCurrentPage(1); // Reset a la primera página
  };

  const clearFilters = () => {
    setSearchTerm('');
    setFilters({
      categoria: '',
      ubicacion: '',
      tipoContrato: '',
      experiencia: '',
      salario: '',
      empresa: ''
    });
    setSortBy('fecha');
    setSortOrder('desc');
  };

  const handlePostular = async (vacante_id, titulo) => {
    const correo = localStorage.getItem('correo');
    if (!correo) {
      alert('Debes iniciar sesión para postularte');
      return;
    }

    try {
      await axios.post('http://localhost:3001/api/postular', { vacante_id, correo });
      alert(`¡Te postulaste exitosamente a: ${titulo}!`);
    } catch (error) {
      console.error('Error al postularse:', error);
      alert('Ocurrió un error al postularse. Inténtalo de nuevo.');
    }
  };

  const openVacanteDetail = (vacante) => {
    setSelectedVacante(vacante);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedVacante(null);
  };

  // Paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVacantes = filteredVacantes.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredVacantes.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="vacantes-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Cargando vacantes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="vacantes-container">
      <header className="vacantes-header">
        <div className="header-content">
          <div>
            <h1 className="titulo-principal">Vacantes Disponibles</h1>
            <p className="subtitle">Encuentra tu próxima oportunidad laboral</p>
          </div>
          <Link to="/home" className="back-btn">← Volver al Inicio</Link>
        </div>
      </header>

      {/* Barra de búsqueda y filtros */}
      <section className="search-filters-section">
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

        <div className="filters-container">
          <div className="filter-group">
            <label>Categoría:</label>
            <select
              value={filters.categoria}
              onChange={(e) => setFilters({...filters, categoria: e.target.value})}
            >
              <option value="">Todas las categorías</option>
              {filterOptions.categorias.map(cat => (
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
              {filterOptions.ubicaciones.map(ub => (
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
              {filterOptions.tiposContrato.map(tipo => (
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
              <option value="">Toda la experiencia</option>
              {filterOptions.experiencias.map(exp => (
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
              <option value="">Todos los rangos</option>
              {filterOptions.rangosSalario.map(rango => (
                <option key={rango} value={rango}>{rango}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="filters-actions">
          <button onClick={clearFilters} className="clear-filters-btn">
            Limpiar Filtros
          </button>
          
          <div className="sort-controls">
            <label>Ordenar por:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="fecha">Fecha</option>
              <option value="salario">Salario</option>
              <option value="titulo">Título</option>
              <option value="empresa">Empresa</option>
            </select>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="sort-order-btn"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </section>

      {/* Estadísticas de resultados */}
      <div className="results-info">
        <p>Mostrando {filteredVacantes.length} de {vacantes.length} vacantes</p>
        {Object.values(filters).some(f => f) && (
          <p className="active-filters">
            Filtros activos: {Object.entries(filters)
              .filter(([_, value]) => value)
              .map(([key, value]) => `${key}: ${value}`)
              .join(', ')}
          </p>
        )}
      </div>

      {/* Lista de vacantes */}
      {currentVacantes.length === 0 ? (
        <div className="no-results">
          <p>No se encontraron vacantes con los filtros aplicados.</p>
          <button onClick={clearFilters} className="clear-filters-btn">
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <div className="vacantes-grid">
          {currentVacantes.map((vacante) => (
            <div key={vacante.id} className="vacante-card">
              <div className="vacante-header">
                <h3>{vacante.titulo}</h3>
                <button
                  onClick={() => toggleFavorite(vacante.id)}
                  className={`favorite-btn ${favorites.includes(vacante.id) ? 'favorited' : ''}`}
                >
                  {favorites.includes(vacante.id) ? '❤️' : '🤍'}
                </button>
              </div>
              
              <p className="empresa">{vacante.empresa}</p>
              <p className="ubicacion">📍 {vacante.ubicacion}</p>
              <p className="descripcion">{vacante.descripcion}</p>
              
              <div className="vacante-tags">
                <span className="tag categoria">{vacante.categoria}</span>
                <span className="tag contrato">{vacante.tipoContrato}</span>
                <span className="tag experiencia">{vacante.experiencia}</span>
              </div>
              
              <div className="vacante-details">
                <p><strong>Salario:</strong> ${parseInt(vacante.salario).toLocaleString()}</p>
                <p><strong>Publicado:</strong> {new Date(vacante.fecha_publicacion).toLocaleDateString()}</p>
              </div>
              
              <div className="vacante-actions">
                <button
                  onClick={() => openVacanteDetail(vacante)}
                  className="btn-ver-detalle"
                >
                  Ver Detalle
                </button>
                <button
                  onClick={() => handlePostular(vacante.id, vacante.titulo)}
                  className="btn-postular"
                >
                  Postularme
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="page-btn"
          >
            ← Anterior
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`page-btn ${currentPage === number ? 'active' : ''}`}
            >
              {number}
            </button>
          ))}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="page-btn"
          >
            Siguiente →
          </button>
        </div>
      )}

      {/* Modal de detalle de vacante */}
      {showModal && selectedVacante && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selectedVacante.titulo}</h2>
              <button onClick={closeModal} className="close-btn">×</button>
            </div>
            
            <div className="modal-body">
              <div className="vacante-info">
                <p className="empresa-detail">{selectedVacante.empresa}</p>
                <p className="ubicacion-detail">📍 {selectedVacante.ubicacion}</p>
                <p className="descripcion-detail">{selectedVacante.descripcion}</p>
                
                <div className="detalles-grid">
                  <div className="detalle-item">
                    <h4>Requisitos</h4>
                    <ul>
                      {selectedVacante.requisitos.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="detalle-item">
                    <h4>Responsabilidades</h4>
                    <ul>
                      {selectedVacante.responsabilidades.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="detalle-item">
                    <h4>Beneficios</h4>
                    <ul>
                      {selectedVacante.beneficios.map((ben, index) => (
                        <li key={index}>{ben}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="vacante-meta">
                  <p><strong>Categoría:</strong> {selectedVacante.categoria}</p>
                  <p><strong>Tipo de Contrato:</strong> {selectedVacante.tipoContrato}</p>
                  <p><strong>Experiencia:</strong> {selectedVacante.experiencia}</p>
                  <p><strong>Salario:</strong> ${parseInt(selectedVacante.salario).toLocaleString()}</p>
                  <p><strong>Fecha de Publicación:</strong> {new Date(selectedVacante.fecha_publicacion).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button
                onClick={() => toggleFavorite(selectedVacante.id)}
                className={`favorite-btn-large ${favorites.includes(selectedVacante.id) ? 'favorited' : ''}`}
              >
                {favorites.includes(selectedVacante.id) ? '❤️ Quitar de Favoritos' : '🤍 Agregar a Favoritos'}
              </button>
              <button
                onClick={() => handlePostular(selectedVacante.id, selectedVacante.titulo)}
                className="btn-postular-large"
              >
                Postularme Ahora
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Vacantes;
