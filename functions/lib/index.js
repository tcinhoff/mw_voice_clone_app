"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onUserCreated = exports.helloWorld = void 0;
const https_1 = require("firebase-functions/v2/https");
const firestore_1 = require("firebase-functions/v2/firestore");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();
// Example HTTP function
exports.helloWorld = (0, https_1.onRequest)((request, response) => {
    response.send('Hello from Firebase Functions!');
});
// Example Firestore trigger - runs when a new document is created in 'users' collection
exports.onUserCreated = (0, firestore_1.onDocumentCreated)('users/{userId}', async (event) => {
    const snapshot = event.data;
    if (!snapshot) {
        console.log('No data associated with the event');
        return;
    }
    const userData = snapshot.data();
    console.log('New user created:', event.params.userId, userData);
    // Example: Add a welcome message or perform other actions
    await db.collection('notifications').add({
        userId: event.params.userId,
        message: 'Welcome to the app!',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
});
//# sourceMappingURL=index.js.map