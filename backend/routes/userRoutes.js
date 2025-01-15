const express = require('express');
const { loginUser, registerUser, verifyOtp, deleteUser } = require('../controllers/userController');
const router = express.Router();

router.post('/login', loginUser);
router.post('/register', registerUser);
router.post('/verify-otp', verifyOtp);
router.delete('/delete/:email', deleteUser);

module.exports = router;
