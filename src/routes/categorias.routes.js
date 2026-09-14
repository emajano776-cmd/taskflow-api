const { Router } = require('express');
const { body } = require('express-validator');
const { authRequired } = require('../middleware/auth.middleware');
const {
  listCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} = require('../controllers/categorias.controller');

const router = Router();

router.use(authRequired); // todas las rutas de abajo requieren estar logueado

router.get('/', listCategorias);
router.get('/:id', getCategoria);

router.post(
  '/',
  [body('name').notEmpty().withMessage('El nombre es requerido')],
  createCategoria
);

router.put(
  '/:id',
  [body('name').optional().notEmpty().withMessage('El nombre no puede estar vacío')],
  updateCategoria
);

router.delete('/:id', deleteCategoria);

module.exports = router;