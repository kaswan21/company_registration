const createError = require('http-errors');

function errorHandler(err, req, res, next) {
	const status = err.status || err.statusCode || 500;
	const message = err.message || 'Internal Server Error';

	// Avoid noisy logs for expected 404s
	if (process.env.NODE_ENV !== 'test' && status !== 404) {
		// eslint-disable-next-line no-console
		console.error(err);
	}

	res.status(status).json({
		error: {
			message,
			status,
		},
	});
}

module.exports = { errorHandler };