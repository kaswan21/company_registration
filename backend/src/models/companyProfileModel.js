const { pool } = require('../services/db');

async function findCompanyProfileByOwnerId(ownerId) {
	const { rows } = await pool.query('SELECT * FROM company_profile WHERE owner_id = $1', [ownerId]);
	return rows[0] || null;
}

async function createCompanyProfile(p) {
	const { rows } = await pool.query(
		[
			'INSERT INTO company_profile',
			'(owner_id, company_name, address, city, state, country, postal_code, website, industry, founded_date, description, social_links)',
			'VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',
			'RETURNING *',
		].join(' '),
		[
			p.owner_id,
			p.company_name,
			p.address,
			p.city,
			p.state,
			p.country,
			p.postal_code,
			p.website,
			p.industry,
			p.founded_date,
			p.description,
			p.social_links,
		]
	);
	return rows[0];
}

async function updateCompanyProfileByOwnerId(ownerId, fields) {
	const allowed = [
		'company_name',
		'address',
		'city',
		'state',
		'country',
		'postal_code',
		'website',
		'industry',
		'founded_date',
		'description',
		'social_links',
	];

	const sets = [];
	const values = [];
	let idx = 1;
	for (const key of allowed) {
		if (fields[key] === undefined) continue;
		sets.push(`${key} = $${idx++}`);
		values.push(fields[key]);
	}
	if (!sets.length) return findCompanyProfileByOwnerId(ownerId);

	values.push(ownerId);
	const { rows } = await pool.query(
		`UPDATE company_profile SET ${sets.join(', ')} WHERE owner_id = $${idx} RETURNING *`,
		values
	);
	return rows[0] || null;
}

async function setLogoUrl(ownerId, url) {
	const { rows } = await pool.query('UPDATE company_profile SET logo_url = $1 WHERE owner_id = $2 RETURNING *', [
		url,
		ownerId,
	]);
	return rows[0] || null;
}

async function setBannerUrl(ownerId, url) {
	const { rows } = await pool.query(
		'UPDATE company_profile SET banner_url = $1 WHERE owner_id = $2 RETURNING *',
		[url, ownerId]
	);
	return rows[0] || null;
}

module.exports = {
	findCompanyProfileByOwnerId,
	createCompanyProfile,
	updateCompanyProfileByOwnerId,
	setLogoUrl,
	setBannerUrl,
};
