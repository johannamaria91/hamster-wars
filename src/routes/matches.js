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