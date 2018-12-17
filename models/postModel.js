const mongoose=require('mongoose');

var postSchema=new mongoose.Schema({
    postTitle: {type: String, required:"Cannot be empty"},
    postNote: {type: String},
    postType: {type: String, required:"Cannot be empty"},
    animalGenus: {type: String, required:"Cannot be empty"},
    animalType: {type: String, required:"Cannot be empty"},
    postImage: {type: String, required:"Cannot be empty"},
    animalAge: {type: Number, required:"Cannot be empty"},
    dateRange: {type: Date, default: Date.now()},
    lostDate: {type: Date, default: Date.now()},
});

module.exports=mongoose.model("userPost",postSchema);