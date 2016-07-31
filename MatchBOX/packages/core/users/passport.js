'use strict';

var mongoose = require('mongoose'),
  LocalStrategy = require('passport-local').Strategy,
  TwitterStrategy = require('passport-twitter').Strategy,
  FacebookStrategy = require('passport-facebook').Strategy,
  GitHubStrategy = require('passport-github').Strategy,
  GoogleStrategy = require('passport-google-oauth').OAuth2Strategy,
  // LinkedinStrategy = require('passport-linkedin-oauth2').Strategy,
  LinkedinStrategy = require('passport-linkedin').Strategy,
  User = mongoose.model('User'),
  config = require('meanio').loadConfig();

module.exports = function(passport) {
  // Serialize the user id to push into the session
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // Deserialize the user object based on a pre-serialized token
  // which is the user id
  passport.deserializeUser(function(id, done) {
    User.findOne({
      _id: id
    }, '-salt -hashed_password', function(err, user) {
      done(err, user);
    });
  });

  // Use local strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
        User.findOne({
            email: email
        }, function (err, user) {
        	console.log(err);
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    'errorCode': '0006',
                    'errorType': 'login',
                    'msg': 'Username/Password does not match. Please try again'
                });
            }
            if (!user.authenticate(password)) {
                return done(null, false, {
                    'errorCode': '0007',
                    'errorType': 'login',
                    msg: 'Username/Password does not match. Please try again'
                });
            }
            if (!user.isUserConfirmed) {
                return done(null, false, {
                    'errorCode': '0011',
                    'errorType': 'login',
                    msg: 'Your email is not confirmed yet.'
                });
            }
            return done(null, user);
        });
    }
  ));

  // Use twitter strategy
  passport.use(new TwitterStrategy({
      consumerKey: config.strategies.twitter.clientID,
      consumerSecret: config.strategies.twitter.clientSecret,
      callbackURL: config.strategies.twitter.callbackURL
    },
    function(token, tokenSecret, profile, done) {
      User.findOne({
        'twitter.id_str': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(err, user);
        }
        user = new User({
          name: profile.displayName,
          username: profile.username,
          provider: 'twitter',
          twitter: profile._json,
          roles: ['authenticated']
        });
        user.save(function(err) {
          if (err) {
            console.log(err);
            return done(null, false, {message: 'Twitter login failed, email already used by other login strategy'});
          } else {
            return done(err, user);
          }
        });
      });
    }
  ));

/*  // Use facebook strategy
  passport.use(new FacebookStrategy({
      clientID: config.strategies.facebook.clientID,
      clientSecret: config.strategies.facebook.clientSecret,
      callbackURL: config.strategies.facebook.callbackURL,
      profileFields: ['id', 'displayName', 'emails']
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'facebook.id': profile.id
      }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(err, user);
        }
        user = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          username: profile.username || profile.emails[0].value.split('@')[0],
          provider: 'facebook',
          facebook: profile._json,
          roles: ['authenticated']
        });
        user.save(function(err) {
          if (err) {
            console.log(err);
            return done(null, false, {message: 'Facebook login failed, email already used by other login strategy'});
          } else {
            return done(err, user);
          }
        });
      });
    }
  ));*/
  
  
  
  
