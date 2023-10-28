'use client';

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

export const MyPage = () => {
  const [editable, setEditable] = useState(false);

  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="bg-white">
        <Header />
      </header>
      <div className="h-screen space-y-8 mt-10 ml-56 mr-56">
        <h1 className="text-2xl font-semibold">マイページ</h1>
        <div className="p-8 border border-[#dcdcdc] rounded-md bg-[#f6f6f6]">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>個人情報</TableHead>
                <TableHead>
                  <div className="flex justify-end">
                    <Button
                      variant="outline"
                      className={`h-8 border ${
                        !editable ? 'border-themeblue' : 'border-destructive'
                      } `}
                      onClick={() => setEditable((prev) => !prev)}
                    >
                      {!editable ? (
                        <p className="text-themeblue">編集</p>
                      ) : (
                        <p className="text-destructive">取消</p>
                      )}
                    </Button>
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
                      <Input placeholder="氏名" />
                      <Input placeholder="住所" />
                      <Input placeholder="電話番号" />
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
                      <Input type="date" placeholder="生年月日" />
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
                      <Input placeholder="クラブ名" />
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
                    <Select>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="サイズ" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Sizes</SelectLabel>
                          <SelectItem value="apple">
                            Child(~小学6年生)
                          </SelectItem>
                          <SelectItem value="banana">
                            Junior(中学1~3年生)
                          </SelectItem>
                          <SelectItem value="blueberry">
                            Senior(高校1年生~)
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
                      <Input type="email" placeholder="メールアドレス" />
                    </div>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
