"use strict";
module.exports = function(sequelize, DataTypes) {
  var Choice = sequelize.define("Choice", {
    value: DataTypes.STRING,
    QuestionId: {type: DataTypes.INTEGER, field: 'question_id'},
    selected: DataTypes.VIRTUAL,
    total: DataTypes.VIRTUAL
  }, {
    name: {
      singular: 'choice',
      plural: 'choices',
    },
    classMethods: {
      associate: function(models) {
        Choice.belongsTo(models.Question, {foreignKey: 'question_id'});
        Choice.hasMany(models.Answer, {foreignKey: 'choice_id'});
      }
    },
    instanceMethods: {
      fraction: function(){
        return this.selected*1.0 / (this.total || this.selected || 1)*1.0; // avoid divide by 0
      },
      percent: function(){
        return Number(this.fraction() * 100).toFixed(0)
      }
    }
  });
  return Choice;
};
