const User = require('../Models/User');
const Admin = require('../Models/Admin');
const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const AdminValidation = require('../Helpers/ValidateAdmindetails');
// const UserValidation = require('../Helpers/ValidateUserdetails');
// const { VerifyToken } = require('../Helpers/TokenVerify');
const { GenerateToken } = require('../Helpers/TokenGenerator');



exports.adminRegistration = async (req, res, next) => {
    try {
        const { name, username, email, contactnum, password, confirm, address } = req.body;
        const minorderprice = (req.body.minorderprice ? req.body.minorderprice : 100);

        let errors = [];

        // if (AdminValidation.SameName(name)) {
        //     errors.push("Choose a different name");
        // }
        let exist;
        exist = await Admin.findOne({ name: name });
        if (exist) {
            errors.push("Choose a different name");
        }


        // if (AdminValidation.SameUsername(username)) {
        //     errors.push("Choose a different username");
        // }

        exist = await Admin.findOne({ username: username });
        if (exist) {
            errors.push("Choose a different username");
        }
        // if (AdminValidation.InvalidEmail(email)) {
        //     errors.push("Given email is invalid");
        // }

        ans = email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        exist = !ans;
        if (exist) {
            errors.push("Given email is invalid");
        }


        // if (AdminValidation.SameEmail(email)) {
        //     errors.push("Account exists with the given email , Choose a different email");
        // }
        exist = await Admin.findOne({ email: email });
        if (exist) {
            errors.push("Account exists with the given email , Choose a different email");
        }

        // if (AdminValidation.ValidContactnum(contactnum)) {
        //     errors.push("Given phone number is invalid");
        // }
        const len = contactnum.length;
        if (len !== 10) {
            errors.push("Given phone number is invalid");
        }


        // if (AdminValidation.SameContactnum(contactnum)) {
        //     errors.push("Account exists with the given phone number admin, Choose a different phone number")
        // }
        exist = await Admin.findOne({ contactnum: contactnum });
        if (exist) {
            errors.push("Account exists with the given phone number admin, Choose a different phone number");
        }


        if (password.length <= 8) {
            errors.push("Too short password , enter atleast 8 Characters");
        }

        if (password !== confirm) {
            errors.push("Password and Confirm Password do not match");
        }

        if (address.length <= 8) {
            errors.push("Too short address");
        }

        if (errors.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const admin = new Admin({ name, username, email, contactnum, hash, address, minorderprice });

            const token = await GenerateToken(admin);

            res.cookie("accesstoken", token, {
                expires: (new Date(Date.now() + 86400 * 1000)),
                httpOnly: true
            });

            const saved = await admin.save();

            res.status(201).json(saved);
        }
        else {
            res.status(200).json({
                errors: errors
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: error
        });
    }
}


exports.userRegistration = async (req, res, next) => {
    try {
        let { name, email, contactnum, password, confirm, address } = req.body;

        let errors = [];

        // if (!UserValidation.SameName(name)) {
        //     errors.push("Choose a different name");
        // }


        let exist = await User.findOne({ name: name });
        if (exist !== null) {

            errors.push("Choose a different name");
        }


        // if (UserValidation.InvalidEmail(email)) {
        //     errors.push("Given email is invalid");
        // }

        let ans = email.toLowerCase().match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        exist = !ans;
        if (exist) {
            errors.push("Given email is invalid");
        }


        // if (UserValidation.SameEmail(email)) {
        //     errors.push("Account exists with the given email , Choose a different email");
        // }
        exist = await User.findOne({ email: email });
        if (exist) {
            errors.push("Account exists with the given email , Choose a different email");
        }


        // if ( UserValidation.ValidContactnum(contactnum)) {
        //     errors.push("Given phone number is invalid");
        // }
        const len = contactnum.length;
        if (len !== 10) {
            errors.push("Given phone number is invalid");
        }


        // if (UserValidation.SameContactnum(contactnum)) {
        //     errors.push("Account exists with the given phone number , Choose a different phone number")
        // }
        exist = await User.findOne({ contactnum: contactnum });
        if (exist) {
            errors.push("Account exists with the given phone number , Choose a different phone number");
        }


        if (password.length <= 8) {
            errors.push("Too short password , enter atleast 8 Characters");
        }

        if (password !== confirm) {
            errors.push("Password and Confirm Password do not match");
        }
        if (address.length <= 8) {
            errors.push("Too short address");
        }
        //console.log(errors , typeof(errors));
        if (errors.length === 0) {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(password, salt);
            const user = new User({ name, email, contactnum, hash, address });

            const token = await GenerateToken(user);

            res.cookie("accesstoken", token, {
                expires: (new Date(Date.now() + 86400 * 1000)),
                httpOnly: true
            });

            const saved = await user.save();

            res.status(201).json(saved);
        }
        else {
            res.status(200).json({
                errors: errors
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: error
        });
    }
}


exports.userlogin = async (req, res, next) => {
    try {

        const { email, hash } = req.body;

        const user = await User.findOne({ email: email });
        const errors = [];
        if (!user) {
            errors.push("invalid username , no user found ");
        }

        const comp = await bcrypt.compare(hash, user.hash);

        if (comp) {
            const token = await GenerateToken(user);

            res.cookie("accesstoken", token, {
                expires: (new Date(Date.now() + 86400 * 1000)),
                httpOnly: true
            });

            res.status(201).json({ message: "Login Successful", accesstoken: token });
        }
        else {
            errors.push("Incorrect Password ");
            res.status(200).json({ errors: errors });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error });
    }
}


exports.adminlogin = async (req, res, next) => {
    try {
        const { email, hash } = req.body;

        const admin = await Admin.findOne({ email: email });
        const errors = [];
        if (!admin) {
            errors.push("invalid username , no user found ");
        }

        const comp = await bcrypt.compare(hash, admin.hash);

        if (comp) {
            const token = await GenerateToken(admin);

            res.cookie("accesstoken", token, {
                expires: (new Date(Date.now() + 86400 * 1000)),
                httpOnly: true
            });

            res.status(201).json({ message: "Login Successful", accesstoken: token });
        }
        else {
            errors.push("Incorrect Password ");
            res.status(200).json({ errors: errors });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error });
    }
}


exports.logout = async (req, res, next) => {
    res.clearCookie("accesstoken").status(200).json({ message: "logout successful " });
}