import express from 'express'
import cors from 'cors'
import getAndAddContactRouter from './routers/addAndGetRouter.js'
import changeAndDeleteContactRouter from './routers/changeAndDeleteRouter.js'
import searchAndGetContact from './routers/searchAndGetContact.js'
import {connectionDB} from "./connectionDB.js"
import {mongooseConnect} from './mongooseConnect/mongooseConnect.js'

const PORT = 7000
const app = express()
await connectionDB()
// await mongooseConnect()

app.listen(PORT, () => console.log(`connect on ${PORT}...`))
app.use(cors())
app.use(express.json())
app.use('/app', getAndAddContactRouter)
app.use('/app', changeAndDeleteContactRouter)
app.use('/app', searchAndGetContact)