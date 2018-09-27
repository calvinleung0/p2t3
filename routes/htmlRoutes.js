// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });

  app.get("/example/:id", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/example.html"));
  });

  app.get("/users/:userid", function(req, res) {
    db.User.findOne({
      where: { id: req.params.userid },
      include: [
        {
          model: db.Project,
          attributes: ["title", "id"],
          include: [
            {
              model: db.Donation,
              attributes: [
                [db.sequelize.fn("SUM", db.sequelize.col("amount")), "raised"]
              ]
            }
          ]
        }
      ]
    }).then(function(data) {
      db.Donation.findAll({
        where: { userId: req.params.userid },
        attributes: ["amount"],
        include: [
          {
            model: db.Project,
            attributes: ["title'", "id"]
          }
        ]
      }).then(function(donations) {
        for (var i = 0; i < donations.length; i++) {
          donations[i] = donations[i].dataValues;
          donations[i].project = donations[i].Project;
          delete donations[i].Project;
        }
        data = data.dataValues;

        projects = [];

        for (var i = 0; i < data.Projects.length; i++) {
          projects[i] = data.Projects[i].dataValues;
          projects[i].total = projects[i].Donations[0].dataValues.raised;
          delete projects[i].Donations;
        }

        delete data.Projects;
        data.donations = donations;
        data.projects = projects;
        console.log(data);
        res.render("userdisplay", data);
      });
    });
  });
};
