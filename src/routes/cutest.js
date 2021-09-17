/* const express = require('express')
const router = express.Router()
const { getAllHamsters } = require('../scripts/hamsterScripts')

router.get('/cutest', async (req, res) => {
    let cutestHamster = await findCutestHamster()
    console.log(cutestHamster)
    res.send(cutestHamster)
})

// FIND CUTEST HAMSTER 
async function findCutestHamster() {
    let hamsterArray = await getAllHamsters()
    let newHamsterArray = [];
    let percentage;
    let cutestHamster = [];
    let highestPercentage;
    hamsterArray.forEach(hamster => {
        if (hamster.games > 0) { //om den inte spelat behöver den inte jämföras med de andra
            percentage = hamster.wins / hamster.games * 100 
            hamster.perc = percentage //lägga till egenskap för hamstrarna (%)
            newHamsterArray.push(hamster) //lägga till hamstern i en ny array
            if (highestPercentage !== hamster.perc) { 
                highestPercentage = Math.max(...newHamsterArray.map(hamster => hamster.perc)) //kolla vilken hamster i den nya arrayen som har högst procent vunna matcher
                if (hamster.perc === highestPercentage) {
                    cutestHamster = [hamster]; //om den har högre procent ska den ersätta den nuvarande
                }
            } else { //om den har lika hög procent som den högsta ska den inte ersättas utan läggas till
                cutestHamster.push(hamster)
            }
        }
    });
    console.log(newHamsterArray)
    if (newHamsterArray.length < 1) { //om ingen har spelat vinner alla <3
        return "All hamsters are equally cute"
    }

    newHamsterArray.forEach(hamster => { //ta bort procenten från objekten igen
        delete hamster.perc
    })
    return cutestHamster
}





module.exports = router */