const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const createError = require('http-errors');
const multer = require('multer');
const pool = require('../config/database');

const companyModel = require('../models/companyProfileModel');
const { uploadImageFromBuffer } = require('../services/cloudinaryService');

function cleanString(v) {
	return sanitizeHtml(String(v || ''), { allowedTags: [], allowedAttributes: {} }).trim();
}

function requireUserId(req) {
	const userId = req.user?.sub;
	if (!userId) throw createError(401, 'Unauthorized');
	return Number(userId);
}

const registerValidators = [
	body('company_name').isString().notEmpty().withMessage('company_name is required'),
	body('address').isString().notEmpty().withMessage('address is required'),
	body('city').isString().notEmpty().withMessage('city is required'),
	body('state').isString().notEmpty().withMessage('state is required'),
	body('country').isString().notEmpty().withMessage('country is required'),
	body('postal_code').isString().notEmpty().withMessage('postal_code is required'),
	body('industry').isString().notEmpty().withMessage('industry is required'),
];

async function registerCompany(req, res, next) {
	try {
		await Promise.all(registerValidators.map((v) => v.run(req)));
		const errors = validationResult(req);
		if (!errors.isEmpty()) return next(createError(400, errors.array()[0].msg));

		const ownerId = requireUserId(req);

		const payload = {
			owner_id: ownerId,
			company_name: cleanString(req.body.company_name),
			address: cleanString(req.body.address),
			city: cleanString(req.body.city),
			state: cleanString(req.body.state),
			country: cleanString(req.body.country),
			postal_code: cleanString(req.body.postal_code),
			website: req.body.website ? cleanString(req.body.website) : null,
			industry: cleanString(req.body.industry),
			founded_date: req.body.founded_date || null,
			description: req.body.description ? cleanString(req.body.description) : null,
			social_links: req.body.social_links || null,
		};

		const existing = await companyModel.findCompanyProfileByOwnerId(ownerId);
		if (existing) return next(createError(400, 'Company profile already exists'));

		const created = await companyModel.createCompanyProfile(payload);
		return res.status(201).json({ company_profile: created });
	} catch (err) {
		return next(err);
	}
}

async function getCompanyProfile(req, res, next) {
	try {
		const ownerId = requireUserId(req);
		const profile = await companyModel.findCompanyProfileByOwnerId(ownerId);
		if (!profile) return next(createError(404, 'Company profile not found'));
		return res.json({ company_profile: profile });
	} catch (err) {
		return next(err);
	}
}

async function updateCompanyProfile(req, res, next) {
	try {
		const ownerId = requireUserId(req);
		const updated = await companyModel.updateCompanyProfileByOwnerId(ownerId, {
			company_name: req.body.company_name ? cleanString(req.body.company_name) : undefined,
			address: req.body.address ? cleanString(req.body.address) : undefined,
			city: req.body.city ? cleanString(req.body.city) : undefined,
			state: req.body.state ? cleanString(req.body.state) : undefined,
			country: req.body.country ? cleanString(req.body.country) : undefined,
			postal_code: req.body.postal_code ? cleanString(req.body.postal_code) : undefined,
			website: req.body.website ? cleanString(req.body.website) : undefined,
			industry: req.body.industry ? cleanString(req.body.industry) : undefined,
			founded_date: req.body.founded_date ?? undefined,
			description: req.body.description ? cleanString(req.body.description) : undefined,
			social_links: req.body.social_links ?? undefined,
		});

		if (!updated) return next(createError(404, 'Company profile not found'));
		return res.json({ company_profile: updated });
	} catch (err) {
		return next(err);
	}
}

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 2 * 1024 * 1024 } });

async function uploadLogo(req, res, next) {
	try {
		const ownerId = requireUserId(req);
		if (!req.file) return next(createError(400, 'file is required'));

		const result = await uploadImageFromBuffer(req.file.buffer, { folder: 'company/logo' });
		const updated = await companyModel.setLogoUrl(ownerId, result.url);
		return res.json({ logo_url: result.url, company_profile: updated });
	} catch (err) {
		return next(err);
	}
}

