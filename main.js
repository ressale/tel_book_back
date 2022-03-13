import express from 'express'
import {MongoClient, ObjectId} from "mongodb"
import cors from 'cors'
import getRouter from './routers.js'

const url = 'mongodb+srv://Uncle_Niko:galatapodsalatom@cluster0.eq47q.mongodb.net/test_1?retryWrites=true&w=majority'
const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const PORT = 5000
const app = express()
app.use(express.json())
app.use(cors())
app.listen(PORT, () => console.log(`connect on ${PORT}...`))

const connectionDB = async () => {
    try {
        await client.connect()
        console.log('DB connect')
    } catch (e) {
        console.log(e.message)
    }
}
await connectionDB()

export const db = client.db('test_1').collection('user_phone_numbers')

//get contact

app.use('/app', getRouter)

// app.post('/add_contact/:name/:id', async (req, res, next) => {
//         console.log(req.params)
//         let {name, phone} = req.body
//         try {
//             await connectionDB()
//             await db.insertOne({name: name, phone: phone})
//         } catch (e) {
//             if (e) {
//                 return res.send({status: "bad"})
//                 // console.log(e.message)
//                 // throw new Error('BLYA')
//             }
//         }
//         // res.send({status: "ok"})
//         // await client.close()
//         next()
//     },
//     async (req, res) => {
//         try {
//             let data = await db.find({}).toArray()
//             res.send(data)
//             // res.send({status: "ok"})
//         } catch (e) {
//             console.log(e.message)
//             throw new Error('ERROR')
//         }
//         // await client.close()
//     })

app.post('/delete_contact/', async (req, res) => {
    let {_id} = req.body
    try {
        await db.deleteOne({_id: ObjectId(_id)})
        // res.send({status: "ok"})
    } catch (e) {
        console.log(e.message)
        throw new Error('ERROR')
    }
    if (_id) res.send({status: 'ok'})
})

app.post('/change_contact/', async (req, res) => {
    let {idForChange, name, phone} = req.body
    let tmp
    try {
        if (!name) {
            tmp = {phone: phone}
        } else if (!phone) {
            tmp = {name: name}
        } else if (name && phone) {
            tmp = {name: name, phone: phone}
        }
        await db.updateOne({_id: ObjectId(idForChange)}, {$set: tmp})
        // res.send({status: "ok"})
    } catch (e) {
        console.log('e.message', e.message)
        throw new Error("ERROR MESS")
    }
    if (idForChange) res.send({status: 'ok'})
})