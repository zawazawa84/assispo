'use client';

import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { pagesPath } from '@/gen/$path';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { InfoTable } from '../components/InfoTable';
import { useEffect, useState } from 'react';
import { DocumentData, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/sdk';
import { costumeProps } from '@/utils/enum';

export const CostumeDetail = () => {
  const [costume, setCostume] = useState<costumeProps>();
  const router = useRouter();
  const params = useParams();

  const costumeId = params.costumeId as string;

  useEffect(() => {
    const fetchCostume = async () => {
      if (costumeId) {
        const docRef = doc(db, 'products', `${costumeId}`);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCostume(docSnap.data() as costumeProps);
        } else {
          console.log('エラー');
        }
      }
    };
    fetchCostume();
  }, [costumeId]);

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <div className="lg:flex h-screen mt-16 lg:ml-56 lg:mr-56 lg:space-x-12">
        <div className="flex-shrink-0">
          <Image
            src={'/item3.png'}
            alt=""
            width={500}
            height={500}
            className="sticky top-36 object-contain aspect-[5/6] bg-secondary"
          />
        </div>
        <div className="lg:w-108 lg:pl-4 space-y-8">
          <h1 className="font-semibold text-xl text-slate-800">
            {costume?.name}
          </h1>
          <div>
            <p className="text-sm text-slate-500">基本料金</p>
            <h1 className="text-3xl text-slate-800">
              <span className="text-base">¥</span>
              {costume?.price}
              <span className="text-base"> + レンタル期間に応じた金額</span>
            </h1>
          </div>
          <Button
            className="w-full bg-themeblue"
            onClick={() =>
              router.push(
                pagesPath.costume._costumeId(costumeId).order.$url().path,
              )
            }
          >
            購入手続きへ
          </Button>
          <div>
            <h1 className="font-semibold text-xl text-slate-800">商品情報</h1>
            <Separator className="my-2" />
            <InfoTable costume={costume} />
          </div>
          <div>
            <h1 className="font-semibold text-xl text-slate-800">商品説明</h1>
            <Separator className="my-2" />
            <p>テスト</p>
          </div>
        </div>
      </div>
    </div>
  );
};
