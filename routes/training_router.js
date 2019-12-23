const router = require('express').Router()
const Training = require('../model/Training')
const moment = require('moment')

router.get('/', async (req, res) => {
    if (req.query.squad && req.query.squad !== "all") {
        let squad = req.query.squad
        const trainings = await Training.find({
            $or: [
                { squad: squad },
                { squad: "all" }
            ]
        })
        res.send(trainings.map(training => training))

    } else {
        const trainings = await Training.find()
        res.send(trainings.map(training => training))
    }
})

router.post('/', async (req, res) => {

    console.log(req.body)


    //Create recurring trainings
    if (req.body.date !== req.body.endDate) {
        let a = moment(req.body.date)
        let b = moment(req.body.endDate)
        let maxWeeks = 50 //Set a maximum amount of weeks so the server doesn't crash
        while (moment.max(a, b) === b && maxWeeks > 0) {
            
            const data = req.body
            const training = new Training({
                name: data.name,
                description: data.desc,
                date: a.toDate(),
                endDate: data.endDate,
                startTime: data.startTime,
                endTime: data.endTime,
                recurring: data.recurring,
                colour: data.colour,
                location: data.location,
                squad: data.squad,
                crews: []
            })
            a.add(7, "days")
            try {
                const savedTraining = await training.save()
                console.log("saved!")
            } catch (err) {
                res.status(400).send(err)
            }
            maxWeeks = maxWeeks - 1

        }
        res.send("trainigs added")
        return
    }

    const data = req.body
    const training = new Training({
        name: data.name,
        description: data.desc,
        date: data.date,
        endDate: data.endDate,
        startTime: data.startTime,
        endTime: data.endTime,
        recurring: data.recurring,
        colour: data.colour,
        location: data.location,
        squad: data.squad,
        crews: []
    })
    console.log(training)
    try {
        const savedTraining = await training.save()
        console.log("saved!")
        res.send({ training: training._id })

    } catch (err) {
        res.status(400).send(err)
    }
})

router.post('/addcrews', async (req, res) => {
    console.log(req.body)
    const training = await Training.findById(req.body.training_id)
    try {
        training.crews = req.body.crews
        const savedTraining = await training.save()
        res.send({ msg: "Saved Crews" })
    } catch (err) {
        console.log("Err")
        res.status(400).send("ERROR")
    }
})


module.exports = router