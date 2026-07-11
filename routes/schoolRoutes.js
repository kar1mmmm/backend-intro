const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../data/schools.json');

const readData = async () => {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
};

router.get('/:jenjang', async (req, res) => {
    try {
        const jenjang = req.params.jenjang.toUpperCase();
        const schoolData = await readData();

        if (schoolData[jenjang]) {
            res.json({ status: "success", data: schoolData[jenjang] });
        } else {
            res.status(404).json({ status: "error", message: "Jenjang tidak tersedia." });
        }
    } catch (error) {
        res.status(500).json({ status: "error", message: "Gagal memuat data." });
    }
});

router.post('/', async (req, res) => {
    try {
        const newData = req.body;
        const schoolData = await readData();

        const newKey = `SEKOLAH_${Date.now()}`;
        schoolData[newKey] = newData;

        await fs.writeFile(filePath, JSON.stringify(schoolData, null, 4));
        res.status(201).json({ status: "success", message: "Data berhasil ditambahkan." });
    } catch (error) {
        console.log("=== DETAIL ERROR POST ===");
        console.log(error);
        res.status(500).json({ status: "error", message: "Gagal menyimpan data." });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id.toUpperCase();
        const schoolData = await readData();

        if (schoolData[id]) {
            delete schoolData[id];
            await fs.writeFile(filePath, JSON.stringify(schoolData, null, 4));
            res.json({ status: "success", message: `Data ${id} berhasil dihapus` });
        } else {
            res.status(404).json({ status: "error", message: "Data tidak ditemukan" });
        }
    } catch (error) {
        console.log("=== DETAIL ERROR DELETE ===");
        console.log(error);
        res.status(500).json({ status: "error", message: "Gagal menghapus data" });
    }
});

module.exports = router;