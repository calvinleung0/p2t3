// Requiring our custom middleware for checking if a user is logged in
// var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index");
  });

  app.get("/signup", function(req, res) {
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup");
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.render("login");
  });

  app.get("/create", function(req, res) {

    if (req.user) {
      res.redirect("/members");
    }
    res.render("create");
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

  // app.get("/example/:id", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/example.html"));
  // });

};
