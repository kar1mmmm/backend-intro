const express = require('express');
const router = express.Router();
const pool = require('../config/db'); 

const { validasiSekolah } = require('../middleware/validator');

// --- RUTE AKTIF (SQL) ---

// 1. Get Semua Data
router.get('/', async (req, res, next) => {
    try{
        const{ cari } = req.query;
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        let result;

        if(cari){
            const keyword = `%${cari}%`;
            [result] = await pool.query(
                'SELECT * FROM daftar_sekolah WHERE nama LIKE ? OR lokasi LIKE ? LIMIT ? OFFSET ?',[keyword, keyword, limit, offset]);
        } else {
            [result] = await pool.query('SELECT * FROM daftar_sekolah LIMIT ? OFFSET ?',
                [limit, offset]
            );
        }

        res.json({
            status: "success",
            halaman_saat_ini : page,
            batas_data : limit,
            jumlah_data_ditemukan: result.length,
            data: result
        });
    }catch (error){
        next(error);
    }
});

// 2. Post Data Baru (SQL)
router.post('/', validasiSekolah, async (req, res, next) => {
    try {
        const { nama, lokasi } = req.body;
        const [result] = await pool.query('INSERT INTO daftar_sekolah (nama, lokasi) VALUES (?, ?)', [nama, lokasi]);
        res.status(201).json({ status: "success", message: "Data berhasil ditambahkan", id: result.insertId });
    } catch (error) {
        next(error);
    }
});

// 3. Delete Data
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

// 4. Update Data
router.put('/:id', validasiSekolah, async (req, res, next) => {
    try{
        const id = req.params.id;
        const {nama, lokasi } = req.body;

        const [result] = await pool.query('UPDATE daftar_sekolah SET nama = ?, lokasi = ? WHERE id = ?',[nama, lokasi, id]);

        if (result.affectedRows === 0){
            return res.status(404).json({status: "error",  message: "Data tidak ditemukan"});
        }
            res.json({status: "success", message: `Data sekolah dengan ID ${id} berhasil diperbarui`});
    } catch (error) {
        next(error);
    }
});


module.exports = router;