const fs = require('fs');
const Umzug = require('umzug');
const path = require('path');
const Sequelize = require('sequelize');
const { sequelize } = require('../models/index.js');

const umzug = new Umzug({
  migrations: {
    path: path.join(process.cwd(), './migrations'),
    params: [
      sequelize.getQueryInterface(),
      Sequelize,
    ],
  },
  storage: 'sequelize',
  storageOptions: {
    sequelize,
  },
});

async function migrate() {
  return umzug.up();
}

async function revert() {
  return umzug.down({ to: 0 });
}

module.exports={
    migrate,revert
}