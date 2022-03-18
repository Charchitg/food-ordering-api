const Fooditem = require('../Models/FoodItem');
const User = require('../Models/User');
const objectId = require('mongodb').ObjectId;

exports.Allitems = async (req,res,next) => {

}

exports.Oneitem = async(req,res,next) => {
   try {
        let id = req.params.itemid;
        id = objectId(id);
        const data = await Fooditem.findOne({ _id : id });

        
   } catch (error) {
       
   }
}