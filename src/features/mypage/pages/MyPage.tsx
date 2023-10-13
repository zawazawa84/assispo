import { Header } from '@/components/Layout/Header';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export const MyPage = () => {
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
                <TableHead>個人情報編集</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <p>基本情報</p>
                </TableCell>
                <TableCell className="max-w-sm">
                  {' '}
                  <p>テスト 様</p>
                  <p>
                    住所: 〒8190378 テスト県テスト市テスト区テスト1-11
                    テストマンション111号室
                  </p>
                  <p>電話: 090-1234-5678</p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="h-8 border border-themeblue"
                  >
                    <p className="text-themeblue">変更</p>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p>生年月日</p>
                </TableCell>
                <TableCell>
                  <p>2003年 8月4日</p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="h-8 border border-themeblue"
                  >
                    <p className="text-themeblue">変更</p>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p>所属クラブ</p>
                </TableCell>
                <TableCell>
                  <p>ザワチンクラブ</p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="h-8 border border-themeblue"
                  >
                    <p className="text-themeblue">変更</p>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p>サイズ</p>
                </TableCell>
                <TableCell>
                  <p>シニア</p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="h-8 border border-themeblue"
                  >
                    <p className="text-themeblue">変更</p>
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <p>メールアドレス</p>
                </TableCell>
                <TableCell>
                  <p>aizawa.job84@gmial.com</p>
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="h-8 border border-themeblue"
                  >
                    <p className="text-themeblue">変更</p>
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
