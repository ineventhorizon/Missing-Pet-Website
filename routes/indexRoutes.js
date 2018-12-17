const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

const Post=require("../models/postModel");


router.get("/",(req,res)=>{
    //Finds all posts 
    Post.find({},(err,foundPosts)=>{
        if(err){
            console.log("-----------ERROR----------");
            console.log(err);
        } else {
            //prints all posts into the console and gives found posts to  html page
            "-----------ALL POSTS----------"
            console.log(foundPosts);
            res.render("home",{foundPosts:foundPosts});
        }
    })
})

router.get("/ilanlar",(req,res)=>{
    res.render('home',{data:data});
})



router.get("/veterinerler",(req,res)=>{
    res.render('veterinerler');
})



module.exports=router;