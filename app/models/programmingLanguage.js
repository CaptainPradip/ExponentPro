var mongoose=require('mongoose')
var Project=require('./project');
var Schema= mongoose.Schema;

var programminglanguageSchema= new Schema({
    name:{type:String ,required:true,unique:true,uppercase:true,trim:true},
    //project:[ { type: Schema.Types.ObjectId, ref: 'Project'}],
});



var ProgrammingLanguage  = mongoose.model('ProgrammingLanguage',programminglanguageSchema);
module.exports =ProgrammingLanguage;