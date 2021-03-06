const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Squad = require('./model/Squad')
const Training = require('./model/Training')
const Member = require('./model/Member')
const cors = require('cors')



const app = express()

dotenv.config()
mongoose.connect(
    process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => console.log("---Connected to DB---")
)


app.use(express.json())

app.use(cors())


//Router Routes
const trainingRouter = require('./routes/training_router')
const memberRouter = require('./routes/member_router')

app.use('/api/training', trainingRouter)
app.use('/api/member', memberRouter)


//Middleware


app.get('/api/squads', async (req, res) => {
    try {
        console.log("getting squads")
        const squads = await Squad.find()
        res.send(squads.map(squad => squad.name))
    } catch (err) {
        res.status(400).send(err)
    }

})


if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'))
    app.get('*', (req, res ) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}


const PORT = process.env.PORT || 5000

app.listen(PORT)
console.log(`Server started on port: ${PORT}`)