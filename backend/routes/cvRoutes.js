// backend/routes/cvRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const db = require('../config/db');

const router = express.Router(); 

// Configurar almacenamiento de archivos
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Crear hoja de vida
router.post('/upload', upload.single('archivo'), (req, res) => {
  const {
    nombre_completo,
    correo,
    telefono,
    direccion,
    fecha_nacimiento,
    nivel_educativo,
    experiencia_anios,
    perfil
  } = req.body;

  const archivo = req.file?.filename;
  if (!archivo) return res.status(400).json({ mensaje: 'No se subió ningún archivo.' });

  const sql = `
    INSERT INTO hojas_de_vida 
    (nombre_completo, correo, telefono, direccion, fecha_nacimiento, nivel_educativo, experiencia_anios, perfil, archivo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [
    nombre_completo,
    correo,
    telefono,
    direccion,
    fecha_nacimiento,
    nivel_educativo,
    experiencia_anios,
    perfil,
    archivo
  ], (err, result) => {
    if (err) {
      console.error('❌ Error al guardar en la base de datos:', err);
      return res.status(500).json({ mensaje: 'Error al guardar en la base de datos.' });
    }
    res.status(200).json({ mensaje: 'Hoja de vida enviada correctamente.' });
  });
});

// Obtener hojas de vida
router.get('/hojas-de-vida', (req, res) => {
  db.query('SELECT * FROM hojas_de_vida', (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener CVs.' });
    res.status(200).json(results);
  });
});

// ACTUALIZAR hoja de vida
router.put('/hojas-de-vida/:id', (req, res) => {
  const id = req.params.id;
  console.log('Datos recibidos en actualización:', req.body); 

  const {
    nombre_completo,
    correo,
    telefono,
    direccion,
    fecha_nacimiento,
    nivel_educativo,
    experiencia_anios,
    perfil
  } = req.body;

  const sql = `
    UPDATE hojas_de_vida SET
    nombre_completo = ?, correo = ?, telefono = ?, direccion = ?,
    fecha_nacimiento = ?, nivel_educativo = ?, experiencia_anios = ?, perfil = ?
    WHERE id = ?
  `;

  db.query(sql, [
    nombre_completo,
    correo,
    telefono,
    direccion,
    fecha_nacimiento,
    nivel_educativo,
    experiencia_anios,
    perfil,
    id
  ], (err) => {
    if (err) {
      console.error('❌ Error al actualizar CV:', err); 
      return res.status(500).json({ mensaje: 'Error al actualizar CV.' });
    }

    res.status(200).json({ mensaje: 'CV actualizado correctamente.' });
  });
});

// ELIMINAR hoja de vida
router.delete('/hojas-de-vida/:id', (req, res) => {
  const id = req.params.id;

  db.query('DELETE FROM hojas_de_vida WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ mensaje: 'Error al eliminar CV.' });
    res.status(200).json({ mensaje: 'CV eliminado correctamente.' });
  });
});

// Obtener vacantes
router.get('/vacantes', (req, res) => {
  const sql = 'SELECT * FROM vacantes';
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error al obtener vacantes' });
    res.status(200).json(results);
  });
});

// Obtener hoja de vida por correo
router.get('/hojas-de-vida/:correo', (req, res) => {
  const correo = req.params.correo;

  const sql = 'SELECT * FROM hojas_de_vida WHERE correo = ? LIMIT 1';

  db.query(sql, [correo], (err, results) => {
    if (err) {
      console.error('❌ Error al buscar hoja de vida:', err);
      return res.status(500).json({ mensaje: 'Error al buscar hoja de vida' });
    }

    if (results.length === 0) {
      return res.status(404).json({ mensaje: 'No se encontró hoja de vida' });
    }

    res.status(200).json(results[0]);
  });
});

router.post('/postular', (req, res) => {
  const { vacante_id, correo } = req.body;

  if (!vacante_id || !correo) {
    return res.status(400).json({ mensaje: 'Faltan datos para postularse.' });
  }

  const sql = 'INSERT INTO postulaciones (vacante_id, correo) VALUES (?, ?)';
  db.query(sql, [vacante_id, correo], (err) => {
    if (err) {
      console.error('❌ Error al postularse:', err);
      return res.status(500).json({ mensaje: 'Error al postularse.' });
    }
    res.status(200).json({ mensaje: 'Postulación exitosa.' });
  });
});

// Obtener estadísticas del usuario
router.get('/user-stats/:userId', (req, res) => {
  const userId = req.params.userId;
  
  // Obtener estadísticas del usuario
  const statsQuery = `
    SELECT 
      (SELECT COUNT(*) FROM hojas_de_vida WHERE id = ?) as cvCount,
      (SELECT COUNT(*) FROM postulaciones WHERE correo = (SELECT correo FROM hojas_de_vida WHERE id = ? LIMIT 1)) as applicationsCount,
      (SELECT COUNT(*) FROM postulaciones WHERE correo = (SELECT correo FROM hojas_de_vida WHERE id = ? LIMIT 1)) as notificationsCount,
      NOW() as lastActivity
  `;
  
  db.query(statsQuery, [userId, userId, userId], (err, results) => {
    if (err) {
      console.error('❌ Error al obtener estadísticas del usuario:', err);
      return res.status(500).json({ mensaje: 'Error al obtener estadísticas del usuario.' });
    }
    
    if (results.length > 0) {
      const stats = results[0];
      res.status(200).json({
        cvCount: stats.cvCount || 0,
        applicationsCount: stats.applicationsCount || 0,
        notificationsCount: stats.notificationsCount || 0,
        lastActivity: stats.lastActivity ? new Date(stats.lastActivity).toLocaleDateString() : 'N/A'
      });
    } else {
      res.status(200).json({
        cvCount: 0,
        applicationsCount: 0,
        notificationsCount: 0,
        lastActivity: 'N/A'
      });
    }
  });
});


module.exports = router;
