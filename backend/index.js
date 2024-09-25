import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoute from './routes/userRoute.js'
import companyRoute from './routes/companyRoute.js'
import  jobRoute from './routes/jobRoute.js'
import  applicationRoute from './routes/applicationRoute.js'
import dbConnect from './utils/dbConnection.js'
dotenv.config({})

dbConnect()
const app = express()



//middleware

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin: "https://job-hunt-frontend-khaki.vercel.app", // Frontend URL
    credentials: true, // Allow credentials (cookies, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  };
  
app.use(cors(corsOption))
const PORT = process.env.PORT || 8000

//api
app.use('/api/v1/user',userRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/job',jobRoute)
app.use('/api/v1/application',applicationRoute)



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})