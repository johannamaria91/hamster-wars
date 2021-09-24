function isHamsterUpdate(possibleHamster) {

    let keys = Object.keys(possibleHamster)
    let numberKeys = ['age', 'wins', 'games', 'defeats']
    let stringKeys = ['name', 'imgName', 'loves', 'favFood']

    if ((typeof possibleHamster) !== 'object') {
        return false
    }

    console.log(keys)
    if (keys.includes('name') || keys.includes('imgName') || keys.includes('age') || keys.includes('loves') || keys.includes('wins') || keys.includes('games') || keys.includes('favFood' || keys.includes('defeats'))) {
        
        let trueOrFalse = keys.every(key => {
            if (numberKeys.includes(key) && typeof possibleHamster[key] === 'number') {
                console.log(`key: ${key}.. ${typeof possibleHamster[key]}.. `)
                return true
            } else if (stringKeys.includes(key) && typeof possibleHamster[key] === 'string') {
                console.log(`key: ${key}.. ${typeof possibleHamster[key]}.. `)
                return true 
            } else {
                console.log(`key: ${key}.. ${typeof possibleHamster[key]}.. `)
                return false
            }
        })
        

        /* let trueOrFalse;
        keys.forEach(key => {
            if (numberKeys.includes(key) && typeof possibleHamster[key] === 'number') {
                trueOrFalse = true
            } else if (stringKeys.includes(key) && typeof possibleHamster[key] === 'string') {
                trueOrFalse = true
            } else {
                trueOrFalse = false
            }
        }) */
        console.log(trueOrFalse)
        if (trueOrFalse) {
            return true
        }
    } else {
        return false
    }
}

function isMatchObject(possibleMatch) {
    if ((typeof possibleMatch) !== 'object') {
        return false
    }
    let keys = Object.keys(possibleMatch)
    if (!keys.includes('winnerId') || !keys.includes('loserId')) {
        return false
    } else {
        let trueOrFalse = keys.every(key => {
            if (typeof possibleMatch[key] === 'string') {
                console.log(`key: ${key}.. ${typeof possibleMatch[key]}.. `)
                return true
        } else {
            console.log(`key: ${key}.. ${typeof possibleMatch[key]}.. `)
            return false
        }
    })
    console.log(trueOrFalse)
    if (trueOrFalse) {
        return true
    }
}
}

function isHamsterObject(possibleHamster) {
    if ((typeof possibleHamster) !== 'object') {
        return false
    }
    let keys = Object.keys(possibleHamster)
    let numberKeys = ['age', 'wins', 'games', 'defeats']
    let stringKeys = ['name', 'imgName', 'loves', 'favFood']

    if (!keys.includes('name') || !keys.includes('imgName') || !keys.includes('age') || !keys.includes('loves') || !keys.includes('wins') || !keys.includes('games') || !keys.includes('favFood') || !keys.includes('defeats')) {
        return false
    } else {
        let trueOrFalse = keys.every(key => {
            if (numberKeys.includes(key) && typeof possibleHamster[key] === 'number') {
                console.log(`key: ${key}.. ${typeof possibleHamster[key]}.. `)
                return true
            } else if (stringKeys.includes(key) && typeof possibleHamster[key] === 'string') {
                console.log(`key: ${key}.. ${typeof possibleHamster[key]}.. `)
                return true 
            } else {
                console.log(`key: ${key}.. ${typeof possibleHamster[key]}.. `)
                return false
            }
        })
        console.log(trueOrFalse)
        if (trueOrFalse) {
            return true
        }
    }
}

module.exports = { isHamsterObject, isMatchObject, isHamsterUpdate }