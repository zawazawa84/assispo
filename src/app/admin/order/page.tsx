'use client';
import { redirect } from 'next/navigation';

import { useAuthContext } from '@/AuthContext';
import { AdminOrder } from '@/features/admin/pages/AdminOrder';

export default function AdminOrderPage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.email != 'taiki84taiki@gmail.com') {
    redirect('/costume');
  }

  return <AdminOrder />;
}
