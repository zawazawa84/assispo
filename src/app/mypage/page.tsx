'use client';

import { useAuthContext } from '@/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { MyPage } from '@/features/mypage/pages/MyPage';
import { redirect } from 'next/navigation';

export default function UserPage() {
  const { user } = useAuthContext()!;
  if (!user) {
    toast({
      variant: 'destructive',
      title: 'マイページに進むにはログインを行なってください',
    });
    redirect('/signin');
  }
  return <MyPage />;
}
