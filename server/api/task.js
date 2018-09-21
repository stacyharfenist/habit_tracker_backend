const router = require('express').Router()
const {DateTab, Task} = require('../db/models')

module.exports = router;

router.post('/', async (req, res, next) => {
    const month = req.body.month
    const year = req.body.year
    try{
    const dates = await DateTab.findAll({
        where: {
            month: month,
            year: year
        },
        attributes: ['id']
    })
    const datesArr = []
    dates.map(date => {
        datesArr.push(date.id)
    })
    const newTask = await Task.create(req.body)
    await newTask.addDates(datesArr)
    res.send(newTask)
    } catch (err) {
        next(err)
    }
})

router.get('/:userId', async (req, res, next) => {
    const userId = req.params.userId
    try {
        const tasks = await Task.findAll({
            where: {
                userId: userId

            }
        })
        res.json(tasks)
    }catch (err) {
        next(err)
    }
})