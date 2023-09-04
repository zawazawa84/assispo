import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { CostumeItem } from '../components/CostumeItem ';
import { ScrollArea } from '@/components/ui/scroll-area';

export const CostumeList = () => {
  return (
    <>
      <Tabs defaultValue="item">
        <TabsList className="flex justify-start pl-32 sticky top-0 z-10">
          <TabsTrigger value="item" className="w-[200px]">
            商品
          </TabsTrigger>
          <TabsTrigger value="favorite" className="w-[200px]">
            お気に入り
          </TabsTrigger>
        </TabsList>
        <TabsContent value="item" className="mt-4 ml-32 mr-24">
          <h1 className="text-xl font-bold text-slate-500">商品一覧</h1>
          <div className="grid grid-cols-5 gap-2">
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
            <CostumeItem />
          </div>
        </TabsContent>
        <TabsContent value="favorite" className="mt-4 ml-32 mr-24">
          <h1 className="text-xl font-bold text-slate-500">お気に入り一覧</h1>
        </TabsContent>
      </Tabs>
    </>
  );
};
