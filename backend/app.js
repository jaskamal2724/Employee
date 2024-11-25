import dotenv from "dotenv"
dotenv.config({
    path:"./.env"
})
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import session from "express-session"

const app = express()
app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}))


app.use(session({
    secret : process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        maxAge:3600000
    }
}))

app.use(express.json({
    limit:"20kb"
}))
app.use(express.urlencoded({extended:true, limit:"20kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import 
import router from "./routes/Employee.js"
app.use(router)

export {app}