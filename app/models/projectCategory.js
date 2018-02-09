
var mongoose=require('mongoose')
var Project=require('./project');
var Schema= mongoose.Schema;

var projectCategorySchema= new Schema({
    name:{type:String ,required:true,unique:true},
    project:[ { type: Schema.Types.ObjectId, ref: 'Project'}],
});

var ProjectCategory = mongoose.model('ProjectCategory',projectCategorySchema);
module.exports =ProjectCategory;