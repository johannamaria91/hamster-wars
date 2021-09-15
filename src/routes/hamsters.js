const express = require('express')
const router = express.Router()
const { connect } = require('../database')
const db = connect()

const HAMSTERS = 'hamsters'

router.get('/', async (req, res) => {
    let hamsterArray = await getAllHamsters()
    console.log(hamsterArray);
    res.send(hamsterArray)
})

router.get('/:id', async (req, res) => {
    let maybeHamster = await getOneHamster(req.params.id)
    if (maybeHamster.exists) {
        const hamster = await maybeHamster.data()
        res.send(hamster)
    } else {
        res.sendStatus(404)
    }
})

router.post('/', async (req, res) => {
    if( !isHamsterObject(req.body) ) {
		res.status(400).send("doesn't look like a hamster, sorry")
		return
	}
    let addHamster = await addNewHamster(req.body)
    res.status(200).send(addHamster)
})

router.put('/:id', async (req, res) => {
    const possibleHamster = req.body
    if (!isHamsterUpdate(possibleHamster)) {
        res.status(400).send('must send hamster update object.')
    }
    
    await updateHamster(req.params.id, possibleHamster)
    res.sendStatus(200)

})

router.delete('/:id', async (req, res) => {
    console.log(req.params)
    await deleteHamster(req.params.id)
    res.sendStatus(200)

})

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

module.exports = router 