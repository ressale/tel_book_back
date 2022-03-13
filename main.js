import express from 'express'
import {MongoClient, ObjectId} from "mongodb"
import cors from 'cors'
import getAndAddContactRouter from './routers.js'

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
connectionDB()

export const db = client.db('test_1').collection('user_phone_numbers')

app.use('/app', getAndAddContactRouter)

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