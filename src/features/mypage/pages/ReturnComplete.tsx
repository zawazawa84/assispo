'use client';

import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { pagesPath } from '@/gen/$path';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export const ReturnComplete = () => {
  const router = useRouter();
  return (
    <>
      <header className="bg-white">
        <Header />
        <Separator className="my-2" />
      </header>
      <div className="flex items-center justify-center h-screen pb-40">
        <Card className="w-100">
          <CardHeader>
            <CardTitle>ご返却ありがとうございます。</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              返却状況は配信された確認メール、もしくは
              <Link href={pagesPath.mypage.orderhistory.$url().pathname}>
                <span className="text-themeblue">注文履歴</span>
              </Link>
              の「到着済商品」よりご確認ください。
            </p>
          </CardContent>
          <CardFooter className="grid gap-2 space-y-1">
            <Button
              className="bg-themeblue"
              onClick={() => router.push(pagesPath.mypage.$url().path)}
            >
              マイページへ戻る
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
