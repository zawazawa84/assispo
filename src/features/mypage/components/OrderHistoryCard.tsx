'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { doc, updateDoc } from 'firebase/firestore';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { pagesPath } from '@/gen/$path';
import { db } from '@/lib/firebase/sdk';
import { addDaysToDate } from '@/utils/date';
import {
  numberToOrderStatus,
  numberToReturnStatus,
  numberToSize,
  orderHistoryProps,
  orderStatusProps,
  returnStatusProps,
  termToNumber,
  termToPrice,
  termToString,
} from '@/utils/enum';

export const OrderHistoryCard = ({
  orderData,
  refetch,
}: {
  orderData: orderHistoryProps;
  refetch: any;
}) => {
  const router = useRouter();
  const queryClient = useQueryClient();

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
    <Card className="lg:px-4">
      <CardHeader>
        <div className="flex pb-4 border-b border-[#dcdcdc] justify-between items-center">
          <h1 className="text-xl">
            {orderData.returnStatus == returnStatusProps.default
              ? numberToOrderStatus(
                  orderData.isCanceled
                    ? orderStatusProps.isCanceled
                    : orderData.orderStatus,
                )
              : numberToReturnStatus(orderData.returnStatus)}
          </h1>
          <Button
            variant="outline"
            size="sm"
            className="border-themeblue lg:mt-0"
            onClick={() =>
              router.push(
                pagesPath.bank._orderId(orderData.orderId).$url().path,
              )
            }
          >
            <p className="text-themeblue">お支払い情報はこちら</p>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="lg:flex lg:mx-6 justify-between">
          <div className="flex">
            <Image
              src={orderData.image as unknown as string}
              alt=""
              width={150}
              height={220}
              className="rounded-sm object-contain aspect-square bg-secondary"
            />
            <div className="space-y-3 ml-4 lg:ml-12">
              <p>{orderData.name}</p>
              <p className="text-sm">
                <span className="text-[#989898]">サイズ : </span>
                {numberToSize(orderData.size)}
              </p>
              <p className="text-sm">
                <span className="text-[#989898]">洗濯 : </span>{' '}
                {orderData.washable ? '可' : '不可'}
              </p>
              <p className="text-sm">
                <span className="text-[#989898]">レンタル期間 : </span>
                {termToString(orderData.term)}
              </p>
              <p className="text-sm">
                <span className="text-[#989898]">基本料金 : </span>¥
                {orderData.price}
              </p>
            </div>
          </div>
          <div className="space-y-4 mt-6 pt-4 border-t lg:mt-0 lg:border-none lg:pt-0">
            <div>
              <p>
                <span className="text-[#989898]">注文日&emsp; :</span>{' '}
                {String(orderData.orderDate)}
              </p>
              <p>
                <span className="text-[#989898]">注文番号 :</span>{' '}
                {orderData.orderId}
              </p>
            </div>
            <div className="space-y-2">
              <Button
                className="w-full bg-themeblue"
                onClick={() =>
                  router.push(
                    pagesPath.costume._costumeId(orderData.productcode).$url()
                      .path,
                  )
                }
              >
                <p>衣装詳細</p>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-destructive"
                    disabled={
                      orderData.orderStatus != orderStatusProps.unpaid ||
                      orderData.isCanceled == true
                    }
                  >
                    <p className="text-destructive">ご注文の取り消し</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>注文を取り消しますか？</DialogTitle>
                  </DialogHeader>
                  <DialogFooter className="flex flex-col space-y-2 lg:space-y-0 justify-end">
                    <DialogClose asChild>
                      <Button className="bg-destructive" onClick={cancelOrder}>
                        取消
                      </Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button variant="outline">キャンセル</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        {orderData.comment && (
          <div className="p-2 mt-4 bg-secondary rounded-lg text-gray-700">
            <p className="text-sm ">
              <span className="font-semibold ">
                アシスポからのコメント
                <br />
              </span>{' '}
              {orderData.comment}
            </p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="lg:flex w-full pt-6 lg:space-x-5 border-t border-[#dcdcdc]">
          <p>
            <span className="text-[#989898]">合計金額 : </span> ¥
            {Number(orderData.price) + termToPrice(orderData.term)!}{' '}
            <span className="text-[#989898]">
              (基本料金 + レンタル期間料 ※配送料除く)
            </span>
          </p>
          {orderData.returnStatus == returnStatusProps.default ? (
            <p>
              <span className="text-[#989898]">振込期限 :</span>{' '}
              {addDaysToDate({
                dateStr: orderData.orderDate,
                days: 3,
              })}
            </p>
          ) : (
            <p>
              <span className="text-[#989898]">返却期限 :</span>{' '}
              {addDaysToDate({
                dateStr: orderData.arrivalDate,
                days: termToNumber(orderData.term) as number,
              })}
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};
