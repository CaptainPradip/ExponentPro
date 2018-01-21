var express = require('express');
var morgan      = require('morgan');
var passport = require('passport');
var app =express();

var bodyParser=require('body-parser');
var mongodb=require('./config/mongodbconfig')
var router =require('./app/routes/api/users')
var loginPassport=require('./config/passport')(app,passport);

//import all Schema

var port=process.env.port;
app.use(express.static(__dirname +'/public'));
// use middleware 
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//mongodb connection 
mongodb.mongoconnect();
//app.use(morgan('dev'));

app.use('/api',router);

app.get('*', (req, res) => {
    return res.sendfile('./public/views/index.html');
});




app.listen(port, () => {
    console.log(`Server started on 8080`+port);
});