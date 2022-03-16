import {Router} from "express"
import {db} from "../connectionDB.js"
const router = Router()
import Model from '../mongooseConnect/mongooseConnect.js'
// import mongoose from 'mongoose'


router.get('/get_contact/', async (req, res) => {
   
    try {
         let data_1 = await Model.find({})
        console.log('data_1', data_1)
        // let data = await db.find({}).toArray()
        res.status(200).send(data_1)
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
            // await db.insertOne({name: name, phone: phone})
            // два метода добавления в базу
            //1
            // let contact = new Model({name, phone, org: [{name: "iii"}]})
            // await contact.save()
            //2
            await Model.create({name, phone})

        } catch (e) {
            if (e) {
                // return res.send({status: "bad"})
                console.log(e.message)
                res.send(e.message)
            }
        }
        // res.send({status: "ok"})
        // await client.close()
        next()
    },
    async (req, res) => {
        try {
            let data_1 = await Model.find({})
            // let data = await db.find({}).toArray()
            res.send(data_1)
        } catch (e) {
            console.log(e.message)
            throw new Error('ERROR')
            // res.send(e.message)
        }
        // await client.close()
    })

export default router
