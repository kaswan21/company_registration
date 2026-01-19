const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { env } = require('../config/env');

function signSessionToken(payload) {
	if (!env.jwtSecret) throw createError(500, 'JWT_SECRET not configured');

	// 90-day validity (requirement)
	const expiresIn = `${env.jwtExpiresInDays}d`;
	return jwt.sign(payload, env.jwtSecret, { expiresIn });
}

module.exports = { signSessionToken };
