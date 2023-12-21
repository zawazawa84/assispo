import { useAuthContext } from '@/AuthContext';
import { db } from '@/lib/firebase/sdk';
import {
  costumeProps,
  orderHistoryProps,
  orderProps,
  returnStatusProps,
} from '@/utils/enum';
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
  getOrder: ({ user, orderId }) => ({
    queryKey: ['orders', user],
    queryFn: async () => {
      const q = query(
        collection(db, 'orders'),
        where('userId', '==', `${user?.uid}`),
      );

      const orderQuerySnapshot = await getDocs(q);

      const orderData = orderQuerySnapshot.docs
        .find((doc) => doc.id === orderId)
        ?.data();

      const docRef = doc(db, 'products', `${orderData?.productcode}`);
      const costumeDocSnap = await getDoc(docRef);
      const newOrderData = {
        ...(costumeDocSnap.data() as costumeProps),
        ...(orderData as orderProps),
      };

      return { result: newOrderData };
    },
  }),
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
      const BeforeArrivalOrderData = orderData.filter(
        (order) =>
          order.returnStatus !== returnStatusProps.renting &&
          order.returnStatus !== returnStatusProps.returnProcedure &&
          order.returnStatus !== returnStatusProps.returned,
      );
      const ArrivedOrderData = orderData.filter(
        (order) =>
          order.returnStatus === returnStatusProps.renting ||
          order.returnStatus === returnStatusProps.returnProcedure,
      );
      const ReturnedOrderData = orderData.filter(
        (order) => order.returnStatus === returnStatusProps.returned,
      );

      return {
        BeforeArrivalOrderData,
        ArrivedOrderData,
        ReturnedOrderData,
      };
    },
  }),
  getAllOrders: () => ({
    queryKey: ['orders'],
    queryFn: async () => {
      const q = collection(db, 'orders');

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
