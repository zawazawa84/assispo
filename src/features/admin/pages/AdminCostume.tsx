'use client';

import { useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';

import { CostumeList } from '../components/CostumeList';

import { Button } from '@/components/ui/button';
import { costumesQueries } from '@/features/costume/queries/costumes';
import { pagesPath } from '@/gen/$path';

export const AdminCostume = () => {
  const router = useRouter();

  const { data, refetch } = useQuery({
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
            衣装登録
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
        {costumes?.map((costume, index) => {
          const costumeData = {
            id: costume.id,
            content: costume.data(),
          };
          return (
            <CostumeList
              costumeData={costumeData}
              key={index}
              refetch={refetch}
            />
          );
        })}
      </div>
    </div>
  );
};
