const { connect } = require('../database')
const db = connect()

const HAMSTERS = 'hamsters'
const MATCHES = 'matches'

clear(HAMSTERS);
clear(MATCHES);

async function clear(collection) {
    const collectionRef = db.collection(collection)
    const collectionSnapshot = await collectionRef.get()
    
    if (collectionSnapshot.empty) {
        return 
    }

    collectionSnapshot.forEach(docRef => {
        collectionRef.doc(docRef.id).delete()
    })
}