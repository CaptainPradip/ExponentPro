
var User=require('../../models/user')
const express = require('express');
var jwt=require('jsonwebtoken');
var config=require('../../../config/config');
var userService=require('../../service/userService')
const router = express.Router();

router.post('/signUp', (req, res) => {
    console.log(req.body.userName)
    var user=new User();
    user.userName=req.body.userName;
    user.password=req.body.password;
    user.email=req.body.email;
     if (req.body.userName==null||req.body.userName==''||req.body.password==null||req.body.password==''||req.body.email==null||req.body.email==''){

         res.json({success:false,message:"Ensure User Name ,Password ,Email is provided !!!"});
     }
     else{
        user.save(function (error) {

            if(error)
            {
               res.json({success:false,message:"User Name or Email Already Exites !!!"});
            }
    
            else{
                
                res.json({
                    success:true,
                    message:"User is Created !!!"
    
                });
            }
        })


     }
    


});


router.post('/authenticate', (req, res) => {
    
    var user=new User();
   // user.email=req.body.email;
   // user.password=req.body.password;
    console.log(req.body.password +"================="+req.body.email)
     if (req.body.password==null||req.body.password==''||req.body.email==null||req.body.email==''){

         res.json({success:false,message:"Email ,Password is not provided !!!"});
     }
     else{
        User.findOne({email:req.body.email}).select('_id email userName password').exec(function (error,user) {

            if(error){
               throw error
            }
            if (!user){ 
                res.json({
                    success:false,
                    message:"Could not authenticate User !!"
                });
            }
            else if(user){
                console.log(user.userName)
            user.comparePassword(req.body.password,function(error,isMatch) {
                console.log(isMatch+"++++++++++++++++++++++++++++")

                if(error){
                    throw error;
                }
                if(isMatch){
                    console.log("Aunthenticate user")
                   const payload=
                   {
                    _id:user._id,
                    userName:user.userName,
                    email:user.email
                   }
               var token = jwt.sign(payload,config.secret, { expiresIn: '24h' });

                 res.json({
                     success:true,
                     message:"authenticate User !!",
                     user:user,
                     token:token
                 });
                
                }
                else{
                 res.json({
                     success:false,
                     message:"Could not authenticate Password !!"
                 });
                }
                })
                

            }
          
        })


     }
    


});



router.use((req,res,next) => {

    // check header or url parameters or post parameters for token
var token =req.body.token ||req.query.token||req.headers['x-access-token'];
// decode token
   if(token){
       // verifies secret and checks exp
       jwt.verify(token,config.secret,(error,decoded) =>{
           if(error){
           return  res.json({success:false,message:'failed to authenticate token'});
           }
           else{
                 // if everything is good, save to request for use in other routes
               req.decoded=decoded;
               next();
           }
       })
   }
   else{
       
   // if there is no token
   // return an error
   return res.status(403).send({ 
    success: false, 
    message: 'No token provided.' 
});

   }

});
//this private  route use for after login 
router.post('/profile', (req, res) => {

    res.json({message:'authentication succesfull',user:req.decoded});
});

router.post('/startNewSession', (req, res) => {
      
    var user=new User();
   // user.email=req.body.email;
   // user.password=req.body.password;
    console.log(req.body.password +"================="+req.body.email)
     if (req.body.email==null||req.body.email==''){

         res.json({success:false,message:"Email is not provided !!!"});
     }
     else{
        User.findOne({email:req.body.email}).select('email userName picture').exec(function (error,user) {

            if(error){
               throw error
            }
            if (!user){ 
                res.json({
                    success:false,
                    message:"Could not authenticate User !!"
                });
            }
            else if(user){
                console.log(user.userName)
                 console.log("Aunthenticate user"+user.picture)
                 const payload=
                 {
                  userName:user.userName,
                  email:user.email,
                  picture:user.picture
                 }
               var token = jwt.sign(payload,config.secret, { expiresIn: '24h' });

                 res.json({
                     success:true,
                     message:"authenticate User !!",
                     user:user,
                     token:token
                 });
                
                }
                else{
                 res.json({
                     success:false,
                     message:"Could not authenticate Password !!"
                 });
                }
                })
                

            }
          
    });


 //   





module.exports =router;


 