'use client';

import { useAuthContext } from '@/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { MyPage } from '@/features/mypage/pages/MyPage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function UserPage() {
  const { user } = useAuthContext()!;
  const router = useRouter();

  useEffect(() => {
    if (user == undefined) {
      return;
    }
    if (!user) {
      toast({
        variant: 'destructive',
        title: 'マイページへ進むにはログインを行なってください',
      });
      router.push('/signin');
    }
  }, [user, router]);

  return <MyPage />;
}
