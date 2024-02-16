import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { pagesPath } from '@/gen/$path';
import { db } from '@/lib/firebase/sdk';
import { numberToSize } from '@/utils/enum';
import { deleteDoc, doc } from 'firebase/firestore';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const CostumeList = ({ costumeData, refetch }: any) => {
  const router = useRouter();

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
            <Button
              className="bg-themeblue"
              type="submit"
              onClick={() =>
                router.push(
                  pagesPath.admin.costume.edit._costumeId(costumeData.id).$url()
                    .path,
                )
              }
            >
              衣装編集
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-destructive">
                  <p className="text-destructive">衣装削除</p>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <DialogHeader>
                  <DialogTitle>注文を取り消しますか？</DialogTitle>
                </DialogHeader>
                <DialogFooter className="flex flex-col space-y-2 lg:space-y-0 justify-end">
                  <DialogClose asChild>
                    <Button className="bg-destructive" onClick={deleteCostume}>
                      削除
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button variant="outline">キャンセル</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </div>
  );
};
