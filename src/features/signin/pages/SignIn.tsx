'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { FirebaseError } from 'firebase/app';
import { toast } from '@/components/ui/use-toast';

interface SignIn {
  email: string;
  password: string;
}

const siginInSchemma = z.object({
  email: z.string().email({ message: '無効なメールアドレスです' }),
  password: z
    .string()
    .min(6, { message: 'パスワードは6文字以上である必要があります' }),
});

export const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({ resolver: zodResolver(siginInSchemma) });

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
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/invalid-login-credentials'
      ) {
        toast({
          variant: 'destructive',
          description: 'メールアドレスまたはパスワードが異なります',
        });
      }
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
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                placeholder="email@example.com"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input id="password" type="password" {...register('password')} />
              {errors.password && (
                <p className="text-sm text-destructive">
                  {errors.password.message}
                </p>
              )}
              <p
                className="text-sm text-themeblue cursor-pointer"
                onClick={() => router.push(pagesPath.signin.reset.$url().path)}
              >
                パスワードをお忘れの方
              </p>
            </div>
            <div className="grid gap-2">
              <Button className="bg-themeblue">ログイン</Button>
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
