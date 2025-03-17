 

// module.exports = sequelize


// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('ontime', 'postgres', '1234', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432 // default PostgreSQL port
// });

// module.exports = sequelize;

// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize("postgresql://root:5v7Y9G254CHMd2sBcC4EnWV0SExqxg6I@dpg-culksm56l47c73dqg410-a.oregon-postgres.render.com/ontime_bsb4?sslmode=require",{
//     dialect: "postgres",
//     ssl:{
//     require: true,
//     rejectUnauthorized:false
//    }
//   });
  

const { Sequelize } = require('sequelize');
const { PostgresDialect }= require('@sequelize/postgres');

const sequelize = new Sequelize("ontime", "postgres", "Genration1", {
  host: "database-1.chia4cwqkibh.eu-north-1.rds.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = sequelize;