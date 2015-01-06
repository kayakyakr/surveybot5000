var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res) {
  var flash = req.flash && req.flash['error'];
  res.render('login', { username: req.user, message: flash });
});

router.post('/', passport.authenticate('local', { successRedirect: '/questions', failureRedirect: '/login', failureFlash: true }));

module.exports = router;
