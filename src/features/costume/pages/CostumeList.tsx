'use client';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore';
import InfiniteScroll from 'react-infinite-scroller';

import { CostumeItem } from '../components/CostumeItem';
import { costumesQueries } from '../queries/costumes';

import { useAuthContext } from '@/AuthContext';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const CostumeList = () => {
  const { user } = useAuthContext()!;

  const [costumeList, setCostumeList] = useState<
    QueryDocumentSnapshot<DocumentData>[]
  >([]);
  const [size, setSize] = useState('');
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData, DocumentData>>();

  const { data: favoriteCostumeData } = useQuery({
    ...costumesQueries.getFavoriteCostume({ userUid: user?.uid as string }),
    enabled: !!user?.uid,
  });
  const favoriteCostumes = favoriteCostumeData?.results.favoriteProducts;

  const { data: costumeData } = useQuery({
    ...costumesQueries.getCostumes({
      size: size,
      lastDoc: lastDoc,
    }),
  });
  const costumes = costumeData?.results;
  const hasMore = costumeData?.hasMore;

  const handleSizeChange = (event: any) => {
    setCostumeList([]);
    setLastDoc(undefined);
    setSize(event);
  };

  const loadMore = () => {
    setCostumeList((prev) => [...prev, ...costumes!]);
    setLastDoc(costumeData?.lastDoc);
  };

  if (!costumes) {
    return <Skeleton />;
  }

  return (
    <div>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <div className="mx-auto max-w-screen-2xl">
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
            {costumes ? (
              <InfiniteScroll
                hasMore={hasMore}
                loadMore={() => {
                  loadMore();
                }}
              >
                <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                  {costumeList?.map((costume, index) => {
                    const costumeData = {
                      id: costume.id,
                      content: costume.data(),
                    };
                    return (
                      <CostumeItem costumeData={costumeData} key={index} />
                    );
                  })}
                </div>
              </InfiniteScroll>
            ) : (
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                {Array.from({ length: 10 }).map((_, index) => (
                  <Skeleton
                    key={index}
                    className="mt-4 w-220 rounded-sm aspect-square"
                  />
                ))}
              </div>
            )}
          </TabsContent>
          <TabsContent value="favorite" className="mt-4 lg:ml-56 lg:mr-56 px-2">
            <h1 className="text-xl font-bold text-slate-500 px-2">
              お気に入り一覧
            </h1>
            {favoriteCostumes?.length != 0 ? (
              <div className="grid grid-cols-3 lg:grid-cols-5 gap-2">
                {favoriteCostumes?.map((favoriteCostume, index) => {
                  const costumeData = {
                    id: favoriteCostume.id,
                    content: favoriteCostume.data(),
                  };
                  return <CostumeItem costumeData={costumeData} key={index} />;
                })}
              </div>
            ) : (
              <div className="flex justify-center items-center h-80">
                お気に入りに登録されている衣装はありません
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
