const {Sequelize} = require('sequelize')

// creating an Sequelize instance

const sequelize = new Sequelize('test-db','user',"password",{
    dialect:"sqlite",
    host:'./OntimeInvent.sqlite'
})

module.exports = sequelize