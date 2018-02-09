
const express = require('express');
const multer=require('multer');
const fs =require('fs');
var mongoose = require('mongoose');

var Schema = mongoose.Schema,
ObjectID = Schema.ObjectId;
const router = express.Router();

var config=require('../../../config/config');
var userService=require('../../service/userService');

//Data Models 
var User=require('../../models/user')
var Project=require('../../models/project')
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
const storage =multer.diskStorage({

    destination:function (req,file,cb) {
       
       
        switch (file.fieldname) {
          
            case "indexPage":
                                    cb(null,createImagePath(req));
                                    
                                    break;
            case "screenShots": 
                                    cb(null,createImagePath(req));
                                   
                                    break;
        
            case "projectReport":
                                    cb(null,createPrivateProjectData(req));
                                    
                                    break;
            case "video":
                                    cb(null,createImagePath(req));
                                   
                                    break;
                                    
            case "projectCode":
                                    cb(null,createPrivateProjectData(req));
                                    
                                    break;
            default:
                break;
        }

       
    },
    filename:function (req,file,cb) {
       
        cb(null,file.originalname) 
    }
})


//const uploadFolder= multer({
 //   dest:'PradipNemane/'
//})

const uploadFolder= multer({storage:storage});


var fileData=[

    {name:'screenShots',maxCount: 10 },
    {name:'indexPage',maxCount: 1 },
    {name:'video',maxCount: 1 },
    {name:'projectCode',maxCount: 1 },
    {name:'projectReport',maxCount: 1 }
]


//Programming Language Routes
router.post('/programminglanguages',addProgrammingLanguage);
router.get('/programminglanguages',getAllProgrammingLanguages);
router.get('/programminglanguages/:_id',getProgrammingLanguage);
router.put('/programminglanguages/:_id',updateProgrammingLanguage);
router.delete('/programminglanguages/:_id',deleteProgrammingLanguage);

//Project Category Routes
router.post('/projectcategorys',addProjectCategory);
router.get('/projectcategorys',getAllProjectCategorys);
router.get('/projectcategorys/:_id',getProjectCategory);
router.put('/projectcategorys/:_id',updateProjectCategory);
router.delete('/projectcategorys/:_id',deleteProjectCategory);

//Frontend Technology Routes
router.post('/frontendtechnologys',addFrontendTechnology);
router.get('/frontendtechnologys',getAllFrontendTechnologys);
router.get('/frontendtechnologys/:_id',getFrontendTechnology);
router.put('/frontendtechnologys/:_id',updateFrontendTechnology);
router.delete('/frontendtechnologys/:_id',deleteFrontendTechnology);

//Project IDE Routes
router.post('/projectides',addProjectIDE);
router.get('/projectides',getAllProjectIDEs);
router.get('/projectides/:_id',getProjectIDE);
router.put('/projectides/:_id',updateProjectIDE);
router.delete('/projectides/:_id',deleteProjectIDE);


//Platform Type Routes
router.post('/platformtypes',addPlatformType);
router.get('/platformtypes',getAllPlatformTypes);
router.get('/platformtypes/:_id',getPlatformType);
router.put('/platformtypes/:_id',updatePlatformType);
router.delete('/platformtypes/:_id',deletePlatformType);


//DataBase Type Routes
router.post('/databasetypes',addDatabaseType);
router.get('/databasetypes',getAllDatabaseTypes);
router.get('/databasetypes/:_id',getDatabaseType);
router.put('/databasetypes/:_id',updateDatabaseType);
router.delete('/databasetypes/:_id',deleteDatabaseType);

//DataBase Type Routes
router.post('/projects',uploadFolder.fields(fileData),addProject);
router.get('/projects',getAllProject);
router.get('/projects/:_id',getProject);
//router.put('/updateproject/:_id',uploadFolder.fields(fileData),updateProject);
//router.delete('/deleteproject/:_id',deleteProject);



