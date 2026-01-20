import express from 'express';
const router = express.Router();

import { registerUser, loginUser } from '../Controllers/userController.js';
// import { protect } from '../Middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/profile', protect, getUserProfile);
export default router;