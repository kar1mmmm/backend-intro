const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');

router.get('/:jenjang', async (req, res) => {
    try{
        const jenjang = req.params.jenjang.toUpperCase();

        const filePath = path.join(__dirname, '../data/schools.json'); 
        const data = await fs.readFile(filePath, 'utf8');
        const schoolData = JSON.parse(data);

        if (schoolData[jenjang]){
            res.json({status: "success", data: schoolData[jenjang]});
        } else {
            res.status(404).json({ status: "error", message: "Jenjang tidak tersedia."});
        }
    } catch (error){
        res.status(500).json({status: "error", message: "Gagal memuat data."});
    }
});

module.exports = router;