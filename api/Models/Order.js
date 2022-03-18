const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    itemlist : [
        {
            itemid : {
                type : mongoose.Schema.Types.ObjectId ,
                required : true , 
                ref : 'fooditem'
            } , 
            qty : {
                type : Number , 
                default : 1
            } 
        }
    ] ,
    user : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true , 
        ref : 'user' 
    } , 
    admin : {
        type : mongoose.Schema.Types.ObjectId , 
        required : true , 
        ref : 'admin'   
    } , 
    orderprice : {
        type : Number , 
        required : true
    } , 
    status : {
       type : String , 
       default : "Waiting" , 
       enum : [
           "Waiting" , 
            "Accepted" , 
            "Cancelled" , 
            "Rejected" , 
            "Completed" ] 
    } 
} , {
    timestamps : true
});

const order = mongoose.model('order' , orderSchema);

module.exports = order;