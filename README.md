# express-universal-error-handler 🛡️

A universal error handler middleware for Express.js that handles synchronous, asynchronous, and custom errors gracefully.

---

## 📦 Installation

```bash
npm install express-universal-error-handler
```

## 🚀 Usage

```javascript
const express = require('express');
const { errorHandler, CustomError } = require('express-universal-error-handler');
const asyncWrapper = require('express-universal-error-handler/asyncWrapper');

const app = express();

// Example Sync Route
app.get('/sync-error', () => {
    throw new Error('Sync Error Example');
});

// Example Async Route
app.get('/async-error', asyncWrapper(async () => {
    throw new Error('Async Error Example');
}));

// Example Custom Error Route
app.get('/custom-error', () => {
    throw new CustomError('Custom Error Example', 400);
});

// Use the error handler middleware
app.use(errorHandler());

// Start Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
```


## ✅ Features
- 📦 Simple plug-and-play Express middleware
- 💪 Handles sync, async, and custom errors
- 📊 Structured JSON error responses
- 🚀 Lightweight and fast

## 🧪 Testing

Run tests using Jest:

```bash
npm test
```

## 🛡️ API

<b> asyncWrapper(fn) </b>

Wraps async functions to catch errors automatically and pass them to the error handler.

<b> errorHandler(options) </b>

Handles all types of errors and returns consistent JSON responses.
	•	logErrors (boolean) – Enable logging (default: true)
	•	hideStackTrace (boolean) – Hide error stack traces (default: based on environment)

<b> CustomError(message, statusCode) </b>

Create custom application errors with status codes.

## 💡 Examples

<b> Custom Error Example: </b>

```javascript
app.get('/custom-error', () => {
    throw new CustomError('This is a custom error', 400);
});
```


<b> Async Error Example:: </b>

```javascript
app.get('/async-error', asyncWrapper(async () => {
    throw new Error('Async error occurred');
}));
```


<b> Structured Error Response Example: </b>

```javascript
{
    "status": "error",
    "message": "Async error occurred",
    "code": 500
}
```

## 🧰 Requirements

- Express.js 4+
- Node.js 16+

