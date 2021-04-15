const express = require('express');

const adminAuthRoutes = express.Router();

const {
  logoutController,
  loginController,
  registerController,
} = require('../controllers/auth.controllers');

/* ! @Route  : POST => /register
     Desc    : Regsiter the users
     @Access : Pubic
*/
adminAuthRoutes.post('/admin/register', registerController);

/* ! @Route  : POST => /login
     Desc    : login the users
     @Access : Pubic
*/
adminAuthRoutes.post('/admin/login', loginController);

/* ! @Route  : POST => /logout
     Desc    : Logout the users
     @Access : Pubic
*/
adminAuthRoutes.post('/admin/logout', logoutController);

module.exports = adminAuthRoutes;
