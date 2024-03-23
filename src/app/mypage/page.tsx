'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { useAuthContext } from '@/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { MyPage } from '@/features/mypage/pages/MyPage';

export default function UserPage() {
  const { user, isLoading } = useAuthContext()!;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        toast({
          variant: 'destructive',
          title: 'マイページへ進むにはログインを行なってください',
        });
        router.push('/signin');
      }
    }
  }, [user, isLoading, router]);

  return <MyPage />;
}
