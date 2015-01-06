"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Answers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      question_id: {
        type: DataTypes.INTEGER
      },
      choice_id: {
        type: DataTypes.INTEGER
      },
      ip: {
        type: DataTypes.STRING
      },
      session: {
        type: DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Answers").done(done);
  }
};