import Image from 'next/image';

export const CostumeItem = ({
  imgUrl,
  span,
}: {
  imgUrl: string;
  span: string;
}) => {
  return (
    <div className="pt-4 relative">
      <Image
        src={`/${imgUrl}.png`}
        alt=""
        width={220}
        height={220}
        className="rounded-sm object-contain aspect-square bg-secondary"
      />
      <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm shadow-md">
        {span}
      </span>
      <h3 className="truncate text-sm max-w-[220px] mt-2">
        テストdjvbailbfibdwijbcijabwkfjcnl
      </h3>
    </div>
  );
};
