const User = require('./user')
const DateTab = require('./date')
const Task = require('./task')
const TaskOnDate = require('./taskOnDate')
const Journal = require('./journal')
const MoodOnDate = require('./moodOnDate')


Task.belongsTo(User)
User.hasMany(Task)

DateTab.belongsToMany(Task, {through: TaskOnDate})
Task.belongsToMany(DateTab, {through: TaskOnDate})

Journal.belongsTo(User)
User.hasMany(Journal)

Journal.belongsTo(DateTab)
DateTab.hasOne(Journal)

DateTab.belongsToMany(User, {through: MoodOnDate})
User.belongsToMany(DateTab, {through: MoodOnDate})



module.exports = {
  User,
  DateTab,
  Task,
  TaskOnDate,
  Journal,
  MoodOnDate
}
