const express = require('express');

const userRoutes = express.Router();
const {
  profileUser,
  createConsultation,
} = require('../controllers/user.controllers');
const { auth, roleUser } = require('../middlewares/auth.middlewares');

userRoutes.get('/', roleUser, auth, profileUser);
userRoutes.post('/createconsultation', roleUser, auth, createConsultation);
module.exports = userRoutes;
