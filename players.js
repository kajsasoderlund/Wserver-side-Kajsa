const Sequelize = require('sequelize');
const config = require('./config/config')['development'];

// database config
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect
  }
);


const Player = sequelize.define('player', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true 
  },
  position: Sequelize.STRING,
  jersey: {
    type: Sequelize.INTEGER,
    allowNull: false,
    unique: true 
  },
  team: Sequelize.STRING,
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
});

module.exports = {
  Player
};
