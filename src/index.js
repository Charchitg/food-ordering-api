const dotenv = require('dotenv');
dotenv.config();


const express = require("express");
const app = express();


app.use(express.json());
app.use(express.urlencoded({extended : false }));

const cookieparser = require('cookie-parser');
app.use(cookieparser());

const userRoutes = require('../api/Routes/User');
const adminRoutes = require('../api/Routes/Admin');


app.use('/user' , userRoutes);
app.use('/admin' , adminRoutes);



const PORT  = process.env.PORT || 5000;


app.listen(PORT , () =>{
    console.log(`app started at port ${PORT}`);
});