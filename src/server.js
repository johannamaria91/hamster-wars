const express = require('express')
const app = express()
const PORT = 8090

app.use( '/', express.static(__dirname + '/../public') )
app.use( '/img', express.static(__dirname + '/../hamsters') )

app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}.`);
})