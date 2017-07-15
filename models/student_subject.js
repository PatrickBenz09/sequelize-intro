'use strict';
module.exports = function(sequelize, DataTypes) {
  var student_subject = sequelize.define('student_subject', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });

  student_subject.associate = (models) => {
    student_subject.belongsTo(models.Student);
    student_subject.belongsTo(models.Subject);
  }

  return student_subject;
};
