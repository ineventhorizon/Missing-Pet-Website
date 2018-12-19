const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const User=require("../models/userModel");
const Post=require("../models/postModel");
const Vet=require("../models/vetModel");


//renders main page with confirmed posts
router.get("/",(req,res)=>{
    //Finds all posts 
    Post.find({isConfirmed:true},(err,foundPosts)=>{
        if(err){
            console.log("-----------ERROR----------");
            console.log(err);
        } else {
            res.render("home",{foundPosts:foundPosts});
        }
    })
})

//renders home if someone enters /ilanlar
router.get("/ilanlar",(req,res)=>{
    res.render('home');
})

//finds all confirmed vets and passes their info to the page and renders veterinerler 
//if someone enters /veterinerler
router.get("/veterinerler",(req,res)=>{
    //to find all confirmed vets
    Vet.find({isConfirmed:true},(err,foundVets)=>{
        if(err){
            console.log("-----------ERROR----------");
            console.log(err);
        } else {
            //passes confirmed vets to vet page
            res.render("veterinerler",{foundVets:foundVets});
        }
    })
})


//exports router to use in index.js
module.exports=router;