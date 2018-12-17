const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');


const userSchema=new mongoose.Schema({
    username: String,
    password: String,
    usersName: String,
    usersSurname: String,
    userCellPhone: String,
    userCity: String,
    userType: String
});

userSchema.plugin(passportLocalMongoose);

module.exports=mongoose.model("User",userSchema);