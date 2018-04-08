var express=require('express');
var jwt=require('jsonwebtoken');
var config=require('../../../config/config');
var nodemailer= require('nodemailer');
var bcrypt =require('bcrypt-nodejs')
var router= express.Router();

//Data Models 
var User=require('../../models/user')
var Project=require('../../models/project')
var ProjectCategory=require('../../models/projectCategory');
var ProgrammingLanguage=require('../../models/programmingLanguage');
var FrontendTechnology=require('../../models/frontendTechnology');
var ProjectIDE =require('../../models/projectIDE');
var PlatformType =require('../../models/platformType');
var DatabaseType= require('../../models/databaseType');


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
                     
                   if(req.decoded.permission=="admin")
                    {    
                        next();
                    }
                   else
                   {
                    return  res.json({success:false,message:'you dont have permission to access'});
                   }
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
router.get('/projects',getAllProject);
router.get("/projectrequests",getAllProjectRequests);
router.get("/projectrequests/:_id",getProjectRequest);
router.put("/projectrequests/:_id",updateProjectRequest);
router.delete("/projectrequests/:_id",deleteProjectRequest);

router.get("/users",getAllUsers);
router.post("/users",addUser);
router.get("/users/:_id",getUser);
router.put("/users/:_id",updateUser);
router.delete("/users/:_id",deleteUser);

//Programming Language Routes
router.post('/programminglanguages',addProgrammingLanguage);

router.put('/programminglanguages/:_id',updateProgrammingLanguage);
router.delete('/programminglanguages/:_id',deleteProgrammingLanguage);

//Project Category Routes
router.post('/projectcategorys',addProjectCategory);

router.put('/projectcategorys/:_id',updateProjectCategory);
router.delete('/projectcategorys/:_id',deleteProjectCategory);

//Frontend Technology Routes
router.post('/frontendtechnologys',addFrontendTechnology);

router.put('/frontendtechnologys/:_id',updateFrontendTechnology);
router.delete('/frontendtechnologys/:_id',deleteFrontendTechnology);

//Project IDE Routes
router.post('/projectides',addProjectIDE);

router.put('/projectides/:_id',updateProjectIDE);
router.delete('/projectides/:_id',deleteProjectIDE);


//Platform Type Routes
router.post('/platformtypes',addPlatformType);

router.put('/platformtypes/:_id',updatePlatformType);
router.delete('/platformtypes/:_id',deletePlatformType);


//DataBase Type Routes
router.post('/databasetypes',addDatabaseType);

router.put('/databasetypes/:_id',updateDatabaseType);
router.delete('/databasetypes/:_id',deleteDatabaseType);



module.exports =router;


function getAllProject(req,res) {

    Project.find().where({isVerified:true})
    .populate('programmingLanguage')
    .populate('frontendTechnology')
    .populate({
        path: 'developer',select:'fullName picture workExperience followers aboutMe softSkills workInCompany',
        populate: { path: 'project',select:'_id projectTitle indexPageUrl',
                    model:'Project' }})  
    .populate('projectIDE')
    .populate('projectCategory')
    .populate('databaseType')
    .populate('platformType')
    .populate('verifiedBy')
    .exec((error,projects)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem finding the Projects information ."})
           console.log(error)
        }else{ 
          res.status(200).json({
              success:true,
              projects:projects

          })
             
        }});
   
    
}


function getAllProjectRequests(req,res){

            Project.find({isVerified:false}).select(' _id projectTitle uploadedDate')
            .populate({
                path: 'developer',
                select:'fullName'
               })
            .populate({
                path:'projectCategory',
                select:'name'})
            .exec((error,projects)=>{
                    if(error)
                    {  res.status(500).json({success:false,
                        error:"There was a problem finding the Projects information to the database."})
                    console.log(error)
                    }else{ 
                    res.status(200).json({
                        success:true,
                        projects:projects

                    })
                        
                    }
                })
}

function getProjectRequest(req,res){

    Project.findById(req.params._id)
    .populate('programmingLanguage')
    .populate('frontendTechnology')
    .populate('developer')
    .populate('projectIDE')
    .populate('projectCategory')
    .populate('databaseType')
    .populate('platformType')
    .populate('verifiedBy')
    .exec((error,project)=>{
     
        if(error)
        {  res.status(500).json({success:false,
                     error:"There was a problem finding the Projects information to the database."})
            console.log(error)
        }else{ 
          res.status(200).json({
                success:true,
                project:project

          })
                 
        }});

}

