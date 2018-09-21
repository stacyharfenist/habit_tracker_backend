const router = require('express').Router()
const {DateTab, Journal, MoodOnDate, User} = require('../db/models')
const analyze = require('../sentiment.js')

module.exports = router;

router.post('/', async (req, res, next) => {
    try {
        const dateId = req.body.dateId
        const userId = req.body.userId
        const newEntry = await Journal.create(req.body)
        const sentiment = await analyze(newEntry.text)
        const setMood = await MoodOnDate.create({
            dateId: dateId,
            userId: userId,
            mood: sentiment
        })
        res.json(setMood)
    }catch (err) {
        next(err)
    }
})