'use client';

import { pagesPath } from '@/gen/$path';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CostumeItem = ({
  imgUrl,
  span,
}: {
  imgUrl: string;
  span: string;
}) => {
  const router = useRouter();
  return (
    <div
      className="pt-4 relative"
      onClick={() =>
        router.push(pagesPath.costume._costumeId('1').$url().pathname)
      }
    >
      <Image
        src={`/${imgUrl}.png`}
        alt=""
        width={220}
        height={220}
        className="rounded-sm object-contain aspect-square bg-secondary"
      />
      <h3 className="truncate text-sm max-w-[220px] mt-2">
        テストdjvbailbfibdwijbcijabwkfjcnl
      </h3>
    </div>
  );
};
