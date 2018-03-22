var mongoose=require('mongoose')
var User =require("./user")
var ProjectCategory=require('./projectCategory');
var ProgrammingLanguage=require('./programmingLanguage');
var FrontendTechnology=require('./frontendTechnology');
var ProjectIDE =require('./projectIDE');
var PlatformType =require('./platformType');
var DatabaseType= require('./databaseType');
var Schema= mongoose.Schema;

var projectSchema =new Schema({
    projectTitle:{type:String ,required:true},
    developer:{ type: Schema.Types.ObjectId, ref: 'User',required: true},
    projectCategory:{ type: Schema.Types.ObjectId, ref: 'ProjectCategory'},
    noOfDatabaseTables:{type:Number},
    noOfReportPages:{type:Number},
    noOfProjectModules:{type:String},
    moduleNames:{type:String},
    description:{type:String ,required:true},
    projectReport :{type:String},
    indexPageUrl:{type:String},
    screenShotUrl:[{type:String}],
    videoUrl:{type:String},
    projectCode:{type:String},
    expectedPrice:{type:Number,required:true},
    finalPrice:{type:Number,default:0},
    programmingLanguage :[ { type: Schema.Types.ObjectId, ref: 'ProgrammingLanguage'}],
    frontendTechnology :[ { type: Schema.Types.ObjectId, ref: 'FrontendTechnology'}],
    projectIDE :{ type: Schema.Types.ObjectId, ref: 'ProjectIDE'},
    platformType :{ type: Schema.Types.ObjectId, ref: 'PlatformType'},
    databaseType :{ type: Schema.Types.ObjectId, ref: 'DatabaseType'},
    noOfDownload:{type:Number ,required:true,default:0},
    noOfView:{type:Number ,required:true,default:0},
    isVerified:{type:Boolean,required:true,default:false}

});


var Project =mongoose.model('Project',projectSchema);

module.exports =Project;





