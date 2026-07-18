const errorHandler = (err, req, res, next) => {
    console.error(`[Global Error]: ${err.message}`);

    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: "error",
        message: err.message || "Terjadi kesalahan pada internal server"
    });
    
};

module.exports = errorHandler;