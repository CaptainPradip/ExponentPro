var mongoose=require('mongoose');
module.exports={
    mongoconnect:function(){//mongodb://localhost:27017/ProjectQuora
        mongoose.connect( "mongodb://captain:captain@ds211558.mlab.com:11558/projectquora",function (error) {
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