export interface costumeProps {
  category: string;
  deliveryCharge: string;
  isRented: boolean;
  name: string;
  others: string;
  price: string;
  size: string;
  state: string;
  washable: boolean;
}

export interface orderProps {
  userId: string;
  date: string;
  term: string;
  productcode: string;
  fromAddress: string;
  toAddress: string;
  comment: string;
  orderStatus: number;
  returnStatus: number;
  isCanceled: boolean;
}

export interface orderHistoryProps extends costumeProps, orderProps {
  orderId: string;
}

const SizeProps = {
  Child: '1',
  Junior: '2',
  Senior: '3',
} as const;
type SizeProps = (typeof SizeProps)[keyof typeof SizeProps];

export const numberToSize = (number: string | undefined) => {
  switch (number) {
    case SizeProps.Child:
      return 'Child';
    case SizeProps.Junior:
      return 'Junior';
    case SizeProps.Senior:
      return 'Senior';
  }
};

const termProps = {
  oneWeek: '1week',
  twoWeek: '2week',
  threeWeek: '3week',
  oneMonth: '1month',
} as const;
type termProps = (typeof termProps)[keyof typeof termProps];

export const termToPrice = (term: string | undefined) => {
  switch (term) {
    case termProps.oneWeek:
      return 1200;
    case termProps.twoWeek:
      return 1600;
    case termProps.threeWeek:
      return 2000;
    case termProps.oneMonth:
      return 2400;
  }
};

export const termToNumber = (term: string | undefined) => {
  switch (term) {
    case termProps.oneWeek:
      return 7;
    case termProps.twoWeek:
      return 14;
    case termProps.threeWeek:
      return 21;
    case termProps.oneMonth:
      return 31;
  }
};

const paymentMethodProps = {
  cash: 'cash',
  creditCard: 'creditCard',
} as const;
type paymentMethodProps =
  (typeof paymentMethodProps)[keyof typeof paymentMethodProps];

export const changePaymentMethodFromEnglish = (paymentMethod: string) => {
  switch (paymentMethod) {
    case paymentMethodProps.cash:
      return '代金引換';
    case paymentMethodProps.creditCard:
      return 'クレジットカード';
  }
};

export const orderStatusProps = {
  unpaid: 1,
  deliveryProcessing: 2,
  underDelivery: 3,
  isCanceled: 0,
} as const;
type orderStatusProps =
  (typeof orderStatusProps)[keyof typeof orderStatusProps];

export const numberToOrderStatus = (number: number) => {
  switch (number) {
    case orderStatusProps.unpaid:
      return '代金未払い';
    case orderStatusProps.deliveryProcessing:
      return '配達処理中';
    case orderStatusProps.underDelivery:
      return '配達中';
    case orderStatusProps.isCanceled:
      return 'キャンセル済';
  }
};
