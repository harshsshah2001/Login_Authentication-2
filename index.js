const express = require('express');
const app=express()
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const connection=require('./connection/conn')
app.set("view engine","hbs")
app.set("views","./views")
const bcrypt=require("bcrypt");


app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.get('/userdetail',async(req,res)=>{
  try {
    const data = await connection.find();
       res.render('userdetail',{ data })
  } catch (error) {
    console.log("Error Is Generated in Find Function")
  }
});
app.get('/',function(req,res){
    res.render('home')
})
app.get('/signup',function(req,res){
    res.render('signup')
})
app.get('/login',function(req,res){
    res.render('login')
})


app.post('/signup',async(req,res)=>{
    const storedata = new connection({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        country:req.body.country,
        city:req.body.city
    })
    // console.log(storedata);
    const registered=await storedata.save();
    res.render('home');
})

app.post('/login',async(req,res)=>{
    try {
        
            name=req.body.name,
            password=req.body.password;
        
        const storelogindata = await connection.findOne({name:name});

        const isMatch=await bcrypt.compare(password,storelogindata.password)
        
        if (isMatch) {     //(username.password===password) if bcrypt is not used we will paranthaces code use insted of isMatch
            res.render('home')
        } else {
            res.send("Password Or Email Are Not Matching")
        }
    } catch (error) {
        res.send("Invalid Name Or Password.")
    }
})
app.listen(2828,function(req,res){
    console.log("Server is running")
})