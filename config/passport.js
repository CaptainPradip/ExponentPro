
var config=require('./config')
var jwt=require('jsonwebtoken');
var session = require('express-session')
var User =require('../app/models/user')
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports=function (app,passport) {
    
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({secret:config.secret,resave: false,saveUninitialized: true,cookie: { secure: false }
  }))


  passport.serializeUser(function(user, done) {
    const payload=
    {
     userName:user.userName,
     email:user.email,
     picture:user.picture
    }
    
      token = jwt.sign(payload,config.secret, { expiresIn: '60s' });
      done(null,user.id);
  });
  
  passport.deserializeUser(function(id, done) {

    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  
passport.use(new FacebookStrategy({
    clientID: config.facebookId,//FACEBOOK_APP_ID,
    clientSecret: config.facebookAPIKey,//FACEBOOK_APP_SECRET,
    callbackURL: "http://localhost:8080/auth/facebook/callback",
    profileFields:['id', 'displayName', 'link','photos', 'email']
  },
  function(accessToken, refreshToken, profile, done) {

    User.findOne({'email':profile._json.email},function(error,user){
     
        if(error)
        {
          done(error);
        }
        if(user){
           done(null,user)
        }else{

          var facebookUser= new User();
          facebookUser.userName=profile._json.name;
          facebookUser.email=profile._json.email;
          facebookUser.password=profile._json.name;
          facebookUser.picture=profile._json.picture.data.url;
          facebookUser.save(function(err) {
                        if (err)
                            throw err;

                        // if successful, return the new user
                        done(null, facebookUser);
            });
        }
        
    })
    
   // done(null, profile);
  }
 
  
));


// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
app.get('/auth/facebook',
 passport.authenticate('facebook', { scope: ['email','public_profile','user_friends']})
);

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
app.get('/auth/facebook/callback',
passport.authenticate('facebook', {failureRedirect: '/login' }),function (req,res) {
     res.redirect('/login/'+token);
    
});
 

return passport;
}