
//var config=require('./config')
var jwt=require('jsonwebtoken');
var session = require('express-session')
var User =require('../app/models/user')
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
module.exports=function (app,passport) {
    
  
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({secret:process.env.SECRET,resave: false,saveUninitialized: true,cookie: { secure: false }
  }))


  passport.serializeUser(function(user, done) {
    const payload=
    { _id:user._id,
     userName:user.userName,
     email:user.email,
     picture:user.picture,
     permission:user.permission
    }
    
      token = jwt.sign(payload,process.env.SECRET, { expiresIn: '24h' });
      done(null,user.id);
  });
  
  passport.deserializeUser(function(id, done) {

    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


  
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOKID,//FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOKAPIKEY,//FACEBOOK_APP_SECRET,
    callbackURL: "https://mighty-river-49943.herokuapp.com/auth/facebook/callback",
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
          const payload=
                    { 
                    userName:profile._json.name,
                    email:profile._json.email,
                    
                    }
          facebookUser.temporaryToken=jwt.sign(payload,process.env.SECRET, { expiresIn: '24h' });
          facebookUser.save(function(err){
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


passport.use(new GoogleStrategy({
  clientID        : process.env.GOOGLEID,
  clientSecret    : process.env.GOOGLEAPIKEY,
  callbackURL     : "https://mighty-river-49943.herokuapp.com/auth/google/callback",

},function(token, refreshToken, profile, done) {

        // make the code asynchronous
        // User.findOne won't fire until we have all our data back from Google
        console.log(profile);
        console.log(profile.emails[0].value)
        process.nextTick(function() {

            // try to find the user based on their google id
            User.findOne({'email':profile.emails[0].value}, function(err, user) {
                if (err)
                    return done(err);

                if (user) {

                    // if a user is found, log them in
                    return done(null, user);
                } else {
                    // if the user isnt in our database, create a new user
                    var GoogleUser = new User();
                    GoogleUser.userName=profile.displayName;
                    GoogleUser.email=profile.emails[0].value;
                    GoogleUser.password=profile.emails[0].value;
                    GoogleUser.picture=profile._json.image.url;
                    const payload=
                    { 
                    userName:profile.displayName,
                    email:profile.emails[0].value,
                    
                    }
                    GoogleUser.temporaryToken=jwt.sign(payload,process.env.SECRET, { expiresIn: '24h' });
                    // set all of the relevant information
                    // newUser.google.id    = profile.id;
                    // newUser.google.token = token;
                    // newUser.google.name  = profile.displayName;
                    // newUser.google.email = profile.emails[0].value; // pull the first email

                    // save the user
                    GoogleUser.save(function(err) {
                        if (err)
                        console.log("Error In Google Login ")
                            throw err;
                        return done(null, GoogleUser);
                    });
                }
            });
        });

    }));

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

app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    // the callback after google has authenticated the user
app.get('/auth/google/callback',
passport.authenticate('google', {failureRedirect : '/login'}),function (req,res) {
  res.redirect('/login/'+token);

}); 

return passport;
}