require('dotenv').config()
const express = require('express');
const multer=require('multer');
const fs =require('fs');
var mongoose = require('mongoose');
var jwt=require('jsonwebtoken');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3')
const router = express.Router();

var config=require('../../../config/config');
var userService=require('../../service/userService');
var s3 = new aws.S3({accessKeyId:config.accessKeyId,
                     secretAccessKey:config.secretAccessKey,
                     region:config.region});
//Data Models 
var User=require('../../models/user');
var Project=require('../../models/project');
var ProjectCategory=require('../../models/projectCategory');
var ProgrammingLanguage=require('../../models/programmingLanguage');
var FrontendTechnology=require('../../models/frontendTechnology');
var ProjectIDE =require('../../models/projectIDE');
var PlatformType =require('../../models/platformType');
var DatabaseType= require('../../models/databaseType');

// Project Stored Directory
const rootDirectoryProjectUpload ="ProjectUploadData/";
const projectScreenShotUrl="public/assets/images/";
//

//Multer Middleware 
// const storage =multer.diskStorage({

//     destination:function (req,file,cb) {
       
      
//         switch (file.fieldname) {
          
//             case "indexPage":
//                                     cb(null,createImagePath(req));
                                    
//                                     break;
//             case "screenShots": 
//                                     cb(null,createImagePath(req));
                                   
//                                     break;
        
//             case "projectReport":
//                                     cb(null,createPrivateProjectData(req));
                                    
//                                     break;
//             case "video":
//                                     cb(null,createImagePath(req));
                                   
//                                     break;
                                    
//             case "projectCode":
//                                     cb(null,createPrivateProjectData(req));
                                    
//                                     break;
//             default:
//                 break;
//         }

       
//     },
//     filename:function (req,file,cb) {
       
//         cb(null,file.originalname) 
//     }
// })
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


//const uploadFolder= multer({
 //   dest:'PradipNemane/'
//})

// const uploadFolder= multer({storage:storage,
//     limits:{fileSize:1024*1024*50}
// });


 var fileData=[

    {name:'screenShots',maxCount:5 },
    {name:'indexPage',maxCount: 1 },
//     {name:'video',maxCount: 1 },
//     {name:'projectCode',maxCount: 1 },
//     {name:'projectReport',maxCount: 1 }
 ]


router.get('/programminglanguages',getAllProgrammingLanguages);
router.get('/programminglanguages/:_id',getProgrammingLanguage);
router.get('/projectcategorys',getAllProjectCategorys);
router.get('/projectsbycategory/:_id',getAllProjectByCategory);
router.get('/projectcategorys/:_id',getProjectCategory);

router.get('/frontendtechnologys',getAllFrontendTechnologys);
router.get('/frontendtechnologys/:_id',getFrontendTechnology);

router.get('/projectides',getAllProjectIDEs);
router.get('/projectides/:_id',getProjectIDE);
router.get('/platformtypes',getAllPlatformTypes);
router.get('/platformtypes/:_id',getPlatformType);
router.get('/databasetypes',getAllDatabaseTypes);
router.get('/databasetypes/:_id',getDatabaseType);

router.get('/projects',getAllProject);
router.get('/projects/:_id',getProject);



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
               if(req.decoded.permission=="admin" || req.decoded.permission=="user")
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

//DataBase Type Routes
router.post('/projects',upload.fields(fileData),addProject);

//router.put('/updateproject/:_id',uploadFolder.fields(fileData),updateProject);
//router.delete('/deleteproject/:_id',deleteProject);



