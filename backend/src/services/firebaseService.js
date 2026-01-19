const admin = require('firebase-admin');
const createError = require('http-errors');
const { env } = require('../config/env');

let initialized = false;

function initFirebase() {
	if (initialized) return;
	if (!env.firebase.projectId || !env.firebase.clientEmail || !env.firebase.privateKey) {
		// Allow boot without Firebase in early dev; endpoints will fail when used.
		return;
	}

	admin.initializeApp({
		credential: admin.credential.cert({
			projectId: env.firebase.projectId,
			clientEmail: env.firebase.clientEmail,
			privateKey: env.firebase.privateKey.replace(/\\n/g, '\n'),
		}),
	});

	initialized = true;
}

async function verifyIdToken(idToken) {
	initFirebase();
	if (!initialized) throw createError(500, 'Firebase Admin not configured');
	return admin.auth().verifyIdToken(idToken);
}

module.exports = { verifyIdToken };
