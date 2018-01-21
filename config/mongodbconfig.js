var mongoose=require('mongoose');
module.exports={
    mongoconnect:function(){
        mongoose.connect( "mongodb://localhost:27017/ProjectQuora",function (error) {
            if(error){
                console.error("error"+error);
            }
            else{
                console.log('mongodb connection succesfull!!')
            }
            }
            );
    }
};