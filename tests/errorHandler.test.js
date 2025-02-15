const request = require('supertest');
const express = require('express');
const { errorHandler, CustomError } = require('../src');

const app = express();
app.get('/sync-error', () => {
    throw new Error('Sync Error Test');
});
app.get('/custom-error', () => {
    throw new CustomError('Custom Error Test', 400);
});
app.get('/async-error', async () => {
    throw new Error('Async Error Test');
});

app.use(errorHandler());

describe('Error Handler Middleware', () => {
    test('Handles sync errors', async () => {
        const res = await request(app).get('/sync-error');
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Sync Error Test');
    });

    test('Handles custom errors', async () => {
        const res = await request(app).get('/custom-error');
        expect(res.status).toBe(400);
        expect(res.body.message).toBe('Custom Error Test');
    });

    test('Handles async errors', async () => {
        const res = await request(app).get('/async-error');
        expect(res.status).toBe(500);
        expect(res.body.message).toBe('Async Error Test');
    });
});