const express = require('express')
const app = express()
const PORT = 8090
const hamsterRouter = require('./routes/hamsters')
const cutestRouter = require('./routes/cutest')

app.use( express.urlencoded({extended: true}) )
app.use( express.json() )

app.use( '/', express.static(__dirname + '/../public') )
app.use( '/img', express.static(__dirname + '/../hamsters') )


app.use('/hamsters', hamsterRouter)
app.use('/cutest', cutestRouter)


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})