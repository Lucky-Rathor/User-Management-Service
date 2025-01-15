const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run(`CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT,
        password TEXT,
        companyName TEXT,
        age INTEGER,
        dob TEXT,
        image TEXT,
        otp TEXT,
        otpExpiry INTEGER
    )`);
});

module.exports = db;

