/* ExpressJS server configuration file. Database stuff etc. */
const process = require('process');

module.exports = {
  db_host: process.env.DB_HOST || 'localhost',
  db_user: process.env.DB_USER || 'shorter',
  db_password: process.env.DB_PASSWORD || 'strongpass',
  db: 'SHORTER',
  port: process.env.PORT || 3001
};
