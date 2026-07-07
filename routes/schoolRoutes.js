const express = require('express');
const router = express.Router();
const schoolData = require('../data/schools.json');

router.get('/:jenjang', (req, res) => {
    const jenjang = req.params.jenjang.toUpperCase();
    if (schoolData[jenjang]) {
        res.json({ status: "success", data: schoolData[jenjang] });
    } else {
        res.status(404).json({ status: "error", message: "Data tidak ditemukan" });
    }
});

module.exports = router;