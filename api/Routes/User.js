const express = require('express');
const { authorization } = require('../Middlewares/authorization');
const authentication = require('../Controllers/Authentication');
const userservices = require('../Controllers/UserServices');

const router = express.Router();

// User Auth routes ---->  compeleted and tested
router.post('/login' , authentication.userlogin);
router.post('/register' , authentication.userRegistration);
router.post('/logout' , authorization , authentication.logout );

// User Food routes
router.post('/item' , authorization , userservices.allitems);
router.post('/item/display' , authorization , userservices.oneitem);
router.post('/item/admin' , authorization , userservices.itemsofadmin);
router.post('/iten/mylist/display' , authorization , userservices.displaymylist);
router.post('/item/mylist/add' , authorization , userservices.addtomylist);
router.post('/item/mylist/delete' , authorization  , userservices.deletefrommylist);

// User Order routes



// User Cart routes


module.exports = router;