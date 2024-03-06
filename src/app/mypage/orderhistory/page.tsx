'use client';

import { useAuthContext } from '@/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { OrderHistory } from '@/features/mypage/pages/OrderHistory';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserOrderHistoryPage() {
  const { user, isLoading } = useAuthContext()!;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user == undefined) {
        toast({
          variant: 'destructive',
          title: '注文履歴へ進むにはログインを行なってください',
        });
        router.push('/signin');
      }
    }
  }, [user, isLoading, router]);
  return <OrderHistory />;
}
