import { db } from '@/lib/firebase/sdk';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  DocumentData,
  Query,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

const LIMIT = 20;

export const costumesQueries = createQueryKeys('costumes', {
  getCostumes: ({ size, page }) => ({
    queryKey: ['costumes', size],
    queryFn: async () => {
      const fetchCostumes = async (selectedSize: any) => {
        let q: Query<DocumentData>;

        if (selectedSize) {
          q = query(
            collection(db, 'products'),
            where('size', '==', selectedSize),
          );
        } else {
          q = query(collection(db, 'products'));
        }

        const querySnapshot = await getDocs(q);

        return querySnapshot;
      };

      const res = fetchCostumes(size);
      return {
        results: (await res).docs,
        hasMore: (await res).docs.length > page * LIMIT,
      };
    },
  }),
});
