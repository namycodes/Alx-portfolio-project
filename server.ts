const dotenv = require('dotenv')
dotenv.config({path: __dirname + '/config.env'})
const mongoose = require('mongoose')

const app = require('./app')
const PORT = process.env.PORT
const MONGO_URL = process.env.MONGO_URL



mongoose.connect(MONGO_URL).then(()=>{
    console.log('Connect to database successfully')
}).catch((err:any)=>{
    console.log("An Error occured while connecting to database",err)
})



app.listen(PORT,()=>console.log(`Server listening on port ${PORT}`))