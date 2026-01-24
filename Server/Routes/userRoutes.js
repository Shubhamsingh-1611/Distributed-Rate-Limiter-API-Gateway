import express from 'express';
import authMiddleware from "../Utility/protect.js";
// import rateLimiter from '../Utility/rateLimiter.js';
import rateLimiter from "../Utility/luaScriptRateLimiting.js";
const router = express.Router();

import { registerUser, loginUser , logoutUser, userDeatils} from '../Controllers/userController.js';
import { getAssets } from '../Controllers/assets.js';
// import { protect } from '../Middleware/authMiddleware.js';

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/data', authMiddleware, rateLimiter, getAssets);
router.get('/me', authMiddleware, rateLimiter, userDeatils);
// router.get('/profile', protect, getUserProfile);
export default router;