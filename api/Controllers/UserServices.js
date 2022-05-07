const Admin = require('../Models/Admin');
const Fooditem = require('../Models/FoodItem');

const User = require('../Models/User');
const objectId = require('mongodb').ObjectId;

exports.allitems = async (req, res, next) => {
   try {
      let page_num = (req.body.page_num ? req.body.page_num : 1);
      let page_limit = (req.body.page_limit ? req.body.page_limit : 10);
      let skip = (page_num - 1) * page_limit;
      const data = await Fooditem.find({}, { offset: skip, limit: page_limit });
      console.log(page_num, data);
      res.status(201).json({
         page_num, data
      });
   } catch (error) {
      console.log(error);
      res.status(401).json(
         { message: error }
      );
   }

}

exports.oneitem = async (req, res, next) => {
   try {
      let id = req.body.itemid;
      id = objectId(id);
      const data = await Fooditem.findOne({ _id: id });
      if (data !== null) {
         res.status(201).json({ message: "item details", data: data });
      }
      else {
         res.status(200).json({ message: "Item not found" });
      }

   } catch (error) {
      console.log(error);
      res.status(403).json({ message: error });
   }
}

exports.itemsofadmin = async (req, res, next) => {
   try {
      let adminid = req.body.adminid;
      adminid = objectId(adminid);
      let admin = await Admin.findOne({ _id: adminid }).populate("mylist");
      if (admin === null) {
         res.status(200).json({
            message: "admin id invalid"
         });
      }
      let itemlist = admin[0].mylist;
      console.log(itemlist);
      res.status(201).json({
         message: "All admin items",
         itemlist: itemlist
      });


   } catch (error) {
      console.log(error);
      res.status(403).json({ message: error });
   }
}

exports.displaymylist = async (req, res, next) => {
   try {
      let data = await User.find({ _id: req.user }).populate("mylist");
      let list = data[0].mylist;
      res.status(201).json({
         message: "my list",
         list: list
      });
   } catch (error) {
      console.log(error);
      res.status(403).json({
         message: error
      });
   }
}


exports.addtomylist = async (req, res, next) => {
   try {
      let itemid = req.body.itenid;
      itemid = objectId(itenid);
      let user = await User({ _id: req.user }).populate("mylist");
      if (user === null) {
         res.status(403).json({
            message: "Cannot fetch user list ",
            user: user
         });
      }
      user[0].mylist.push(itemid);
      const saved = await user.save();
      res.status(201).json({
         message: "item added to list",
         saved: saved
      });
   } catch (error) {
      console.log(error);
      res.status(403).json({
         message: error
      });
   }

}


exports.deletefrommylist = async (req, res, next) => {
   try {
      let itemid = req.body.itenid;
      itemid = objectId(itenid);
      let user = await User({ _id: req.user });
      let userlist = user[0].mylist;
      let index = userlist.indexOf(itenid);
      user[0].mylist.splice(index, 1);
      const saved = await user.save();
      res.status(201).json({
         message: "item deleted from list",
         saved: saved
      });
   } catch (error) {
      console.log(error);
      res.status(403).json({
         message: error
      });
   }
}