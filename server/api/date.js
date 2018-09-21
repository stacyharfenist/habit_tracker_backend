const router = require('express').Router()
const {DateTab} = require('../db/models')

module.exports = router;

//const dayObj = {Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6}
//req.body.arrOfDateObjs  = [{blah: blah}]

router.post('/', async (req, res, next) => {
    console.log('req.body.arr', req.body.arr)
    const month = 'Jan'
    const year = 2018
    try {
    const newMonthOfDates = await DateTab.bulkCreate(req.body.arr)
    const dates = await DateTab.findAll({
        where: {
            month: month,
            year: year
        }
    })
    res.json(dates)
    }catch (err) {
        next(err)
    }
})

router.get('/:month/:year', async (req, res, next) => {
    const month = req.params.month
    const year = req.params.year
    console.log('MONTH', month)
    try{
        const dates = await DateTab.findAll({
            where: {
                month: month,
                year: year
            },
        })
        res.json(dates)
    } catch (err) {
        next(err)
    }
})

// const ObjCreator = (month, year, monthLength) => {
//     let datesArr = []
//     for (let i = 0; i< monthLength; i++) {
//         let newDay = {
//             dayNum: i+1,
//             month: month,
//             year: year
//         }
//         datesArr.push(newDay)
//     }
//     return datesArr
// }

