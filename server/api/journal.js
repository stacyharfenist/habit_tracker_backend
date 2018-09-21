const router = require('express').Router()
const {DateTab, Journal, MoodOnDate, User} = require('../db/models')
const analyze = require('../sentiment.js')

module.exports = router;

const sentimentParser = (sent) => {
    if(sent > 0.4) {
        return 'happy'
    } else {
        return 'sad'
    }
}

router.post('/', async (req, res, next) => {
    try {
        const dateId = req.body.dateId
        const userId = req.body.userId
        const newEntry = await Journal.create(req.body)
        console.log('New Entry', newEntry)
        const sentiment = await analyze(newEntry.text)
        const mood = sentimentParser(sentiment.documentSentiment.magnitude)
        const setMood = await MoodOnDate.create({
            dateId: dateId,
            userId: userId,
            mood: mood
        })
        res.json(setMood)
    }catch (err) {
        next(err)
    }
})