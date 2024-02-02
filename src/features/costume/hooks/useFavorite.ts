import { useAuthContext } from '@/AuthContext';
import { db } from '@/lib/firebase/sdk';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from 'firebase/firestore';

export const useFavorite = () => {
  const { user } = useAuthContext()!;
  const queryClient = useQueryClient();

  const result = useMutation(
    async ({ productId }: { productId: string }) => {
      const favoriteProductsCollectionRef = collection(db, 'favoriteProducts');
      const q = query(
        favoriteProductsCollectionRef,
        where('userId', '==', user?.uid),
        where('productId', '==', productId),
      );

      const querySnapshot = await getDocs(q);
      if (querySnapshot.docs.length > 0) {
        querySnapshot.docs.forEach(async (document) => {
          await deleteDoc(doc(db, 'favoriteProducts', document.id));
        });
      } else {
        await addDoc(favoriteProductsCollectionRef, {
          userId: user?.uid,
          productId: productId,
        });
      }
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['favoriteProducts']);
      },
    },
  );
  return result;
};
