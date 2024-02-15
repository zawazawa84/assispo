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
import { costumeProps, orderProps, termToPrice } from '@/utils/enum';
import { format } from 'date-fns';
import { toast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { costumesQueries } from '../queries/costumes';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  term: z.string(),
});

export const CostumeOrder = () => {
  const { user, userData } = useAuthContext()!;
  const [checked, setChecked] = useState(false);
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
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    watch,
  } = useForm<orderProps>({ resolver: zodResolver(formSchema) });
  const rentalTerm = watch('term');

  const validateForm = handleSubmit(() => {
    // バリデーションは行うが、ここでは何もしない
  });

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
          className="object-cover cursor-pointer ml-4"
          onClick={() => router.push(pagesPath.costume.$url().path)}
        />
        <h1 className="text-2xl font-semibold ml-2">注文内容の確認</h1>
        {errors.term && (
          <p className="text-destructive ml-2">
            レンタル期間を選択してください
          </p>
        )}
        <div>
          <form className="lg:flex lg:space-x-8">
            <OrderTable
              errors={errors}
              costumeData={costumeData}
              userData={userData}
              control={control}
            />
            <div className="flex flex-col lg:w-100 h-64 p-4 lg:ml-4 space-y-8 lg:border border-[#dcdcdc] rounded-md lg:bg-[#f6f6f6]">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="h-16 bg-themeblue" onClick={validateForm}>
                    <p className="text-lg">注文を確定する</p>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[700px]">
                  <DialogHeader>
                    <DialogTitle>利用規約</DialogTitle>
                    <DialogDescription>
                      <ScrollArea className="h-[400px] text-left">
                        <br />
                        アシスポ（以下「当社」）は、新体操衣装を提供されるお客様（以下「提供者」）
                        より、お預かりした衣装について、以下のとおり慎重にお取り扱いいたします。
                        <br />
                        <br />
                        １．利用目的
                        <br />
                        当社は、提供者より提供された衣装を、以下の目的のために利用いたします。
                        <br />
                        <br />
                        ・レンタル依頼に対する、衣装レンタルのため
                        <br />
                        ・当社サービスの利用促進に対する、S N
                        Sでの宣伝やイベント会場等での展示や試着のため
                        <br />
                        <br />
                        ２．提供期間
                        <br />
                        提供者の申し出がない限り、当社への提供期間は無期限とします。
                        <br />
                        提供者より提供終了の申し出があった場合、申し出があった日から１０営業日以内に終了とします。
                        <br />
                        衣装レンタル中に、提供者より提供終了の申し出があった場合、レンタル終了後の返却とします。
                        <br />
                        当社が提供終了と判断した場合は、提供を終了し、提供者へ衣装を返却する事ができます。
                        <br />
                        <br />
                        ３．還元費
                        <br />
                        提供者の衣装がレンタルされた場合は、別途定める還元費を、当社より提供者へ支払います。
                        <br />
                        支払いの期日については、レンタル終了後、５営業日以内を目安とします。
                        <br />
                        支払いの方法は提供者の指定する金融機関口座への振込みによるものとします。
                        <br />
                        ただし、振込手数料は予め差し引かせていただきます。
                        <br />
                        <br />
                        ４．提供衣装の詳細情報
                        <br />
                        提供者は、提供する衣装について、当社が定める衣装詳細リストへ記載し、送付いただきます。
                        <br />
                        この情報
                        は、別途定める個人情報取扱いに関する同意書にて定めるとおり、適正に管理いたします。
                        <br />
                        <br />
                        ・衣装のサイズ（バスト、ウェスト、ヒップ、トルソーなど）
                        <br />
                        ・衣装の写真データ（アプリへの掲載用、衣装の状態確認用
                        <br />
                        <br />
                        ５．衣装の発送
                        <br />
                        提供者は当社に対し、レンタル開始日までに衣装を発送し、当社はレンタル終了日の５営業日以内に衣
                        装を提供者へ返却します。
                        <br />
                        <br />
                        ６．衣装の汚損や破損、滅失について
                        <br />
                        提供していただく衣装について、当社はレンタル前後で衣装の状態をできる限り変化させないように最
                        大限尽くす様努力いたしますが、レンタル者が衣装を着用する中で、以下の事例が起きる可能性がござ
                        います。
                        <br />
                        <br />
                        ・使用に伴う避けられない汚損や破損
                        <br />
                        ・汗、その他による汚れや匂いの付着
                        <br />
                        ・演技中や練習中による衣装の損傷、ほつれや破れ
                        <br />
                        ・スパンコールなど、装飾の剥離による紛失等
                        <br />
                        ・衣装の滅失（紛失、盗難を含む）
                        <br />
                        <br />
                        ７．衣装の手洗いについて
                        <br />
                        提供者は、提供する衣装の手洗い方法について、当社が定める衣装詳細リストへ記載し、送付いただき
                        ます。その際、衣装の手洗いについて、提供者にて対応するか、またはレンタル者にて対応するかの希
                        望も明記していただきます。
                        <br />
                        <br />
                        ８．衣装の滅失による弁償について
                        <br />
                        第６項に挙げた事例のうち、汚損や破損については、当社では弁償いたしかねますことをご了承いただ
                        けますようお願いいたします。
                        滅失の場合は、当社の故意または重大な過失によるときに限り、提供時の時価額を限度として弁償させていた
                        だきます。弁償に際しては、提供時の時価額を限度として行いますので、当社所定の衣装詳細リストへ、当社に
                        提供する時の時価額（わからない場合は購入価格、制作時の総費用額、経過年数）を記載し、送付いただきま
                        す。なお、提供時に時価額が高額であると当社が判断した場合は、提供を辞退させていただくことがござい
                        ます。
                        <br />
                        <br />
                        ９．不可抗力について
                        天災地変、火災、停電、暴動、騒乱、戦争その他の不可抗力による衣装の汚損や破損、滅失については、当社
                        は責任を負いかねます。
                      </ScrollArea>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="flex flex-col justify-between w-full space-y-4 lg:space-y-0">
                    <div className="flex items-center space-x-2">
                      <Checkbox onCheckedChange={() => setChecked(!checked)} />
                      <p>利用規約に同意する</p>
                    </div>
                    <Button
                      className="bg-themeblue"
                      disabled={!checked || isSubmitting}
                      type="submit"
                      onClick={onSubmit}
                    >
                      注文確定
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <p className="text-sm">基本料金</p>
                  <p className="text-sm">¥{costumeData.price}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-sm">レンタル料</p>
                  <p className="text-sm">¥{termToPrice(rentalTerm) ?? 0}</p>
                </div>
                <div className="flex justify-between pt-1 border-t border-themeblue">
                  <p>合計</p>
                  <p>
                    ¥
                    {Number(costumeData.price) +
                      (Number(termToPrice(rentalTerm)) || 0)}
                  </p>
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
