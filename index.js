require('dotenv').config();
const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());
app.use('/api/sekolah', schoolRoutes);

app.get('/', (req, res) => {
    res.send('API Sekolah v1.0 Aktif');
});

const PORT = process.env.PORT || 3000;

// Middleware Global Error Handler di index.js
app.use((err, req, res, next) => {
    console.error("=== GLOBAL ERROR ===", err);
    res.status(500).json({ status: "error", message: "Terjadi kesalahan pada internal server" });
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});