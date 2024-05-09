// index.js

// Import required packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const authController = require('./controllers/authController');
const profileController = require('./controllers/profileController');

// Initialize Express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/register', authController.register);
app.post('/login', authController.login);
app.get('/profile', profileController.getProfile);
app.put('/profile', authController.authenticateToken, profileController.updateProfile);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
