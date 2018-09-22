var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Get a user by id
  app.get("/api/users/:userid", function(req, res) {
    db.User.findOne({
      where: {id: req.params.userid}
    }).then(function(userData) {
      db.Donation.findAll({
        attributes: ['project_name', 'amount', 'time'],
        where: {
          userid: req.params.userid 
        },
        include: [{model: db.Project}]
      }).then(function(donationData) {
        db.Project.findAll({
          attributes: ['project_name'],
          where: {
            userid: req.params.userid 
          },
        }).then(function(projectData) {
          var user = userData[0];
          user["donations"] = donationData;
          user["projects"] = projectData;
          res.json(user);
        });
      });
    });
  });

  // Create a new user
  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // Delete a user by id
  app.delete("/api/users/:id", function(req, res) {
    db.User.destroy({ where: { id: req.params.id } }).then(function(data) {
      res.json(data);
    });
  });

  // Get all projects
  app.get("/api/projects", function(req, res) {
    db.Project.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Get a project by id
  app.get("/api/projects/:projectid", function(req, res) {
    db.User.findOne({
      where: {id: req.params.projectid}
    }).then(function(projectData) {
      db.Donation.findAll({
        attributes: ['user_name', 'amount', 'time'],
        where: {
          projectid: req.params.projectid 
        },
        include: [{model: db.User}]
      }).then(function(donationData) {
          var project = projectData[0];
          user["donations"] = donationData;
          res.json(project);
      });
    });
  });

  // Create a new project
  app.post("/api/projects", function(req, res) {
    db.Project.create(req.body).then(function(data) {
      res.json(data);
    });
  });

  // Delete a project by id
  app.delete("/api/projects/:id", function(req, res) {
    db.Project.destroy({ where: { id: req.params.id } }).then(function(data) {
      res.json(data);
    });
  });
};
