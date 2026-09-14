require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { validationResult } = require('express-validator');

const authRoutes = require('./routes/auth.routes');
const taskRoutes = require('./routes/tasks.routes');
const categoriaRoutes = require('./routes/categorias.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Middleware simple para devolver errores de express-validator de forma consistente
app.use((req, res, next) => {
  const original = res.json.bind(res);
  res.json = (data) => original(data);
  next();
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/categorias', categoriaRoutes);

// Manejador de errores de validación centralizado (usar en rutas si se desea)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 TaskFlow API corriendo en http://localhost:${PORT}`));
