import {Router} from "express"
import {db} from "../connectionDB.js"
const router = Router()

router.get('/get_contact/', async (req, res) => {
    try {
        let data = await db.find({}).toArray()
        res.status(200).send(data)
    } catch (e) {
        console.log(e.message)
        throw new Error('GET_ERROR')
    }
    // await client.close()
})

router.post('/add_contact/:name/:id', async (req, res, next) => {
        console.log(req.params)
        let {name, phone} = req.body
        try {
            await db.insertOne({name: name, phone: phone})
        } catch (e) {
            if (e) {
                return res.send({status: "bad"})
                // console.log(e.message)
            }
        }
        // res.send({status: "ok"})
        // await client.close()
        next()
    },
    async (req, res) => {
        try {
            let data = await db.find({}).toArray()
            res.send(data)
        } catch (e) {
            console.log(e.message)
            throw new Error('ERROR')
        }
        // await client.close()
    })

export default router