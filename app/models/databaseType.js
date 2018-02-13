
var mongoose=require('mongoose');
var Project=require('./project');
var Schema= mongoose.Schema;


var databaseTypeSchema =new Schema({
    name:{type:String ,required:true,unique:true},
   // project:[ { type: Schema.Types.ObjectId, ref: 'Project'}],
})
var DatabaseType = mongoose.model('DatabaseType',databaseTypeSchema);
module.exports =DatabaseType;