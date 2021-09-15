const { connect } = require('../database')
const db = connect()
const hamsterData = require('../data.json')

const HAMSTERS = 'hamsters'

populate();

async function populate() {
    hamsterData.forEach(hamster => {
        db.collection(HAMSTERS).add(hamster)
    })
}