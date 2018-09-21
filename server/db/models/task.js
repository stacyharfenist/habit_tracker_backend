const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
    name: {
        type: Sequelize.STRING
    },
    weekOrMonth: {
     type: Sequelize.STRING
    },
    // goal: {
    //     type: Sequelize.INTEGER
    // }
})

module.exports = Task