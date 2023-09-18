import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';

export const OrderTable = () => {
  return (
    <Table>
      <TableBody className="border-y">
        <TableRow>
          <TableCell className="">レンタル期間</TableCell>
          <TableCell>期間を選択してください</TableCell>
          <TableCell>
            <Button variant="outline" className="h-8 border border-themeblue">
              <p className="text-themeblue">選択</p>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>お届け先</TableCell>
          <TableCell className="max-w-sm">
            <p>テスト 様</p>
            <p>
              住所: 〒8190378 テスト県テスト市テスト区テスト1-11
              テストマンション111号室
            </p>
            <p>電話: 090-1234-5678</p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>お支払い方法</TableCell>
          <TableCell>お支払い方法を選択してください</TableCell>
          <TableCell>
            <Button variant="outline" className="h-8 border border-themeblue">
              <p className="text-themeblue">選択</p>
            </Button>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>お届け商品</TableCell>
          <TableCell>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>お届け日</TableCell>
                  <TableCell>9月18日(月)</TableCell>
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
                  <TableCell>商品</TableCell>
                  <TableCell>
                    <Image
                      src={'/item3.png'}
                      alt=""
                      width={70}
                      height={10}
                      className="object-contain aspect-[5/6] bg-secondary"
                    />
                  </TableCell>
                  <TableCell>¥3,900</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
