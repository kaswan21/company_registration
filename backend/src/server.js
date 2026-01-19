/* eslint-disable no-console */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
require('dotenv').config();

const { env } = require('./config/env');
const { createApp } = require('./app');

const app = createApp();

const PORT = process.env.PORT || 5001;

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors({ origin: process.env.CORS_ORIGIN }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Bluestock API running', status: 'OK' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/company', require('./routes/companyRoutes'));

// Error handler
app.use((err, req, res, next) => {
  console.error('🔴 Error Handler caught:', err.message);
  console.error('Stack:', err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: err.status || 500,
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404,
    },
  });
});

const server = app.listen(env.port, () => {
	console.log(`✅ Backend listening on http://localhost:${env.port}`);
});

server.on('error', (err) => {
	if (err && err.code === 'EADDRINUSE') {
		console.error(`Port ${env.port} is already in use. Stop the other process or change PORT in backend/.env.`);
		process.exit(1);
	}
	console.error(err);
	process.exit(1);
});

module.exports = app;
