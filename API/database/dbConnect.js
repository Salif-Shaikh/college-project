//Using PG package to connect to PostgreSQL
const pg = require("pg");

//creating a connection to postgresql database
//Provide exact database credentials.
//host & user remains the same for postgreSQL
const postgresDb = new pg.Pool({
  port: "5432", //port set during the installation of postgreSQl on system.
  host: "localhost",
  user: "postgres",
  database: "projectDatabase", //InOrder to connect to another database change the name of database here.
  password: "1101", //your password of postgreSQL.
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

//export to use postgresdb in routeHandler to execute database query.
module.exports = postgresDb;
