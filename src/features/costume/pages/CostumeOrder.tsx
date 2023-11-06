'use client';

import { Button } from '@/components/ui/button';
import { OrderTable } from '../components/OrderTable';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { pagesPath } from '@/gen/$path';

export const CostumeOrder = () => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="h-screen space-y-8 mt-10 lg:ml-56 lg:mr-56">
        <Image
          alt=""
          src="/assispo_logo.png"
          width={140}
          height={10}
          className="object-cover "
        />
        <h1 className="text-2xl font-semibold">注文内容の確認</h1>
        <div className="lg:flex lg:space-x-8">
          <OrderTable />
          <div className="flex flex-col w-100 h-80 p-4 lg:ml-4 space-y-8 border border-[#dcdcdc] rounded-md bg-[#f6f6f6]">
            <Button
              className="h-16 bg-themeblue"
              onClick={() =>
                router.push(
                  pagesPath.costume
                    ._costumeId('1')
                    .order._orderId('1')
                    .complete.$url().path,
                )
              }
            >
              <p className="text-lg">注文を確定する</p>
            </Button>
            <div className="space-y-1">
              <div className="flex justify-between">
                <p className="text-sm">基本料金</p>
                <p className="text-sm">¥3,900</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">レンタル料</p>
                <p className="text-sm">¥1,200</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">送料</p>
                <p className="text-sm">¥0</p>
              </div>
              <div className="flex justify-between">
                <p className="text-sm">支払い手数料</p>
                <p className="text-sm">¥330</p>
              </div>
              <div className="flex justify-between pt-1 border-t border-themeblue">
                <p>合計</p>
                <p>¥5,430</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
