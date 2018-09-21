const Sequelize = require('sequelize')
const db = require('../db')

const MoodOnDate = db.define('moodOnDate', {
    mood: {
        type: Sequelize.STRING,
        defaultValue: 'neutral'
    }
})

module.exports = MoodOnDate