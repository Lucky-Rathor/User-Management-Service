const { generateOtp, verifyOtpValidity } = require('../utils/otpGenerator');
const db = require('../database/db');

// Login User
const loginUser = (req, res) => {
    const { email, password } = req.body;

    const user = db.get('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const otp = generateOtp();
    db.run('UPDATE users SET otp = ?, otpExpiry = ? WHERE email = ?', [otp.code, otp.expiry, email]);

    res.status(200).json({ message: 'OTP sent', otp });
};

// Register User
const registerUser = (req, res) => {
    const { name, email, password, companyName, age, dob, image } = req.body;

    db.run('INSERT INTO users (name, email, password, companyName, age, dob, image) VALUES (?, ?, ?, ?, ?, ?, ?)', [name, email, password, companyName, age, dob, image], (err) => {
        if (err) return res.status(500).json({ message: 'Error registering user' });

        res.status(201).json({ message: 'User registered successfully' });
    });
};

// Verify OTP
const verifyOtp = (req, res) => {
    const { email, otp } = req.body;

    const user = db.get('SELECT * FROM users WHERE email = ? AND otp = ?', [email, otp]);
    if (!user || !verifyOtpValidity(user.otpExpiry)) {
        return res.status(400).json({ message: 'OTP expired or invalid' });
    }

    res.status(200).json({ message: 'OTP verified', user });
};

// Delete User
const deleteUser = (req, res) => {
    const { email } = req.params;

    db.run('DELETE FROM users WHERE email = ?', [email], (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting user' });

        res.status(200).json({ message: 'User deleted successfully' });
    });
};

module.exports = { loginUser, registerUser, verifyOtp, deleteUser };
