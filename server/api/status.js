const router = require('express').Router()
const {TaskOnDate} = require('../db/models')

module.exports = router;

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
        res.json(status[0].status)
    }catch (err) {
        next(err)
    }
})

router.put('/:dateId/:taskId', async (req, res, next) => {
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