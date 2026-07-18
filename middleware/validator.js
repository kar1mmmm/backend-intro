const validasiSekolah = (req, res, next) => {
    const nama = req.body.nama ? req.body.nama.trim() : '';
    const lokasi = req.body.lokasi ? req.body.lokasi.trim() : '';

    if (!nama || !lokasi ){
        return res.status(400).json({
            status: "error", 
            message: "Nama dan Lokasi wajin diisi"
        });
    }

    req.body.nama = nama;
    req.body.lokasi = lokasi;

    next();
};

module.exports = { validasiSekolah };