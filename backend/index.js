import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import companyRoute from './routes/companyRoute.js'
import  jobRoute from './routes/jobRoute.js'
import  applicationRoute from './routes/applicationRoute.js'
import path from 'path'
import dbConnect from './utils/dbConnection.js'
dotenv.config({})

dbConnect()
const app = express()
const _dirname = path.resolve()


//middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOption = {
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(cors(corsOption))
const PORT = process.env.PORT || 8000

//api
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',applicationRoute)

app.use(express.static(path.join(_dirname, "frontend/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"))
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})