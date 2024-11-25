import mongoose from "mongoose"
import {DB_NAME} from '../constant.js'

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}${DB_NAME}`)
        console.log(`MONGO DB CONNECTED !! DB NAME : ${connectionInstance.connection.host}`)
    } 
    catch (error) {
        console.log("Mongo DB connection error",error)
        process.exit(1)
    }
}

export default connectDB;