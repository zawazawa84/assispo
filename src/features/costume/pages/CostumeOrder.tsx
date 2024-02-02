'use client';

import { Button } from '@/components/ui/button';
import { OrderTable } from '../components/OrderTable';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { pagesPath } from '@/gen/$path';
import { useForm } from 'react-hook-form';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/sdk';
import { useAuthContext } from '@/AuthContext';
import { costumeProps, orderProps } from '@/utils/enum';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { costumesQueries } from '../queries/costumes';

export const CostumeOrder = () => {
  const { user, userData } = useAuthContext()!;
  const router = useRouter();
  const params = useParams();

  const costumeId = params.costumeId as string;

  const { data } = useQuery({
    ...costumesQueries.getCostumeDetail({
      costumeId: costumeId,
    }),
  });
  const costumeData = data?.results as costumeProps;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
  } = useForm<orderProps>();

  const onSubmit = handleSubmit(async (data) => {
    const costumeRef = doc(db, 'products', costumeId);
    const costumeSnap = await getDoc(costumeRef);
    if (costumeSnap.exists()) {
      if (costumeSnap.data().isRented) {
        toast({
          variant: 'destructive',
          title: 'この商品はすでにレンタルされています',
        });
        return;
      }
    }

    const currentDate = new Date();
    const ordersCollectionRef = collection(db, 'orders');
    const orderRef = await addDoc(ordersCollectionRef, {
      userId: user?.uid,
      date: format(currentDate, 'yyyy.MM.dd'),
      term: data.term,
      productcode: costumeId,
      fromAddress: data.fromAddress ?? 'アシスポ住所',
      toAddress: userData?.address,
      comment: '',
      orderStatus: 1,
      returnStatus: 1,
      isCanceled: false,
    });
    await updateDoc(doc(db, 'products', costumeId), {
      isRented: true,
    });
    router.push(
      pagesPath.costume
        ._costumeId(costumeId)
        .order._orderId(orderRef.id)
        .complete.$url().path,
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
        <h1 className="text-2xl font-semibold px-2">注文内容の確認</h1>
        <div>
          <form className="lg:flex lg:space-x-8" onSubmit={onSubmit}>
            <OrderTable
              register={register}
              costumeData={costumeData}
              userData={userData}
              control={control}
            />
            <div className="flex flex-col lg:w-100 h-64 p-4 lg:ml-4 space-y-8 lg:border border-[#dcdcdc] rounded-md lg:bg-[#f6f6f6]">
              <Button
                className="h-16 bg-themeblue"
                type="submit"
                disabled={isSubmitting}
              >
                <p className="text-lg">注文を確定する</p>
              </Button>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-sm">基本料金</p>
                  <p className="text-sm">¥{costumeData.price}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">レンタル料</p>
                  <p className="text-sm">¥1,200</p>
                </div>
                <div className="flex justify-between pt-1 border-t border-themeblue">
                  <p>合計</p>
                  <p>¥5,430</p>
                </div>
                <p className="text-xs pt-2">
                  ※銀行振込完了後に衣装発送となります
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