function addProject(req, res){

    //var user=new User();
    var project= new Project();


    console.log(req.body.programmingLanguage);
    console.log(req.body.frontendTechnology);
    console.log(req.files);
    
   
  
  
    project.projectTitle=req.body.projectTitle;
    project.developer=req.decoded._id
    project.projectCategory=req.body.projectCategory
    project.description=req.body.description
    
   // project.projectReport =req.decoded.userName+"/"+req.body.projectTitle+"/"+req.files['projectReport'][0].originalname;
           
    project.indexPageUrl=req.files['indexPage'][0].location;
             
    var screenShotsArray=[];

    for (var index = 0; index < req.files['screenShots'].length; index++) {
        const filename = req.files['screenShots'][index].location;;
        screenShotsArray[index]=filename
         }


    project.screenShotUrl=screenShotsArray;
    //project.videoUrl=req.decoded.userName+"/"+req.body.projectTitle+"/"+req.files['video'][0].originalname;
    //project.projectCode=req.decoded.userName+"/"+req.body.projectTitle+"/"+req.files['projectCode'][0].originalname;
    project.expectedPrice=req.body.expectedPrice;
    project.projectIDE =req.body.projectIDE;
    project.platformType =req.body.platformType;
    project.databaseType =req.body.databaseType;
             //finalPrice:{type:Number},
    console.log(req.body.programmingLanguage);
    var programmingLanguage =req.body.programmingLanguage;
    var programmingLanguageArray=programmingLanguage.split(',');
    var frontendTechnology =req.body.frontendTechnology;
    var frontendTechnologyArray=frontendTechnology.split(',');
    var complete=programmingLanguageArray.length +frontendTechnologyArray.length + 2;
    for (var index = 0; index < programmingLanguageArray.length; index++) {  
  console.log(typeof programmingLanguageArray)
  console.log(programmingLanguageArray.length)
        ProgrammingLanguage.findById(programmingLanguageArray[index],(error,programmingLanguage)=>{
     
                if(error)
                {  res.status(500).json({success:false,
                    error:"There was a problem finding the programming Language information ."})
           console.log(error)
                }else{ 
                 //var projectCategoryId=Schema.Types.ObjectId(req.body.programmingLanguage[index]);
                 if (!programmingLanguage)

                 return res.status(404).send("No programming Language found.");
                
                 
                 project.programmingLanguage.push(programmingLanguage);   

                 complete--;
                 sendResponse(res,complete,project);
                //  project.save(
                //     (error)=>{
                //     if(error)
                //     {   
                //         console.log(error)
                //     }else{ 
                //         console.log("project saved"+index);
                //         Project.findById(project._id,(error,project)=>{
                //             if(error)
                //             {  res.json({success:false,
                //                          error:error})
                //                 console.log(error)
                //             }else{
                //                 programmingLanguage.project.push(project);

                //                 ProgrammingLanguage.findByIdAndUpdate(programmingLanguage._id,programmingLanguage,(error)=>{

                //                     if(error){
                //                         res.json({error:error,
                            
                //                         });
                //                     console.log(error)
                //                     }
                //                     else{
                //                         console.log("programmingLanguage saved !!!!!!!!!!");
                //                         complete--;
                //                         sendResponse(res,complete,project);
                //                     }
                //                 })
                //             }
                        
                //         });
                        
                //     }
                
                // });
                }});       
   // var programmingLanguage=[];
       
      //  programmingLanguage[index]=projectCategory;
    };
   // var frontendTechnology=[];
  
    for (var index = 0; index < frontendTechnologyArray.length; index++) {


        FrontendTechnology.findById(frontendTechnologyArray[index],(error,frontendTechnology)=>{
     console.log(frontendTechnology);
            if(error)
            { res.status(500).json({success:false,
                error:"There was a problem finding the frontend Technology information ."})
               console.log(error)
            }else{ 
                    if (!frontendTechnology)
                 
                        return res.status(404).send("No frontend Technology found.");
                
                    project.frontendTechnology.push(frontendTechnology);   
                    
                    complete--;
                    sendResponse(res,complete,project);
                    // project.save(
                    //     (error)=>{
                    //     if(error){   
                    //         res.json({error:error,
                        
                    //                 });
                    //         console.log(error)
                    //     }else{ 
                    //             console.log("project saved !!!!!!!!!!"+index)   

                    //             Project.findById(project._id,(error,project)=>{
                    //                 if(error)
                    //                 {  res.json({success:false,
                    //                              error:error})
                    //                     console.log(error)
                    //                 }else{
                    //                     frontendTechnology.project.push(project);

                    //                     FrontendTechnology.findByIdAndUpdate(frontendTechnology._id,frontendTechnology,(error)=>{

                    //                         if(error){
                    //                             res.json({error:error,
                                    
                    //                             });
                    //                         console.log(error)
                    //                         }
                    //                         else{
                    //                             console.log("frontendTechnology saved !!!!!!!!!!");
                    //                             complete--;
                    //                             sendResponse(res,complete,project);
                    //                         }
                    //                     })
                    //                 }
                                
                    //             });
                               
                                
                    //     }
                    // });


        }
    }); 
    };


    //add project into Category 
    ProjectCategory.findById(req.body.projectCategory,(error,projectCategory)=>{
       
            if(error){   
                res.status(500).json({success:false,
                    error:"There was a problem finding the project Category information ."})
                   console.log(error)
            }else{ 
                //console.log(projectCategory);
                if (!projectCategory)
                 return res.status(404).send("No project Category found.");
                
                    projectCategory.project.push(project);
                    ProjectCategory.findByIdAndUpdate(projectCategory._id,projectCategory,(error)=>{

                        if(error){   
                            res.status(500).json({success:false,
                                error:"There was a problem updating the project Category information ."})
                               console.log(error)
                        }else{ 
                            complete--;
                            sendResponse(res,complete,project)
                            }
                        });
              }
            });


    //Add Project Into User
    User.findById(req.decoded._id,(error,user)=>{
       
                if(error){   
                    res.status(500).json({success:false,
                        error:"There was a problem finding the user information ."})
                       console.log(error)
                }else{ 
                    //console.log(projectCategory);
                    if (!user)
                    return res.status(404).send("No user found.");
                   
                    user.project.push(project);
                    User.findByIdAndUpdate(user._id,user,(error)=>{
    
                            if(error){   
                                res.status(500).json({success:false,
                                    error:"There was a problem updating the user information ."})
                                   console.log(error)
                            }else{ 
                                complete--;
                                sendResponse(res,complete,project)
                                }
                            });
                  }
                });
}
function sendResponse(res,complete,project) {
    

    if(complete<=0){
      
        project.save(
            (error)=>{
            if(error){   
              
                res.status(500).json({error:"There was a problem adding the information .",
            
                        });
                console.log(error)
            }else{ 

                res.status(200).json({
                    success:true,
                    message:"Project is added Succesfully !!",
                    project:project
                
        });
       }
    });
}
}  




