
var User=require('../../models/user')
const express = require('express');
var jwt=require('jsonwebtoken');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3')
//var config=require('../../../config/config');
var nodemailer= require('nodemailer');
var userService=require('../../service/userService')
const multer=require('multer');
const fs =require('fs');

var s3 = new aws.S3({accessKeyId:process.env.ACCESSKEYID,
    secretAccessKey:process.env.SECRETACCESSKEY,
    region:process.env.REGION});

var transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: '', // Your email id
                        pass: '' // Your password
                    }
                });
const profileImageUrl="public/assets/images/";
const router = express.Router();



// //Multer Middleware s
// const storage =multer.diskStorage({
    
//         destination:function (req,file,cb) {
           
//            console.log("profilePicture");
//             switch (file.fieldname) {
              
//                 case "profilePicture":
//                                         cb(null,createImagePath(req));
                                        
//                                         break;
                
//                 default:
//                     break;
//             }
    
           
//         },
//         filename:function (req,file,cb) {
           
//             cb(null,file.originalname) 
//         }
//     })

var upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'exponentpro.com',
      acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, {fieldName:req.decoded.userName+file.originalname});
      },
      key: function (req, file, cb) {
        cb(null, req.decoded.userName+file.originalname)
      }
    })
  })
    // const uploadFolder= multer({storage:storage,
    //     limits:{fileSize:1024*1024*5}
    // });
    
    
    var fileData=[
    
        {name:'profilePicture',maxCount: 1},
       
    ]



router.post('/signUp', (req, res) => {
    console.log(req.body.userName)
    var user=new User();
    
    user.userName=req.body.userName;
    user.password=req.body.password;
    user.email=req.body.email;
    user.createBy=user._id
    const payload=
    {
    userName:user.userName,
    email:user.email,
    }
    user.temporaryToken=jwt.sign(payload,process.env.SECRET, { expiresIn: '24h'});
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
                
                var mailOptions = {
                    from: 'newton2faraday@gmail.com',
                    to: user.email,
                    subject: 'Verify your Source Code Account ID.',
                    html: 'Dear  ,'+user.userName +'<br><br><p>You have selected'+user.email+'as your new Source Code Pointer ID. To verify that this email address belongs to you, please click on the link below and then sign in using your Source Code ID and password.</p> <a href="https://sourcecodepointer.herokuapp.com/userverification/'+user.temporaryToken+'">Verify now</a><br><br>' +
                        '<b>Best Regards,</b><br><b>Team - Source Code Pointer</b>'
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                      
                    } else {
                        console.log('Message sent: ' );
                       
                    };
                });




                res.json({
                    success:true,
                    message:"User is Created !!!"
    
                });
            }
        })


     }
    


});


