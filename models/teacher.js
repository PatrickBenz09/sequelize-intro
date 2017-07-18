'use strict';
module.exports = function(sequelize, DataTypes) {
  var Teacher = sequelize.define('Teacher', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject_id: DataTypes.INTEGER
  });

  Teacher.associate = (models) => {
    Teacher.belongsTo(models.Subject, { foreignKey: 'subject_id' });
  }

  return Teacher;
};
