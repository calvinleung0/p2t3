// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
var db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/", isAuthenticated, function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/home");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  // app.get("/members", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/members.html"));
  // });

  // app.get("/example/:id", isAuthenticated, function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/example.html"));
  // });

  app.get("/users/:userid", function(req, res) {
    db.User.findOne({
      where: { id: req.params.userid }
    }).then(function(data) {
      db.Donation.findAll({
        where: { userId: req.params.userid },
        attributes: ["amount"],
        include: [
          {
            model: db.Project,
            attributes: ["title", "id"]
          }
        ]
      }).then(function(donations) {
        db.Project.findAll({
          where: { userId: req.params.userid },
          attributes: [
            "title",
            "id",
            [db.sequelize.fn("SUM", db.sequelize.col("amount")), "total"]
          ],
          include: [
            {
              model: db.Donation,
              attributes: []
            }
          ],
          group: ["Project.id"]
        }).then(function(projects) {
          console.log(projects);

          for (var i = 0; i < donations.length; i++) {
            donations[i] = donations[i].dataValues;
            donations[i].project = donations[i].Project;
            delete donations[i].Project;
          }
          data = data.dataValues;

          for (var i = 0; i < projects.length; i++) {
            projects[i] = projects[i].dataValues;
          }
          data.donations = donations;
          data.projects = projects;
          //console.log(data);
          res.render("userdisplay", data);
        });
      });
    });
  });

  app.get("/projects/:projectid", function(req, res) {
    db.Project.findOne({
      where: { id: req.params.projectid },
      attributes: {
        include: [[db.sequelize.fn("SUM", db.sequelize.col("amount")), "total"]]
      },
      include: [
        {
          model: db.Donation,
          attributes: []
        },
        {
          model: db.User,
          attributes: ["firstName", "lastName", "id"]
        }
      ]
    }).then(function(data) {
      db.Donation.findAll({
        where: { projectId: req.params.projectid },
        attributes: ["amount"],
        include: [
          {
            model: db.User,
            attributes: ["firstName", "lastName", "id"]
          }
        ]
      }).then(function(donations) {
        for (var i = 0; i < donations.length; i++) {
          donations[i] = donations[i].dataValues;
          donations[i].user = donations[i].User;
          delete donations[i].User;
        }
        data = data.dataValues;
  
        data.donations = donations;
        data.user = data.User.dataValues;
        delete data.User;
        console.log(data);
        //console.log(data);
        res.render("projectdisplay", data);
      });
    });
  });
};
