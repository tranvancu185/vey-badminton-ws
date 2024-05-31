require('dotenv').config()

const host = process.env.MARIADB_HOST
const username = process.env.MARIADB_USER
const password = process.env.MARIADB_PASSWORD
const database = process.env.MARIADB_DATABASE

module.exports = {
  production: {
    username,
    password,
    database,
    host,
    port: 3306,
    dialect: 'mariadb',
  },
}