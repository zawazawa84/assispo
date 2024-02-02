'use client';
import { useAuthContext } from '@/AuthContext';
import { EditCostume } from '@/features/admin/pages/EditCostume ';
import { redirect } from 'next/navigation';

export default function EditCostumePage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.uid != 'QbU9prxVaQfB8QH9Nx4U1jtlq052') {
    redirect('/costume');
  }

  return <EditCostume />;
}
