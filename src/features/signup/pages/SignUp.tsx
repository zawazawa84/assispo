'use client';

import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { auth } from '@/lib/firebase/sdk';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/navigation';
import { pagesPath } from '@/gen/$path';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { FirebaseError } from 'firebase/app';
import { toast } from '@/components/ui/use-toast';

interface SignUp {
  email: string;
  password: string;
}

const siginUpSchemma = z.object({
  email: z.string().email({ message: '無効なメールアドレスです' }),
  password: z
    .string()
    .min(6, { message: 'パスワードは6文字以上である必要があります' }),
});

export const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUp>({ resolver: zodResolver(siginUpSchemma) });

  const onSubmit = handleSubmit(async (data: SignUp) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      router.push(pagesPath.costume.$url().path);
    } catch (error) {
      if (
        error instanceof FirebaseError &&
        error.code === 'auth/email-already-in-use'
      ) {
        toast({
          variant: 'destructive',
          description: 'このメールアドレスはすでに使われています',
        });
      }
    }
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-100 lg:border border-0 shadow-none">
        <CardHeader>
          <CardTitle>新規会員登録</CardTitle>
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
              <Label>メールアドレス</Label>
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
            </div>
            <Button className="bg-themeblue w-full">会員登録</Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={(e) => {
                e.preventDefault();
                router.push(pagesPath.signin.$url().path);
              }}
            >
              <p className="text-themeblue">ログインページへ戻る</p>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
