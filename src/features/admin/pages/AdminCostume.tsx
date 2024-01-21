'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { pagesPath } from '@/gen/$path';
import { useQuery } from '@tanstack/react-query';
import { costumesQueries } from '@/features/costume/queries/costumes';
import { CostumeList } from '../components/CostumeList';

export const AdminCostume = () => {
  const router = useRouter();

  const { data } = useQuery({
    ...costumesQueries.getAllCostumes(),
  });
  const costumes = data?.results;

  return (
    <div className="mx-auto max-w-screen-2xl p-4 space-y-8">
      <h1 className="text-4xl font-bold mt-4">管理画面</h1>
      <div className="flex items-center justify-between mt-4">
        <h1 className="text-xl font-bold text-slate-500 ">衣装管理</h1>
        <div className="space-x-4">
          <Button
            className="bg-themeblue"
            onClick={() =>
              router.push(pagesPath.admin.costume.register.$url().path)
            }
          >
            衣装の登録
          </Button>
          <Button
            className="bg-themeblue"
            onClick={() => router.push(pagesPath.admin.order.$url().path)}
          >
            注文管理
          </Button>
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {costumes?.map((costume, index) => (
          <CostumeList costumeData={costume.data()} key={index} />
        ))}
      </div>
    </div>
  );
};
