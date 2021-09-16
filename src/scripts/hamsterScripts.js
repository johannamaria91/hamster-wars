const { connect } = require('../database')
const db = connect()

const HAMSTERS = 'hamsters'

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
async function getOneHamster(id) {
    console.log('looking for a specific hamster')
    const docRef = db.collection(HAMSTERS).doc(id)
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
	if( (typeof possibleHamster) !== 'object' ) {
		return false
	}
	let keys = Object.keys(possibleHamster)
	if( !keys.includes('name') || !keys.includes('imgName') || !keys.includes('age') || !keys.includes('loves') || !keys.includes('wins') || !keys.includes('games') || !keys.includes('favFood' || !keys.includes('defeats')) ) {
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
	if( (typeof possibleHamster) !== 'object' ) {
		return false
	}
	let keys = Object.keys(possibleHamster)
	if( keys.includes('name') || keys.includes('imgName') || keys.includes('age') || keys.includes('loves') || keys.includes('wins') || keys.includes('games') || keys.includes('favFood' || keys.includes('defeats')) ) {
		return true
	} else {
        return false
    }

	// kontrollera att possibleHamster.name etc har rimliga värden ?? 
}

// DELETE A HAMSTER
async function deleteHamster(id) {
    console.log('Deleting a hamster document...')
    const docRef = db.collection(HAMSTERS).doc(id)
    const result = await docRef.delete()
    console.log('Result: ', result)
}



module.exports = { getAllHamsters, getOneHamster, addNewHamster, isHamsterObject, updateHamster, isHamsterUpdate, deleteHamster   }