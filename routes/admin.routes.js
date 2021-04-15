const express = require('express');

const adminRoutes = express.Router();
const {
  getAll,
  addspecialite,
  deletspecialite,
  updatespecialite,
} = require('../controllers/specialite.controllers');
const { auth, roleAdmin } = require('../middlewares/auth.middlewares');

adminRoutes.get('/specialite/', roleAdmin, auth, getAll);
adminRoutes.post('/specialite/add', roleAdmin, auth, addspecialite);
adminRoutes.delete('/specialite/:id', roleAdmin, auth, deletspecialite);
adminRoutes.put('/specialite/:id', roleAdmin, auth, updatespecialite);

module.exports = adminRoutes;
