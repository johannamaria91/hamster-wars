const admin = require("firebase-admin");

const serviceAccount = require("./secrets/hamster-wars-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});