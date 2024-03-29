import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()
// app.use(cors({
//     origin: process.env.CORS_ORIGIN,
//     credentials: true
// }))

app.use(cors())
app.use(cookieParser())
app.use(express.json({limit: "16kb"}))
import userRouter from './routes/userauth.js'

//routes declaration

app.use("/api/v1/users",userRouter);
export { app }