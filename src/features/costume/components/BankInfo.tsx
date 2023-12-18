'use client';
import { useAuthContext } from '@/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { ordersQueries } from '@/features/mypage/queries/orders';
import { useParams } from 'next/navigation';
import { addDaysToDate } from '@/utils/date';
import { termToPrice } from '@/utils/enum';

export const BankInfo = () => {
  const { user } = useAuthContext()!;
  const params = useParams();

  const orderId = params.orderId as string;

  const { data } = useQuery({
    ...ordersQueries.getOrder({ user: user, orderId: orderId }),
  });

  const orderData = data?.result;

  return (
    <div className="border rounded-sm p-4 text-gray-700 text-base space-y-2">
      <div>
        <span className="font-semibold text-right">金融機関名</span>
        <span>: 楽天銀行</span>
      </div>
      <div>
        <span className="font-semibold text-right">
          支店名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span>: スネア支店 239</span>
      </div>
      <div>
        <span className="font-semibold text-right">
          口座種類&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span>: 普通</span>
      </div>
      <div>
        <span className="font-semibold text-right">
          口座番号&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span>: 2938896</span>
      </div>
      <div>
        <span className="font-semibold text-right">
          名義人&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span>: イハラ ミウ</span>
      </div>
      <div>
        <span className="font-semibold text-right">
          振込金額&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span>
          :{' '}
          {orderData
            ? `¥${Number(orderData?.price) + termToPrice(orderData?.term)!}`
            : '読み込み中'}
        </span>
      </div>
      <div>
        <span className="font-semibold text-right">
          振込期限&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        <span>
          :{' '}
          {orderData?.date
            ? addDaysToDate({
                dateStr: orderData?.date,
                days: 3,
              })
            : '読み込み中'}
        </span>
      </div>
    </div>
  );
};
