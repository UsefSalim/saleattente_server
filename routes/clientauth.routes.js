const express = require('express');

const clientAuthRoutes = express.Router();

const {
  logoutController,
  loginController,
  registerController,
} = require('../controllers/auth.controllers');

/* ! @Route  : POST => /register
     Desc    : Regsiter the users
     @Access : Pubic
*/
clientAuthRoutes.post('/register', registerController);

/* ! @Route  : POST => /login
     Desc    : login the users
     @Access : Pubic
*/
clientAuthRoutes.post('/login', loginController);

/* ! @Route  : POST => /logout
     Desc    : Logout the users
     @Access : Pubic
*/
clientAuthRoutes.post('/logout', logoutController);

module.exports = clientAuthRoutes;
