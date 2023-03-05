const yup = require('yup')
const Filter = require('bad-words')

yup.addMethod(yup.string, "checkIsProfane", function () {
    return this.test("checkIsProfane", "can’t use profane words", function (value) {
        return (!new Filter().isProfane(value))
    })
})

const postValidationSchema = yup.object().shape({
    title: yup.string().min(1).max(180).checkIsProfane()
    ,
    description: yup.string().min(1).checkIsProfane()
})

module.exports = postValidationSchema