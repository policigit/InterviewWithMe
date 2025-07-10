const express = require('express'); 
const { createSession, getSessionById, getMySessions, deleteSession } = require('../controllers/sessionController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

// Create a new session
router.post('/create', protect, createSession);
// Get session by ID
router.get('/my-sessions', protect, getMySessions);
// Get session by ID
router.get('/:id', protect, getSessionById);    
// Delete a session
router.delete('/:id', protect, deleteSession);

module.exports = router;


// This code defines the routes for session management in an Express application.
// It includes routes to create a session, get sessions by ID, retrieve all sessions for the authenticated user, and delete a session.
// The `protect` middleware is used to ensure that these routes are accessible only to authenticated users.