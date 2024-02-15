import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Image from 'next/image';
import { Controller } from 'react-hook-form';

export const OrderTable = ({ errors, costumeData, userData, control }: any) => {
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
                  className="lg:flex lg:space-x-10"
                  value={value}
                  onValueChange={onChange}
                >
                  <div className="flex space-x-1">
                    <RadioGroupItem id="1week" value="1week" />
                    <label htmlFor="1week" className="text-sm leading-none">
                      1週間
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <RadioGroupItem id="2week" value="2week" />
                    <label htmlFor="2week" className="text-sm leading-none">
                      2週間
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <RadioGroupItem id="3week" value="3week" />
                    <label htmlFor="3week" className="text-sm leading-none">
                      3週間
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <RadioGroupItem id="1month" value="1month" />
                    <label htmlFor="1month" className="text-sm leading-none">
                      1ヶ月
                    </label>
                  </div>
                  <div className="flex space-x-1">
                    <RadioGroupItem id="3month" value="3month" />
                    <label htmlFor="1month" className="text-sm leading-none">
                      3ヶ月
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
            <p>電話: {userData?.phoneNumber}</p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-nowrap">お支払い方法</TableCell>
          <TableCell>
            <p>銀行振り込み</p>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="whitespace-nowrap">お届け商品</TableCell>
          <TableCell>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>商品</TableCell>
                  <TableCell>
                    <Image
                      src={costumeData.image}
                      alt=""
                      width={70}
                      height={10}
                      className="object-contain aspect-[5/6] bg-secondary"
                    />
                  </TableCell>
                  <TableCell>¥{costumeData.price}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};