function updateProjectRequest(req,res){
   
    console.log( req.decoded._id)
    console.log(req.body.isVerified=='');
    if(req.body.isVerified==null ||req.body.isVerified===''
        || req.body.comment==null ||req.body.comment==''
        ||req.body.finalPrice==null||req.body.finalPrice==''){
        res.json({message:"Given data is empty please enter correct data !!"});
      }
  else{ 
    Project.findByIdAndUpdate(req.params._id,{isVerified:req.body.isVerified,
                            comment:req.body.comment,verifiedBy:req.decoded._id,
                            finalPrice:req.body.finalPrice},(error,project)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem updating the information to the database."})
   
            console.log(error)
        }else{ 
          res.json({
              success:true,
              project:project,
              message:"Project Info Updated Succesfully !!!"
          })
                 
        }});
 }
}

//Note : Add server authentication user only admin is allowed to change or create midleware 
function deleteProjectRequest(req,res){
    
        if(req.body.isVerified==null ||req.body.isVerified==''){
            res.json({message:"Given data is empty please enter correct data !!"});
          }
      else{
         
        Project.findByIdAndUpdate(req.params._id,{isVerified:req.body.isVerified},(error,project)=>{
         
            if(error)
            {  res.status(500).json({success:false,
                error:"There was a problem Deleting  the information to the database."})
       
                console.log(error)
            }else{ 
              res.json({
                  success:true,
                  project:project,
                  message:"Project Info Deleted Succesfully !!!"
              })
                     
            }});
     }
    }


    //--------------------------------------------------------------------------------------------------------------------
//User Fucntions 
function getAllUsers(req,res){

        
    User.find()
    .populate({
        path: 'createBy',select:'userName'})
    .populate({
        path: 'updatedBy',select:'userName'})
    .exec((error,users)=>{

    if(error)
    {  res.status(500).json({success:false,
        error:"There was a problem finding the information to the database."})
    }else{ 
      res.status(200).json({
          success:true,
          users:users

      })
    }

});
       
}
  
