const mongoose=require('mongoose');

const siteSchema=new mongoose.Schema({
    homeImage :{type:String,required:"Cannot be empty"}
}); 

module.exports=mongoose.model("Site",siteSchema);