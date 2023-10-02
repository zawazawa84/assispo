import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Image from 'next/image';

export const ReturnCostume = () => {
  return (
    <>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
        <Separator className="my-2" />
      </header>
      <div className="h-screen space-y-8 mt-10 ml-56 mr-56">
        <h1 className="text-2xl font-semibold">商品返却手続き</h1>
        <div className="p-8 border border-[#dcdcdc] rounded-md bg-[#f6f6f6]">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>商品と返却情報</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="border-b-0">
                <TableCell className="pt-4 pb-1">注文日</TableCell>
                <TableCell className="pt-4 pb-1">2023.10.2</TableCell>
              </TableRow>
              <TableRow className="border-b-0">
                <TableCell className="py-1">注文番号</TableCell>
                <TableCell className="py-1">0000000000</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pt-1 pb-4">レンタル期限</TableCell>
                <TableCell className="pt-1 pb-4">2023.10.9</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p>お届け先</p>
                </TableCell>
                <TableCell className="max-w-sm">
                  {' '}
                  <p>テスト 様</p>
                  <p>
                    住所: 〒8190378 テスト県テスト市テスト区テスト1-11
                    テストマンション111号室
                  </p>
                  <p>電話: 090-1234-5678</p>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>商品情報</TableCell>
                <TableCell className="w-2/3">
                  <div className="flex">
                    <Image
                      src={`/item3.png`}
                      alt=""
                      width={150}
                      height={220}
                      className="rounded-sm object-contain aspect-square bg-secondary"
                    />
                    <div className="space-y-3">
                      <p>
                        テスト衣装ああああああああああああああああああああああああああああああああああああああああああああああああ
                      </p>
                      <p className="text-sm">
                        <span className="text-[#989898]">サイズ :</span> シニア
                      </p>
                      <p className="text-sm">
                        <span className="text-[#989898]">洗濯 :</span> 可
                      </p>
                      <p className="text-sm">
                        <span className="text-[#989898]">レンタル期間 :</span>{' '}
                        7日間
                      </p>
                      <p className="text-sm">
                        <span className="text-[#989898]">基本料金 :</span>{' '}
                        ¥3,960
                      </p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="flex justify-end">
            <Button className="mt-4 bg-themeblue inline-block place-items-end">
              発送を完了
            </Button>
          </div>
          <p className="text-xs">
            ※お客様自身で郵送をしていただく必要があります
          </p>
        </div>
      </div>
    </>
  );
};