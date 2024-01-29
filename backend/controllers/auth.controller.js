import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const signup = async(req,res)=>{
    const {username,email,password}=req.body;
    try {
        if(!username || !email || !password || username === '' || email === '' || password === ''){
            return res.status(400).json({message:"All fields are required"});
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
        res.status(500).json({
            message:error
        })
    }
}