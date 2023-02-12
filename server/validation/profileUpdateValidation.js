const yup = require('yup')

const updateProfileValidationSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string().email(),
    profilePhoto: yup.string(),
    bio: yup.string()
})

module.exports = updateProfileValidationSchema