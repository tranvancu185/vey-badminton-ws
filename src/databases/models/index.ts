import { Sequelize } from 'sequelize'

const env = process.env.NODE_ENV || 'production'
const config = require('../config/database')[env];
console.log(config)

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config)

export { Sequelize, sequelize }