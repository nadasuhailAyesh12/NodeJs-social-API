const validator = (schema) => async (req, res, next) => {
    try {
        const body = req.body;
        await schema.validate(body)
        return next()
    }
    catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}
module.exports = validator