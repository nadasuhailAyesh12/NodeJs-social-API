const yup = require('yup')

const postValidationSchema = yup.object().shape({
    title: yup.string().min(1).max(180)
})

module.exports = postValidationSchema