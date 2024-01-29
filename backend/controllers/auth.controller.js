import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { errorHandler } from '../utils/error.js';

export const signup = async(req,res,next)=>{
    const {username,email,password}=req.body;
    console.log(username,email,password)
    try {
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            next(errorHandler(400,"All fields are required"))
        }

        const hashPassword = bcrypt.hashSync(password,10);

        const newUser = new User({
            username,
            email,
            password:hashPassword
        });

        await newUser.save()
        res.status(200).json({
            message:"Signup successful"
        })
    } catch (error) {
        next(error)
    }
}