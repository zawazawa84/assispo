import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <div className="flex h-20 place-items-center">
      <Image
        alt=""
        src="/assispo_logo.png"
        width={180}
        height={10}
        className="object-cover pl-10"
      />
      <Input placeholder="Search..." className="w-96" />
      <div className="flex space-x-4 ml-108">
        <Button variant="ghost" className="min-w-fit h-auto ml-28">
          ログイン
        </Button>
        <Button className="bg-themeblue min-w-fit h-auto">出品</Button>
      </div>
    </div>
  );
};
