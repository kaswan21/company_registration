const createError = require('http-errors');
const { v2: cloudinary } = require('cloudinary');
const { env } = require('../config/env');

let configured = false;

function ensureConfigured() {
	if (configured) return;
	if (!env.cloudinary.cloudName || !env.cloudinary.apiKey || !env.cloudinary.apiSecret) {
		throw createError(500, 'Cloudinary not configured');
	}
	cloudinary.config({
		cloud_name: env.cloudinary.cloudName,
		api_key: env.cloudinary.apiKey,
		api_secret: env.cloudinary.apiSecret,
	});
	configured = true;
}

async function uploadImageFromBuffer(buffer, { folder }) {
	ensureConfigured();
	const base64 = buffer.toString('base64');
	const dataUri = `data:image/*;base64,${base64}`;

	const result = await cloudinary.uploader.upload(dataUri, {
		folder,
		resource_type: 'image',
	});

	return {
		url: result.secure_url,
		publicId: result.public_id,
	};
}

module.exports = {
	uploadImageFromBuffer,
};
