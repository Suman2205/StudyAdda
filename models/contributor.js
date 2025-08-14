const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const contributorSchema=new Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    description:{
        type:String,
    },
    file:{
        type:String,
    }
});
const Contributor=mongoose.model("contributor",contributorSchema);
module.exports=Contributor;