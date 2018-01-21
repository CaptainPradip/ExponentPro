var mongoos=require('mongoose')
var bcrypt =require('bcrypt-nodejs')
var Schema= mongoos.Schema;

var userSchema =new Schema({
     userName:{type:String ,required:true,unique:true},
     password:{type:String,required:true},
     email:{type:String ,required:true,unique:true},
     picture:{type:String },
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
module.exports=mongoos.model('User',userSchema);