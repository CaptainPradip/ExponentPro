
var express = require('express');
var morgan      = require('morgan');
var passport = require('passport');
var app =express();

var bodyParser=require('body-parser');
var mongodb=require('./config/mongodbconfig')
var usersRouter =require('./app/routes/api/users')
var projectsRouter =require('./app/routes/api/projects')
var managementsRouter =require('./app/routes/api/managements')
var loginPassport=require('./config/passport')(app,passport);

//import all Schema

var port=process.env.PORT||8080;
app.use(express.static(__dirname +'/public'));
// use middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//mongodb connection 
mongodb.mongoconnect();
//app.use(morgan('dev'));

app.use('/api/user',usersRouter);
app.use('/api/project',projectsRouter);
app.use('/api/management',managementsRouter);

app.get('*', (req, res) => {
    return res.sendfile('./public/views/index.html');
});


app.use((req,res,next)=>{

    const error= new Error('Not found')
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{

 res.status(error.status||500);
 res.json({
     error:{
         message:error.message
     }
 })
});

app.listen(port, () => {
    console.log(`Server started on :`+port);
});