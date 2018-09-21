const User = require('./user')
const DateTab = require('./date')
const Task = require('./task')
const TaskOnDate = require('./taskOnDate')


Task.belongsTo(User)
User.hasMany(Task)

DateTab.belongsToMany(Task, {through: TaskOnDate})
Task.belongsToMany(DateTab, {through: TaskOnDate})

module.exports = {
  User,
  DateTab,
  Task,
  TaskOnDate
}
