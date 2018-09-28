// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
var handlebars = require("express-handlebars");

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8082;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Requiring our routes
app.engine("handlebars", handlebars({defaultLayout:"main"}));
app.set("view engine", "handlebars");
require("./routes/htmlRoutes.js")(app);
require("./routes/authRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

// var syncOptions = { force: false };

// // If running a test, set syncOptions.force to true
// // clearing the `testdb`
// if (process.env.NODE_ENV === "test") {
//   syncOptions.force = true;
// }

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log("Listening on http://localhost:%s/ ", PORT);
  });
});

// module.exports = app;
