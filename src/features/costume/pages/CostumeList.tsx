import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { CostumeItem } from '../components/CostumeItem ';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Layout/Header';

export const CostumeList = () => {
  return (
    <>
      <Tabs defaultValue="item">
        <header className="sticky top-0 z-10 bg-white">
          <Header />
          <TabsList className="flex justify-start pl-32 ">
            <TabsTrigger value="item" className="w-52">
              衣装
            </TabsTrigger>
            <TabsTrigger value="favorite" className="w-52">
              お気に入り
            </TabsTrigger>
          </TabsList>
        </header>
        <TabsContent value="item" className="mt-4 ml-32 mr-24">
          <h1 className="text-xl font-bold text-slate-500">衣装一覧</h1>
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
