module.exports = function (sequelize, DataTypes) {
  var Project = sequelize.define("Project", {
    // The email cannot be null, and must be a proper email before creation
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true
      }
    },
    category: {
      type: DataTypes.TEXT
    },
    incentives: {
      type: DataTypes.TEXT
    },
    goal: {
      type: DataTypes.INTEGER
    }
  });

  Project.associate = function (models) {
    Project.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });

    Project.hasMany(models.Donation, {
      onDelete: "cascade",
      constraints: true,
      foreignKey: {
        name: "projectId"
      }
    });

  };

  return Project;
};
