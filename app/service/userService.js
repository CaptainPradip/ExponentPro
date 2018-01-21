var jwt=require('jsonwebtoken');
var User=require('../models/user')

module.exports={
   findUserByEmail:findUserByEmail
}


function findUserByEmail(email) {
    
    User.findOne({email:email},function (error,user) {

        if(error){
           throw error
        }
        if (!user){ 
           return user;
        }
        else{
        return user;
        }
           
            
    })
}