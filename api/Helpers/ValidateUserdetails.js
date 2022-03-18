const User = require('../Models/User');

const SameName =  async( name ) => {
    const exist = await User.findOne({name : name});
    if(exist){
        return true;
    }
    return false;
}

const SameEmail = async(email) => {
    const exist = await User.findOne({email : email});
    if(exist){
        return true;
    }
    return false;
}

const SameContactnum = async(contactnum) => {
    const exist  = await User.findOne({contactnum : contactnum});
    if(exist){
        return true;
    }
    return false;
}


const ValidContactnum = async(contactnum) => {
    const len = contactnum.length();
    if(len === 10){
        return true;
    }
    return false;
}

const InvalidEmail = async(email) => {
    let ans = email.toLowerCase().match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    return !ans;
}


module.exports = {
    SameName ,  
    SameContactnum , 
    SameEmail , 
    ValidContactnum , 
    InvalidEmail 
}; 