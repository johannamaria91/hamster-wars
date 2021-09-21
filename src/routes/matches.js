const express = require('express')
const router = express.Router()
const { deleteDocument, getOne, getAll, addNew } = require('../scripts/databaseFunctions')
const { isMatchObject } = require('../scripts/validation')

const MATCHES = 'matches'

router.get('/', async (req, res) => {
    let matchesArray = await getAll(MATCHES)
    res.send(matchesArray)
})

router.get('/:id', async (req, res) => {
    let maybeMatch = await getOne(req.params.id, MATCHES)
    if (maybeMatch.exists) {
        const match = await maybeMatch.data()
        res.send(match)
    } else {
        res.sendStatus(404)
    }
})

router.post('/', async (req, res) => {
    /* let hamsterArray = await getAllHamsters()
    let maxValue = hamsterArray.length 

    let randomHamsterIndex1 = Math.floor(Math.random() * maxValue);
    let randomHamster1 = await getOneHamster(hamsterArray[randomHamsterIndex1].id)
    const hamster1 = await randomHamster1.data()
   
    let randomHamsterIndex2 = Math.floor(Math.random() * maxValue);
    let randomHamster2 = await getOneHamster(hamsterArray[randomHamsterIndex2].id)
    const hamster2 = await randomHamster2.data() */

    // CREATE MATCH OBJECT: ???

   if( !isMatchObject(req.body) ) {
		res.status(400).send("that doesn't look like a match")
		return
	} 
    let addMatch = await addNew(req.body, MATCHES)
    res.status(200).send(addMatch)
})

router.delete('/:id', async (req, res) => {
    let maybeMatch = await getOne(req.params.id, MATCHES)
    if (!maybeMatch.exists) {
        res.sendStatus(404)
    } else {
    //console.log(req.params)
    await deleteDocument(req.params.id, MATCHES)
    res.sendStatus(200)
    }
})

module.exports = router 