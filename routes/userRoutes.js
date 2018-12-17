const express=require('express');
const router=express.Router();
const User=require("../models/userModel");
const passport=require("passport");



router.get("/login",(req,res)=>{
    res.render('login');
})

router.post("/login",(req,res)=>{

})

router.get("/signup",(req,res)=>{
    res.render('signup');
})



router.post("/signup",(req,res)=>{
    console.log(req.body.username);
    let newUser=new User({username: req.body.username}); //gets username from form named username
    User.register(newUser,req.body.password,(err,user)=>{ //registers user with a given form named password 
        if(err){
            console.log(err);
            res.redirect("/signup");
        }
        else{
            console.log(req.body);
            console.log(req.body.city);
            var query={username:req.body.username};
        

            res.redirect("/");   //redirects if it is succesfull
        }
    })
})
module.exports=router;