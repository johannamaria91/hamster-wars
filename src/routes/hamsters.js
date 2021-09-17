const express = require('express')
const router = express.Router()
//const { connect } = require('../database')
//const db = connect()
const { deleteDocument, getOne, findCutestHamster, getAllHamsters, addNewHamster, isHamsterObject, updateHamster, isHamsterUpdate } = require('../scripts/hamsterScripts')

const HAMSTERS = 'hamsters'

router.get('/', async (req, res) => {
    let hamsterArray = await getAllHamsters()
    //console.log(hamsterArray);
    res.send(hamsterArray)
})

router.get('/cutest', async (req, res) => {
    let cutestHamster = await findCutestHamster()
    console.log(cutestHamster)
    res.status(200).send(cutestHamster)
})

router.get('/random', async (req, res) => {
    let hamsterArray = await getAllHamsters()
    let maxValue = hamsterArray.length 
    let randomHamsterIndex = Math.floor(Math.random() * maxValue);
    let randomHamster = await getOne(hamsterArray[randomHamsterIndex].id, HAMSTERS)
    if (randomHamster.exists) { // behövs väl inte? eftersom den är baserad på längden på listan
                                // ska den väl alltid existera???
        const hamster = await randomHamster.data()
        res.send(hamster)
    } else {
        res.sendStatus(404)
    }
})

router.get('/:id', async (req, res) => {
    let maybeHamster = await getOne(req.params.id, HAMSTERS)
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
    let maybeHamster = await getOne(req.params.id, HAMSTERS)
    if (!maybeHamster.exists) {
        res.sendStatus(404)
    } else {
        const possibleHamster = req.body
    if (!isHamsterUpdate(possibleHamster)) {
        res.status(400).send('must send hamster update object.')
    }
    
    await updateHamster(req.params.id, possibleHamster)
    res.sendStatus(200)
    }
    

})

router.delete('/:id', async (req, res) => {
    let maybeHamster = await getOne(req.params.id, HAMSTERS)
    if (!maybeHamster.exists) {
        res.sendStatus(404)
    } else {
    //console.log(req.params)
    await deleteDocument(req.params.id, HAMSTERS)
    res.sendStatus(200)
    }

})

module.exports = router 