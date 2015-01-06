"use strict";
module.exports = function(sequelize, DataTypes) {
  var Question = sequelize.define("Question", {
    value: DataTypes.STRING,
    admin_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        Question.hasMany(models.Choice, {foreignKey: 'question_id'});
        Question.hasMany(models.Answer, {foreignKey: 'question_id'});
      }
    }
  });
  return Question;
};
