const express=require('express');
const router=express.Router();
const User=require("../models/userModel");
const Post=require("../models/postModel");
const Vet=require("../models/vetModel")
const passport=require("passport");
const multer=require('multer');
const path=require('path');


//for rendering login page
router.get("/login",(req,res)=>{
    res.render('login');
})

//when user clicked login button on login page 
router.post("/login",passport.authenticate("local",
    {
        successRedirect:"/",
        failureRedirect : "/login"

    }),(req,res)=>{});

//for rendering signup page
router.get("/signup",(req,res)=>{  
    res.render('signup');
})

//when user clicked submit button on signup page 
router.post("/signup",(req,res)=>{
    console.log(req.body.username);
    let newUser=new User({username: req.body.username}); //gets username from form named username
    User.register(newUser,req.body.password,(err,user)=>{ //registers user with a given form named password 
        //error check if registration fail or pass 
        if(err){     
            console.log(err);
            res.redirect("/signup"); //if it fails ,redirects it into the signup page
        }
        else{
            var query={userCity: req.body.city,usersName: req.body.name
                ,usersSurname:req.body.surname,userType:"User",userCellPhone:req.body.phonenumber};
            console.log(newUser);
            newUser.updateOne(query, { username: req.body.username }, function(err, res) {}); //adds city,name,surname,user type and phone infos to document where username matches
            res.redirect("/"); //redirects if it is succesfull
        }

    })
})

//when user  wants to submit a new post 
//this will render ilanver.ejs
router.get("/ilanver",(req,res)=>{
    res.locals.currentUser=req.user; //initialize currentUser to get user's info from the form
    res.render("ilanver");
})




//this is for naming uploaded images
//it will generate a random number everytime user submits a new post
// i don't know if it works all the time
var randomID=1;

//initializing multer for image upload
var Storage=multer.diskStorage({
    destination : path.join(__dirname,'../public/images'), //this sets the uploaded image's path to /public/images
    filename: function(req,file,cb)
    { randomID=Math.floor((Math.random() * 100) + 1); //this is for generating number everytime user submits
    cb(null,randomID+"-"+file.originalname);} //naming operation of uploaded file

});

//to get the uploaded image
var upload=multer({storage:Storage});

//when user submits post 
router.post("/ilanver",upload.single('image'),(req,res)=>{
     //initialize currentUser to get user's info from the form
    //gets required infos from forms
    console.log(req.file.originalname);
    console.log(req.body.postType);


    if(req.body.type=="Kayıp İlanı"){
        var newPost=new Post({
            postTitle:req.body.title,
            postNote:req.body.notes,
            postType:req.body.type,
            animalGenus:req.body.genus,
            animalType: req.body.typea,
            animalAge: req.body.age,
            postImage:+randomID+"-"+req.file.originalname,
            postOwnerPhone:req.body.phonenumber,
            postOwner:req.body.namesurname,
            postOwnnerCity:req.body.city,
            lostDate:req.body.date,
            isConfirmed: 0
        });
    } else if(req.body.type=="Sahiplendirme İlanı"){
        var newPost=new Post({
            postTitle:req.body.title,
            postNote:req.body.notes,
            postType:req.body.type,
            animalGenus:req.body.genus,
            animalType: req.body.typea,
            animalAge: req.body.age,
            postImage:+randomID+"-"+req.file.originalname,
            postOwnerPhone:req.body.phonenumber,
            postOwner:req.body.namesurname,
            postOwnnerCity:req.body.city,
            isConfirmed: 0
        });
    } else {
        var newPost=new Post({
            postTitle:req.body.title,
            postNote:req.body.notes,
            postType:req.body.type,
            animalGenus:req.body.genus,
            animalType: req.body.typea,
            animalAge: req.body.age,
            postImage:+randomID+"-"+req.file.originalname,
            postOwnerPhone:req.body.phonenumber,
            postOwner:req.body.namesurname,
            postOwnnerCity:req.body.city,
            dateRange:req.body.daterange1+"-"+req.body.daterange2,
            isConfirmed: 0
        });
    }

    console.log(newPost);
    //saves post datas to database
    newPost.save(function(err,newPost){
        if(err){
            console.log(err);
            res.send(err);
        }
        else {
            User.updateOne({username:req.body.usrname},{$push:{userPosts:newPost._id}},function(err,res){}) //adds new post's id to the user's userPosts array
            console.log("added new post to the db,post's unique id: "+newPost._id);
            res.redirect("/"); //redirects if it is succesfull 
        }
    })
})

//signout from site 
router.get("/signout",(req,res)=>{
    req.logOut();
    res.redirect("/");
})


//admin post confirmation page,if usertype=admin enter /admin/ilanlar renders 
//admin.ejs with unconfirmed posts
router.get("/admin/ilanlar",(req,res)=>{
    //finds unconfirmed posts
    Post.find({isConfirmed:false},(err,foundPosts)=>{
        if(err){
            console.log("-----------ERROR----------");
            console.log(err);
        } else {
            //prints all posts into the console and gives found posts to  html page
           // console.log("-----------ALL POSTS----------");
          //  console.log(foundPosts);
            res.render("admin",{foundPosts:foundPosts});
        }
    })
})

//gets pressed buttons id which is id of the post and makes its 
// isConfirmed to true 
router.post("/admin",(req,res,next)=>{
    var post_id=req.body.butt;
    Post.findByIdAndUpdate(post_id,{isConfirmed:1},(err)=>{
        if(err){
            console.log("----------SOMETHING WENT WRONG-------");
        } else res.redirect('admin/ilanlar')
    })
})

//whenever admin enters /admin/vet this page will render
router.get("/admin/vet",(req,res)=>{
    //finds unconfirmed posts
    Vet.find({isConfirmed:false},(err,foundVets)=>{
        if(err){
            console.log("-----------ERROR----------");
            console.log(err);
        } else {
            res.render("vetAdmin",{foundVets:foundVets});
        }
    })
})

//gets pressed button's id which is id of the vet and makes its 
// isConfirmed to true 
router.post("/vetconfirm",(req,res)=>{
    var vet_id=req.body.butt;
    Vet.findByIdAndUpdate(vet_id,{isConfirmed:1},(err)=>{
        if(err){
            console.log("----------SOMETHING WENT WRONG-------");
        } else res.redirect('admin/vet');
    })
})

//whenever a vet enters their info
//vet will submit their info to be approved by admins
router.post("/veterinerler",(req,res)=>{
    var newVet=new Vet({
        vetName:req.body.name,
        vetOwner:req.body.owner,
        vetPhone:req.body.vetphone,
        vetAddress:req.body.address,
        vetCity:req.body.city,
        isConfirmed:0
    })
    console.log("eklenen veteriner----------------------------------");
    console.log(newVet);

    newVet.save(function(err,newPost){
        if(err){
            console.log(err);
            res.send(err);
        } else {
            res.redirect("/")
        }
    })
})

module.exports=router;