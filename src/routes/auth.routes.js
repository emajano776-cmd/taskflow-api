const { Router } = require('express');
const { body } = require('express-validator');
const { register, login } = require('../controllers/auth.controller');

const router = Router();

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email inválido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('name').notEmpty().withMessage('El nombre es requerido'),
  ],
  register
);

router.post(
  '/login',
  [body('email').isEmail(), body('password').notEmpty()],
  login
);

module.exports = router;
