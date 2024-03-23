'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { pagesPath } from '@/gen/$path';

export const ReturnCostume = () => {
  const router = useRouter();
  return (
    <div>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <div className="mx-auto max-w-screen-2xl">
        <div className="h-screen space-y-8 mt-10 lg:ml-56 lg:mr-56">
          <h1 className="text-2xl font-semibold">商品返却手続き</h1>
          <div className="lg:p-8 lg:border rounded-md">
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
                    <div className="flex space-x-4">
                      <Image
                        src={`/item3.jpg`}
                        alt=""
                        width={150}
                        height={220}
                        className="rounded-sm object-contain aspect-square bg-secondary"
                      />
                      <div className="space-y-3">
                        <p>テスト衣装</p>
                        <p className="text-sm">
                          <span className="text-[#989898]">サイズ :</span>{' '}
                          シニア
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
            <div className="flex justify-between">
              <p className="mt-4 text-xs">
                ※お客様自身で郵送をしていただく必要があります
              </p>
              <Button
                className="bg-themeblue"
                onClick={() =>
                  router.push(
                    pagesPath.mypage.orderhistory._orderId('1').complete.$url()
                      .path,
                  )
                }
              >
                発送を完了
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
