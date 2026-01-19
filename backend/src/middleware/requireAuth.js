const createError = require('http-errors');
const jwt = require('jsonwebtoken');

function requireAuth(req, res, next) {
	try {
		const header = req.headers.authorization;
		if (!header) return next(createError(401, 'Missing Authorization header'));

		const [scheme, token] = header.split(' ');
		if (scheme !== 'Bearer' || !token) return next(createError(401, 'Invalid Authorization header'));

		const secret = process.env.JWT_SECRET;
		if (!secret) return next(createError(500, 'JWT_SECRET not configured'));

		const payload = jwt.verify(token, secret);
		req.user = payload;
		return next();
	} catch (err) {
		return next(createError(401, 'Unauthorized'));
	}
}

module.exports = { requireAuth };
