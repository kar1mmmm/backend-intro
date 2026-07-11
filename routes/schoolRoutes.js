const express = require('express');
const { stat } = require('fs');
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

router.post('/',async (req, res) => {
    try{
        const newData =  req.body;
        const filePath = path.join(__dirname, '/data/schools.json');

        const fileData = await fs.readFile(filePath, 'utf8');
        const schoolData = JSON.parse(fileData);

        const newKey = `SEKOLAH_${Date.now()}`;
        schoolData[newKey] = newData;

        await fs.writeFile(filePath, JSON.stringify(schoolData, null, 4));


        res.status(201).json({status : "success", message : "Data berhasil ditambahkan."});
    } catch (error) {
        console.log("Detail error post");
        console.log(error);
        res.status(500).json({status : "error", message : "gagal menyimpan data."});
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const filePath = path.join(__dirname, '../schools.json');

        const fileData = await fs.readFile(filePath, 'utf8');
        const schoolData = JSON.parse(fileData);

        if (schoolData[id]){
            delete schoolData[id];
            await fs.writeFile(filePath, JSON.stringify(schoolData, null, 4));
            res.json({status: "success", message: `Data${id} berhasil dihapus`});
        } else {
            res.status(404).json({status: "error", message: "Data tidak ditemukan"});
        }
    } catch(error){
        console.log("=== DETAIL ERROR DELETE ===");
        console.log(error);
        res.status(500).json({staus: "error", message: "Gagal menghapus data"});
    }
});

module.exports = router;