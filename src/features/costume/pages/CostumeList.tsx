import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { CostumeItem } from '../components/CostumeItem';
import { Input } from '@/components/ui/input';
import { Header } from '@/components/Layout/Header';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const CostumeList = () => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
        <Separator className="my-2" />
      </header>
      <Tabs defaultValue="item">
        <div className="flex mt-8 space-x-8">
          <TabsList className="ml-56">
            <TabsTrigger value="item" className="w-52">
              衣装
            </TabsTrigger>
            <TabsTrigger value="favorite" className="w-52">
              お気に入り
            </TabsTrigger>
          </TabsList>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="サイズを選ぶ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sizes</SelectLabel>
                <SelectItem value="apple">Child(~小学6年生)</SelectItem>
                <SelectItem value="banana">Junior(中学1~3年生)</SelectItem>
                <SelectItem value="blueberry">Senior(高校1年生~)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="item" className="mt-4 ml-56 mr-56">
          <h1 className="text-xl font-bold text-slate-500">衣装一覧</h1>
          <div className="grid grid-cols-5 gap-2">
            <CostumeItem imgUrl="item1" span="11月~12月" />
            <CostumeItem imgUrl="item2" span="10月~1月" />
            <CostumeItem imgUrl="item3" span="年中" />
            <CostumeItem imgUrl="item1" span="11月~1月" />
            <CostumeItem imgUrl="item2" span="1月~4月" />
            <CostumeItem imgUrl="item3" span="4月~7月" />
            <CostumeItem imgUrl="item1" span="8月~10月" />
            <CostumeItem imgUrl="item2" span="9月~3月" />
            <CostumeItem imgUrl="item3" span="3月~5月" />
            <CostumeItem imgUrl="item1" span="6月~1月" />
            <CostumeItem imgUrl="item2" span="2月~11月" />
            <CostumeItem imgUrl="item3" span="10月~3月" />
          </div>
        </TabsContent>
        <TabsContent value="favorite" className="mt-4 ml-56 mr-56">
          <h1 className="text-xl font-bold text-slate-500">お気に入り一覧</h1>
        </TabsContent>
      </Tabs>
    </>
  );
};
