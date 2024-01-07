import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase/sdk';
import queryClient from '@/lib/react-query';
import {
  numberToOrderStatus,
  orderHistoryProps,
  orderStatusProps,
} from '@/utils/enum';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

export const OrderList = ({
  orderData,
  refetch,
}: {
  orderData: orderHistoryProps;
  refetch: any;
}) => {
  const [editable, setEditable] = useState(false);

  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
  } = useForm<{ comment: string }>();

  const updateComment = handleSubmit(async (data) => {
    await updateDoc(doc(db, 'orders', `${orderData.orderId}`), {
      comment: data.comment,
    });
    setEditable(false);
    refetch();
    toast({ title: 'コメントを更新しました' });
  });

  const cancelOrder = async () => {
    const orderDocRef = doc(db, 'orders', orderData.orderId);
    await updateDoc(orderDocRef, { isCanceled: true });
    const costumeDocRef = doc(db, 'products', orderData.productcode);
    await updateDoc(costumeDocRef, { isRented: false });
    queryClient.invalidateQueries(['costumes']);
    refetch();
    toast({ title: '注文を取り消しました' });
  };

  return (
    <form onSubmit={updateComment}>
      <div className="rounded border p-6 space-y-4">
        <p className="text-gray-700 text-base">
          <span className="font-semibold">注文日</span>{' '}
          {orderData.date as unknown as string}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">ユーザーID</span> {orderData.userId}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">商品コード:</span>{' '}
          {orderData.productcode}
        </p>
        <p className="text-gray-700 text-base">
          <span className="font-semibold">レンタル期間:</span> {orderData.term}
        </p>
        <p className="flex items-center space-x-2 text-gray-700 text-base">
          <span className="font-semibold">注文ステータス:</span>{' '}
          <Select
            defaultValue={String(
              orderData.isCanceled
                ? orderStatusProps.isCanceled
                : orderData.orderStatus,
            )}
          >
            <SelectTrigger className="w-48">
              <SelectValue placeholder="サイズを選ぶ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">キャンセル済</SelectItem>
                <SelectItem value="1">代金未払い</SelectItem>
                <SelectItem value="2">配達処理中</SelectItem>
                <SelectItem value="3">配達中</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </p>
        <p className="flex items-center space-x-2 text-gray-700 text-base ">
          <span className="font-semibold">返却ステータス:</span>{' '}
          <Select defaultValue={String(orderData.returnStatus)}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="サイズを選ぶ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">未選択</SelectItem>
                <SelectItem value="2">レンタル中</SelectItem>
                <SelectItem value="3">返却手続き済</SelectItem>
                <SelectItem value="4">返却済</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </p>
        <p className="text-gray-700 text-base ">
          <span className="font-semibold">配送先:</span> {orderData.toAddress}
        </p>
        <p className="flex items-center space-x-2 text-gray-700 text-base whitespace-nowrap">
          <span className="font-semibold">コメント:</span>{' '}
          {!editable ? (
            orderData.comment
          ) : (
            <Input className="w-full" {...register('comment')} />
          )}
        </p>
        <div className="space-x-4">
          {!editable ? (
            <Button
              variant="outline"
              className="border-themeblue"
              onClick={(e) => {
                e.preventDefault();
                setEditable((prev) => !prev);
              }}
            >
              <p className="text-themeblue">コメントの変更</p>
            </Button>
          ) : (
            <Button className="bg-themeblue" type="submit">
              コメントの保存
            </Button>
          )}
          <Button
            variant="outline"
            className="border-destructive"
            disabled={orderData.isCanceled == true}
            onClick={cancelOrder}
          >
            <p className="text-destructive">ご注文の取り消し</p>
          </Button>
        </div>
      </div>
    </form>
  );
};