function addProject(req, res){

    //var user=new User();
    var project= new Project();
   
  var complete=req.body.programmingLanguage.length+req.body.frontendTechnology.length;
  
    project.projectTitle=req.body.projectTitle;
    project.developer=req.decoded._id
    project.projectCategory=req.body.projectCategory
    project.description=req.body.description
    project.projectReport =req.decoded.userName+"/"+req.body.projectTitle+"/"+req.files['projectReport'][0].originalname;
           
    project.indexPageUrl=req.decoded.userName+"/"+req.body.projectTitle+"/"+req.files['indexPage'][0].originalname;
             
    var screenShotsArray=[];

    for (var index = 0; index < req.files['screenShots'].length; index++) {
        const filename = req.files['screenShots'][index].originalname;;
        screenShotsArray[index]=req.decoded.userName+"/"+req.body.projectTitle+"/"+filename
         }


    project.screenShotUrl=screenShotsArray;
    project.videoUrl=req.decoded.userName+"/"+req.body.projectTitle+"/"+req.files['video'][0].originalname;
    project.projectCode=req.decoded.userName+"/"+req.body.projectTitle+"/"+req.files['projectCode'][0].originalname;
    project.expectedPrice=req.body.expectedPrice;
    project.projectIDE =req.body.projectIDE;
    project.platformType =req.body.platformType;
    project.databaseType =req.body.databaseType;
             //finalPrice:{type:Number},
    console.log(req.body.programmingLanguage);
    for (var index = 0; index < req.body.programmingLanguage.length; index++) {  

        ProgrammingLanguage.findById(req.body.programmingLanguage[index],(error,programmingLanguage)=>{
     
                if(error)
                {  res.json({success:false,
                             error:error})
                    console.log(error)
                }else{ 
                 //var projectCategoryId=Schema.Types.ObjectId(req.body.programmingLanguage[index]);
                 project.programmingLanguage.push(programmingLanguage);   
                 project.save(
                    (error)=>{
                    if(error)
                    {   
                        console.log(error)
                    }else{ 
                        console.log("project saved"+index);
                        Project.findById(project._id,(error,project)=>{
                            if(error)
                            {  res.json({success:false,
                                         error:error})
                                console.log(error)
                            }else{
                                programmingLanguage.project.push(project);

                                ProgrammingLanguage.findByIdAndUpdate(programmingLanguage._id,programmingLanguage,(error)=>{

                                    if(error){
                                        res.json({error:error,
                            
                                        });
                                    console.log(error)
                                    }
                                    else{
                                        console.log("programmingLanguage saved !!!!!!!!!!");
                                        complete--;
                                        sendResponse(res,complete,project);
                                    }
                                })
                            }
                        
                        });
                        
                    }
                
                });
                }});       
   // var programmingLanguage=[];
       
      //  programmingLanguage[index]=projectCategory;
    };
   // var frontendTechnology=[];
   
    for (var index = 0; index < req.body.frontendTechnology.length; index++) {


        FrontendTechnology.findById(req.body.frontendTechnology[index],(error,frontendTechnology)=>{
     
            if(error)
            {  res.json({success:false,
                         error:error})
                console.log(error)
            }else{ 

                    project.frontendTechnology.push(frontendTechnology);   
                    console.log(frontendTechnology);
                    project.save(
                        (error)=>{
                        if(error){   
                            res.json({error:error,
                        
                                    });
                            console.log(error)
                        }else{ 
                                console.log("project saved !!!!!!!!!!"+index)   

                                Project.findById(project._id,(error,project)=>{
                                    if(error)
                                    {  res.json({success:false,
                                                 error:error})
                                        console.log(error)
                                    }else{
                                        frontendTechnology.project.push(project);

                                        FrontendTechnology.findByIdAndUpdate(frontendTechnology._id,frontendTechnology,(error)=>{

                                            if(error){
                                                res.json({error:error,
                                    
                                                });
                                            console.log(error)
                                            }
                                            else{
                                                console.log("frontendTechnology saved !!!!!!!!!!");
                                                complete--;
                                                sendResponse(res,complete,project);
                                            }
                                        })
                                    }
                                
                                });
                               
                                
                        }
            });


        }}); 
    };
}
function sendResponse(res,complete,project) {
    

    if(complete==0){
    res.json({msg:"Hello Add Project!!!",

                   project:project
                
        });
    
    }
}
    




module.exports =router;



function getAllProject(req,res) {

    Project.find((error,projects)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              projects:projects

          })
             
        }});
   
    
}

function getProject(req,res){

    Project.findById(req.params._id)
    .populate('programmingLanguage')
    .populate('frontendTechnology')
    .populate('developer')  
    .populate('projectIDE')
    .populate('projectCategory')
    .populate('databaseType')
    .exec((error,project)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              project:project

          })
                 
        }});
   
 }
//--------------------------------------------------------------------------------------------------------------------
//programminglanguage Functions 
function addProgrammingLanguage(req,res){

    if(req.body.name==null ||req.body.name==''){
      res.json({msg:"Name should not be empty !!"});
    }
else{
    var programmingLanguage =new ProgrammingLanguage();


    programmingLanguage.name=req.body.name
    programmingLanguage.save(
       (error)=>{
         if(error)
         {  res.json({success:false,
                      error:error})
             console.log(error)
         }else{ 
           res.json({
               success:true,
               programmingLanguage:programmingLanguage

           })
             
         }});
 }

}

 function getAllProgrammingLanguages(req,res){
    ProgrammingLanguage.find((error,programmingLanguages)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
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
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              programmingLanguage:programmingLanguage

          })
                 
        }});
   
 }

 function updateProgrammingLanguage(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
     
    ProgrammingLanguage.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,programmingLanguage)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              programmingLanguage:programmingLanguage

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
              programmingLanguage:programmingLanguage

          })
                 
        }});
 }

 //--------------------------------------------------------------------------------------------------------------------
