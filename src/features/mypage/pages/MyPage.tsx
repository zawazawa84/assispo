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
import { UserData, useAuthContext } from '@/AuthContext';
import { numberToSize } from '@/utils/enum';

export const MyPage = () => {
  const { user, userData } = useAuthContext()!;
  const [editable, setEditable] = useState(false);

  const {
    formState: { errors, isSubmitting },
    control,
    handleSubmit,
    register,
  } = useForm<UserData>();

  const onSubmit = handleSubmit(async (data) => {
    await setDoc(doc(db, 'users', `${user?.uid}`), {
      name: data.name,
      address: data.address,
      phoneNumber: data.phoneNumber,
      birthday: data.birthday,
      club: data.club,
      size: data.size,
      email: data.email,
    });
    window.location.reload();
  });

  return (
    <div>
      <header className="bg-white">
        <Header />
      </header>
      <div className="mx-auto max-w-screen-2xl">
        <div className="h-screen space-y-8 mt-10 lg:ml-56 lg:mr-56">
          <h1 className="text-2xl font-semibold">マイページ</h1>
          <div className="lg:p-8 lg:border rounded-md">
            <form onSubmit={onSubmit}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="whitespace-nowrap">
                      個人情報
                    </TableHead>
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
                              type="submit"
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
                          <p>{userData?.name} 様</p>
                          <p>住所: {userData?.address}</p>
                          <p>電話: {userData?.phoneNumber}</p>
                        </>
                      ) : (
                        <div className="space-y-2">
                          <Input
                            placeholder="氏名"
                            defaultValue={userData?.name}
                            {...register('name')}
                          />
                          <Input
                            placeholder="住所"
                            defaultValue={userData?.address}
                            {...register('address')}
                          />
                          <Input
                            placeholder="電話番号"
                            defaultValue={userData?.phoneNumber}
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
                        <p>{userData?.birthday}</p>
                      ) : (
                        <div>
                          <Input
                            type="date"
                            placeholder="生年月日"
                            defaultValue={userData?.birthday}
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
                        <p>{userData?.club}</p>
                      ) : (
                        <div>
                          <Input
                            placeholder="クラブ名"
                            defaultValue={userData?.club}
                            {...register('club')}
                          />
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
                        <p>{numberToSize(userData?.size)}</p>
                      ) : (
                        <Controller
                          control={control}
                          name="size"
                          defaultValue={userData?.size}
                          render={({ field: { onChange, value } }) => (
                            <Select
                              onValueChange={onChange}
                              defaultValue={value}
                            >
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
                      <p className="whitespace-nowrap">メールアドレス</p>
                    </TableCell>
                    <TableCell>
                      {!editable ? (
                        <p>{user?.email}</p>
                      ) : (
                        <div>
                          <Input
                            type="email"
                            placeholder="メールアドレス"
                            defaultValue={userData?.email}
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
    </div>
  );
};
