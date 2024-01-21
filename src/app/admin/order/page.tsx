'use client';
import { useAuthContext } from '@/AuthContext';
import { AdminOrder } from '@/features/admin/pages/AdminOrder';
import { redirect } from 'next/navigation';

export default function AdminOrderPage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.uid != 'ihNdA7V5umNojt4QMzrz6Zr2nUl1') {
    redirect('/costume');
  }

  return <AdminOrder />;
}