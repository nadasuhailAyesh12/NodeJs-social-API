const yup = require('yup')

const updateProfileValidationSchema = yup.object().shape({
    firstName: yup.string().min(1),
    lastName: yup.string().min(1),
    email: yup.string().email().min(1),
    profilePhoto: yup.string().min(1),
    bio: yup.string().min(1)
})

module.exports = updateProfileValidationSchema