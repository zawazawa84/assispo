import { db } from '@/lib/firebase/sdk';
import { doc, updateDoc } from 'firebase/firestore';

interface changeStatusProps {
  orderId: string;
  status: number;
}

export const updateStatus = async ({ orderId, status }: changeStatusProps) => {
  const docRef = doc(db, 'orders', orderId);
  await updateDoc(docRef, { orderStatus: status });
};
