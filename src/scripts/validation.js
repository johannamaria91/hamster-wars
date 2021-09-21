function isHamsterUpdate(possibleHamster) {
    if ((typeof possibleHamster) !== 'object') {
        return false
    }
    let keys = Object.keys(possibleHamster)
    if (keys.includes('name') || keys.includes('imgName') || keys.includes('age') || keys.includes('loves') || keys.includes('wins') || keys.includes('games') || keys.includes('favFood' || keys.includes('defeats'))) {
        return true
    } else {
        return false
    }

    // kontrollera att possibleHamster.name etc har rimliga värden ?? 
}

async function isMatchObject(possibleMatch) {
    if ((typeof possibleMatch) !== 'object') {
        return false
    }
    let keys = Object.keys(possibleMatch)
    if (!keys.includes('winnerId') || !keys.includes('loserId')) {
        return false
    }

    // kontrollera att possibleMatch.winnerId etc har rimliga värden ?? 
    /* let maybeHamster1 = await getOneHamster(req.params.winnerId)
     let maybeHamster2 = await getOneHamster(req.params.loserId)
     if (!maybeHamster1.exists || !maybeHamster2.exists) {
         res.status(400).send('not a proper match object')
     }
 */
    return true
} 

function isHamsterObject(possibleHamster) {
    if ((typeof possibleHamster) !== 'object') {
        return false
    }
    let keys = Object.keys(possibleHamster)
    if (!keys.includes('name') || !keys.includes('imgName') || !keys.includes('age') || !keys.includes('loves') || !keys.includes('wins') || !keys.includes('games') || !keys.includes('favFood' || !keys.includes('defeats'))) {
        return false
    }

    // kontrollera att possibleHamster.name etc har rimliga värden ?? 

    return true

}

module.exports = { isHamsterObject, isMatchObject, isHamsterUpdate }