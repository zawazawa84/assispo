'use client';

import { signOut } from 'firebase/auth';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { pagesPath } from '@/gen/$path';
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

export const Header = () => {
  const userData = useAuthContext()?.userData;
  const router = useRouter();

  const logOut = () => {
    signOut(auth).catch((error) => {
      console.log(error);
    });
  };

  return (
    <div className="flex justify-between w-full h-20 border-b place-items-center">
      <div
        onClick={() => router.push(pagesPath.costume.$url().path)}
        className="cursor-pointer"
      >
        <Image
          alt=""
          src="/assispo_logo.png"
          width={130}
          height={10}
          className="object-cover lg:ml-10"
        />
      </div>
      <div className="flex space-x-4 lg:mr-10">
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
                  <span>注文履歴</span>
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
      </div>
    </div>
  );
};
