var express = require("express");
var passport = require("passport");
var router = express.Router();
var User = require("../models/user");
var Shift=require("../models/shift");

/* GET home page. */
router.get('/', function(req, res, next) {
  let shifts=Shift.find();
  
  res.render('index', {
    title: 'Express',
    user: req.user});
});

router.get("/login", function(req, res, next){
if(req.isAuthenticated()){
  res.redirect('/shifts');
}

  let messages=req.session.messages || [];
  req.session.messages=[];
  res.render("login", {title: "Enter your credentials", messages: messages});
})

router.post("/login", passport.authenticate("local",{
  successRedirect: "/shifts",
  failureRedirect: "/login",
  failureMessage: "Invalid credentials"
}));

router.get("/register", function(req, res, next){
  res.render("register", {title: "Create an account"});
})

router.post("/register", function(req, res, next){
  User.register(
  new User ({username: req.body.username}),
  req.body.password,
  (err, newUser)=>{
    if (err){
      console.log(err);
      return res.redirect("/register");
    }
    else{
      req.login(newUser, (err)=>{res.redirect("/shifts")});
    }
  }
)
});

router.get("/logout", function(req, res, next){
  req.logout((error)=>{res.redirect("/login")});
});

router.get("/github", passport.authenticate("github", {scope: ["user:email"]}));

router.get("/github/callback",
  passport.authenticate("github", {
    successRedirect: "/shifts",
    failureRedirect:"/login"
  })
);

module.exports = router;