//Use facebook strategy
  passport.use(new FacebookStrategy({
          clientID: config.strategies.facebook.clientID,
          clientSecret: config.strategies.facebook.clientSecret,
          callbackURL: config.strategies.facebook.callbackURL,
          profileFields: ["id", "birthday", "email", "first_name", "gender", "last_name"],
      },
      function (accessToken, refreshToken, profile, done) {
          User.findOne({
              'email': profile.emails[0].value
          }, function (err, user) {
              if (user) {
                  // console.log(profile);
                  var isFound = user.socialAccounts.filter(function (sAcc) {
                      return (sAcc.provider == "facebook");
                  });
                  if (isFound.length > 0) {
                      return done(err, user);
                  } else {
                      var social_obj = profile;
                      if (user.socialAccounts.push(social_obj)) {
                          user.save(function (err, user) {
                              if (err)
                                  console.log("-----------error - push error-------------");
                              return done(err, user);
                          })
                      }
                    }
              } else {
                  user = new User({
                      first_name: profile.name.givenName,
                      email: profile.emails[0].value || " ",
                      username: profile.emails[0].value || " ",
                      socialAccounts: profile,
                      password: "matchbox@123",
                      isUserConfirmed : "True",
                      roles: ['authenticated']
                  });
                  user.save(function (err) {
                      if (err) {
                          console.log(err);
                          return done(null, false, {
                              message: 'Facebook login failed, email already used by other login strategy'
                          });
                      } else {
                          return done(err, user);
                      }
                  });
              }
          });
      }
  ));
  
  
  
  
  

  // Use github strategy
  passport.use(new GitHubStrategy({
      clientID: config.strategies.github.clientID,
      clientSecret: config.strategies.github.clientSecret,
      callbackURL: config.strategies.github.callbackURL
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({
        'github.id': profile.id
      }, function(err, user) {
        if (user) {
          return done(err, user);
        }
        user = new User({
	  name: profile._json.displayName || profile._json.login,
          username: profile._json.login,
          email: profile.emails[0].value,
          provider: 'github',
          github: profile._json,
          roles: ['authenticated']
        });
        user.save(function(err) {
          if (err) {
            console.log(err);
            return done(null, false, {message: 'Github login failed, email already used by other login strategy'});
          } else {
            return done(err, user);
          }
        });
      });
    }
  ));

 // Use google strategy
    passport.use(new GoogleStrategy({
            clientID: config.strategies.google.clientID,
            clientSecret: config.strategies.google.clientSecret,
            callbackURL: config.strategies.google.callbackURL
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({
                'email': profile.emails[0].value
            }, function (err, user) {
                if (user) {
                    var isFound = user.socialAccounts.filter(function (sAcc) {
                        return (sAcc.provider == "google");
                    });
                    if (isFound.length > 0) {
                        return done(err, user);
                    } else {
                        var social_obj = profile;
                        user.socialAccounts.push(social_obj)
                            user.save(function (err, user) {
                                if (err)
                                    console.log("-----------error - push error-------------");
                                return done(err, user);
                            })
                    }
                } else {
                    var social_obj = profile;
                    user = new User({
                        first_name: profile.displayName,
                        email: profile.emails[0].value || undefined,
                        username: profile.emails[0].value,
                        socialAccounts : profile,
                        password : "matchbox@123",
                        isUserConfirmed : "True",
                        roles: ['authenticated']
                    });
                    user.save(function (err) {
                        if (err) {
                            console.log(err);
                            return done(null, false, {
                                message: 'Google login failed, email already used by other login strategy'
                            });
                        } else {
                            return done(err, user);
                        }
                    });
                }
            });
        }
    ));
//Linked IN
  passport.use(new LinkedinStrategy({
            consumerKey: config.strategies.linkedin.clientID,
            consumerSecret: config.strategies.linkedin.clientSecret,
            callbackURL: config.strategies.linkedin.callbackURL,
            profileFields: ['id', 'first-name', 'last-name', 'email-address']
        },
        function (accessToken, refreshToken, profile, done) {

            User.findOne({
                'email': profile.emails[0].value
            }, function (err, user) {
                if (user) {
                    var isFound = user.socialAccounts.filter(function (sAcc) {
                        return (sAcc.provider == "linkedin");
                    });
                    if (isFound.length > 0) {

                        return done(err, user);
                    } else {
                        var social_obj = profile;
                        user.socialAccounts.push(social_obj)
                            user.save(function (err, user) {
                                if (err)
                                    console.log("-----------error - push error-------------");
                                return done(err, user);
                            })
                    }
                } else {
                    var social_obj = profile;
                    user = new User({
                      first_name: profile.displayName,
                      email: profile.emails[0].value || undefined,
                      username: profile.emails[0].value,
                      socialAccounts : social_obj,
                      password : "matchbox@123",
                      isUserConfirmed : "True",
                      roles: ['authenticated']
                    });
                    user.save(function (err) {
                        if (err) {
                            console.log("-----------------------------------" + err);
                            return done(null, false, {
                                message: 'LinkedIn login failed, email already used by other login strategy'
                            });
                        } else {
                            return done(err, user);
                        }
                    });
                } 
            });
        }
    ));
    return passport;
};