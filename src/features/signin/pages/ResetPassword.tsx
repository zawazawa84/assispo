'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';

interface ResetPassword {
  email: string;
}

export const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassword>();

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
          <form className="space-y-4">
            <div className="grid gap-2">
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
              <Button className="bg-themeblue">認証メールを送信する</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
