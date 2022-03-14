import express from 'express'
import cors from 'cors'
import getAndAddContactRouter from './routers/addAndGetRouter.js'
import changeAndDeleteContactRouter from './routers/changeAndDeleteRouter.js'
import {connectionDB} from "./connectionDB.js"

const PORT = 5000
const app = express()
await connectionDB()

app.listen(PORT, () => console.log(`connect on ${PORT}...`))
app.use(cors())
app.use(express.json())
app.use('/app', getAndAddContactRouter)
app.use('/app', changeAndDeleteContactRouter)