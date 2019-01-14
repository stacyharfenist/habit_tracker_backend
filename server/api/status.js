const router = require('express').Router()
const {TaskOnDate} = require('../db/models')

module.exports = router;

const objCreator = (datesArr, taskArr) => {
    const arr = []
    datesArr.map(date =>{
        taskArr.map(task => {
            arr.push({dateId: date.id, taskId: task.id})
        })
    })
    return arr
}

router.get('/:dateId', async (req, res, next) => {
    const dateId = req.params.dateId
    try{
        const statuses = await TaskOnDate.findAll({
            where: {
                dateId: dateId
            }
        })
        res.json(statuses)
    }catch(err) {
        next(err)
    }
})

router.get('/:dateId/:taskId', async (req, res, next) => {
    const dateId = req.params.dateId
    const taskId = req.params.taskId
    try {
        const status = await TaskOnDate.findAll({
            where: {
                dateId: dateId,
                taskId: taskId
            }
        })
        if(status[0]) {
        res.json(status[0].status)
        } else {
            res.json(false)
        }
    }catch (err) {
        next(err)
    }
})


router.post('/', async (req, res, next) => {
    const tasks = req.body.tasks
    const dates = req.body.dates
    console.log('tasks', tasks, 'dates', dates)
    const arrOfObjs = objCreator(dates, tasks)
    try {
        await TaskOnDate.bulkCreate(arrOfObjs)
        res.send().end()
    }catch (err) {
        next(err)
    }
})

router.post('/update/:dateId/:taskId', async (req, res, next) => {
    const dateId = req.params.dateId
    const taskId = req.params.taskId
    try {
    const statusArr = await TaskOnDate.findAll({
            where: {
                dateId: dateId,
                taskId: taskId
            }
        })
        let statusObj = statusArr[0]
        const status = statusObj.status
        if(status) {
            statusObj.status = false;
            statusObj = await statusObj.save()
        } else {
            statusObj.status = true;
            statusObj = await statusObj.save()
        }
        res.json(statusObj)
    }catch (err) {
        next(err)
    }
})