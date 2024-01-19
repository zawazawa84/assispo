'use client';
import { useAuthContext } from '@/AuthContext';
import { Admin } from '@/features/admin/pages/Admin';
import { redirect } from 'next/navigation';

export default function AdminPage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.uid != 'ihNdA7V5umNojt4QMzrz6Zr2nUl1') {
    redirect('/costume');
  }

  return <Admin />;
}
