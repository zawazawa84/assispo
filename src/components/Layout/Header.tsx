'use client';

import { signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { pagesPath, staticPath } from '@/gen/$path';
import { useAuthContext } from '@/AuthContext';
import { auth } from '@/lib/firebase/sdk';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { User, History, LogOut, Home } from 'lucide-react';
import { Button } from '../ui/button';
import { useQuery } from '@tanstack/react-query';
import { ordersQueries } from '@/features/mypage/queries/orders';
import { termToNumber } from '@/utils/enum';
import { addDaysToDate } from '@/utils/date';
import { format, isAfter, parse } from 'date-fns';

export const Header = () => {
  const { user, userData } = useAuthContext()!;
  const router = useRouter();

  const { data } = useQuery({
    ...ordersQueries.getOrders({ user: user }),
  });
  const arrivedOrderData = data?.ArrivedOrderData;
  const returnDeadlineData = arrivedOrderData?.map((orderData) =>
    addDaysToDate({
      dateStr: orderData.date,
      days: termToNumber(orderData.term) as number,
    }),
  );

  const todayStr = format(new Date(), 'yyyy.MM.dd');
  const todayDate = parse(todayStr, 'yyyy.MM.dd', new Date());

  const isPastReturnDeadline = returnDeadlineData?.some((deadlineStr) => {
    const deadlineDate = parse(deadlineStr, 'yyyy.MM.dd', new Date());
    return isAfter(todayDate, deadlineDate);
  });

  const logOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="flex justify-between w-full h-20 border-b place-items-center px-4">
      <div
        onClick={() => router.push(pagesPath.costume.$url().path)}
        className="cursor-pointer"
      >
        <Image
          alt=""
          src={staticPath.assispo_logo_png}
          width={130}
          height={10}
          className="object-cover lg:ml-10"
        />
      </div>
      <div className="flex space-x-4 lg:mr-10">
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost">{userData?.name ?? 'ゲスト'} 様</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>アシスポ</DropdownMenuLabel>
              <Link href={pagesPath.costume.$url().path}>
                <DropdownMenuItem className="cursor-pointer">
                  <Home className="mr-2 h-4 w-4" />
                  <span>ホーム</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <Link href={pagesPath.mypage.$url().path}>
                  <DropdownMenuItem className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    <span>マイページ</span>
                  </DropdownMenuItem>
                </Link>
                <Link href={pagesPath.mypage.orderhistory.$url().path}>
                  <DropdownMenuItem className="cursor-pointer">
                    <History className="mr-2 h-4 w-4" />
                    <span>
                      注文履歴{' '}
                      {isPastReturnDeadline && (
                        <span className="text-destructive">期限超過中</span>
                      )}
                    </span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <Link href={pagesPath.signin.$url().path} onClick={logOut}>
                <DropdownMenuItem className="text-destructive cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>ログアウト</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>
          {isPastReturnDeadline && (
            <div className="absolute top-0 right-0 bg-red-500 rounded-full h-3 w-3"></div>
          )}
        </div>
      </div>
    </div>
  );
};
