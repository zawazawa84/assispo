'use client';
import { useAuthContext } from '@/AuthContext';
import { RegisterCostume } from '@/features/admin/pages/RegisterCostume';
import { redirect } from 'next/navigation';

export default function RegisterCostumePage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.uid != 'KpHHsoIJVXQzzKMKTAOXRyy9nqh2') {
    redirect('/costume');
  }

  return <RegisterCostume />;
}
