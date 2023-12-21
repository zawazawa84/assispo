/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from 'firebase-functions';

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
import * as admin from 'firebase-admin';
import { format, subDays } from 'date-fns';
admin.initializeApp();

const db = admin.firestore();

exports.scheduledFunction = functions.pubsub
  .schedule('every 1 minutes')
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const nowUtc = new Date();
    const nowJst = new Date(nowUtc.getTime() + 9 * 60 * 60 * 1000);

    const fourDaysAgo = subDays(nowJst, 4);
    const formattedDate = format(fourDaysAgo, 'yyyy.MM.dd');

    const snapshot = await db.collection('orders').get();
    const deletions: any[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data.date, formattedDate, nowJst);
      if (data.date == formattedDate) {
        deletions.push(doc.ref.delete());
      }
    });

    await Promise.all(deletions);
    return null;
  });
