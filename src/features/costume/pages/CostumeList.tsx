'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CostumeItem } from '../components/CostumeItem';
import { Header } from '@/components/Layout/Header';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DocumentData,
  Query,
  QueryDocumentSnapshot,
  collection,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/lib/firebase/sdk';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export const CostumeList = () => {
  const [size, setSize] = useState('');
  const [costumes, setCostumes] =
    useState<QueryDocumentSnapshot<DocumentData>[]>();

  const fetchCostumes = async (selectedSize: any) => {
    let q: Query<DocumentData>;

    if (selectedSize) {
      q = query(collection(db, 'products'), where('size', '==', selectedSize));
    } else {
      q = query(collection(db, 'products'));
    }

    const querySnapshot = await getDocs(q);
    setCostumes(querySnapshot?.docs);
  };

  useEffect(() => {
    fetchCostumes(size);
  }, [size]);

  const handleSizeChange = (event: any) => {
    setSize(event);
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <Tabs defaultValue="item">
        <div className="lg:flex mt-8 lg:space-x-8">
          <TabsList className="lg:ml-56">
            <TabsTrigger value="item" className="lg:w-52">
              衣装
            </TabsTrigger>
            <TabsTrigger value="favorite" className="lg:w-52">
              お気に入り
            </TabsTrigger>
          </TabsList>
          <Select onValueChange={handleSizeChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="サイズを選ぶ" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sizes</SelectLabel>
                <SelectItem value="1">Child(~小学6年生)</SelectItem>
                <SelectItem value="2">Junior(中学1~3年生)</SelectItem>
                <SelectItem value="3">Senior(高校1年生~)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <TabsContent value="item" className="mt-4 lg:ml-56 lg:mr-56">
          <h1 className="text-xl font-bold text-slate-500">衣装一覧</h1>
          <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
            {costumes?.map((costume, index) => {
              return <CostumeItem costume={costume} key={index} />;
            })}
          </div>
        </TabsContent>
        <TabsContent value="favorite" className="mt-4 lg:ml-56 lg:mr-56">
          <h1 className="text-xl font-bold text-slate-500">お気に入り一覧</h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};
