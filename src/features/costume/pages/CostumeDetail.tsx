'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import { useQuery } from '@tanstack/react-query';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';

import { InfoTable } from '../components/InfoTable';
import { useFavorite } from '../hooks/useFavorite';
import { costumesQueries } from '../queries/costumes';

import { useAuthContext } from '@/AuthContext';
import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { pagesPath } from '@/gen/$path';
import { costumeProps } from '@/utils/enum';

export const CostumeDetail = () => {
  const { user } = useAuthContext()!;

  const router = useRouter();
  const params = useParams();

  const costumeId = params.costumeId as string;

  const { data } = useQuery({
    ...costumesQueries.getCostumeDetail({
      costumeId: costumeId,
    }),
  });
  const costumeData = data?.results as costumeProps;

  const { data: favoriteCostumeData, refetch } = useQuery({
    ...costumesQueries.getFavoriteCostume({ userUid: user?.uid as string }),
    enabled: !!user?.uid,
  });
  const favoriteCostumesId =
    favoriteCostumeData?.results.favoriteProductsIdList;
  const isFavorite = favoriteCostumesId?.includes(costumeId);

  const { mutateAsync } = useFavorite();

  return (
    <div>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <div className="mx-auto max-w-screen-2xl">
        <div className="lg:flex h-screen mt-16 lg:ml-56 lg:mr-56 lg:space-x-12 ">
          <div className="flex-shrink-0">
            <Image
              src={costumeData?.image as unknown as string}
              alt=""
              width={500}
              height={500}
              className="sticky top-36 object-contain aspect-[5/6] bg-secondary"
            />
          </div>
          <div className="lg:w-108 px-4 space-y-6">
            <div className="space-y-6">
              <h1 className="font-semibold text-xl text-slate-800 pt-4">
                {costumeData?.name}
              </h1>
              <div>
                <p className="text-sm text-slate-500">基本料金</p>
                <h1 className="text-3xl text-slate-800 whitespace-nowrap">
                  <span className="text-base">¥</span>
                  {costumeData?.price}
                  <span className="text-base"> + レンタル期間に応じた金額</span>
                </h1>
              </div>
              <button
                onClick={async () => {
                  await mutateAsync({ productId: costumeId });
                  refetch();
                }}
              >
                <div className="flex flex-col items-center space-y-2">
                  {isFavorite ? (
                    <FaHeart style={{ fontSize: 32, color: '#FF929C' }} />
                  ) : (
                    <FaRegHeart style={{ fontSize: 32 }} />
                  )}
                  <h1 className="text-xs">お気に入り</h1>
                </div>
              </button>
            </div>
            <Button
              className="w-full bg-themeblue"
              disabled={costumeData?.isRented}
              onClick={() =>
                router.push(
                  pagesPath.costume._costumeId(costumeId).order.$url().path,
                )
              }
            >
              {costumeData?.isRented ? 'レンタル中' : '購入手続きへ'}
            </Button>
            <div>
              <h1 className="font-semibold text-xl text-slate-800">商品情報</h1>
              <Separator className="my-2" />
              <InfoTable costume={costumeData} />
            </div>
            <div>
              <h1 className="font-semibold text-xl text-slate-800">商品説明</h1>
              <Separator className="my-2" />
              <p>{costumeData?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
