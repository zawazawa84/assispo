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
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { costumesQueries } from '../queries/costumes';
import InfiniteScroll from 'react-infinite-scroller';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';

export const CostumeList = () => {
  const [costumeList, setCostumeList] = useState<
    QueryDocumentSnapshot<DocumentData, DocumentData>[]
  >([]);
  const [size, setSize] = useState('');
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const { data } = useQuery({
    ...costumesQueries.getCostumes({
      size: size,
      lastDoc: lastDoc,
    }),
  });
  const costumes = data?.results;
  const hasMore = data?.hasMore;

  const handleSizeChange = (event: any) => {
    setCostumeList([]);
    setLastDoc(undefined);
    setSize(event);
  };

  const loadMore = () => {
    setCostumeList((prev) => [...prev, ...costumes!]);
    setLastDoc(data?.lastDoc);
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <Tabs defaultValue="item">
        <div className="lg:flex mt-8 lg:space-x-8">
          <TabsList className="flex justify-center lg:ml-56 mx-2 ">
            <TabsTrigger value="item" className="lg:w-52 w-44">
              衣装
            </TabsTrigger>
            <TabsTrigger value="favorite" className="lg:w-52 w-44">
              お気に入り
            </TabsTrigger>
          </TabsList>
          <div className="flex justify-end">
            <Select onValueChange={handleSizeChange}>
              <SelectTrigger className="w-48 mx-2 mt-4 lg:mt-0">
                <SelectValue placeholder="サイズを選ぶ" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sizes</SelectLabel>
                  <SelectItem value="0">指定しない</SelectItem>
                  <SelectItem value="1">Child(~小学6年生)</SelectItem>
                  <SelectItem value="2">Junior(中学1~3年生)</SelectItem>
                  <SelectItem value="3">Senior(高校1年生~)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <TabsContent value="item" className="mt-4 lg:ml-56 lg:mr-56 px-2">
          <h1 className="text-xl font-bold text-slate-500 px-2">衣装一覧</h1>
          <InfiniteScroll
            hasMore={hasMore}
            loadMore={() => {
              loadMore();
            }}
          >
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
              {costumeList?.map((costume, index) => {
                const costumeData = { id: costume.id, content: costume.data() };
                return <CostumeItem costumeData={costumeData} key={index} />;
              })}
            </div>
          </InfiniteScroll>
        </TabsContent>
        <TabsContent value="favorite" className="mt-4 lg:ml-56 lg:mr-56 px-2">
          <h1 className="text-xl font-bold text-slate-500 px-2">
            お気に入り一覧
          </h1>
        </TabsContent>
      </Tabs>
    </div>
  );
};
