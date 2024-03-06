'use client';
import { useAuthContext } from '@/AuthContext';
import { AdminCostume } from '@/features/admin/pages/AdminCostume';
import { redirect } from 'next/navigation';

export default function AdminCostumePage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.email != 'taiki84taiki@gmail.com') {
    redirect('/costume');
  }

  return <AdminCostume />;
}
