const FoodItem = require('../Models/FoodItem');

const SameProductbyName = async (name) => {
    const existing = await FoodItem.findOne({
        $and : [
            { name : name } , 
            {admin : req.user.id }
        ]});
    if(existing){
        return true;
    }
    else{
        return false;
    }
}

const ValidPrice = async (price) => {
    const str = price.toString();
    const len = str.length;
    for(let i=0;i<len;i+=1){
        let c = str[i];
        c = c - 'a';
        if(c > 9 ||  c < 0){
            return false;
        }
    }
    return true;
}

module.exports = { 
    SameProductbyName ,
    ValidPrice 
 };