import { onRequest } from 'firebase-functions/v2/https';
import { onDocumentCreated } from 'firebase-functions/v2/firestore';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();

// Example HTTP function
export const helloWorld = onRequest((request, response) => {
  response.send('Hello from Firebase Functions!');
});

// Example Firestore trigger - runs when a new document is created in 'users' collection
export const onUserCreated = onDocumentCreated('users/{userId}', async (event) => {
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
