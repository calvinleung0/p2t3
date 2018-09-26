module.exports = function (sequelize, DataTypes) {
  var Donation = sequelize.define("Donation", {
        // The email cannot be null, and must be a proper email before creation
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });

  Donation.associate = function (models) {
    Donation.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false
      }
    });

    Donation.belongsTo(models.Project, {
      foreignKey: {
        name: "projectId",
        allowNull: false
      }
    });
  }

  return Donation;
};