const notFoundError = (req, res) => {
    res.status(404).json({ message: "Not Found" });
}

const errorHandler = (error, req, res, next) => {
    if (error.status) {
        res.status(error.status).json({ message: error.message });
    } else {
        res.status(500).json({ message: error.message });
    };
}

module.exports = { errorHandler, notFoundError };
