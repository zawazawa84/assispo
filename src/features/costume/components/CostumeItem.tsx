'use client';

import { pagesPath } from '@/gen/$path';
import { numberToSize } from '@/utils/enum';
import { DocumentData } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CostumeItem = ({ costume }: { costume: DocumentData }) => {
  const router = useRouter();
  const costumeData = costume.data();

  return (
    <div
      className="pt-4 relative"
      onClick={() => {
        router.push(pagesPath.costume._costumeId('1').$url().pathname);
      }}
    >
      <Image
        src={`/item3.png`}
        alt=""
        width={220}
        height={220}
        className="rounded-sm object-contain aspect-square bg-secondary"
      />
      <h3 className="truncate text-sm max-w-[220px] mt-2">
        {costumeData.name}
      </h3>
      <h3 className="truncate text-xs max-w-[220px] text-slate-500">
        サイズ： {numberToSize(costumeData.size)}
      </h3>
    </div>
  );
};
