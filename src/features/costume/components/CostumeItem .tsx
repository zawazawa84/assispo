import Image from 'next/image';

export const CostumeItem = () => {
  return (
    <div className="pt-4 relative">
      <Image
        src={
          'https://images.unsplash.com/photo-1615247001958-f4bc92fa6a4a?w=300&dpr=2&q=80'
        }
        alt=""
        width={220}
        height={220}
        className="rounded-sm object-cover aspect-square"
      />
      <span className="absolute top-2 left-2 bg-white px-2 py-1 rounded text-sm shadow-md">
        ¥10,000
      </span>
      <h3 className="truncate text-sm max-w-[220px] mt-2">
        テストdjvbailbfibdwijbcijabwkfjcnl
      </h3>
    </div>
  );
};
