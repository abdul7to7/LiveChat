const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        min:3,
        max:50,
        unique:true,
    },
    userMail:{
        type:String,
        required:true,
        min:3,
        max:50,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        min:3,
        max:50,
        unique:true,
    },
    isAvatarImageSet:{
        type:Boolean,
        default:false,
    },
    avatarImage:{
        type:String,
        default:"",
    }
})

module.exports=mongoose.model("User",userSchema)