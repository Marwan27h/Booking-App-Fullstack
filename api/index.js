import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import hotelsRoute from "./routes/hotels.js"
import roomsRoute from "./routes/rooms.js"
import cookieParser from "cookie-parser"
import cors from "cors"


const app = express()
const PORT = 3009
dotenv.config()



const connect = async () =>{
   try {
    await mongoose.connect(process.env.MONGO)
    console.log("connected to mongoDb")
} catch (err) {
    throw err
} 
}

// Middelwarese
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/users", usersRoute)
app.use("/api/hotels", hotelsRoute)
app.use("/api/rooms", roomsRoute)

app.use((err,req,res,next)=>{
    const errorStatus = err.status || 500
     const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
    
})


app.listen(PORT, () => {
    connect()
    console.log(`The server runs on PORT ${PORT}`)
})
