const Sequelize = require('sequelize')
const db = require('../db')

const Journal = db.define('journal', {
    text: {
        type: Sequelize.TEXT
    }
}) 

module.exports = Journal