//Project Category  Functions 
function addProjectCategory(req,res){

    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
    var projectCategory =new ProjectCategory();
    projectCategory.name=req.body.name
    projectCategory.save(
       (error)=>{
         if(error)
         {  res.json({success:false,
                      error:error})
             console.log(error)
         }else{ 
           res.json({
               success:true,
               projectCategory:projectCategory

           })
             
         }});
 }
}


 function getAllProjectCategorys(req,res){
    ProjectCategory.find((error,projectCategorys)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
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
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              projectCategory:projectCategory

          })
                 
        }});
   
 }

 function updateProjectCategory(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
     
    ProjectCategory.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,projectCategory)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              projectCategory:projectCategory

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
              projectCategory:projectCategory

          })
                 
        }});
 }
//--------------------------------------------------------------------------------------------------------------------
//Frontend Technology Functions 
function addFrontendTechnology(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
    var frontendTechnology =new FrontendTechnology();
    frontendTechnology.name=req.body.name
    frontendTechnology.save(
       (error)=>{
         if(error)
         {  res.json({success:false,
                      error:error})
             console.log(error)
         }else{ 
           res.json({
               success:true,
               frontendTechnology:frontendTechnology

           })
             
         }});
    }
 }



 function getAllFrontendTechnologys(req,res){
    FrontendTechnology.find((error,frontendTechnology)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
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
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              frontendTechnology:frontendTechnology

          })
                 
        }});
   
 }

 function updateFrontendTechnology(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
     
    FrontendTechnology.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,frontendTechnology)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              frontendTechnology:frontendTechnology

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
              frontendTechnology:frontendTechnology

          })
                 
        }});
 }


 //--------------------------------------------------------------------------------------------------------------------
//Project IDE Technology Functions 
function addProjectIDE(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
    var projectIDE =new ProjectIDE();
    projectIDE.name=req.body.name
    projectIDE.save(
       (error)=>{
         if(error)
         {  res.json({success:false,
                      error:error})
             console.log(error)
         }else{ 
           res.json({
               success:true,
               ProjectIDE:projectIDE

           })
             
         }});
    }
 }



 function getAllProjectIDEs(req,res){
    ProjectIDE.find((error,projectIDEs)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
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
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              projectIDE:projectIDE

          })
                 
        }});
   
 }

 function updateProjectIDE(req,res){
      
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
    ProjectIDE.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,projectIDE)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              projectIDE:projectIDE

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
              projectIDE:projectIDE

          })
                 
        }});
 }

 //--------------------------------------------------------------------------------------------------------------------
//Platform Type Functions 
function addPlatformType(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
    var platformType =new PlatformType();
    platformType.name=req.body.name
    platformType.save(
       (error)=>{
         if(error)
         {  res.json({success:false,
                      error:error})
             console.log(error)
         }else{ 
           res.json({
               success:true,
               platformType:platformType

           })
             
         }});
        }
 }



 function getAllPlatformTypes(req,res){
    PlatformType.find((error,platformTypes)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
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
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              platformType:platformType

          })
                 
        }});
   
 }

 function updatePlatformType(req,res){
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
     
    PlatformType.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,platformType)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              platformType:platformType

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
              platformType:platformType

          })
                 
        }});
 }

  //--------------------------------------------------------------------------------------------------------------------
//Database Type Functions 
function addDatabaseType(req,res){
console.log(req.body.name);
    if(req.body.name==null || req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
    var databaseType =new DatabaseType();
    databaseType.name=req.body.name
    databaseType.save(
       (error)=>{
         if(error)
         {  res.json({success:false,
                      error:error})
             console.log(error)
         }else{ 
           res.json({
               success:true,
               databaseType:databaseType

           })
             
         }});
        }
 }



 function getAllDatabaseTypes(req,res){
    DatabaseType.find((error,databaseTypes)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
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
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              databaseType:databaseType

          })
                 
        }});
   
 }

 function updateDatabaseType(req,res){
      
    if(req.body.name==null ||req.body.name==''){
        res.json({msg:"Name should not be empty !!"});
      }
  else{
    DatabaseType.findByIdAndUpdate(req.params._id,{name:req.body.name},(error,databaseType)=>{
     
        if(error)
        {  res.json({success:false,
                     error:error})
            console.log(error)
        }else{ 
          res.json({
              success:true,
              databaseType:databaseType

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



/*
projectCategory.save(
                        (error)=>{
                          if(error)
                          {
                              console.log(error)
                          }else{ 
                               console.log("projectCategory saved !!!!!!!!!!")     
                          }});

    
    frontendTechnology.save(
                                (error)=>{
                                  if(error)
                                  {
                                      console.log(error)
                                  }else{ 
                                       console.log("frontendTechnology saved !!!!!!!!!!")     
                                  }});
    projectIDE.save(
                        (error)=>{
                                      if(error)
                                      {
                                          console.log(error)
                                      }else{ 
                                           console.log("projectIDE saved !!!!!!!!!!")     
                                      }});
    platformType.save(
                                        (error)=>{
                                          if(error)
                                          {
                                              console.log(error)
                                          }else{ 
                                               console.log("platformType saved !!!!!!!!!!")     
                                          }});
            
    databaseType.save(
                                            (error)=>{
                                              if(error)
                                              {
                                                  console.log(error)
                                              }else{ 
                                                   console.log("databaseType saved !!!!!!!!!!")     
                                              }});
    
    */
    