function addUser(req,res){
        var user=new User();
        const payload=
        {
        userName:user.userName,
        email:user.email,
        }
    
        user.userName=req.body.userName;
        user.password=req.body.password;
        user.email=req.body.email;
        user.permission=req.body.permission;
        user.temporaryToken=jwt.sign(payload,config.secret, { expiresIn: '24h' });
        user.createBy=req.decoded._id
       // picture:req.userName+"/"+req.files['profilePicture'][0].originalname
    
       
   
   // console.log(req.files['profilePicture'][0].originalname);
    if (req.body.userName==null||req.body.userName==''||req.body.password==null||req.body.password==''||req.body.email==null||req.body.email==''){
              
            res.json({success:false,message:"User Name,Email,Password is not provided !!!"});
    }
    else{
        user.save((error,user)=>{
            
               if(error)
               {  res.status(500).json({
                   success:false,
                   error:"There was a problem  Creating  the information to the User."})
                   console.log(error)
               }else{ 
                 res.status(200).json({
                     success:true,
                     user:user,
                     message:"User Info Added Succesfully !!!"
                 })
                        
               }});
                  
              
        }  

}
function getUser(req,res){

    User.findById(req.params._id)
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
    
function updateUser(req,res){
    console.log("+++++++User Update");
      console.log(req.body.userName +"++"+req.body.email)
    var user={
       // fullName:req.body.fullName,
        userName:req.body.userName,
        password:req.body.password,
        email:req.body.email,
        permission:req.body.permission,
       // dateOfBirth:req.body.dateOfBirth,
       // mobile:req.body.mobile,
       // softSkills:req.body.softSkills,
       // aboutMe:req.body.aboutMe,
       // alternateMobile:req.body.alternateMobile,
       // alternateEmail:req.body.alternateEmail,
       // workExperience:req.body.workExperience,
       // workInCompany:req.body.workInCompany,
       // permission:req.body.permission,
        updatedBy:req.decoded._id
       // picture:req.userName+"/"+req.files['profilePicture'][0].originalname
    };

   // console.log(req.files['profilePicture'][0].originalname)      ;
//    req.body.fullName==null||req.body.fullName==''||req.body.dateOfBirth==null
//    ||req.body.dateOfBirth==''||req.body.mobile==null||req.body.mobile=='' 
//    ||req.body.softSkills==null||req.body.softSkills==''||req.body.aboutMe==null||req.body.aboutMe==''
    if (req.body.userName==null||req.body.userName==''||req.body.password==null||req.body.password==''||req.body.email==null||req.body.email==''){
              
            res.json({success:false,message:"Email ,Password is not provided !!!"});
    }
    else{
         User.findByIdAndUpdate(req.params._id,
                                    {userName:req.body.userName,
                                    password:bcrypt.hashSync(req.body.password),
                                    email:req.body.email,
                                    permission:req.body.permission,
                                    updatedBy:req.decoded._id},(error,user)=>{
            
               if(error)
               {  res.status(500).json({
                   success:false,
                   error:"There was a problem updating the information to the User."})
                   console.log(error)
               }else{ 
                 res.status(200).json({
                     success:true,
                     user:user,
                     message:"User Info Updated Succesfully !!!"
                 })
                        
               }});
                  
              
        }  
       
}

function deleteUser(req,res){
          
    User.findByIdAndRemove(req.params._id,(error,user)=>{
        
           if(error)
           {  res.status(500).json({
               success:false,
               error:"There was a problem Deleting  the information of the User."})
               console.log(error)
           }else{ 
             res.status(200).json({
                 success:true,
                 user:user,
                 message:"User Info Deleted Succesfully !!!"
             })
                    
           }});
              
          
}  

//--------------------------------------------------------------------------------------------------------------------
//programminglanguage Functions 
function addProgrammingLanguage(req,res){

    if(req.body.name==null ||req.body.name==''){
      res.json({message:"Name should not be empty !!"});
    }
else{
    var programmingLanguage =new ProgrammingLanguage();


    programmingLanguage.name=req.body.name
    programmingLanguage.save(
       (error)=>{
         if(error)
         {  
           
            res.status(500).json({success:false,
                      error:"There was a problem adding the information to the database."})
             console.log(error)
         }else{ 
           res.json({
               success:true,
               programmingLanguage:programmingLanguage,
               message:"Programming Language Added Succesfully !!!"
           })
             
         }});
 }

}

function updateProgrammingLanguage(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
     
    ProgrammingLanguage.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,programmingLanguage)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem updating  the information to the database."})
   
            console.log(error)
        }else{ 
          res.json({
              success:true,
              programmingLanguage:programmingLanguage,
              message:"Programming Language Updated Succesfully !!!"

          })
                 
        }});
 }
 }
 function deleteProgrammingLanguage(req,res){
      
     
    ProgrammingLanguage.findByIdAndRemove(req.params._id,(error,programmingLanguage)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              programmingLanguage:programmingLanguage,
              message:"Programming Language Deleted Succesfully !!!"
          })
                 
        }});
 }

 //--------------------------------------------------------------------------------------------------------------------
//Project Category  Functions 
function addProjectCategory(req,res){

    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
    var projectCategory =new ProjectCategory();
    projectCategory.name=req.body.name
    projectCategory.save(
       (error)=>{
         if(error)
         {  res.status(500).json({success:false,
            error:"There was a problem adding the information to the database."})
   console.log(error)
         }else{ 
           res.json({
               success:true,
               projectCategory:projectCategory,
               message:"Project Category Added Succesfully !!!"
           })
             
         }});
 }
}


function updateProjectCategory(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
     
    ProjectCategory.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,projectCategory)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem updating the information to the database."})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              projectCategory:projectCategory,
              message:"Project Category Updated Succesfully !!!"

          })
                 
        }});
    }
 }

 function deleteProjectCategory(req,res){
      
     
    ProjectCategory.findByIdAndRemove(req.params._id,(error,projectCategory)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              projectCategory:projectCategory,
              message:"Project Category Deleted Succesfully !!!"

          })
                 
        }});
 }


 //Frontend Technology Functions 
