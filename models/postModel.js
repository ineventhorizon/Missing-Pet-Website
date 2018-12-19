const mongoose=require('mongoose');

var postSchema=new mongoose.Schema({
    postTitle: {type: String, default:"İlan Başlığı"},
    postNote: {type: String},
    postType: {type: String, required:"Cannot be empty"},
    animalGenus: {type: String},
    animalType: {type: String},
    postImage: {type: String,default:"default.jpg"},
    animalAge: {type: Number},
    dateRange: {type: String},
    lostDate: {type: String,default:"12/12/2012"},
    isConfirmed:{type: Boolean},
    postOwnerPhone:{type:String},
    postOwner:{type:String},
    postOwnerCity:{type: String}

});

module.exports=mongoose.model("userPost",postSchema);