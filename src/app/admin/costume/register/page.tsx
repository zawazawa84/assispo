'use client';
import { useAuthContext } from '@/AuthContext';
import { RegisterCostume } from '@/features/admin/pages/RegisterCostume';
import { redirect } from 'next/navigation';

export default function RegisterCostumePage() {
  const { user } = useAuthContext()!;
  if (!user) {
    return <div>403 Forbidden</div>;
  }

  if (user?.uid != 'QbU9prxVaQfB8QH9Nx4U1jtlq052') {
    redirect('/costume');
  }

  return <RegisterCostume />;
}
