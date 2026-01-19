require('dotenv').config();

const env = {
	port: Number(process.env.PORT || 5000),
	corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
	jwtSecret: process.env.JWT_SECRET,
	jwtExpiresInDays: Number(process.env.JWT_EXPIRES_IN_DAYS || 90),
	db: {
		host: process.env.DB_HOST,
		port: Number(process.env.DB_PORT || 5432),
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		database: process.env.DB_NAME,
	},
	firebase: {
		projectId: process.env.FIREBASE_PROJECT_ID,
		clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
		privateKey: process.env.FIREBASE_PRIVATE_KEY,
	},
	cloudinary: {
		cloudName: process.env.CLOUDINARY_CLOUD_NAME,
		apiKey: process.env.CLOUDINARY_API_KEY,
		apiSecret: process.env.CLOUDINARY_API_SECRET,
	},
};

module.exports = { env };
