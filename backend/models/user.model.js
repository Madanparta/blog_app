import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    profilePicture:{
        type:String,
        default:"https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png",
    }
},{timestamps:true});

const userModel = mongoose.model('User',userSchema);

export default userModel;