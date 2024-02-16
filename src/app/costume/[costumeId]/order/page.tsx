'use client';
import { useAuthContext } from '@/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { CostumeOrder } from '@/features/costume/pages/CostumeOrder';
import { redirect } from 'next/navigation';

export default function CostumeOrderPage() {
  const { userData } = useAuthContext()!;
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
    toast({ variant: 'destructive', title: '個人情報を登録してください' });
    redirect('/mypage');
  }
  return <CostumeOrder />;
}
