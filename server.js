require('dotenv').config({ path: './config/.env' });
require('./config/db');
// packages
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const userRoutes = require('./routes/user.routes');
const { verifIsAuthenticated } = require('./middlewares/auth.middlewares');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
if (process.env.NODE_ENV === 'developpement') app.use(morgan('tiny'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);
app.use('*', verifIsAuthenticated, (req, res, next) => {
  next();
});

// app express
app.listen(PORT, () => {
  console.log(`app listning : localhost:${PORT}`);
});
