const request = require('supertest');
const express = require('express');
const { errorHandler, CustomError } = require('../src');
const asyncWrapper = require('../src/asyncWrapper');

const app = express();

// Test: Sync Error
app.get('/sync-error', () => {
    throw new Error('Sync Error Test');
});

// Test: Custom Error
app.get('/custom-error', () => {
    throw new CustomError('Custom Error Test', 400);
});

// Test: Async Error (Fixed with asyncWrapper)
app.get('/async-error', asyncWrapper(async () => {
    throw new Error('Async Error Test');
}));

// Use Error Handler Middleware
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