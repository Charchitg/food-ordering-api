const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
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
    }, 
    orderprice : {
        type : Number , 
        required : true
    }  
} , {
    timestamps : true
});

const cart = mongoose.model('cart' , cartSchema);

module.exports = cart;