var admins = require(__dirname + '/../config/admins.json')
  , LocalStrategy = require('passport-local').Strategy
  , passport = require('passport');

passport.serializeUser(function(admin, done) {
  done(null, admin.id);
});

passport.deserializeUser(function(id, done) {
  findAdmin(id, null, function(err, admin){
    done(err, admin);
  });
});

// Emulate a database admin finder
function findAdmin(id, name, done){
  process.nextTick(function(){
    var admin = null
    admins.forEach(function(ad){
      if(ad['name'] === name || ad['id'] === id){
        admin = ad;
        return false;
      }
    });

    done(!!admin ? null: 'Admin Not Found', admin);
  });
}

module.exports = {
  strategy: new LocalStrategy(
    function(name, pass, done){
      findAdmin(null, name, function(err, admin){
        if(!!err || admin['password'] !== pass){
          return done(null, false, {message: 'Username or password incorrect'});
        }
        return done(null, admin);
      });
    }
  ),
  ensureAuthenticated: function(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login')
  }
}
