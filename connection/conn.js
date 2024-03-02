const mongoose =require('mongoose');
const express=require('express');
const app=express();
const bcrypt=require("bcrypt");
mongoose.connect('mongodb://127.0.0.1:27017/harsh').then(()=>{
    console.log("Database is Created Successfully");
}).catch((error)=>{
    console.log("Database is Not Connected");
})

const harshschema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    }
})

harshschema.pre("save",async function(next){
    if (this.isModified("password")) {
        this.password=await bcrypt.hash(this.password,10);
    }
    next();
})
const harshmodel=mongoose.model('user',harshschema);
module.exports= harshmodel

// const loginschema = mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     email:{
//         type:String,
//         require:true
//     }
// })
// const loginmodel=mongoose.model('userlogin',loginschema);
// module.exports= loginmodel
