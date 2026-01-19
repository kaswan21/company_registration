const { pool } = require('../services/db');

async function findUserByEmail(email) {
	const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
	return rows[0] || null;
}

async function findUserById(id) {
	const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
	return rows[0] || null;
}

async function createUser({ email, passwordHash, fullName, gender, mobileNo, signupType }) {
	const { rows } = await pool.query(
		[
			'INSERT INTO users (email, password, full_name, signup_type, gender, mobile_no)',
			'VALUES ($1, $2, $3, $4, $5, $6)',
			'RETURNING *',
		].join(' '),
		[email, passwordHash, fullName, signupType, gender, mobileNo]
	);
	return rows[0];
}

async function setMobileVerified(userId, isVerified) {
	await pool.query('UPDATE users SET is_mobile_verified = $1 WHERE id = $2', [isVerified, userId]);
}

async function setEmailVerified(userId, isVerified) {
	await pool.query('UPDATE users SET is_email_verified = $1 WHERE id = $2', [isVerified, userId]);
}

module.exports = {
	findUserByEmail,
	findUserById,
	createUser,
	setMobileVerified,
	setEmailVerified,
};
