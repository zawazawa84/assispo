'use client';

import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { costumeProps, numberToSize } from '@/utils/enum';

export const InfoTable = ({
  costume,
}: {
  costume: costumeProps | undefined;
}) => {
  return (
    <Table>
      <TableBody className="whitespace-nowrap">
        <TableRow className="border-0">
          <TableCell className="w-40 font-semibold">カテゴリー</TableCell>
          <TableCell>{costume?.category}</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">サイズ</TableCell>
          <TableCell>{numberToSize(costume?.size)}</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">洗濯</TableCell>
          <TableCell>{costume?.washable ? '可' : '不可'}</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">状態</TableCell>
          <TableCell>{costume?.state}</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">配送料</TableCell>
          <TableCell>{costume?.deliveryCharge}</TableCell>
        </TableRow>
        <TableRow className="border-0">
          <TableCell className="font-semibold">その他</TableCell>
          <TableCell>{costume?.others}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
