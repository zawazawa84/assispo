import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase/sdk';
import queryClient from '@/lib/react-query';
import { numberToOrderStatus, orderHistoryProps } from '@/utils/enum';
import { doc, updateDoc } from 'firebase/firestore';

export const OrderList = ({
  orderData,
  refetch,
}: {
  orderData: orderHistoryProps;
  refetch: any;
}) => {
  const OrderStatusButton = ({ orderStatus }: { orderStatus: number }) => {
    if (orderStatus == 1) {
      return (
        <Button
          className="bg-themeblue"
          onClick={async () => {
            await updateDoc(doc(db, 'orders', orderData.orderId), {
              orderStatus: 2,
            });
            refetch();
          }}
        >
          配達処理を開始
        </Button>
      );
    } else if (orderStatus == 2 || orderStatus == 3) {
      return (
        <Button
          className="bg-themeblue"
          disabled={orderStatus == 3 ? true : false}
          onClick={async () => {
            await updateDoc(doc(db, 'orders', orderData.orderId), {
              orderStatus: 3,
            });
            refetch();
          }}
        >
          配達処理完了
        </Button>
      );
    }
  };

  return (
    <div>
      <div className="rounded border p-6">
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">注文日</span>{' '}
          {orderData.date as unknown as string}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">ユーザーID</span> {orderData.userId}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">商品コード:</span>{' '}
          {orderData.productcode}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">レンタル期間:</span> {orderData.term}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">注文ステータス:</span>{' '}
          {numberToOrderStatus(orderData.orderStatus)}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">返却ステータス:</span>{' '}
          {orderData.returnStatus}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">配送先:</span> {orderData.toAddress}
        </p>
        <p className="text-gray-700 text-base mb-4">
          <span className="font-semibold">コメント:</span> {orderData.comment}
        </p>
        <div className="space-x-4">
          <OrderStatusButton orderStatus={orderData.orderStatus} />
          <Button variant="outline" className="border-themeblue">
            <p className="text-themeblue">コメントの変更</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
