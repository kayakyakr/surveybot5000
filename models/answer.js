"use strict";
module.exports = function(sequelize, DataTypes) {
  var Answer = sequelize.define("Answer", {
    QuestionId: {type: DataTypes.INTEGER, field: 'question_id'},
    ChoiceId: {type: DataTypes.INTEGER, field: 'choice_id'},
    ip: DataTypes.STRING,
    session: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Answer.belongsTo(models.Question, {foreignKey: 'question_id'});
        Answer.belongsTo(models.Choice, {foreignKey: 'choice_id'});
      }
    }
  });
  return Answer;
};
