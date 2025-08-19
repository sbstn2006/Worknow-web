// backend/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');
const cvRoutes = require('./routes/cvRoutes');
const authRoutes = require('./routes/authRoutes'); 
const vacantesRoutes = require('./routes/vacantesRoutes');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas
app.use('/api', cvRoutes);
app.use('/api', authRoutes); 
app.use('/api/vacantes', vacantesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend escuchando en el puerto ${PORT}`);
});
