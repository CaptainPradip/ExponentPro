var mongoose=require('mongoose')
var Project=require('./project');
var Schema= mongoose.Schema;


var platformTypeSchema =new Schema({
    name:{type:String ,required:true,unique:true},
    project:[ { type: Schema.Types.ObjectId, ref: 'Project'}],
})

var PlatformType = mongoose.model('PlatformType',platformTypeSchema);
module.exports =PlatformType;