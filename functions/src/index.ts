// Import function triggers from their respective submodules:

// import {onCall} from "firebase-functions/v2/https";
import { onDocumentCreated } from 'firebase-functions/v2/firestore';

import { onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = onRequest((request, response) => {
  logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

export const makeUppercase = onDocumentCreated(
  '/places/{documentId}',
  (event) => {
    // Grab the current value of what was written to Firestore.
    const original = event.data?.data().original;

    // Access the parameter `{documentId}` with `event.params`
    logger.log('Uppercasing', event.params.documentId, original);

    const uppercase = original.toUpperCase();

    // You must return a Promise when performing
    // asynchronous tasks inside a function
    // such as writing to Firestore.
    // Setting an 'uppercase' field in Firestore document returns a Promise.
    return event.data?.ref.set({ uppercase }, { merge: true });
  },
);
