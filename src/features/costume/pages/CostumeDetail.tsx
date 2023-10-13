'use client';

import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { pagesPath } from '@/gen/$path';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { InfoTable } from '../components/InfoTable';

export const CostumeDetail = () => {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <div className="flex h-screen mt-16 ml-56 mr-56 space-x-12">
        <div className="flex-shrink-0">
          <Image
            src={'/item3.png'}
            alt=""
            width={500}
            height={500}
            className="sticky top-36 z-10 object-contain aspect-[5/6] bg-secondary"
          />
        </div>
        <div className="w-108 pl-4 space-y-8">
          <h1 className="font-semibold text-xl text-slate-800">テスト衣装</h1>
          <div>
            <p className="text-sm text-slate-500">基本料金</p>
            <h1 className="text-3xl text-slate-800">
              <span className="text-base">¥</span>3,900
              <span className="text-base"> + レンタル期間に応じた金額</span>
            </h1>
          </div>
          <Button
            className="w-full bg-themeblue"
            onClick={() =>
              router.push(pagesPath.costume._costumeId('1').order.$url().path)
            }
          >
            購入手続きへ
          </Button>
          <div>
            <h1 className="font-semibold text-xl text-slate-800">商品情報</h1>
            <Separator className="my-2" />
            <InfoTable />
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
