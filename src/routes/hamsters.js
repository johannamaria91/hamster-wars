const express = require('express')
const router = express.Router()
const { deleteDocument, getOne, findCutestHamster, getAll, addNew, updateHamster } = require('../scripts/databaseFunctions')
const { isHamsterObject, isHamsterUpdate } = require('../scripts/validation')
const HAMSTERS = 'hamsters'

router.get('/', async (req, res) => {
    let hamsterArray = await getAll(HAMSTERS)
    //console.log(hamsterArray);
    res.send(hamsterArray)
})

router.get('/cutest', async (req, res) => {
    let cutestHamster = await findCutestHamster()
    console.log(cutestHamster)
    res.status(200).send(cutestHamster)
})

router.get('/random', async (req, res) => {
    let hamsterArray = await getAll(HAMSTERS)
    let maxValue = hamsterArray.length 
    console.log(`max value: ${maxValue}`)
    let randomHamsterIndex = Math.floor(Math.random() * maxValue);
    console.log(`random hamster index: ${randomHamsterIndex}`)
    let randomHamster = hamsterArray[randomHamsterIndex]
    console.log(`random hamster: ${randomHamster}`)
    res.send(randomHamster)
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
    let addHamster = await addNew(req.body, HAMSTERS)
    res.status(200).send(addHamster)
})

router.put('/:id', async (req, res) => {
    let maybeHamster = await getOne(req.params.id, HAMSTERS)
    if (!maybeHamster.exists) {
        res.sendStatus(404)
    } else {
        const possibleHamster = req.body
        //console.log(isHamsterUpdate(possibleHamster))
    if (!isHamsterUpdate(possibleHamster)) {
        res.status(400).send('must send hamster update object.')
    } else {
        await updateHamster(req.params.id, possibleHamster)
        res.sendStatus(200)
        }
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