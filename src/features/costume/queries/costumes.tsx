import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

import { db } from '@/lib/firebase/sdk';

const LIMIT = 20;

export const costumesQueries = createQueryKeys('costumes', {
  getAllCostumes: () => ({
    queryKey: ['costumes'],
    queryFn: async () => {
      const querySnapshot = await getDocs(query(collection(db, 'products')));
      return {
        results: querySnapshot.docs,
      };
    },
  }),
  getCostumes: ({ size, lastDoc }) => ({
    queryKey: ['costumes', size, lastDoc],
    queryFn: async () => {
      let q;
      if (size) {
        q =
          size == '0'
            ? query(collection(db, 'products'))
            : query(collection(db, 'products'), where('size', '==', size));
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
  getFavoriteCostume: ({ userUid }: { userUid: string }) => ({
    queryKey: ['favoriteProducts', userUid],
    queryFn: async () => {
      const favoriteProductsCollectionRef = collection(db, 'favoriteProducts');
      const q = query(
        favoriteProductsCollectionRef,
        where('userId', '==', userUid),
      );

      const favoriteProductsIdList = (await getDocs(q)).docs.map(
        (doc) => doc.data().productId,
      );
      const favoriteProducts = await Promise.all(
        favoriteProductsIdList.map(async (productId) => {
          const docRef = doc(db, 'products', productId);
          const docSnap = await getDoc(docRef);
          return docSnap;
        }),
      );

      return {
        results: { favoriteProducts, favoriteProductsIdList },
      };
    },
  }),
  getCostumeDetail: ({ costumeId }: { costumeId: string }) => ({
    queryKey: ['costumes'],
    queryFn: async () => {
      const docRef = doc(db, 'products', `${costumeId}`);
      const docSnap = await getDoc(docRef);
      return {
        results: docSnap.data(),
      };
    },
  }),
});
