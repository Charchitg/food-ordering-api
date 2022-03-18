const express = require('express');
const authentication = require('../Controllers/Authentication');
const { authorization } = require('../Middlewares/authorization');
const router = express.Router();

router.post('/login' , authentication.adminlogin);
router.post('/register' , authentication.adminRegistration);
router.post('/logout' , authorization , authentication.logout );


module.exports = router;