module.exports =router;



function getAllProject(req,res) {

    Project.find()
    .populate('programmingLanguage')
    .populate('frontendTechnology')
    .populate({
        path: 'developer',select:'fullName picture workExperience followers aboutMe softSkills workInCompany',
        populate: { path: 'project',select:'_id projectTitle indexPageUrl',
                    model:'Project' }})  
    .populate('projectIDE')
    .populate('projectCategory')
    .populate('databaseType')
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

function getProject(req,res){

    Project.findById(req.params._id)
    .populate('programmingLanguage')
    .populate('frontendTechnology')
    .populate({
        path: 'developer',select:'fullName picture workExperience followers aboutMe softSkills workInCompany',
        populate: { path: 'project',select:'_id projectTitle indexPageUrl',
                    model:'Project' }})  
    .populate('projectIDE')
    .populate('projectCategory')
    .populate('databaseType')
    .where({isVerified:true})
    .exec((error,project)=>{
     
        if(error)
        {   res.status(500).json({success:false,
            error:"There was a problem finding the Project information ."})
        }else{ 
          res.json({
              success:true,
              project:project

          })
                 
        }});
   
 }


 function getAllProgrammingLanguages(req,res){
    ProgrammingLanguage.find((error,programmingLanguages)=>{
     
        if(error)
        {   res.status(500).json({success:false,
            error:"There was a problem finding the Programming Languages information ."})
        }else{ 
          res.json({
              success:true,
              programmingLanguages:programmingLanguages

          })
             
        }});
   
 }

 function getProgrammingLanguage(req,res){

    ProgrammingLanguage.findById(req.params._id,(error,programmingLanguage)=>{
     
        if(error)
        {   res.status(500).json({success:false,
            error:"There was a problem finding the Programming Languages information ."})
     
        }else{ 
          res.json({
              success:true,
              programmingLanguage:programmingLanguage

          })
                 
        }});
   
 }

 

 

 function getAllProjectCategorys(req,res){
    ProjectCategory.find((error,projectCategorys)=>{
     
        if(error)
        {   res.status(500).json({success:false,
            error:"There was a problem finding the Project Categorys information ."})
     
        }else{ 
          res.json({
              success:true,
              projectCategorys:projectCategorys

          })
             
        }});
   
 }

 function getProjectCategory(req,res){

    ProjectCategory.findById(req.params._id,(error,projectCategory)=>{
     
        if(error)
        {   res.status(500).json({success:false,
            error:"There was a problem finding the Project Categorys information ."})
     
        }else{ 
          res.json({
              success:true,
              projectCategory:projectCategory

          })
                 
        }});
   
 }
 function getAllProjectByCategory(req,res){
     console.log("Get All Project by Caterory")
    ProjectCategory.findById(req.params._id)
    
    .populate({
        path: 'project',
       
        populate: { path: 'frontendTechnology',
                    model:'FrontendTechnology' }})
    .populate({
        path: 'project',
       
        populate: { path: 'programmingLanguage',
                    model:'ProgrammingLanguage' }})
    .populate({
        path: 'project',
       
        populate: { path: 'developer',
                    model:'User' }})
    .populate({
                 path :'project',
                 match:{
                     isVerified:true}})
    .exec((error,projectCategory)=>{
         
        if(error)
        {   res.status(500).json({success:false,
            error:"There was a problem finding the Project information ."})
     
        }else{ 
          res.json({
              success:true,
              projectCategory:projectCategory

          })
                 
        }});
   
 }
 
//--------------------------------------------------------------------------------------------------------------------



 function getAllFrontendTechnologys(req,res){
    FrontendTechnology.find((error,frontendTechnology)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem finding the Frontend Technologys information ."})
     
        }else{ 
          res.json({
              success:true,
              frontendTechnology:frontendTechnology

          })
             
        }});
   
 }

 function getFrontendTechnology(req,res){

    FrontendTechnology.findById(req.params._id,(error,frontendTechnology)=>{
     
        if(error)
        { res.status(500).json({success:false,
            error:"There was a problem finding the Frontend Technologys information ."})
     
        }else{ 
          res.json({
              success:true,
              frontendTechnology:frontendTechnology

          })
                 
        }});
   
 }

 

 //--------------------------------------------------------------------------------------------------------------------




 function getAllProjectIDEs(req,res){
    ProjectIDE.find((error,projectIDEs)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem finding the Project IDEs information ."})
     
        }else{ 
          res.json({
              success:true,
              projectIDEs:projectIDEs

          })
             
        }});
   
 }

 function getProjectIDE(req,res){

    ProjectIDE.findById(req.params._id,(error,projectIDE)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem finding the Project IDEs information ."})
     
        }else{ 
          res.json({
              success:true,
              projectIDE:projectIDE

          })
                 
        }});
   
 }

 

 //--------------------------------------------------------------------------------------------------------------------




 function getAllPlatformTypes(req,res){
    PlatformType.find((error,platformTypes)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem finding the Platform Types information ."})
     
        }else{ 
          res.json({
              success:true,
              platformTypes:platformTypes

          })
             
        }});
   
 }

 function getPlatformType(req,res){

    PlatformType.findById(req.params._id,(error,platformType)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem finding the Platform Types information ."})
     
        }else{ 
          res.json({
              success:true,
              platformType:platformType

          })
                 
        }});
   
 }

 

  //--------------------------------------------------------------------------------------------------------------------




 function getAllDatabaseTypes(req,res){
    DatabaseType.find((error,databaseTypes)=>{
     
        if(error)
        { res.status(500).json({success:false,
            error:"There was a problem finding the Database Types information ."})
     
        }else{ 
          res.json({
              success:true,
              databaseTypes:databaseTypes

          })
             
        }});
   
 }

 function getDatabaseType(req,res){

    DatabaseType.findById(req.params._id,(error,databaseType)=>{
     
        if(error)
        {  res.status(500).json({success:false,
            error:"There was a problem finding the Database Types information ."})
     
        }else{ 
          res.json({
              success:true,
              databaseType:databaseType

          })
                 
        }});
   
 }

 

