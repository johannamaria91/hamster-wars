const { connect } = require('../database')
const db = connect()

const HAMSTERS = 'hamsters'
const MATCHES = 'matches'

// GET ALL HAMSTERS
async function getAllHamsters() {
    const hamstersRef = db.collection(HAMSTERS);
    const hamstersSnapshot = await hamstersRef.get();

    if (hamstersSnapshot.empty) {
        return []
    }

    const hamsterArray = [];
    await hamstersSnapshot.forEach(async docRef => {
        const hamster = await docRef.data();
        hamster.id = docRef.id
        hamsterArray.push(hamster)
    });
    return hamsterArray
}

// GET ONE HAMSTER FROM ID 
async function getOne(id, collection) {
    console.log('looking for a specific document')
    const docRef = db.collection(collection).doc(id)
    const docSnapshot = await docRef.get()

    return docSnapshot
}

// POST A NEW HAMSTER
async function addNewHamster(newHamster) {

    const docRef = await db.collection(HAMSTERS).add(newHamster)
    console.log('added doc with id: ' + docRef.id)
    return { id: docRef.id }
}

function isHamsterObject(possibleHamster) {
    if ((typeof possibleHamster) !== 'object') {
        return false
    }
    let keys = Object.keys(possibleHamster)
    if (!keys.includes('name') || !keys.includes('imgName') || !keys.includes('age') || !keys.includes('loves') || !keys.includes('wins') || !keys.includes('games') || !keys.includes('favFood' || !keys.includes('defeats'))) {
        return false
    }

    // kontrollera att possibleHamster.name etc har rimliga värden ?? 

    return true
}

// PUT (UPDATE AN EXISTING HAMSTER)
async function updateHamster(id, object) {
    console.log('Update a hamster object/document...')
    const docRef = db.collection(HAMSTERS).doc(id)
    const settings = { merge: true }
    docRef.set(object, settings)
}

function isHamsterUpdate(possibleHamster) {
    if ((typeof possibleHamster) !== 'object') {
        return false
    }
    let keys = Object.keys(possibleHamster)
    if (keys.includes('name') || keys.includes('imgName') || keys.includes('age') || keys.includes('loves') || keys.includes('wins') || keys.includes('games') || keys.includes('favFood' || keys.includes('defeats'))) {
        return true
    } else {
        return false
    }

    // kontrollera att possibleHamster.name etc har rimliga värden ?? 
}



// DELETE A HAMSTER
async function deleteDocument(id, collection) {
    console.log('Deleting a document...')
    const docRef = db.collection(collection).doc(id)
    const result = await docRef.delete()
    console.log('Result: ', result)
}


// FIND CUTEST HAMSTER 
async function findCutestHamster() {
    let hamsterArray = await getAllHamsters()
    let newHamsterArray = [];
    let percentage;
    let cutestHamster = [];
    let highestPercentage;
    hamsterArray.forEach(hamster => {
        if (hamster.games > 0) { //om den inte spelat behöver den inte jämföras med de andra
            percentage = hamster.wins / hamster.games * 100
            hamster.perc = percentage //lägga till egenskap för hamstrarna (%)
            newHamsterArray.push(hamster) //lägga till hamstern i en ny array
            if (highestPercentage !== hamster.perc) {
                highestPercentage = Math.max(...newHamsterArray.map(hamster => hamster.perc)) //kolla vilken hamster i den nya arrayen som har högst procent vunna matcher
                if (hamster.perc === highestPercentage) {
                    cutestHamster = [hamster]; //om den har högre procent ska den ersätta den nuvarande
                }
            } else { //om den har lika hög procent som den högsta ska den inte ersättas utan läggas till
                cutestHamster.push(hamster)
            }
        }
    });
    console.log(newHamsterArray)
    if (newHamsterArray.length < 1) { //om ingen har spelat vinner alla <3
        return "All hamsters are equally cute"
    }

    newHamsterArray.forEach(hamster => { //ta bort procenten från objekten igen
        delete hamster.perc
    })
    return cutestHamster
}

// GET ALL MATCHES
async function getAllMatches() {
    const matchesRef = db.collection(MATCHES);
    const matchesSnapshot = await matchesRef.get();

    if (matchesSnapshot.empty) {
        return []
    }

    const matchesArray = [];
    await matchesSnapshot.forEach(async docRef => {
        const match = await docRef.data();
        match.id = docRef.id
        matchesArray.push(match)
    });
    return matchesArray
}


// POST A NEW MATCH
async function addNewMatch(newMatch) {

    const docRef = await db.collection(MATCHES).add(newMatch)
    console.log('added doc with id: ' + docRef.id)
    return { id: docRef.id }
}

async function isMatchObject(possibleMatch) {
    if ((typeof possibleMatch) !== 'object') {
        return false
    }
    let keys = Object.keys(possibleMatch)
    if (!keys.includes('winnerId') || !keys.includes('loserId')) {
        return false
    }

    // kontrollera att possibleMatch.winnerId etc har rimliga värden ?? 
    /* let maybeHamster1 = await getOneHamster(req.params.winnerId)
     let maybeHamster2 = await getOneHamster(req.params.loserId)
     if (!maybeHamster1.exists || !maybeHamster2.exists) {
         res.status(400).send('not a proper match object')
     }
 */
    return true
}

async function findWonMatches(id) {
    let allMatches = await getAllMatches()
    let wonMatches = []
    allMatches.forEach(match => {
        if (id === match.winnerId) {
            wonMatches.push(match)
        }
    })
    return wonMatches
}

async function findWinners() {
    let hamsterArray = await getAllHamsters()
    let winnersArray = [];

    hamsterArray.sort(function(a, b) { return b.wins - a.wins })
    winnersArray.push(hamsterArray[0], hamsterArray[1], hamsterArray[2], hamsterArray[3], hamsterArray[4])

    //console.log(hamsterArray)
    console.log(winnersArray)

    return winnersArray
}

async function findLosers() {
    let hamsterArray = await getAllHamsters()
    let losersArray = [];

    hamsterArray.sort(function(a, b) { return b.defeats - a.defeats })
    losersArray.push(hamsterArray[0], hamsterArray[1], hamsterArray[2], hamsterArray[3], hamsterArray[4])

    //console.log(hamsterArray)
    console.log(losersArray)

    return losersArray
}

    module.exports = { findLosers, findWinners, findWonMatches, deleteDocument, getOne, getAllMatches, findCutestHamster, addNewMatch, isMatchObject, getAllHamsters, addNewHamster, isHamsterObject, updateHamster, isHamsterUpdate }