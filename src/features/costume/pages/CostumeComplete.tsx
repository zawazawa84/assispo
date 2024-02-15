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
import { BankInfo } from '../components/BankInfo';

export const CostumeComplete = () => {
  const router = useRouter();
  return (
    <div>
      <header className="bg-white">
        <Header />
      </header>
      <div className="mx-auto max-w-screen-2xl">
        <div className="flex items-center justify-center lg:mt-16">
          <Card className="w-100 border-0 shadow-none">
            <CardHeader>
              <CardTitle className="text-center">
                ご注文ありがとうございます。
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-center">
                下記の口座への振り込みをお願いいたします。
                <br />
                (注文履歴からも口座情報の確認が可能です)
              </p>
              <BankInfo />
              <p className="text-center">
                ご注文内容及び発送状況は、配信された確認メール、もしくは
                <Link href={pagesPath.mypage.orderhistory.$url().pathname}>
                  <span className="text-themeblue">注文履歴</span>
                </Link>
                よりご確認ください。
              </p>
              <p className="text-center">※発送状況等は反映に時間がかかります</p>
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
      </div>
    </div>
  );
};
