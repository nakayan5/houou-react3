// const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

const sendResponse = (response, statusCode, body) => {
    response.send({
        statusCode,
        body: JSON.stringify(body)
    });
};

exports.addDataset = functions.https.onRequest(async (req, res) => {
    if (req.method !== 'POST') {
        sendResponse(res, 405, {error: 'Invalid Response'})
    } else {
        const dataset = req.body;
        for (const key of Object.keys(dataset)) {
            const data = dataset[key]
            await db.collection('items').doc(key).set(data)  // key = items, data = {}, {}...
        }
        // const data = dataset[key];
        // await db.collection('products').doc(key).set(data)
        sendResponse(res, 200, {message: 'Successfly added dataset'})
    }
});