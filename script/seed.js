'use strict'

const dates = [{dayNum: 1, month: 'Sep', year: 2018}, {dayNum: 2, month: 'Sep', year: 2018}, {dayNum: 3, month: 'Sep', year: 2018}]

const tasks = [{name: 'Meditate', userId: 1}, {name: 'Drink 100 oz Water', userId: 1}, {name: 'Make bed', userId: 1}, ]

const db = require('../server/db')
const {User, DateTab, Task} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ]).then(() => Promise.all(dates.map(date => DateTab.create(date)))).then(() => Promise.all(tasks.map(task => Task.create(task))))

  //.then(() => Promise.all(dates.map(date => DateTab.create(date))))

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
