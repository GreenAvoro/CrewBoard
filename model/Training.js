const mongoose = require('mongoose')

const TrainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    startTime: {
        type: String,
        required: true,
        default: Date.now()
    },
    endTime: {
        type: String,
        required: true,
        default: Date.now()
    },
    recurring: {
        type: Boolean,
        default: false
    },
    endDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    colour: {
        type: String,
        required: true,
        default: "blue"
    },
    location: {
        type: String,
        required: true
    },
    squad: {
        type: String,
        required: true
    },
    crews: {
        type: Array,
        default: []
    }
})

module.exports = mongoose.model('Training', TrainingSchema)