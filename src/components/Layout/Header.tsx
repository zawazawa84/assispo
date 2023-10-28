'use client';

import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui/navigation-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { pagesPath } from '@/gen/$path';

export const Header = () => {
  const router = useRouter();
  return (
    <div className="flex justify-between w-full h-20 border-b place-items-center">
      <div onClick={() => router.push(pagesPath.costume.$url().path)}>
        <Image
          alt=""
          src="/assispo_logo.png"
          width={130}
          height={10}
          className="object-cover ml-10"
        />
      </div>
      <div className="flex space-x-4 mr-10">
        <NavigationMenu className="h-auto">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>相澤 様</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-40 p-5 space-y-1">
                  <li>
                    <Link href={'/mypage'}>マイページ</Link>
                  </li>
                  <li>
                    <Link href={'/mypage/orderhistory'}>注文履歴</Link>
                  </li>
                  <li>
                    <p className="text-destructive">ログアウト</p>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div>
  );
};
