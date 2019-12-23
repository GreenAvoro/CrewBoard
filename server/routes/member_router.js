const router = require('express').Router()
const Member = require('../model/Member')

router.get('/', async (req, res) => {
    //Is the Query Present? If so retrieve members matching squad query
    //Test comment
    if (req.query.squad && req.query.squad !== "all") {
        try {
            let squad_name = req.query.squad
            const members = await Member.find({ squad: squad_name })
            res.send(members.map(member => member))
        } catch (err) {
            res.status(400).send(err)
        }
        //No Query present so just retrieve all members
    } else {
        try {
            const members = await Member.find()
            res.send(members.map(member => member))
        } catch (err) {
            res.status(400).send(err)

        }
    }

})

router.post('/', async (req, res) => {
    if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
        res.send("No Object")
        return
    }
    const new_member = new Member({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        squad: req.body.squad
    })

    try {
        const savedMember = await new_member.save()
        res.send({ new_member: new_member._id })
    } catch (err) {
        res.status(400).send(err)
    }
})
router.post('/search', async(req,res) => {

    const search = req.body.search.toLowerCase()
    try{
        search === "" ? res.send([]) : false
        const members = await Member.find()
        const member_names = members.map(member => {
            const firstName = member.firstName.toLowerCase()
            const lastName = member.lastName.toLowerCase()
            if(firstName.includes(search) || lastName.includes(search)){
                return member
            }
            else{
                return null
            }
        })

        res.send(member_names.filter(name => name !== null))
    }catch(err){
        res.status(400).send(err)
    }
})
router.post('/delete', async(req,res) => {
    try{
        const deleted = await Member.findByIdAndDelete(req.body.id)
        console.log(`Delted : ${deleted}`)
    }catch(err){
        res.status(400).send(err)
    }
})

router.post('/edit', async(req,res) => {

    try{
        console.log(req.body.id)
        console.log(req.body.firstName)
        console.log(req.body.lastName)
        const update = await Member.findByIdAndUpdate(req.body.id,{
            firstName: req.body.firstName,
            lastName: req.body.lastName})

        console.log(`Updated: ${update}`)
        res.send("Updated")
    }catch(err){
        res.status(400).send(err)
    }
})


module.exports = router