import { db } from '@/lib/firebase/sdk';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  DocumentData,
  Query,
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

const LIMIT = 20;

export const costumesQueries = createQueryKeys('costumes', {
  getCostumes: ({ size, lastDoc }) => ({
    queryKey: ['costumes', size, lastDoc],
    queryFn: async () => {
      let q;
      if (size) {
        q = query(collection(db, 'products'), where('size', '==', size));
      } else {
        q = query(collection(db, 'products'));
      }

      q = query(q, limit(LIMIT));
      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const querySnapshot = await getDocs(q);
      const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
      return {
        results: querySnapshot.docs,
        hasMore: querySnapshot.docs.length != 0,
        lastDoc: lastVisible,
      };
    },
  }),
});
