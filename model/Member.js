const mongoose = require('mongoose')

const MemberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    squad: {
        type: String,
        required: true,
        default: "all"
    }
})

module.exports = mongoose.model('Members', MemberSchema)