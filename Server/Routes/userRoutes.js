import express from 'express';
const router = express.Router();

import { registerUser, loginUser , logoutUser} from '../Controllers/userController.js';
// import { protect } from '../Middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
// router.get('/profile', protect, getUserProfile);
export default router;