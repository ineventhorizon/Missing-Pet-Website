const express=require('express');
const router=express.Router();
const User=require("../models/userModel");
const passport=require("passport");
const app=express();


router.get("/login",(req,res)=>{
    res.render('login');
})

router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect : "/login"

    }),(req,res)=>{});

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
            var query={userCity: req.body.city,usersName: req.body.name
                ,usersSurname:req.body.surname,userType:"User"};
            console.log(newUser);
            newUser.updateOne(query, { username: req.body.username }, function(err, res) {
                // Updated at most one doc, `res.modifiedCount` contains the number
                // of docs that MongoDB updated
              });
            res.redirect("/success"); //redirects if it is succesfull
        }

    })
})

router.get("/signout",(req,res)=>{
    req.logOut();
    res.redirect("/");
})
module.exports=router;