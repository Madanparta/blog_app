import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from './routes/auth.route.js';
dotenv.config()
const app = express();

mongoose.connect(process.env.MONGOOSE)
    .then(()=>console.log("Mongodb connected."))
    .catch((err)=>console.log(err))



app.use(express.json());

app.listen(3000,()=>{
    console.log('Server run with 3000 port.!!')
})

app.use('/api/user',userRouter)
app.use('/api/user',authRouter)