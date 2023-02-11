const yup = require('yup')

const updateProfileValidationSchema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    profilePhoto: yup.string().required(),
    bio: yup.string().required()
})
module.exports = updateProfileValidationSchema