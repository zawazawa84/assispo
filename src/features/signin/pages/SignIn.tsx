import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';

export const SignInPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-100">
        <CardHeader>
          <CardTitle>ログイン</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full">
            <FcGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input id="email" type="email" placeholder="email@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">パスワード</Label>
            <Input id="password" type="password" />
            <Link href={''}>
              <p className="text-sm text-[#4988aa]">パスワードをお忘れの方</p>
            </Link>
          </div>
        </CardContent>
        <CardFooter className="grid gap-2 space-y-1">
          <Button className="bg-[#4988aa]">ログイン</Button>
          <Button variant="outline">
            <p className="text-[#4988aa]">新規会員登録</p>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
