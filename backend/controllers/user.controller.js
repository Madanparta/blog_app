import userModel from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcrypt from 'bcryptjs'

export const test = (req,res)=>{
    res.json({message:"Api is workin."})
}

export const updateUser = async(req,res,next)=>{
    console.log(req.user)
    try {
        if(req.user.id !== req.params.userId){
            return next(errorHandler(403,"You are not allowed to update this users"));
        }
        if(req.body.password){
            if(req.body.password < 6){
                return next(errorHandler(400,"Password must be atlist 6 characters"));
            }
            req.body.password = bcrypt.hashSync(req.body.password,10);
        }

        if(req.body.username){
            if(req.body.username.length < 7 || req.body.username.length > 20){
                return next(errorHandler(400,"Username must be between 7 and 20 characters"));
            }
            if(req.body.username.includes(" ")){
                return next(errorHandler(400,"Username cann't contain spances"));
            }
            if(req.body.username !== req.body.username.toLowerCase()){
                return next(errorHandler(400,"Username must be lowercase"));
            }
            if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
                return next(errorHandler(400,"Username can only contain lerrers and numbers"));
            }
        }

        const updateUser = await userModel.findByIdAndUpdate(req.params.userId,{
            $set:{
                username:req.body.username,
                email:req.body.email,
                profilePicture:req.body.profilePicture,
                password:req.body.password,
            },
        },{new:true})

        const {password:pass,...rest}= updateUser._doc;
        res.status(200).json(rest)
        
    } catch (error) {
        next(error);
    }
}