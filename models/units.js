const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const UnitSchema=new Schema({
    title:{
        type:String,
    },
    parent:{
        type:String,
    },
    file:{
        type:String,
    }
});
const Unit=mongoose.model("Unit",UnitSchema);
module.exports=Unit;