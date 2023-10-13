import Image from 'next/image';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export const Header = () => {
  return (
    <div className="flex justify-between w-full h-20 border-b place-items-center">
      <Image
        alt=""
        src="/assispo_logo.png"
        width={130}
        height={10}
        className="object-cover ml-10"
      />
      <div className="flex space-x-4 mr-10">
        <Button variant="ghost" className="h-auto">
          ログイン
        </Button>
        <Button className="bg-themeblue h-auto">出品</Button>
      </div>
    </div>
  );
};
