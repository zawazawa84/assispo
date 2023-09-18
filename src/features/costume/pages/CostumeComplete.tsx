'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { pagesPath } from '@/gen/$path';
import Link from 'next/link';
import { Header } from '@/components/Layout/Header';
import { Separator } from '@/components/ui/separator';

export const CostumeComplete = () => {
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
            <CardTitle>ご注文ありがとうございます。</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              ご注文内容及び発送状況は、配信された確認メール、もしくは
              <Link href={''}>
                <span className="text-themeblue">注文履歴</span>
              </Link>
              よりご確認ください。
            </p>
          </CardContent>
          <CardFooter className="grid gap-2 space-y-1">
            <Button
              className="bg-themeblue"
              onClick={() => router.push(pagesPath.costume.$url().path)}
            >
              衣装一覧へ戻る
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};
