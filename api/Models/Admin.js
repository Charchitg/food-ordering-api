const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name : {
        type : String , 
        require : true
    } ,
    username : {
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
    minorderprice : {
        type : Number , 
        default : 100
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
},  {
    timestamps : true
});

const admin = mongoose.model('admin' , adminSchema);

module.exports = admin;