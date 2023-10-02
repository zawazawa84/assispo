import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';

export const InfoTable = () => {
  return (
    <Table>
      <TableBody>
        <TableRow className="border-0">
          <TableCell className="w-40 font-semibold">カテゴリー</TableCell>
          <TableCell>発表会用</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">サイズ</TableCell>
          <TableCell>シニア</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">洗濯</TableCell>
          <TableCell>可</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">状態</TableCell>
          <TableCell>目立った傷や汚れなし</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">配送料</TableCell>
          <TableCell>assispo負担</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">その他</TableCell>
          <TableCell>袖あり・スカートあり・タイツなし</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
