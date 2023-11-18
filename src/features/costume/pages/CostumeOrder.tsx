'use client';

import { Button } from '@/components/ui/button';
import { OrderTable } from '../components/OrderTable';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { pagesPath } from '@/gen/$path';
import { useForm } from 'react-hook-form';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '@/lib/firebase/sdk';
import { useAuthContext } from '@/AuthContext';
import { orderProps } from '@/utils/enum';
import { format } from 'date-fns';

export const CostumeOrder = () => {
  const { user, userData } = useAuthContext()!;
  const router = useRouter();
  const params = useParams();

  const costumeId = params.costumeId as string;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<orderProps>();

  const onSubmit = handleSubmit(async (data) => {
    const currentDate = new Date();
    const ordersCollectionRef = collection(db, 'orders');
    await addDoc(ordersCollectionRef, {
      userId: user?.uid,
      date: format(currentDate, 'yyyy.MM.dd'),
      term: data.term,
      productcode: costumeId,
      fromAddress: data.fromAddress ?? 'アシスポ住所',
      toAddress: userData?.address,
      paymentMethod: data.paymentMethod,
      deliveryMethod: data.deliveryMethod ?? '1週間後',
      orderStatus: 1,
      returnStatus: 1,
    });
    router.push(
      pagesPath.costume._costumeId('1').order._orderId('1').complete.$url()
        .path,
    );
  });

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="h-screen space-y-8 mt-10 lg:ml-56 lg:mr-56">
        <Image
          alt=""
          src="/assispo_logo.png"
          width={140}
          height={10}
          className="object-cover cursor-pointer"
          onClick={() => router.push(pagesPath.costume.$url().path)}
        />
        <h1 className="text-2xl font-semibold">注文内容の確認</h1>
        <div>
          <form className="lg:flex lg:space-x-8" onSubmit={onSubmit}>
            <OrderTable
              register={register}
              userData={userData}
              control={control}
            />
            <div className="flex flex-col w-100 h-80 p-4 lg:ml-4 space-y-8 border border-[#dcdcdc] rounded-md bg-[#f6f6f6]">
              <Button className="h-16 bg-themeblue" type="submit">
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
          </form>
        </div>
      </div>
    </div>
  );
};
