'use client';

import { pagesPath } from '@/gen/$path';
import { numberToSize } from '@/utils/enum';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CostumeItem = ({ costumeData }: { costumeData: DocumentData }) => {
  const router = useRouter();

  return (
    <div
      className="pt-4 relative"
      onClick={() => {
        router.push(pagesPath.costume._costumeId(costumeData.id).$url().path);
      }}
    >
      <div className="relative">
        <Image
          src={`/item3.png`}
          alt=""
          width={220}
          height={220}
          className="rounded-sm object-contain aspect-square bg-secondary hover:opacity-70 cursor-pointer"
        />
        {costumeData.content.isRented && (
          <span className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50 text-white rounded-sm">
            <p>貸出中</p>
          </span>
        )}
      </div>
      <h3 className="truncate text-sm max-w-[220px] mt-2">
        {costumeData.content.name}
      </h3>
      <h3 className="truncate text-xs max-w-[220px] text-slate-500">
        サイズ： {numberToSize(costumeData.content.size)}
      </h3>
    </div>
  );
};
