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

export const costumesQueries = createQueryKeys('costumes', {
  getCostumes: (selectedSize) => ({
    queryKey: ['costumes'],
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

      const res = fetchCostumes(selectedSize);
      return {
        results: (await res).docs,
      };
    },
  }),
});
