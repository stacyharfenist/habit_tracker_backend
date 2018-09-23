const Sequelize = require('sequelize')
const db = require('../db')

const Task = db.define('task', {
    name: {
        type: Sequelize.STRING
    },
    weekOrMonth: {
     type: Sequelize.STRING
    },
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    }
    // goal: {
    //     type: Sequelize.INTEGER
    // }
})

module.exports = Task