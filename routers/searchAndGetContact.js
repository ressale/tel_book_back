import {Router} from 'express'
import Model from '../mongooseConnect/mongooseConnect.js'

const router = Router()

router.post('/search_contact/', async (req, res) => {
        console.log(req.body.data)
        try {
            let {data} = req.body
            let contactArray = await Model.find({})
            let searchedContact = contactArray.filter(el => el.name.toUpperCase().includes(data.toUpperCase()))
            res.send(searchedContact)
        } catch (e) {
            console.log(e.message)
        }
    }
)

export default router