const Sequelize = require('sequelize')
const db = require('../db')

const DateTab = db.define('date', {
    // dayOfWeek: {
    //     type: Sequelize.STRING,
    //     validate: {
    //         isIn: [['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']]
    //     }
    // },
    dayNum: {
        type: Sequelize.INTEGER
    },
    month: {
        type: Sequelize.STRING
    },
    year: {
        type: Sequelize.INTEGER
    }
})

module.exports = DateTab