const router = require('express').Router()
const {DateTab, Journal, MoodOnDate, User} = require('../db/models')
const analyze = require('../sentiment.js')

module.exports = router;

const sentimentParser = (sent) => {
    console.log('sent', sent)
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
        console.log('SENTIMENT', sentiment)
        const mood = sentimentParser(sentiment[0].documentSentiment.score)
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