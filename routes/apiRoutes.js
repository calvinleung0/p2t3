var db = require("../models");

module.exports = function(app) {
  // Get all users
  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(data) {
      res.json(data);
    });
  });

  // Get a user by id
  app.get("/api/users/:id", function(req, res) {
    db.Example.findOne({where: {id: req.params.id}}).then(function(dbExamples) {
      res.json(dbExamples);
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
  app.get("/api/projects/:id", function(req, res) {
    db.Example.findOne({where: {id: req.params.id}}).then(function(dbExamples) {
      res.json(dbExamples);
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
