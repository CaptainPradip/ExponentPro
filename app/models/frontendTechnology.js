var mongoose=require('mongoose')
var Project=require('./project');
var Schema= mongoose.Schema;



var frontendTechnologySchema=new Schema({
    name:{type:String ,required:true,unique:true},
    //project:[ { type: Schema.Types.ObjectId, ref: 'Project'}],
});
var FrontendTechnology = mongoose.model('FrontendTechnology',frontendTechnologySchema);
module.exports =FrontendTechnology;