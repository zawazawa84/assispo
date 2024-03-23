'use client';
import { redirect } from 'next/navigation';

import { useAuthContext } from '@/AuthContext';
import { EditCostume } from '@/features/admin/pages/EditCostume';

export default function EditCostumePage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.email != 'taiki84taiki@gmail.com') {
    redirect('/costume');
  }

  return <EditCostume />;
}
