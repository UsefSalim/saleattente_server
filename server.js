require('dotenv').config({ path: './config/.env' });
require('./config/db');
// packages
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

const clientAuthentificatinRoutes = require('./routes/clientauth.routes');
const adminAuthentificatinRoutes = require('./routes/adminauth.routes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
if (process.env.NODE_ENV === 'developpement') app.use(morgan('tiny'));

// Routes
app.use('/api/auth', clientAuthentificatinRoutes);
app.use('/api/auth', adminAuthentificatinRoutes);
// app express
app.listen(PORT, () => {
  console.log(`app listning : localhost:${PORT}`);
});
