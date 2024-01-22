import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { db } from '@/lib/firebase/sdk';
import { numberToSize } from '@/utils/enum';
import { deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';

export const CostumeList = ({ costumeData, refetch }: any) => {
  const deleteCostume = async () => {
    await deleteDoc(doc(db, 'products', costumeData.id));
    refetch();
    toast({ title: '衣装を削除しました' });
  };

  return (
    <div>
      <div className="flex rounded border p-6 space-x-4">
        <div>
          <Image
            src={costumeData.content.image}
            alt=""
            width={200}
            height={200}
          />
        </div>
        <div className="space-y-4 w-96">
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">衣装名:</span>{' '}
            {costumeData.content.name}
          </p>
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">カテゴリ:</span>
            {costumeData.content.category}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">価格:</span>{' '}
            {costumeData.content.price}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">サイズ:</span>{' '}
            {numberToSize(costumeData.content.size)}
          </p>
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">状態:</span>{' '}
            {costumeData.content.state}
          </p>
          <p className="text-gray-700 text-base">
            <span className="font-semibold">洗濯:</span>{' '}
            {costumeData.content.washable == true ? '可' : '不可'}
          </p>
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">その他:</span>{' '}
            {costumeData.content.others}
          </p>
          <p className="text-gray-700 text-base whitespace-nowrap overflow-hidden text-ellipsis">
            <span className="font-semibold">説明:</span>{' '}
            {costumeData.content.description}
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
              <p className="text-destructive" onClick={deleteCostume}>
                衣装削除
              </p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
