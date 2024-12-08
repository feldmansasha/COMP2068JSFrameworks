var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var shiftsRouter = require("./routes/shifts");


var passport = require("passport");
var session = require("express-session");

var mongoose = require("mongoose");
var configs = require("./configs/globals");

var User = require("./models/user");
var GitHubStrategy = require("passport-github2").Strategy;

var app = express();
var hbs = require("hbs");
const {access}=require("fs");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "FindShiftsPage",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: configs.Authentication.GitHub.clientID,
      clientSecret: configs.Authentication.GitHub.clientSecret,
      callbackURL: "http://localhost:3000/github/callback"
    },
    async (accessToken, refreshToken, profile, done) => {
      let user = await User.findOne({ oauthID: profile.id });
      if (user){
        return done(null, user);
      }
      else {
        let newUser = new User({
          username: profile.username,
          oauthID: profile.id,
          oauthProvider: "Github",
        });
        await newUser.save();
        return done(null, newUser);
      }
    }
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/shifts", shiftsRouter);

mongoose
  .connect(configs.ConnectionStrings.MongoDb)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
