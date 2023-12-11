import { useAuthContext } from '@/AuthContext';
import { db } from '@/lib/firebase/sdk';
import { costumeProps, orderHistoryProps, orderProps } from '@/utils/enum';
import { createQueryKeys } from '@lukemorales/query-key-factory';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';

export const ordersQueries = createQueryKeys('orders', {
  getOrders: ({ user }) => ({
    queryKey: ['orders', user],
    queryFn: async () => {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', `${user?.uid}`),
      );

      const orderQuerySnapshot = await getDocs(q);

      const orderData: orderHistoryProps[] = await Promise.all(
        orderQuerySnapshot.docs.map(async (order) => {
          const docRef = doc(db, 'products', `${order.data().productcode}`);
          const costumeDocSnap = await getDoc(docRef);
          return {
            orderId: order.id,
            ...(costumeDocSnap.data() as costumeProps),
            ...(order.data() as orderProps),
          };
        }),
      );
      return {
        results: orderData,
      };
    },
  }),
});