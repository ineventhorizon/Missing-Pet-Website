const express=require('express');
const router=express.Router();
const User=require("../models/userModel");
const Post=require("../models/postModel");
const passport=require("passport");
const multer=require('multer');


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

router.get("/ilanver",(req,res)=>{
    res.locals.currentUser=req.user; //initialize currentUser to get user's info from the form
    res.render("ilanver");
    
})


var randomID=1;
var Storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"./public/images")
    },
    filename: function(req,file,cb){
        randomID=Math.floor((Math.random() * 100) + 1);
        cb(null,randomID+"-"+file.originalname);
    }
});



var upload=multer({storage:Storage});



router.post("/ilanver",upload.single('image'),(req,res)=>{
     //initialize currentUser to get user's info from the form
    //gets required infos from forms
    console.log(req.file.originalname);
    var newPost=new Post({
        postTitle:req.body.title,
        postNote:req.body.notes,
        postType:req.body.type,
        animalGenus:req.body.genus,
        animalType: req.body.typea,
        animalAge: req.body.age,
        postImage:+randomID+"-"+req.file.originalname,
        lostDate:req.body.date,
        postOwnerPhone:req.body.phonenumber,
        postOwner:req.body.namesurname,
        isConfirmed: 0
    });

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


//admin page
router.get("/admin",(req,res)=>{
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

//
router.post("/admin",(req,res,next)=>{
    var post_id=req.body.butt;
    Post.findByIdAndUpdate(post_id,{isConfirmed:1},(err)=>{
        if(err){
            console.log("----------SOMETHING WENT WRONG-------");
        } else res.redirect('admin')
    })
    
})
module.exports=router;