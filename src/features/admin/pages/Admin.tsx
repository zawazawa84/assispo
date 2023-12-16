'use client';
import { useQuery } from '@tanstack/react-query';
import { OrderList } from '../components/OrderList';
import { ordersQueries } from '@/features/mypage/queries/orders';

export const Admin = () => {
  const { data, refetch } = useQuery({ ...ordersQueries.getAllOrders() });
  const orderData = data?.results;

  return (
    <div className="mx-auto max-w-screen-2xl p-4">
      <div className="grid lg:grid-cols-2 gap-4">
        {orderData?.map((order, index) => (
          <OrderList orderData={order} refetch={refetch} key={index} />
        ))}
      </div>
    </div>
  );
};
