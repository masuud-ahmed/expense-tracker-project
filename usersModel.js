const mongoose=require('mongoose');

let userSchema=new mongoose.Schema({
    name:{
        type:'String',
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:"String",
        required:true
    },
    isAdmin:{
        type:Number,
        required:false,
        default:0
    },
    userName:{
        type:"String",
        required:true
    },
    password:{
        type:"String",
        required:true
    }

});

const userModel=mongoose.model("users",userSchema);

module.exports={userModel};