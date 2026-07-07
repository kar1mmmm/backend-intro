const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');

app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/sekolah', schoolRoutes);

app.get('/', (req, res) => {
    res.send('API Sekolah v1.0 Aktif');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});