router.get('/verifyuser/:_token', (req, res) => {
    
    var user=new User();
   
    

   // user.email=req.body.email;
   // user.password=req.body.password;
   // console.log(req.body.password +"================="+req.body.email)
     if (req.params._token==null||req.params._token==''){

         res.json({success:false,message:"Token is not provided !!!"});
     }
     else{

        var token =req.params._token;
        // decode token
           if(token){
               // verifies secret and checks exp
               jwt.verify(token,process.env.SECRET,(error,decoded) =>{
                   if(error){
                   return  res.json({success:false,message:'failed to authenticate token'});
                   }
                   else{
                         // if everything is good, save to request for use in other routes
                       decoded;

                       User.findOne({email:decoded.email}).select('_id email userName password permission active').exec(function (error,user) {

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
                            console.log(user)
                        //console.log(user.userName)
                    
                            if(user){
                                console.log("Aunthenticate user"+user.permission)
                                console.log(user);
                              
                               User.findByIdAndUpdate(user._id,{active:true},function(err,user){
                                const payload=
                                {
                                 _id:user._id,
                                 userName:user.userName,
                                 email:user.email,
                                 permission:user.permission
                                }
                                var token = jwt.sign(payload,process.env.SECRET, { expiresIn: '24h' });
            
                                res.json({
                                    success:true,
                                    message:"authenticate User !!",
                                    user:user,
                                    token:token
                                });
                               
                               })
                          
                            }
                            else{
                             res.json({
                                 success:false,
                                 message:"Could not authenticate Password !!"
                             });
                            }
                           
                            
            
                        }
                      
                    })
            
                       
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
        User.findOne({email:req.body.email}).select('_id email userName password permission active').exec(function (error,user) {

            if(error){
               throw error
            }
            if (!user){ 
                res.json({
                    success:false,
                    message:"Could not authenticate User !!"
                });
            }
            else if(user &&user.active){
                console.log(user.userName)
            user.comparePassword(req.body.password,function(error,isMatch) {
                console.log(isMatch+"++++++++++++++++++++++++++++")

                if(error){
                    throw error;
                }
                if(isMatch){
                    console.log("Aunthenticate user"+user.permission)
                    console.log(user);
                   const payload=
                   {
                    _id:user._id,
                    userName:user.userName,
                    email:user.email,
                    permission:user.permission
                   }
               var token = jwt.sign(payload,process.env.SECRET, { expiresIn: '24h' });

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
                

            }else{
                res.json({
                    success:false,
                    message:"Please Verify Your Source Code Pointer ID!"
                });

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
       jwt.verify(token,process.env.SECRET,(error,decoded) =>{
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
router.get('/profile',getProfileByID);
router.post('/profile',upload.fields(fileData),updateProfile);
//router.delete('/profile/:_id',deactivateProfile);



function getProfileByID(req, res){
  
    User.findById(req.decoded._id)
    .populate('project','_id projectTitle indexPageUrl')
    .exec((error,user)=>{
   
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem finding the information to the database."})
        }else{ 
          res.status(200).json({
              success:true,
              user:user

          })
        }

    });

}


 function updateProfile(req, res){


    console.log(req.body.fullName);
    console.log(req.body.dateOfBirth);
    console.log(req.body.mobile);
    console.log(req.body.softSkills);
    console.log(req.body.aboutMe);
   


        var user={
            fullName:req.body.fullName,
            dateOfBirth:req.body.dateOfBirth,
            mobile:req.body.mobile,
            softSkills:req.body.softSkills,
            aboutMe:req.body.aboutMe,
            alternateMobile:req.body.alternateMobile,
            alternateEmail:req.body.alternateEmail,
            workExperience:req.body.workExperience,
            workInCompany:req.body.workInCompany,
            isFullProfile:true,
            picture:req.files['profilePicture'][0].location
        };

       
        if (req.body.fullName==null||req.body.fullName==''||req.body.dateOfBirth==null
            ||req.body.dateOfBirth==''||req.body.mobile==null||req.body.mobile=='' 
            ||req.body.softSkills==null||req.body.softSkills==''||req.body.aboutMe==null||req.body.aboutMe==''){
                  
                res.json({success:false,message:"Email ,Password is not provided !!!"});
        }
        else{
             User.findByIdAndUpdate(req.decoded._id,user,(error,user)=>{
                
                   if(error)
                   {  res.status(500).json({
                       success:false,
                       error:"There was a problem updating the information to the User."})
                       console.log(error)
                   }else{ 
                     res.status(200).json({
                         success:true,
                         user:user,
                         message:"profile Updated Succesfully !!!"
                     })
                            
                   }});
                      
                  
            }
            
};











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
               var token = jwt.sign(payload,process.env.SECRET, { expiresIn: '24h' });

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



// Reuse Functions 
function createImagePath(req) {
    var userPath="";
    if(fs.existsSync(profileImageUrl)){
          userPath =profileImageUrl+req.decoded.userName;
         if(!fs.existsSync(userPath))
         {
            fs.mkdirSync(userPath);
           
         }     
    }
    else{

        fs.mkdirSync(profileImageUrl);
        userPath =profileImageUrl+req.decoded.userName;
        if(!fs.existsSync(userPath)){
           fs.mkdirSync(userPath);
          
       
        }
    }
    return userPath;
}


module.exports =router;
