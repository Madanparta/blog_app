import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const signup = async(req,res,next)=>{
    const {username,email,password}=req.body;
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

export const signin = async(req,res,next)=>{
    const {email,password}=req.body;
    try {
        if(!email || !password || email === '' || password === ''){
            return next(400,'All field are required');
        }
        const validUser = await User.findOne({email})
        if(!validUser){
            return next(errorHandler(404,"User not found"));
        }
        const validPassword = bcrypt.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'Invalid password'))
        }

        const token = jwt.sign({
            id:validUser._id,
        },process.env.JWT_SECRET,);

        const {password:pass,...rest}=validUser._doc;

        res.status(200).cookie('access_token',token,{
            httpOnly:true,
        }).json(rest)

    } catch (error) {
        next(error);
    }
}