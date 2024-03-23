'use client';

import { redirect } from 'next/navigation';

import { useAuthContext } from '@/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { CostumeOrder } from '@/features/costume/pages/CostumeOrder';

export default function CostumeOrderPage() {
  const { user, userData, isLoading } = useAuthContext()!;
  if (!isLoading) {
    if (!user) {
      toast({
        variant: 'destructive',
        title: '購入手続きに進むにはログインを行なってください',
      });
      redirect('/signin');
    }
    if (!user?.emailVerified) {
      toast({
        variant: 'destructive',
        title:
          '購入手続きに進むには認証メールからメールアドレスの認証を行ってください',
      });
      redirect('/mypage');
    }
    if (
      !(
        userData?.name &&
        userData.address &&
        userData.phoneNumber &&
        userData.birthday &&
        userData.club &&
        userData.size &&
        userData.email
      )
    ) {
      toast({
        variant: 'destructive',
        title: '購入手続きに進むには個人情報を登録してください',
      });
      redirect('/mypage');
    }
  }
  return <CostumeOrder />;
}
