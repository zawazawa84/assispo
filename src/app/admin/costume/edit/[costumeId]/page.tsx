'use client';
import { useAuthContext } from '@/AuthContext';
import { EditCostume } from '@/features/admin/pages/EditCostume';
import { redirect } from 'next/navigation';

export default function EditCostumePage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.uid != 'KpHHsoIJVXQzzKMKTAOXRyy9nqh2') {
    redirect('/costume');
  }

  return <EditCostume />;
}