// Reuse Functions 
function createImagePath(req) {
    var userPath="";
    var imagesPath="";
    if(fs.existsSync(projectScreenShotUrl))
    {
          userPath =projectScreenShotUrl+req.decoded.userName;
         if(!fs.existsSync(userPath))
         {
            fs.mkdirSync(userPath);
            imagesPath=userPath+"/"+req.body.projectTitle;
            if(!fs.existsSync(imagesPath.toString())){
                fs.mkdirSync(imagesPath.toString());

            }
        
         }else{
            imagesPath=userPath+"/"+req.body.projectTitle;
            if(!fs.existsSync(imagesPath.toString())){
                fs.mkdirSync(imagesPath.toString());

            }
         }
        
       
    }
    else{

        fs.mkdirSync(projectScreenShotUrl);
        userPath =projectScreenShotUrl+req.decoded.userName;
        if(!fs.existsSync(userPath))
        {
           fs.mkdirSync(userPath);
           imagesPath=userPath+"/"+req.body.projectTitle;
           if(!fs.existsSync(imagesPath.toString())){
               fs.mkdirSync(imagesPath.toString());

           }
       
        }else{
            imagesPath=userPath+"/"+req.body.projectTitle;
            if(!fs.existsSync(imagesPath.toString())){
                fs.mkdirSync(imagesPath.toString());

            }
       
      
        }
    }
    return imagesPath;
}

function createPrivateProjectData(req) {
    var Path="";
    var userPath="";
    if(fs.existsSync(rootDirectoryProjectUpload))
    {
        userPath =rootDirectoryProjectUpload+req.decoded.userName;
         if(!fs.existsSync(userPath))
         {
            fs.mkdirSync(userPath);
            Path=userPath+"/"+req.body.projectTitle;
            if(!fs.existsSync(Path.toString()))
            {
                fs.mkdirSync(Path.toString());
            }
         }else{
            Path=userPath+"/"+req.body.projectTitle;
            if(!fs.existsSync(Path.toString())){
                fs.mkdirSync(Path.toString());

            }
        }
       
    }
    else{

        fs.mkdirSync(rootDirectoryProjectUpload);
        userPath =rootDirectoryProjectUpload+req.decoded.userName;
        if(!fs.existsSync(userPath))
        {
           fs.mkdirSync(userPath);
           Path=userPath+"/"+req.body.projectTitle;
           if(!fs.existsSync(Path.toString()))
           {
               fs.mkdirSync(Path.toString());
           }
        }else{
            Path=userPath+"/"+req.body.projectTitle;
            if(!fs.existsSync(Path.toString())){
                fs.mkdirSync(Path.toString());

            }
        }
    }

    return Path;
}



    