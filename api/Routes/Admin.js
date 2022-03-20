const express = require('express');
const authentication = require('../Controllers/Authentication');
const { authorization } = require('../Middlewares/authorization');
const FoodItem = require('../Controllers/Fooditem');
const router = express.Router();


//  admin auth routes

router.post('/login' , authentication.adminlogin);
router.post('/register' , authentication.adminRegistration);
router.post('/logout' , authorization , authentication.logout );

// food item routes
// router.post('mylist' , authorization , FoodItem.allitems);
router.post('/mylist/add' , authorization , FoodItem.additem);
router.post('/mylist/update' , authorization , FoodItem.updateitem);
router.delete('/mylist/delete/:id' , authorization , FoodItem.deleteitem);


module.exports = router;