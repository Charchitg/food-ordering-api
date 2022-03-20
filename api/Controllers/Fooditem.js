const { ObjectId } = require('mongodb');
const { SameProductbyName, ValidPrice } = require('../Helpers/ValidateFoodItem');
const Admin = require('../Models/Admin');
const Fooditem = require('../Models/FoodItem');
const objectId = require('mongodb').ObjectId;


exports.additem = async (req, res, next) => {
    try {

        const { name, description, price, imageurl } = req.body;
        const minqty = (req.body.minqty) ? req.body.minqty : 1;
        let errors = [];
        if (name.length === 0) {
            errors.push("Invalid name");
        }
        if (description.length <= 10) {
            errors.push("Too Short description");
        }
        // if(!ValidPrice(price)){
        //     errors.push("Invalid Price , please remove alphabets ");
        // }
        const str = price.toString();
        const len = str.length;
        for (let i = 0; i < len; i += 1) {
            let c = str[i];
            c = c - 'a';
            if (c > 9 || c < 0) {
                errors.push("Invalid Price , please remove alphabets ");
                break;
            }
        }

        // if(SameProductbyName(name)){
        //     errors.push("Another product exist with the same user name");
        // }
        const existing = await Fooditem.findOne({
            $and: [
                { name: name },
                { admin: req.user }
            ]
        });
        if (existing) {
            errors.push("Another product exist with the same user name");
        }

        if (errors.length === 0) {
            let newitem = new Fooditem({ name, description, price, imageurl, minqty });
            let itemid = newitem._id;
            itemid = ObjectId(itemid);
            let id = req.user;
            id = objectId(id);
            let admin = await Admin.findOne({ _id: id });
            admin.mylist.push(itemid);
            newitem.admin = id;
            const saved = await newitem.save();
            const admin_save = await admin.save();
            res.status(201).json({ message: "item added", fooditem: saved, admin: admin_save });
        }
        else {
            res.status(400).json({
                errors: errors
            });
        }

    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error });
    }

}

exports.updateitem = async (req, res, next) => {
    try {
        // Section 1
        // we first check whether the admin is authorised to update or not 

        let id = req.body.id;
        id = objectId(id);
        let adminid = req.user;
        adminid = objectId(adminid);
        const existing = await Fooditem.findOne({
            $and: [
                { _id: id },
                { admin: adminid }
            ]
        });


        // Section 2 
        // we now check if the details provided are correct or not 
        const { name, description, price, imageurl } = req.body;
        const minqty = (req.body.min_qty) ? req.body.min_qty : 1;
        let errors = [];
        if (name.length === 0) {
            errors.push("Invalid update name");
        }
        if (description.length <= 10) {
            errors.push("Too Short update description");
        }
        // if(!ValidPrice(price)){
        //     errors.push("Invalid Price , please remove alphabets ");
        // }
        const str = price.toString();
        const len = str.length;
        for (let i = 0; i < len; i += 1) {
            let c = str[i];
            c = c - 'a';
            if (c > 9 || c < 0) {
                errors.push(" Invalid  update Price , please remove alphabets ");
                break;
            }
        }

        // if(SameProductbyName(name)){
        //     errors.push("Another product exist with the same user name");
        // }

        // allready existing means that the same food item name already exist in the admin mylist other than the one being updated
        const allreadyexisting = await Fooditem.findOne({
            $and: [
                { name: name },
                { admin: req.user },
                {_id : { $ne : id } }
            ]
        });
        if (allreadyexisting) {
            errors.push("Another product exist with the same user name");
        }

        if (existing && errors.length === 0) {
            let updateitem = Fooditem.findOneAndUpdate({_id : id} , { name, description, price, imageurl, minqty } ) ;
            let itemid = updateitem._id;
            itemid = ObjectId(itemid);
            let admin = await Admin.findOne({ _id: adminid });
            admin.mylist.push(itemid);
            updateitem.admin = id;
           // const updated = await updateitem.save();
            const admin_save = await admin.save();
            res.status(201).json({ message: "item update", admin: admin_save });
        }
        else if(existing === null || errors.length !== 0){
            res.status(401).json({
                message : "You are not authorised to perform this action" , 
                errors : errors
            });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : error
        });
    }
}


exports.deleteitem = async (req, res, next) => {
    try {
        let id = req.params.id;
        id = objectId(id);
        let adminid = req.user;
        adminid = objectId(adminid);

        const result = await Fooditem.findByIdAndDelete({
            $and: [
                { _id: id },
                { admin: adminid }
            ]
        });

        res.status(201).json({
            result : result
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            message : error
        });
    }
}