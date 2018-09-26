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
      where: {id: req.params.userid},
      include: [
        {model: db.Project, attributes: ['title', 'id'],
        include: [{model: db.Donation, attributes: [[db.sequelize.fn('SUM', db.sequelize.col('amount')), 'raised']]}]}
      ]
    }).then(function(data) {
      db.Donation.findAll({
        where: {userId: req.params.userid},
        attributes: ['amount'],
        include: [{model: db.Project, attributes: ['title', 'id']}
        ]
      }).then(function(donations){
        
        for(var i = 0; i < donations.length; i++){
          donations[i] = donations[i].dataValues;
          donations[i].project = donations[i].Project;
          delete donations[i].Project;
        }
        data = data.dataValues;

        projects = [];

        for(var i = 0; i < data.Projects.length; i++){
          projects[i] = data.Projects[i].dataValues;
          projects[i].total = projects[i].Donations[0].dataValues.raised;
          delete projects[i].Donations;
          
        }

        delete data.Projects;
        
        data.donations = donations;
        data.projects = projects;
        //data.projects.total = data.Projects.Donations[0].dataValues.raised;
        console.log(donations);
        console.log(data);
        res.json(data);
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
    db.Project.findOne({
      where: {id: req.params.projectid}
    }).then(function(projectData) {
      db.Donation.findAll({
        attributes: ['user_name', 'amount', 'time'],
        where: {
          projectId: req.params.projectid 
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

  // Add a donation
  app.post("/api/donations", function(req, res) {
    db.Donation.create(req.body).then(function(data) {
      res.json(data);
    });
  });
};


