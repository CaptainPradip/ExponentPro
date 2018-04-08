var mongoose=require('mongoose')
var bcrypt =require('bcrypt-nodejs')
var Project=require('./project');
var Schema= mongoose.Schema;

var userSchema =new Schema({
     userName:{type:String ,required:true,unique:true},
     fullName:{type:String},
     dateOfBirth:{type:Date,formate:'dd mmmmm yyyy'},
     password:{type:String,required:true},
     email:{type:String ,required:true,unique:true},
     alternateEmail:{type:String},
     mobile:{type:String},
     alternateMobile:{type:String},
     workExperience:{type:Number ,required:true,default:0},
     workInCompany:{type:String},
     softSkills:{type:String},
     picture:{type:String },
     aboutMe:{type:String },
     project:[ { type: Schema.Types.ObjectId, ref: 'Project'}],
     isFullProfile:{type:Boolean,required:true,default:false},
     followers:{type:Number,required:true,default:0},
     active:{type:Boolean,required:true,default:false},
     temporaryToken:{type:String,required:true},
     permission:{type:String,default:'user'},
     createBy:{type: Schema.Types.ObjectId, ref: 'User'},
     createdDate:{type:Date,formate:'dd mmmmm yyyy',default: Date.now},
     updatedDate:{type:Date,formate:'dd mmmmm yyyy',default: Date.now},
     updatedBy:{type: Schema.Types.ObjectId, ref: 'User'},
     rating:{type: Number,required:true,default:0},
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
userSchema.pre('findByIdAndUpdate',function(next){
    var user=this;
    bcrypt.hash(password,null, null,function (error,hash) {
        if(error)
        {
            return next(error)
        }
        password=hash;
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