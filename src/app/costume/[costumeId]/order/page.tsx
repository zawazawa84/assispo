'use client';
import { useAuthContext } from '@/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { CostumeOrder } from '@/features/costume/pages/CostumeOrder';
import { redirect } from 'next/navigation';

export default function CostumeOrderPage() {
  const { userData } = useAuthContext()!;
  if (!userData?.address) {
    redirect('/mypage');
  }
  return <CostumeOrder />;
}
