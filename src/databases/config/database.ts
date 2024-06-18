require('dotenv').config()

const host = process.env.MARIADB_HOST
const username = process.env.MARIADB_USER
const password = process.env.MARIADB_PASSWORD
const database = process.env.MARIADB_DATABASE

module.exports = {
  production: {
    logging: false,
    username,
    password,
    database,
    host,
    port: 3306,
    dialect: 'mariadb',
    compress: true,
    connectTimeout: 30000,
    timeout: 30000,
    pool: {
      max: 40, // Tăng số lượng kết nối tối đa
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      charset: 'utf8',
      timestamps: false
    },
    dialectOptions: {
      connectTimeout: 60000
    }
  },
  qc: {
    username,
    logging: false,
    password,
    database,
    host,
    port: 3306,
    dialect: 'mariadb',
    timeout: 30000,
    compress: true,
    connectTimeout: 30000,
    pool: {
      max: 40, // Tăng số lượng kết nối tối đa
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      charset: 'utf8',
      timestamps: false
    },
    dialectOptions: {
      connectTimeout: 60000
    }
  },
  development: {
    username,
    password,
    database,
    host,
    port: 3306,
    dialect: 'mariadb',
    timeout: 30000,
    compress: true,
    connectTimeout: 30000,
    showWarnings: true,
    pool: {
      max: 40, // Tăng số lượng kết nối tối đa
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      charset: 'utf8',
      timestamps: false
    },
    dialectOptions: {
      connectTimeout: 60000
    }
  },
}