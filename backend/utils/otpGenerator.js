const generateOtp = () => {
    const code = Math.floor(100000 + Math.random() * 900000);
    const expiry = Date.now() + 10 * 60 * 1000; // 10 minutes from now
    return { code, expiry };
};

const verifyOtpValidity = (expiry) => {
    return Date.now() < expiry;
};

module.exports = { generateOtp, verifyOtpValidity };
