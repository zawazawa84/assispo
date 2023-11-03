'use client';

import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/sdk';
import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

interface profileEditProps {
  name: string;
  address: string;
  phoneNumber: number;
  birthday: Date;
  club: string | number;
  size: string;
  email: string;
}

export const MyPage = () => {
  const [editable, setEditable] = useState(false);

  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    register,
  } = useForm<profileEditProps>();

  const onSubmit = handleSubmit(async (data) => {
    await setDoc(doc(db, 'users', '1'), {
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      birthday: data.birthday,
      club: data.club,
      size: data.size,
      email: data.email,
    });
  });

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="bg-white">
        <Header />
      </header>
      <div className="h-screen space-y-8 mt-10 ml-56 mr-56">
        <h1 className="text-2xl font-semibold">マイページ</h1>
        <div className="p-8 border border-[#dcdcdc] rounded-md bg-[#f6f6f6]">
          <form onSubmit={onSubmit}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>個人情報</TableHead>
                  <TableHead>
                    <div className="flex justify-end">
                      {!editable ? (
                        <Button
                          variant="outline"
                          className={'h-8 border-themeblue'}
                          onClick={(e) => {
                            e.preventDefault();
                            setEditable((prev) => !prev);
                          }}
                        >
                          <p className="text-themeblue">編集</p>
                        </Button>
                      ) : (
                        <div className="space-x-2">
                          <Button
                            className={'h-8 bg-themeblue'}
                            onClick={() => {
                              setEditable((prev) => !prev);
                            }}
                          >
                            <p>保存</p>
                          </Button>
                          <Button
                            variant="outline"
                            className={'h-8 border-destructive'}
                            onClick={(e) => {
                              e.preventDefault();
                              setEditable((prev) => !prev);
                            }}
                          >
                            <p className="text-destructive">取消</p>
                          </Button>
                        </div>
                      )}
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <p>基本情報</p>
                  </TableCell>
                  <TableCell className="max-w-sm">
                    {!editable ? (
                      <>
                        <p>テスト 様</p>
                        <p>
                          住所: 〒8190378 テスト県テスト市テスト区テスト1-11
                          テストマンション111号室
                        </p>
                        <p>電話: 090-1234-5678</p>
                      </>
                    ) : (
                      <div className="space-y-2">
                        <Input placeholder="氏名" {...register('name')} />
                        <Input placeholder="住所" {...register('address')} />
                        <Input
                          placeholder="電話番号"
                          {...register('phoneNumber')}
                        />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <p>生年月日</p>
                  </TableCell>
                  <TableCell>
                    {!editable ? (
                      <p>2003年 8月4日</p>
                    ) : (
                      <div>
                        <Input
                          type="date"
                          placeholder="生年月日"
                          {...register('birthday')}
                        />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <p>所属クラブ</p>
                  </TableCell>
                  <TableCell>
                    {!editable ? (
                      <p>新体操クラブ</p>
                    ) : (
                      <div>
                        <Input placeholder="クラブ名" {...register('club')} />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <p>サイズ</p>
                  </TableCell>
                  <TableCell>
                    {!editable ? (
                      <p>シニア</p>
                    ) : (
                      <Controller
                        control={control}
                        name="size"
                        render={({ field: { onChange, value } }) => (
                          <Select onValueChange={onChange} defaultValue={value}>
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="サイズ" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Sizes</SelectLabel>
                                <SelectItem value="1">
                                  Child(~小学6年生)
                                </SelectItem>
                                <SelectItem value="2">
                                  Junior(中学1~3年生)
                                </SelectItem>
                                <SelectItem value="3">
                                  Senior(高校1年生~)
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <p>メールアドレス</p>
                  </TableCell>
                  <TableCell>
                    {!editable ? (
                      <p>aizawa.job84@gmial.com</p>
                    ) : (
                      <div>
                        <Input
                          type="email"
                          placeholder="メールアドレス"
                          {...register('email')}
                        />
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </form>
        </div>
      </div>
    </div>
  );
};
