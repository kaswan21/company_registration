const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const createError = require('http-errors');

const { env } = require('./config/env');
const authRoutes = require('./routes/authRoutes');
const companyRoutes = require('./routes/companyRoutes');
const { errorHandler } = require('./middleware/errorHandler');

function createApp() {
	const app = express();

	app.use(helmet());
	app.use(compression());
	app.use(
		cors({
			origin: env.corsOrigin,
			credentials: true,
		})
	);

	app.use(express.json({ limit: '2mb' }));
	app.use(express.urlencoded({ extended: true }));

	app.get('/health', (req, res) => {
		res.json({ ok: true });
	});

	app.use('/api/auth', authRoutes);
	app.use('/api/company', companyRoutes);

	app.use((req, res, next) => {
		next(createError(404, 'Route not found'));
	});

	app.use(errorHandler);
	return app;
}

module.exports = { createApp };
