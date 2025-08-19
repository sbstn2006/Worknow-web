const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Ruta para registrar usuario
router.post('/register', (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  const sql = 'INSERT INTO usuarios (correo, contrasena) VALUES (?, ?)';
  db.query(sql, [correo, contrasena], (err, result) => {
    if (err) {
      console.error('❌ Error al registrar usuario:', err);
      return res.status(500).json({ mensaje: 'Error al registrar' });
    }
    return res.status(200).json({ mensaje: '✅ Usuario registrado correctamente' });
  });
});

// Ruta para login
router.post('/login', (req, res) => {
  const { correo, contrasena } = req.body;

  if (!correo || !contrasena) {
    return res.status(400).json({ mensaje: 'Faltan campos' });
  }

  const sql = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
  db.query(sql, [correo, contrasena], (err, result) => {
    if (err) {
      console.error('❌ Error al iniciar sesión:', err);
      return res.status(500).json({ mensaje: 'Error al iniciar sesión' });
    }

    if (result.length > 0) {
      return res.status(200).json({ mensaje: '✅ Inicio de sesión exitoso' });
    } else {
      return res.status(401).json({ mensaje: '❌ Credenciales incorrectas' });
    }
  });
});

module.exports = router;
