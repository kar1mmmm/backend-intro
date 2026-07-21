require('dotenv').config();
const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use(express.json());

app.use('/api/sekolah', schoolRoutes);
app.use('/api/auth', authRoutes); 

app.get('/', (req, res) => {
    res.send('API Sekolah v1.0 Aktif');
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});