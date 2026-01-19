const request = require('supertest');
const { createApp } = require('../app');

describe('GET /health', () => {
	it('returns ok=true', async () => {
		const app = createApp();
		const res = await request(app).get('/health');
		expect(res.status).toBe(200);
		expect(res.body).toEqual({ ok: true });
	});
});
