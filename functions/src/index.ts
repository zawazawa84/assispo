/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import * as functions from "firebase-functions";

// Start writing functions
// https://firebase.google.com/docs/functions/typescript
import * as admin from "firebase-admin";
import {format, subDays} from "date-fns";
admin.initializeApp();

const db = admin.firestore();

exports.scheduledFunction = functions.pubsub
  .schedule("every 1 minutes")
  .timeZone("Asia/Tokyo")
  .onRun(async () => {
    const nowUtc = new Date();
    const nowJst = new Date(nowUtc.getTime() + 9 * 60 * 60 * 1000);

    const fourDaysAgo = subDays(nowJst, 4);
    const formattedDate = format(fourDaysAgo, "yyyy.MM.dd");

    const orderSnapshot = await db
      .collection("orders")
      .where("orderStatus", "==", 1)
      .get();
    const updates: any[] = [];
    orderSnapshot.forEach((doc) => {
      const data = doc.data();
      console.log(data.date, formattedDate, nowJst);
      if (data.date == formattedDate) {
        const productRef = db.collection("products").doc(data.productcode);
        updates.push(productRef.update({isRented: false}));
        updates.push(doc.ref.update({isCanceled: true}));
      }
    });

    await Promise.all(updates);
    return null;
  });
