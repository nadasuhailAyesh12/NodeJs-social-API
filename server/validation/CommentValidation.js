const yup = require('yup')
const Filter = require('bad-words')

const commentValidationSchema = yup.object().shape({
    description: yup.string().min(1).test("checkIsProfane", "can’t use profane words", function (value) {
        return (!new Filter().isProfane(value))
    })
})

module.exports = commentValidationSchema;