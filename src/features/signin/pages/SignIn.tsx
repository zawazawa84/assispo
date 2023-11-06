'use client';

import { useForm } from 'react-hook-form';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
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
import { pagesPath } from '@/gen/$path';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { auth } from '@/lib/firebase/sdk';

interface SignIn {
  email: string;
  password: string;
}

export const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>();

  const onSubmit = handleSubmit(async (data: SignIn) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log(userCredential);
      router.push(pagesPath.costume.$url().path);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-100 lg:border border-0 shadow-none">
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
          <form className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register('email')}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input id="password" type="password" {...register('password')} />
              <Link href={''}>
                <p className="text-sm text-themeblue">パスワードをお忘れの方</p>
              </Link>
            </div>
            <div className="grid gap-2">
              <Button className="bg-themeblue" onClick={onSubmit}>
                ログイン
              </Button>
            </div>
          </form>
          <div className="grid gap-2">
            <Button
              variant="outline"
              onClick={() => router.push(pagesPath.signup.$url().path)}
            >
              <p className="text-themeblue">新規会員登録</p>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
