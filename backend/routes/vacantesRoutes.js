// backend/routes/vacantesRoutes.js
const express = require('express');
const db = require('../config/db');

const router = express.Router();

// Obtener todas las vacantes
router.get('/', (req, res) => {
  const sql = `
    SELECT 
      v.*,
      e.nombre as empresa_nombre,
      e.ubicacion as empresa_ubicacion
    FROM vacantes v
    LEFT JOIN empresas e ON v.empresa_id = e.id
    ORDER BY v.fecha_publicacion DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('❌ Error al obtener vacantes:', err);
      return res.status(500).json({ mensaje: 'Error al obtener vacantes.' });
    }
    
    // Mapear los resultados para incluir campos adicionales
    const vacantes = results.map(vacante => ({
      id: vacante.id,
      titulo: vacante.titulo,
      descripcion: vacante.descripcion,
      empresa: vacante.empresa_nombre || 'Empresa S.A.',
      ubicacion: vacante.ubicacion || vacante.empresa_ubicacion || 'Bogotá',
      categoria: vacante.categoria || 'Desarrollo',
      tipoContrato: vacante.tipo_contrato || 'Tiempo Completo',
      experiencia: vacante.experiencia || '3-5 años',
      salario: vacante.salario || '2000000',
      fecha_publicacion: vacante.fecha_publicacion || new Date().toISOString().split('T')[0],
      beneficios: vacante.beneficios ? JSON.parse(vacante.beneficios) : ['Seguro médico', 'Capacitación', 'Horario flexible'],
      requisitos: vacante.requisitos ? JSON.parse(vacante.requisitos) : ['Experiencia en el área', 'Buenas habilidades de comunicación'],
      responsabilidades: vacante.responsabilidades ? JSON.parse(vacante.responsabilidades) : ['Desarrollar soluciones', 'Colaborar con el equipo']
    }));
    
    res.status(200).json(vacantes);
  });
});

// Obtener una vacante específica por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = `
    SELECT 
      v.*,
      e.nombre as empresa_nombre,
      e.ubicacion as empresa_ubicacion
    FROM vacantes v
    LEFT JOIN empresas e ON v.empresa_id = e.id
    WHERE v.id = ?
  `;
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener vacante:', err);
      return res.status(500).json({ mensaje: 'Error al obtener vacante.' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'Vacante no encontrada.' });
    }
    
    const vacante = results[0];
    const vacanteFormateada = {
      id: vacante.id,
      titulo: vacante.titulo,
      descripcion: vacante.descripcion,
      empresa: vacante.empresa_nombre || 'Empresa S.A.',
      ubicacion: vacante.ubicacion || vacante.empresa_ubicacion || 'Bogotá',
      categoria: vacante.categoria || 'Desarrollo',
      tipoContrato: vacante.tipo_contrato || 'Tiempo Completo',
      experiencia: vacante.experiencia || '3-5 años',
      salario: vacante.salario || '2000000',
      fecha_publicacion: vacante.fecha_publicacion || new Date().toISOString().split('T')[0],
      beneficios: vacante.beneficios ? JSON.parse(vacante.beneficios) : ['Seguro médico', 'Capacitación', 'Horario flexible'],
      requisitos: vacante.requisitos ? JSON.parse(vacante.requisitos) : ['Experiencia en el área', 'Buenas habilidades de comunicación'],
      responsabilidades: vacante.responsabilidades ? JSON.parse(vacante.responsabilidades) : ['Desarrollar soluciones', 'Colaborar con el equipo']
    };
    
    res.status(200).json(vacanteFormateada);
  });
});

// Crear una nueva vacante
router.post('/', (req, res) => {
  const {
    titulo,
    descripcion,
    empresa_id,
    ubicacion,
    categoria,
    tipo_contrato,
    experiencia,
    salario,
    beneficios,
    requisitos,
    responsabilidades
  } = req.body;
  
  const sql = `
    INSERT INTO vacantes 
    (titulo, descripcion, empresa_id, ubicacion, categoria, tipo_contrato, experiencia, salario, beneficios, requisitos, responsabilidades, fecha_publicacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW())
  `;
  
  const valores = [
    titulo,
    descripcion,
    empresa_id || null,
    ubicacion,
    categoria,
    tipo_contrato,
    experiencia,
    salario,
    JSON.stringify(beneficios || []),
    JSON.stringify(requisitos || []),
    JSON.stringify(responsabilidades || [])
  ];
  
  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error('❌ Error al crear vacante:', err);
      return res.status(500).json({ mensaje: 'Error al crear vacante.' });
    }
    
    res.status(201).json({ 
      mensaje: 'Vacante creada exitosamente.',
      id: result.insertId 
    });
  });
});

// Actualizar una vacante
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descripcion,
    empresa_id,
    ubicacion,
    categoria,
    tipo_contrato,
    experiencia,
    salario,
    beneficios,
    requisitos,
    responsabilidades
  } = req.body;
  
  const sql = `
    UPDATE vacantes SET
    titulo = ?, descripcion = ?, empresa_id = ?, ubicacion = ?, categoria = ?,
    tipo_contrato = ?, experiencia = ?, salario = ?, beneficios = ?, requisitos = ?, responsabilidades = ?
    WHERE id = ?
  `;
  
  const valores = [
    titulo,
    descripcion,
    empresa_id || null,
    ubicacion,
    categoria,
    tipo_contrato,
    experiencia,
    salario,
    JSON.stringify(beneficios || []),
    JSON.stringify(requisitos || []),
    JSON.stringify(responsabilidades || []),
    id
  ];
  
  db.query(sql, valores, (err, result) => {
    if (err) {
      console.error('❌ Error al actualizar vacante:', err);
      return res.status(500).json({ mensaje: 'Error al actualizar vacante.' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Vacante no encontrada.' });
    }
    
    res.status(200).json({ mensaje: 'Vacante actualizada exitosamente.' });
  });
});

// Eliminar una vacante
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  
  const sql = 'DELETE FROM vacantes WHERE id = ?';
  
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('❌ Error al eliminar vacante:', err);
      return res.status(500).json({ mensaje: 'Error al eliminar vacante.' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'Vacante no encontrada.' });
    }
    
    res.status(200).json({ mensaje: 'Vacante eliminada exitosamente.' });
  });
});

// Buscar vacantes por término
router.get('/buscar/:termino', (req, res) => {
  const { termino } = req.params;
  const terminoBusqueda = `%${termino}%`;
  
  const sql = `
    SELECT 
      v.*,
      e.nombre as empresa_nombre,
      e.ubicacion as empresa_ubicacion
    FROM vacantes v
    LEFT JOIN empresas e ON v.empresa_id = e.id
    WHERE v.titulo LIKE ? OR v.descripcion LIKE ? OR v.categoria LIKE ? OR e.nombre LIKE ?
    ORDER BY v.fecha_publicacion DESC
  `;
  
  db.query(sql, [terminoBusqueda, terminoBusqueda, terminoBusqueda, terminoBusqueda], (err, results) => {
    if (err) {
      console.error('❌ Error al buscar vacantes:', err);
      return res.status(500).json({ mensaje: 'Error al buscar vacantes.' });
    }
    
    const vacantes = results.map(vacante => ({
      id: vacante.id,
      titulo: vacante.titulo,
      descripcion: vacante.descripcion,
      empresa: vacante.empresa_nombre || 'Empresa S.A.',
      ubicacion: vacante.ubicacion || vacante.empresa_ubicacion || 'Bogotá',
      categoria: vacante.categoria || 'Desarrollo',
      tipoContrato: vacante.tipo_contrato || 'Tiempo Completo',
      experiencia: vacante.experiencia || '3-5 años',
      salario: vacante.salario || '2000000',
      fecha_publicacion: vacante.fecha_publicacion || new Date().toISOString().split('T')[0],
      beneficios: vacante.beneficios ? JSON.parse(vacante.beneficios) : ['Seguro médico', 'Capacitación', 'Horario flexible'],
      requisitos: vacante.requisitos ? JSON.parse(vacante.requisitos) : ['Experiencia en el área', 'Buenas habilidades de comunicación'],
      responsabilidades: vacante.responsabilidades ? JSON.parse(vacante.responsabilidades) : ['Desarrollar soluciones', 'Colaborar con el equipo']
    }));
    
    res.status(200).json(vacantes);
  });
});

// Obtener vacantes por categoría
router.get('/categoria/:categoria', (req, res) => {
  const { categoria } = req.params;
  
  const sql = `
    SELECT 
      v.*,
      e.nombre as empresa_nombre,
      e.ubicacion as empresa_ubicacion
    FROM vacantes v
    LEFT JOIN empresas e ON v.empresa_id = e.id
    WHERE v.categoria = ?
    ORDER BY v.fecha_publicacion DESC
  `;
  
  db.query(sql, [categoria], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener vacantes por categoría:', err);
      return res.status(500).json({ mensaje: 'Error al obtener vacantes por categoría.' });
    }
    
    const vacantes = results.map(vacante => ({
      id: vacante.id,
      titulo: vacante.titulo,
      descripcion: vacante.descripcion,
      empresa: vacante.empresa_nombre || 'Empresa S.A.',
      ubicacion: vacante.ubicacion || vacante.empresa_ubicacion || 'Bogotá',
      categoria: vacante.categoria || 'Desarrollo',
      tipoContrato: vacante.tipo_contrato || 'Tiempo Completo',
      experiencia: vacante.experiencia || '3-5 años',
      salario: vacante.salario || '2000000',
      fecha_publicacion: vacante.fecha_publicacion || new Date().toISOString().split('T')[0],
      beneficios: vacante.beneficios ? JSON.parse(vacante.beneficios) : ['Seguro médico', 'Capacitación', 'Horario flexible'],
      requisitos: vacante.requisitos ? JSON.parse(vacante.requisitos) : ['Experiencia en el área', 'Buenas habilidades de comunicación'],
      responsabilidades: vacante.responsabilidades ? JSON.parse(vacante.responsabilidades) : ['Desarrollar soluciones', 'Colaborar con el equipo']
    }));
    
    res.status(200).json(vacantes);
  });
});

module.exports = router;
