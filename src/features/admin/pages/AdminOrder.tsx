'use client';
import { useQuery } from '@tanstack/react-query';
import { OrderList } from '../components/OrderList';
import { ordersQueries } from '@/features/mypage/queries/orders';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { pagesPath } from '@/gen/$path';

export const AdminOrder = () => {
  const router = useRouter();
  const { data, refetch } = useQuery({ ...ordersQueries.getAllOrders() });
  const orderData = data?.results;

  return (
    <div className="mx-auto max-w-screen-2xl p-4 space-y-8">
      <h1 className="text-4xl font-bold mt-4">管理画面</h1>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-bold text-slate-500 ">注文管理</h1>
        <Button
          className="bg-themeblue"
          onClick={() => router.push(pagesPath.admin.costume.$url().path)}
        >
          衣装管理
        </Button>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {orderData?.map((order, index) => (
          <OrderList orderData={order} refetch={refetch} key={index} />
        ))}
      </div>
    </div>
  );
};
