const { connect } = require('../database')
const db = connect()

const HAMSTERS = 'hamsters'
const MATCHES = 'matches'

// GET ALL DOCUMENTS
async function getAll(collection) {
    const collectionRef = db.collection(collection);
    const collectionSnapshot = await collectionRef.get();
    if (collectionSnapshot.empty) {
        return []
    }
    const documentArray = [];
    await collectionSnapshot.forEach(async docRef => {
        const document = await docRef.data();
        document.id = docRef.id
        documentArray.push(document)
    });
    return documentArray
}

// GET ONE DOCUMENT
async function getOne(id, collection) {
    const docRef = db.collection(collection).doc(id)
    const docSnapshot = await docRef.get()
    return docSnapshot
}

// POST NEW DOCUMENT 
async function addNew(newDoc, collection) {
    const docRef = await db.collection(collection).add(newDoc)
    console.log('added doc with id: ' + docRef.id)
    return { id: docRef.id }
}

// PUT (UPDATE AN EXISTING HAMSTER)
async function updateHamster(id, object) {
    console.log('Update a hamster object/document...')
    const docRef = db.collection(HAMSTERS).doc(id)
    const settings = { merge: true }
    docRef.set(object, settings)
}

// DELETE
async function deleteDocument(id, collection) {
    console.log('Deleting a document...')
    const docRef = db.collection(collection).doc(id)
    const result = await docRef.delete()
    console.log('Result: ', result)
}

// GET CUTEST HAMSTER 
async function findCutestHamster() {
    let hamsterArray = await getAll(HAMSTERS)
    let newHamsterArray = [];
    let cutestHamster = [];
    let mostWins;
    hamsterArray.forEach(hamster => {
        hamster.result = hamster.wins - hamster.defeats
        newHamsterArray.push(hamster) //lägga till hamstern i en ny array
        console.log(`${hamster.name}'s result is: ${hamster.result}`)
        if (mostWins !== hamster.result) {
            mostWins = Math.max(...newHamsterArray.map(hamster => hamster.result)) //kolla vilket som är det bästa resultatet
            if (hamster.result === mostWins) {
                cutestHamster = [hamster]; //om den har bättre ska den ersätta den nuvarande
            }
        } else {
            cutestHamster.push(hamster)
        }
    })
    hamsterArray.forEach(hamster => { //ta bort result-egenskapen
        delete hamster.result
    })
    return cutestHamster
}

// GET MATCHWINNERS
async function findWonMatches(id) {
    let allMatches = await getAll(MATCHES)
    let wonMatches = []
    allMatches.forEach(match => {
        if (id === match.winnerId) {
            wonMatches.push(match)
        }
    })
    return wonMatches
}

// GET WINNERS/LOSERS
async function winnersLosers(key) {
    let hamsterArray = await getAll(HAMSTERS)
    hamsterArray.sort(function (a, b) { return b[key] - a[key] })
    let newArray = hamsterArray.slice(0, 5)
    return newArray
}


module.exports = { winnersLosers, findWonMatches, deleteDocument, getOne, findCutestHamster, addNew, getAll, updateHamster }