var mongoose=require('mongoose')
var Project=require('./project');
var Schema= mongoose.Schema;




var projectIDESchema=new Schema({
    name:{type:String ,required:true,unique:true},
    //project:[ { type: Schema.Types.ObjectId, ref: 'Project'}],
});

var ProjectIDE = mongoose.model('ProjectIDE',projectIDESchema);
module.exports =ProjectIDE;