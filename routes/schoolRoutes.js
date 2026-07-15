const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // Pastikan ini ada

// --- RUTE AKTIF (SQL) ---

// 1. Get Semua Data
router.get('/', async (req, res, next) => {
    try { 
        const [rows] = await pool.query('SELECT * FROM daftar_sekolah'); 
        res.json({ status: "success", data: rows });
    } catch (error) {
        next(error);
    }
});

// 2. Post Data Baru (SQL)
router.post('/', async (req, res, next) => {
    try {
        const { nama, lokasi } = req.body;
        if (!nama || !lokasi) {
            return res.status(400).json({ status: "error", message: "Nama dan Lokasi wajib diisi" });
        }
        const [result] = await pool.query('INSERT INTO daftar_sekolah (nama, lokasi) VALUES (?, ?)', [nama, lokasi]);
        res.status(201).json({ status: "success", message: "Data berhasil ditambahkan", id: result.insertId });
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const id = req.params.id;
        const [result] = await pool.query('DELETE FROM daftar_sekolah WHERE ID = ?', [id]);


        if (result.affectedRows === 0) {
            return res.status(404).json({status: "error", message: "Data tidak ditemukan"});
        } 

        res.json({ status: "success", message: `Data sekolah dengan ID ${id} berhasil dihapus`});
    } catch (error) {
        next(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        const {nama, lokasi } = req.body;

        if (!nama || !lokasi){
            return res.status(400).json({status: "error", message: "Nama dan lokasi wajib diisi untuk update"});
        }

        const [result] = await pool.query('UPDATE daftar_sekolah SET nama = ?, lokasi = ? WHERE id = ?',[nama, lokasi, id]);

        if (result.affectedRows === 0){
            return res.status(404).json({status: "error",  message: "Data tidak ditemukan"});
        }
            res.json({status: "success", message: `Data sekolah dengan ID ${id} berhasil diperbarui`});
    } catch (error) {
        next(error);
    }
});

/* 
                    RUTE JSON LAMA DINONAKTIFKAN SEMENTARA

router.get('/:jenjang', async (req, res, next) => {
    try {
        const jenjang = req.params.jenjang.toUpperCase();
        const schoolData = await readData();

        if (schoolData[jenjang]) {
            res.json({ status: "success", data: schoolData[jenjang] });
        } else {
            res.status(404).json({ status: "error", message: "Jenjang tidak tersedia." });
        }
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const { nama, lokasi } = req.body;

        if (!nama || !lokasi) {
            return res.status(400).json({ status: "error", message: "Nama dan Lokasi sekolah wajib di isi" });
        }

        const schoolData = await readData();
        const newKey = `SEKOLAH_${Date.now()}`;
        schoolData[newKey] = { nama, lokasi };
        
        await fs.writeFile(filePath, JSON.stringify(schoolData, null, 4));
        res.status(201).json({ status: "Success", message: "Data sekolah berhasil ditambahkan" });
    } catch (error) {
        next(error);
    }
});




*/

module.exports = router;