function addFrontendTechnology(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
    var frontendTechnology =new FrontendTechnology();
    frontendTechnology.name=req.body.name
    frontendTechnology.save(
       (error)=>{
         if(error)
         {  res.status(500).json({success:false,
            error:"There was a problem adding the information to the database."})
   console.log(error)
         }else{ 
           res.json({
               success:true,
               frontendTechnology:frontendTechnology,
               message:"Frontend Technology Added Succesfully !!!"
           })
             
         }});
    }
 }

 function updateFrontendTechnology(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
     
    FrontendTechnology.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,frontendTechnology)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem updating the information to the database."});
   console.log(error)
        }else{ 
          res.json({
              success:true,
              frontendTechnology:frontendTechnology,
              message:"Frontend Technology Updated Succesfully !!!"
          })
                 
        }});
    }
 }

 function deleteFrontendTechnology(req,res){
      
     
    FrontendTechnology.findByIdAndRemove(req.params._id,(error,frontendTechnology)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              frontendTechnology:frontendTechnology,
              message:"Frontend Technology Deleted Succesfully !!!"
          })
                 
        }});
 }


 //Project IDE Technology Functions 
function addProjectIDE(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
    var projectIDE =new ProjectIDE();
    projectIDE.name=req.body.name
    projectIDE.save(
       (error)=>{
         if(error)
         { res.status(500).json({success:false,
            error:"There was a problem adding the information to the database."})
            console.log(error)
         }else{ 
           res.json({
               success:true,
               ProjectIDE:projectIDE,
               message:"Project IDE Added Succesfully !!!"

           })
             
         }});
    }
 }

 function updateProjectIDE(req,res){
      
    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
    ProjectIDE.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,projectIDE)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem updating the information to the database."})
   console.log(error)
        }else{ 
          res.json({
              success:true,
              projectIDE:projectIDE,
              message:"Project IDE Updated Succesfully !!!"
          })
                 
        }});
    }
 }

 function deleteProjectIDE(req,res){
      
     
    ProjectIDE.findByIdAndRemove(req.params._id,(error,projectIDE)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              projectIDE:projectIDE,
              message:"Project IDE Deleted Succesfully !!!"
          })
                 
        }});
 }


 //Platform Type Functions 
function addPlatformType(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
    var platformType =new PlatformType();
    platformType.name=req.body.name
    platformType.save(
       (error)=>{
         if(error)
         {  res.status(500).json({success:false,
            error:"There was a problem adding the information to the database."})
            console.log(error)
         }else{ 
           res.json({
               success:true,
               platformType:platformType,
               message:"Platform Type Added Succesfully !!!"
           })
             
         }});
        }
 }

 function updatePlatformType(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({message:"Name should not be empty !!"});
      }
  else{
     
    PlatformType.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,platformType)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem updating the information to the database."})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              platformType:platformType,
              message:"Platform Type Updated Succesfully !!!"
          })
                 
        }});
    }
 }

 function deletePlatformType(req,res){
      
     
    PlatformType.findByIdAndRemove(req.params._id,(error,platformType)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              platformType:platformType,
              message:"Platform Type Deleted Succesfully !!!"
          })
                 
        }});
 }

 //Database Type Functions 
function addDatabaseType(req,res){
    console.log(req.body.name);
        if(req.body.name==null || req.body.name==''){
            res.json({message:"Name should not be empty !!"});
          }
      else{
        var databaseType =new DatabaseType();
        databaseType.name=req.body.name
        databaseType.save(
           (error)=>{
             if(error)
             {  res.status(500).json({success:false,
                error:"There was a problem adding the information to the database."})
                console.log(error)
             }else{ 
               res.json({
                   success:true,
                   databaseType:databaseType,
                   message:"Database Type Added Succesfully !!!"
               })
                 
             }});
            }
     }

     function updateDatabaseType(req,res){
      
        if(req.body.name==null ||req.body.name==''){
            res.json({message:"Name should not be empty !!"});
          }
      else{
        DatabaseType.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,databaseType)=>{
         
            if(error)
            {  res.status(500).json({success:false,
                error:"There was a problem updating the information to the database."})
                console.log(error)
            }else{ 
              res.json({
                  success:true,
                  databaseType:databaseType,
                  message:"Database Type Updated Succesfully !!!"
              })
                     
            }});
        }
     }
    
     function deleteDatabaseType(req,res){
          
         
        DatabaseType.findByIdAndRemove(req.params._id,(error,databaseType)=>{
         
            if(error)
            {  res.json({success:false,
                         error:error})
                console.log(error)
            }else{ 
              res.json({
                  success:true,
                  databaseType:databaseType,
                  message:"Database Type Deleted Succesfully !!!"
              })
                     
            }});
     }