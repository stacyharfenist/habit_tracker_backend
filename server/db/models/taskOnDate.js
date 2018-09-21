const Sequelize = require('sequelize')
const db = require('../db')

const TaskOnDate = db.define('taskOnDate', {
    status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    }
})

module.exports = TaskOnDate