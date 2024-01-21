import { Button } from '@/components/ui/button';
import { numberToSize } from '@/utils/enum';
import Image from 'next/image';

export const CostumeList = ({ costumeData }: any) => {
  return (
    <div>
      <div className="flex rounded border p-6 space-x-4">
        <div>
          <Image src={costumeData.image} alt="" width={200} height={200} />
        </div>
        <div className="space-y-4 w-96">
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">衣装名:</span> {costumeData.name}
          </p>
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">カテゴリ:</span>
            {costumeData.category}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">価格:</span> {costumeData.price}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">サイズ:</span>{' '}
            {numberToSize(costumeData.size)}
          </p>
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">状態:</span> {costumeData.state}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">洗濯:</span>{' '}
            {costumeData.washable == true ? '可' : '不可'}
          </p>
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">その他:</span> {costumeData.others}
          </p>
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">説明:</span>{' '}
            {costumeData.description}
          </p>
          <div className="space-x-4">
            <Button className="bg-themeblue" type="submit">
              衣装編集
            </Button>
            <Button
              variant="outline"
              className="border-destructive"
              type="submit"
            >
              <p className="text-destructive">衣装削除</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
