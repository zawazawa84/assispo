'use client';

import { signOut } from 'firebase/auth';
import Image from 'next/image';
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
import { useAuthContext } from '@/AuthContext';
import { auth } from '@/lib/firebase/sdk';

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
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="lg:mr-12">
                {userData?.name ? userData?.name : 'ゲスト'} 様
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-40 p-5 space-y-1">
                  <li>
                    <Link href={pagesPath.mypage.$url().path}>マイページ</Link>
                  </li>
                  <li>
                    <Link href={pagesPath.mypage.orderhistory.$url().path}>
                      注文履歴
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-destructive"
                      href={pagesPath.signin.$url().path}
                      onClick={logOut}
                    >
                      ログアウト
                    </Link>
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
