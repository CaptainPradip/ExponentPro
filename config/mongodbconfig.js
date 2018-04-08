var mongoose=require('mongoose');
module.exports={
    mongoconnect:function(){//mongodb://localhost:27017/ProjectQuora
        mongoose.connect( process.env.MONGODBURL,function (error) {
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