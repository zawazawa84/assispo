import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import {
  changePaymentMethodFromEnglish,
  numberToOrderStatus,
  numberToSize,
  orderHistoryProps,
  termToPrice,
} from '@/utils/enum';
import Image from 'next/image';

export const OrderHistoryCard = ({
  orderData,
}: {
  orderData: orderHistoryProps;
}) => {
  return (
    <Card className="px-4 pt-4 border rounded-md">
      <CardHeader>
        <h1 className="text-xl pb-4 border-b border-[#dcdcdc]">
          {numberToOrderStatus(orderData.orderStatus)}
        </h1>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around">
          <Image
            src={`/item3.png`}
            alt=""
            width={150}
            height={220}
            className="rounded-sm object-contain aspect-square bg-secondary"
          />
          <div className="w-2/5 space-y-3 pl-5">
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
              {orderData.term}
            </p>
            <p className="text-sm">
              <span className="text-[#989898]">基本料金 : </span>¥
              {orderData.price}
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <p>
                <span className="text-[#989898]">注文日&emsp; :</span> 2023.9.28
              </p>
              <p>
                <span className="text-[#989898]">注文番号 :</span> 0000000000
              </p>
            </div>
            <div className="space-y-2">
              <Button className="w-full bg-themeblue">
                <p>注文詳細</p>
              </Button>
              <Button
                variant="outline"
                className="w-full border-themeblue"
                disabled={true}
              >
                <p className="text-themeblue">商品到着を確認</p>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex w-full pt-6 space-x-5 border-t border-[#dcdcdc]">
          <p>
            <span className="text-[#989898]">合計金額 :</span> ¥
            {Number(orderData.price) + termToPrice(orderData.term)!}{' '}
            <span className="text-[#989898]">
              (基本料金 + レンタル期間料 + 配達手数料)
            </span>
          </p>
          <p>
            <span className="text-[#989898]">支払い方法 :</span>{' '}
            {changePaymentMethodFromEnglish(orderData.paymentMethod)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};
