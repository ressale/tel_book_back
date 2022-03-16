import {MongoClient} from "mongodb"
const url = 'mongodb+srv://Uncle_Niko:galatapodsalatom@cluster0.eq47q.mongodb.net/test_1?retryWrites=true&w=majority'

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
export const db = client.db('test_1').collection('user_phone_numbers')
export const connectionDB = async () => {
    try {
        await client.connect()
        console.log('DB connect')
    } catch (e) {
        console.log(e.message)
    }
}