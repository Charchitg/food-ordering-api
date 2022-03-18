const { SameProductbyName, ValidPrice } = require('../Helpers/ValidateFoodItem');
const Admin = require('../Models/Admin');
const Fooditem = require('../Models/FoodItem');
const objectId = require('mongodb').ObjectId;


exports.additem = (req,res,next) => {
   try {
     
    const {name , description , price , imageurl } = req.body;
    const minqty = (req.body.minqty) ? req.body.minqty : 1;
    let errors = [];
    if(name.length() === 0){
        errors.push("Invalid name");
    }
    if(description.length() <= 10){
        errors.push("Too Short description");
    }
    if(!ValidPrice(price)){
        errors.push("Invalid Price , please remove alphabets ");
    }
    if(SameProductbyName(name)){
        errors.push("Another product exist with the same user name");
    }
    const newitem = new Fooditem(name , description , price , imageurl , minqty);
    const saved = await newitem.save();

    res.status(201).send({message : "item added" , response : saved });
   } catch (error) {
       res.status(401).send({message : error });
   }
    
}

exports.updateitem = (req,res,next) => {
    try {
        let id = req.params.id;
        id = objectId(id);
        let adminid = req.user.id;
        adminid = objectId(adminid);
        const existing = await Fooditem.findOne({
            $and : [
                { _id : id } , 
                {admin : adminid }
            ]});    
    } catch (error) {
        
    }
}


exports.deleteitem = (req,res,next) => {
    try {
        let id = req.params.id;
        id = objectId(id);
        let adminid = req.user.id;
        adminid = objectId(adminid);
        
        const result = await Fooditem.findByIdAndDelete({
            $and : [
                { _id : id } , 
                {admin : adminid }
            ]});

            
    } catch (error) {

    }
}