const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String , 
        require : true
    } , 
    email :{
        type : String , 
        require : true
    } , 
    contactnum :{
        type : String , 
        require : true
    } , 
    hash :{
        type : String , 
        require : true
    } ,
    address : {
        type : String , 
        require : true
    } , 
    orderhistory : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'order'
        }
    ] , 
    mylist : [
        {
            type : mongoose.Schema.Types.ObjectId , 
            ref : 'fooditem'
        }
    ]
});

const user = mongoose.model('user' , userSchema);

module.exports = user;