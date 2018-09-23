const router = require('express').Router()
const {Journal, MoodOnDate} = require('../db/models')
const analyze = require('../sentiment.js')

module.exports = router;

const sentimentParser = (sent) => {
    if(sent > 0.2) {
        return 'happy'
    } else if (sent > 0) {
        return 'neutral'
    } else {
        return 'sad'
    }
}

router.post('/', async (req, res, next) => {
    try {
        const dateId = req.body.dateId
        const userId = req.body.userId
        const newEntry = await Journal.create(req.body)
        const sentiment = await analyze(newEntry.text)
        const mood = sentimentParser(sentiment[0].documentSentiment.score)
        const setMood = await MoodOnDate.create({
            dateId: dateId,
            userId: userId,
            mood: mood
        })
        res.json(mood)
    }catch (err) {
        next(err)
    }
})