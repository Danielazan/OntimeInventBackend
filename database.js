// const {Sequelize} = require('sequelize')

// // creating an Sequelize instance

// const sequelize = new Sequelize('test-db','user',"password",{
//     dialect:"sqlite",
//     host:'./OntimeInvent.sqlite'
// })

// module.exports = sequelize


// const { Sequelize } = require('sequelize');

// const sequelize = new Sequelize('ontime', 'postgres', '1234', {
//   host: 'localhost',
//   dialect: 'postgres',
//   port: 5432 // default PostgreSQL port
// });

// module.exports = sequelize;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("postgresql://root:5v7Y9G254CHMd2sBcC4EnWV0SExqxg6I@dpg-culksm56l47c73dqg410-a.oregon-postgres.render.com/ontime_bsb4?sslmode=require",{
    dialect: "postgres",
    ssl:{
    require: true,
    rejectUnauthorized:false
   }
  });
  

// const sequelize = new Sequelize("postgresql://root:5v7Y9G254CHMd2sBcC4EnWV0SExqxg6I@dpg-culksm56l47c73dqg410-a.oregon-postgres.render.com/ontime_bsb4");


module.exports = sequelize;