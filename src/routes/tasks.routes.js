const { Router } = require('express');
const { body } = require('express-validator');
const { authRequired } = require('../middleware/auth.middleware');
const { handleValidationErrors } = require('../middleware/validation.middleware');
const {
  listTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require('../controllers/tasks.controller');

const router = Router();

router.use(authRequired); // todas las rutas de abajo requieren estar logueado

router.get('/', listTasks);
router.get('/:id', getTask);

router.post(
  '/',
  [body('title').notEmpty().withMessage('El título es requerido')],
  handleValidationErrors,
  createTask
);

router.put('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
