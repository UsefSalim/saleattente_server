const express = require('express');

const authRoutes = express.Router();

const {
  logoutController,
  loginController,
  registerController,
} = require('../controllers/auth.controllers');
const { auth, roleAdmin } = require('../middlewares/auth.middlewares');

authRoutes.post('/admin/register', roleAdmin, auth, registerController);

authRoutes.post('/register', roleAdmin, auth, registerController);

authRoutes.post('/login', loginController);

authRoutes.post('/logout', auth, logoutController);

module.exports = authRoutes;
