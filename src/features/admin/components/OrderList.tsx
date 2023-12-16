import { Button } from '@/components/ui/button';
import { orderHistoryProps } from '@/utils/enum';

export const OrderList = ({ orderData }: { orderData: orderHistoryProps }) => {
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
          {orderData.orderStatus}
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
          <Button className="bg-themeblue">注文ステータス</Button>
          <Button variant="outline" className="border-themeblue">
            <p className="text-themeblue">コメントの変更</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
