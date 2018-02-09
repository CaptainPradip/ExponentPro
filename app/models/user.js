var mongoose=require('mongoose')
var bcrypt =require('bcrypt-nodejs')
var Project=require('./project');
var Schema= mongoose.Schema;

var userSchema =new Schema({
     userName:{type:String ,required:true,unique:true},
     fullName:{type:String},
     dateOfBirth:{type:Date},
     password:{type:String,required:true},
     email:{type:String ,required:true,unique:true},
     alternateEmail:{type:String},
     mobile:{type:String},
     alternateMobile:{type:String},
     WorkExperience:{type:Number ,required:true,default:0},
     workInCompany:{type:String},
     softSkills:{type:String},
     picture:{type:String },
     aboutMe:{type:String },
     project:[ { type: Schema.Types.ObjectId, ref: 'Project'}],

     permission:{type:String,default:'user'}

});

// methods ======================
// generating a hash

userSchema.pre('save',function(next){
    var user=this;
    bcrypt.hash(user.password,null, null,function (error,hash) {
        if(error)
        {
            return next(error)
        }
        user.password=hash;
        next();
    });
});
// checking if password is valid
userSchema.methods.comparePassword = function(password ,validation) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) validation(err);
        validation(null, isMatch);
    });
}
module.exports=mongoose.model('User',userSchema);