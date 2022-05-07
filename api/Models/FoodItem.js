const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
    name : {
        type : String ,
        required : true
    } , 
    description : {
        type : String , 
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
    status : {
        type : String , 
        default : "Available" , 
        enum : [
            "Available" , 
            "Special" ,  
            "Not Available" ] 
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