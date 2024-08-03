const {Sequelize} = require("sequelize");

// https://sequelize.org/docs/v6/getting-started/
const db = new Sequelize ({
    host: "localhost",
    dialect: "mysql",
    port: 3306,
    username: "root",
    password: "",
    database: "dumb-db56",
    ssl: true,
})

module.exports =db;