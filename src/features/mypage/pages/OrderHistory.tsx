'use client';

import { useQuery } from '@tanstack/react-query';

import { OrderHistoryCard } from '../components/OrderHistoryCard';
import { ordersQueries } from '../queries/orders';

import { useAuthContext } from '@/AuthContext';
import { Header } from '@/components/Layout/Header';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const OrderHistory = () => {
  const { user } = useAuthContext()!;

  const { data, refetch } = useQuery({
    ...ordersQueries.getOrders({ user: user }),
  });
  const BeforeArrivalOrderData = data?.BeforeArrivalOrderData;
  const ArrivedOrderData = data?.ArrivedOrderData;
  const ReturnedOrderData = data?.ReturnedOrderData;

  return (
    <div>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <div className="mx-auto max-w-screen-2xl">
        <h1 className="text-2xl font-semibold mt-8  ml-2 lg:ml-56">注文履歴</h1>
        <Tabs defaultValue="before">
          <div className="lg:flex mt-8 space-x-8">
            <TabsList className="flex justify-center lg:ml-56 mx-2 ">
              <TabsTrigger value="before" className="w-52">
                到着前
              </TabsTrigger>
              <TabsTrigger value="after" className="w-52">
                到着済
              </TabsTrigger>
              <TabsTrigger value="return" className="w-52">
                返却済
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent
            value="before"
            className="h-screen mt-4 lg:ml-56 lg:mr-56"
          >
            {BeforeArrivalOrderData?.length != 0 ? (
              <div className="space-y-5 rounded-md">
                {BeforeArrivalOrderData?.map((order, index) => {
                  return (
                    <OrderHistoryCard
                      orderData={order}
                      refetch={refetch}
                      key={index}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center h-80">
                到着前の衣装はありません
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="after"
            className="h-screen mt-4 lg:ml-56 lg:mr-56"
          >
            {ArrivedOrderData?.length != 0 ? (
              <div className="space-y-5 rounded-md">
                {ArrivedOrderData?.map((order, index) => {
                  return (
                    <OrderHistoryCard
                      orderData={order}
                      refetch={refetch}
                      key={index}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center h-80">
                到着済の衣装はありません
              </div>
            )}
          </TabsContent>
          <TabsContent
            value="return"
            className="h-screen mt-4 lg:ml-56 lg:mr-56"
          >
            {ReturnedOrderData?.length != 0 ? (
              <div className="space-y-5 rounded-md">
                {ReturnedOrderData?.map((order, index) => {
                  return (
                    <OrderHistoryCard
                      orderData={order}
                      refetch={refetch}
                      key={index}
                    />
                  );
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center h-80">
                返却済の衣装はありません
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
