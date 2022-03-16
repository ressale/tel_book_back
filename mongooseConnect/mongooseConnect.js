import mongoose from 'mongoose'
const {Schema, model} = mongoose
const url = 'mongodb+srv://Uncle_Niko:galatapodsalatom@cluster0.eq47q.mongodb.net/test_1?retryWrites=true&w=majority'

export const mongooseConnect = async () => {
    try{
       await mongoose.connect(url, { useUnifiedTopology: true, useNewUrlParser: true })
        console.log('mongoose connect DB')
    }catch (e) {
        console.log(e.message)
    }
}
mongooseConnect()

const contactSchema = new Schema({name: String, phone: Number})
// export default
// const newModel = mongoose.model('Model', contactSchema, 'user_phone_numbers')
// export default newModel
// 1 аргумент - имя модели которую используем
// 2 фзгумент - схема модели (т.е внутр структура)
// 3 аргумент - коллекция в базе с которой работаем, если не указать автоматом создается новая коллекция 
// имя коллекции генерируется автоматически отталкиваясь от имени модели
// в данном случае имя коллекции будет Models(имя модели во множественном числе)
export default model('Model', contactSchema, 'user_phone_numbers')