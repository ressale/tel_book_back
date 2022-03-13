import {Router} from "express"
import {db} from "../connectionDB.js"
import {ObjectId} from "mongodb"
const router = Router()

router.post('/delete_contact/', async (req, res) => {
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

router.post('/change_contact/', async (req, res) => {
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

export default router