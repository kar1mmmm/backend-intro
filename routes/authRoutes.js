const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../config/db'); 
const router = express.Router();

router.post('/register', async(req, res, next) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            const error = new Error('Username dan password wajib diisi!');
            error.statusCode = 400;
            throw error;
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const [result] = await pool.query(
            'INSERT INTO users (username, password) VALUES (?, ?)',
            [username, hashedPassword]
        );
        
        res.status(201).json({
            status: "success",
            message: "Pengguna baru berhasil ditambahkan",
            userId: result.insertId
        });
        
    } catch (error) {
        next(error);
    }
});

module.exports = router;