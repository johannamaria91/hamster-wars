const { connect } = require('../database')
const db = connect()

const HAMSTERS = 'hamsters'

clear();

async function clear() {
    const hamstersRef = db.collection(HAMSTERS)
    const hamstersSnapshot = await hamstersRef.get()
    
    if (hamstersSnapshot.empty) {
        return 
    }

    hamstersSnapshot.forEach(docRef => {
        hamstersRef.doc(docRef.id).delete()
    })
}