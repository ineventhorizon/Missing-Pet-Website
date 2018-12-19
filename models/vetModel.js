const mongoose=require('mongoose');

var vetSchema=new mongoose.Schema({
    vetName:{type:String,required:"Cannot be empty"},
    vetOwner:{type:String,required:"Cannot be empty"},
    vetPhone:{type:String,required:"Cannot be empty"},
    vetAddress:{type:String,required:"Cannot be empty"},
    vetCity:{type:String,required:"Cannot be empty"},
    isConfirmed:{type:Boolean}
})

module.exports=mongoose.model("Vet",vetSchema);