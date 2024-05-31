require('dotenv').config()
import { Sequelize } from 'sequelize'

const env = process.env.NODE_ENV || 'development'
const config = require('../config/database')[env];

const sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config)

export { Sequelize, sequelize }