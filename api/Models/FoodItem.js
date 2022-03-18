const mongoose = require("mongoose");

const FoodSchema = mongoose.Schema({
    name : {
        type : String ,
        required : true
    } , 
    description : {
        name : String , 
        required : true , 
    } , 
    price : {
        type : Number , 
        required : true
    } , 
    image_url : {
        type : String 
    } , 
    min_qnty : {
        type : Number , 
        default : 1 
    } , 
    admin : {
        type : mongoose.Schema.Types.ObjectId , 
        ref : "admin"
    }
} ,  {
    timestamps : true
});

const FoodItem = mongoose.model('fooditem' , FoodSchema);

module.exports = FoodItem ; 