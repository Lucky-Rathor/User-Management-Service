const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    companyName: { type: String, required: true },
    age: { type: Number, required: true },
    dob: { type: Date, required: true },
    image: { type: String, required: true },
    otp: { type: Number },
    otpExpiry: { type: Date },
});

module.exports = mongoose.model('User', userSchema);
