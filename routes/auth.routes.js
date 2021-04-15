const express = require('express');

const authRoutes = express.Router();

const {
  logoutController,
  loginController,
  registerController,
} = require('../controllers/auth.controllers');
const { auth, roleAdmin } = require('../middlewares/auth.middlewares');

/* ! @Route  : POST => /register
     Desc    : Regsiter the users
     @Access : Pubic
*/
authRoutes.post('/admin/register', roleAdmin, auth, registerController);

/* ! @Route  : POST => /register
     Desc    : Regsiter the users
     @Access : Pubic
*/
authRoutes.post('/register', roleAdmin, auth, registerController);

/* ! @Route  : POST => /login
     Desc    : login the users
     @Access : Pubic
*/
authRoutes.post('/login', loginController);

/* ! @Route  : POST => /logout
     Desc    : Logout the users
     @Access : Pubic
*/
authRoutes.post('/logout', auth, logoutController);

module.exports = authRoutes;
