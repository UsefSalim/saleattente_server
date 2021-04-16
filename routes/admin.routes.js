const express = require('express');

const adminRoutes = express.Router();
const {
  getAllspecialite,
  addspecialite,
  deletspecialite,
  updatespecialite,
} = require('../controllers/specialite.controllers');
const {
  getAllmedecin,
  addmedecin,
  deletmedecin,
  updatemedecin,
} = require('../controllers/medecin.controllers');
const { auth, roleAdmin } = require('../middlewares/auth.middlewares');

adminRoutes.get('/specialite/', roleAdmin, auth, getAllspecialite);
adminRoutes.post('/specialite/add', roleAdmin, auth, addspecialite);
adminRoutes.delete('/specialite/:id', roleAdmin, auth, deletspecialite);
adminRoutes.put('/specialite/:id', roleAdmin, auth, updatespecialite);
adminRoutes.get('/medecin/', roleAdmin, auth, getAllmedecin);
adminRoutes.post('/medecin/add', roleAdmin, auth, addmedecin);
adminRoutes.delete('/medecin/:id', roleAdmin, auth, deletmedecin);
adminRoutes.put('/medecin/:id', roleAdmin, auth, updatemedecin);

module.exports = adminRoutes;
