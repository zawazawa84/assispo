import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Controller } from 'react-hook-form';

export const OrderTable = ({ register, userData, control }: any) => {
  return (
    <Table>
      <TableBody className="border-y border-[#dcdcdc]">
        <TableRow>
          <TableCell className="whitespace-nowrap">レンタル期間</TableCell>
          <TableCell>
            <Controller
              control={control}
              name="term"
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  className="flex space-x-10"
                  value={value}
                  onValueChange={onChange}
                >
                  <div className="flex space-x-1">
                    <RadioGroupItem id="1day" value="1day" />
                    <label htmlFor="1day" className="text-sm leading-none">
                      1day
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <RadioGroupItem id="3days" value="3days" />
                    <label htmlFor="3days" className="text-sm leading-none">
                      3days
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <RadioGroupItem id="1week" value="1week" />
                    <label htmlFor="1week" className="text-sm leading-none">
                      1week
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <RadioGroupItem id="1month" value="1month" />
                    <label htmlFor="1month" className="text-sm leading-none">
                      1month
                    </label>
                  </div>
                </RadioGroup>
              )}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-nowrap">お届け先</TableCell>
          <TableCell className="max-w-sm">
            <p>{userData?.name} 様</p>
            <p>住所: {userData?.address}</p>
            <p>電話: 090-1234-5678</p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-nowrap">お支払い方法</TableCell>
          <TableCell>
            <Controller
              control={control}
              name="paymentMethod"
              render={({ field: { onChange, value } }) => (
                <RadioGroup
                  className="flex space-x-10"
                  value={value}
                  onValueChange={onChange}
                >
                  <div className="flex space-x-1">
                    <RadioGroupItem id="cash" value="cash" />
                    <label htmlFor="cash" className="text-sm leading-none">
                      代金引換
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <RadioGroupItem id="creditCard" value="creditCard" />
                    <label
                      htmlFor="creditCard"
                      className="text-sm leading-none"
                    >
                      クレジットカード
                    </label>
                  </div>
                </RadioGroup>
              )}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-nowrap">お届け商品</TableCell>
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
                      <p className="text-themeblue whitespace-nowrap">変更</p>
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
