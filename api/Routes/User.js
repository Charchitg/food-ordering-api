const express = require('express');
const { authorization } = require('../Middlewares/authorization');
const authentication = require('../Controllers/Authentication');
const router = express.Router();


router.post('/login' , authentication.userlogin);
router.post('/register' , authentication.userRegistration);
router.post('/logout' , authorization , authentication.logout );


module.exports = router;