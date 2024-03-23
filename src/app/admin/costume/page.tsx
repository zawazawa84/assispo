'use client';
import { redirect } from 'next/navigation';

import { useAuthContext } from '@/AuthContext';
import { AdminCostume } from '@/features/admin/pages/AdminCostume';

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
