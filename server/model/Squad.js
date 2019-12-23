const mongoose = require('mongoose')

const SquadSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Squad', SquadSchema)