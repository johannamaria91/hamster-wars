const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 8090
const hamsterRouter = require('./routes/hamsters')
//const cutestRouter = require('./routes/cutest')
const matchesRouter = require('./routes/matches')
const {findWonMatches, findWinners, findLosers} = require('./scripts/hamsterScripts')

app.use( express.urlencoded({extended: true}) )
app.use( express.json() )
app.use( cors() ) 

app.use( '/', express.static(__dirname + '/../public') )
app.use( '/img', express.static(__dirname + '/../hamsters') )


app.use('/hamsters', hamsterRouter)
//app.use('/cutest', cutestRouter)
app.use('/matches', matchesRouter)

app.get('/matchWinners/:id', async (req, res) => {
    let wonMatches = await findWonMatches(req.params.id)
    console.log(wonMatches)
    if (wonMatches.length > 0) {
        res.status(200).send(wonMatches)
    } else {
        res.sendStatus(404)
    }
})

app.get('/winners', async (req, res) => {
    let winners = await findWinners()
    console.log(winners)
    res.status(200).send(winners)
})

app.get('/losers', async (req, res) => {
    let losers = await findLosers()
    console.log(losers)
    res.status(200).send(losers)
})

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})