const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')


module.exports.register=async (req,res,next)=>{
    try{
        const {userName,userMail,password}=req.body;
    const userNameCheck=await userModel.findOne({userName});
    if(userNameCheck){
        //console.log(userNameCheck);
        return res.json({message:"UserName Already Used", status:false})
    }
    const userMailCheck=await userModel.findOne({userMail});
    if(userMailCheck){
        //console.log("userMailCheck");
        return res.json({message:"UserMail Already Used", status:false})
    }
    const hashedPassword= await bcrypt.hash(password,10);
    const userCreated= await userModel.create({
        userName,
        userMail,
        password:hashedPassword,
    });
    //console.log("at Last");
    delete userCreated.password;
    res.json({userCreated,status:true});

    }catch(err){
        next(err)
    }
}

module.exports.login=async (req,res,next)=>{
    try{
        const {userName,password}=req.body;
        const userCheck=await userModel.findOne({userName});
        
        if(!userCheck){
            return res.json({message:"user not found",status:false})
        }
        const checkedPassword=await bcrypt.compare(password,userCheck.password);
        
        if(!checkedPassword){
            return res.json({message:"Password is incorrect",status:false})
        }
        return res.json({userCheck,status:true});
    }catch(err){
        return res.json({err,message:"something went wrong",status:false})
    }
}

module.exports.getallusers=async(req,res,next)=>{
    try{
        const users=await userModel.find({_id:{$ne:req.params.id}}).select([
            "userMail",
            "userName",
            "_id",
        ])
        return res.json({status:true,users});
    }catch(err){
        return res.json({status:false,message:"Someting went wrong"})
    }
}