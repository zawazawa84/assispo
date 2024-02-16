'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { pagesPath } from '@/gen/$path';
import { auth } from '@/lib/firebase/sdk';
import { FirebaseError } from 'firebase/app';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

interface ResetPassword {
  email: string;
}

export const ResetPassword = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassword>();

  const onSubmit = handleSubmit(async (data: ResetPassword) => {
    try {
      await sendPasswordResetEmail(auth, data.email);
      toast({
        description: 'パスワードリセットメールを送信しました。',
      });
    } catch (error) {
      if (error instanceof FirebaseError) {
        toast({
          variant: 'destructive',
          description:
            'メール送信に失敗しました。メールアドレスを確認してください。',
        });
      }
    }
  });

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-100 lg:border border-0 shadow-none">
        <CardHeader>
          <CardTitle>パスワードをお忘れの方</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            登録されているメールアドレスを入力してください。パスワード再設定のため認証メールを送信します。
          </p>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-2">
              <Input
                id="email"
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
              <Button className="bg-themeblue" type="submit">
                認証メールを送信する
              </Button>
              <Button
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  router.push(pagesPath.signin.$url().path);
                }}
              >
                <p className="text-themeblue">ログインページへ戻る</p>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
