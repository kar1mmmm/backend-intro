require('dotenv').config();
const express = require('express');
const app = express();
const schoolRoutes = require('./routes/schoolRoutes');
const errorHandler = require('./middleware/errorHandler');

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


app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});