async function uploadBanner(req, res, next) {
	try {
		const ownerId = requireUserId(req);
		if (!req.file) return next(createError(400, 'file is required'));

		const result = await uploadImageFromBuffer(req.file.buffer, { folder: 'company/banner' });
		const updated = await companyModel.setBannerUrl(ownerId, result.url);
		return res.json({ banner_url: result.url, company_profile: updated });
	} catch (err) {
		return next(err);
	}
}

const registerProfile = async (req, res, next) => {
	try {
		const userId = req.user.userId;
		const { company_name, industry, address, city, state, country, postal_code, website, description } = req.body;

		console.log('=== COMPANY REGISTRATION ===');
		console.log('User ID:', userId);
		console.log('Company Name:', company_name);

		if (!company_name || !industry || !address || !city || !state || !country || !postal_code) {
			return res.status(400).json({
				error: { message: 'Missing required fields', status: 400 },
			});
		}

		// Check if company profile already exists
		const existing = await pool.query(
			'SELECT id FROM company_profile WHERE owner_id = $1',
			[userId]
		);

		let result;
		if (existing.rows.length > 0) {
			// Update existing
			result = await pool.query(
				`UPDATE company_profile SET company_name = $1, industry = $2, address = $3, city = $4, state = $5, country = $6, postal_code = $7, website = $8, description = $9, updated_at = NOW() WHERE owner_id = $10 RETURNING *`,
				[company_name, industry, address, city, state, country, postal_code, website || null, description || null, userId]
			);
		} else {
			// Insert new
			result = await pool.query(
				`INSERT INTO company_profile (owner_id, company_name, industry, address, city, state, country, postal_code, website, description) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
				[userId, company_name, industry, address, city, state, country, postal_code, website || null, description || null]
			);
		}

		console.log('✅ Company profile saved');
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error('❌ Company registration error:', error.message);
		next(error);
	}
};

const getProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    console.log('=== GET COMPANY PROFILE ===');
    console.log('User ID from token:', userId);

    const result = await pool.query(
      'SELECT * FROM company_profile WHERE owner_id = $1',
      [userId]
    );

    console.log('Query result rows:', result.rows.length);
    console.log('Data:', result.rows);

    if (result.rows.length === 0) {
      console.log('❌ No company profile found for user:', userId);
      return res.status(404).json({
        error: { message: 'Company profile not found', status: 404 },
      });
    }

    console.log('✅ Company profile found');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Get profile error:', error.message);
    next(error);
  }
};const updateProfile = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const updates = req.body;

    console.log('=== UPDATE COMPANY PROFILE ===');
    console.log('User ID:', userId);
    console.log('Updates:', updates);

    // Get current profile first
    const currentResult = await pool.query(
      'SELECT id FROM company_profile WHERE owner_id = $1',
      [userId]
    );

    if (currentResult.rows.length === 0) {
      return res.status(404).json({
        error: { message: 'Company profile not found', status: 404 },
      });
    }

    // Filter out undefined/null values
    const filteredUpdates = {};
    Object.keys(updates).forEach(key => {
      if (updates[key] !== undefined && updates[key] !== null && updates[key] !== '') {
        filteredUpdates[key] = updates[key];
      }
    });

    if (Object.keys(filteredUpdates).length === 0) {
      return res.status(400).json({
        error: { message: 'No fields to update', status: 400 },
      });
    }

    // Build dynamic UPDATE query
    const keys = Object.keys(filteredUpdates);
    const values = Object.values(filteredUpdates);
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

    console.log('Setting:', setClause);

    const result = await pool.query(
      `UPDATE company_profile SET ${setClause}, updated_at = NOW() WHERE owner_id = $${keys.length + 1} RETURNING *`,
      [...values, userId]
    );

    console.log('✅ Company profile updated');
    res.json(result.rows[0]);
  } catch (error) {
    console.error('❌ Update error:', error.message);
    next(error);
  }
};module.exports = {
	registerCompany,
	getCompanyProfile,
	updateCompanyProfile,
	uploadLogo: [upload.single('file'), uploadLogo],
	uploadBanner: [upload.single('file'), uploadBanner],
	getProfile,
	registerProfile,
	updateProfile,
};
