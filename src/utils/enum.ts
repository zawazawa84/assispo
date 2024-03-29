export interface costumeProps {
  category: string;
  deliveryCharge: string;
  image: FileList;
  isRented: boolean;
  name: string;
  others: string;
  price: string;
  size: string;
  state: string;
  washable: boolean;
  description: string;
}

export interface orderProps {
  userId: string;
  orderDate: string;
  arrivalDate: string;
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
  threeMonth: '3month',
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
    case termProps.threeMonth:
      return 3200;
  }
};

export const termToString = (term: string | undefined) => {
  switch (term) {
    case termProps.oneWeek:
      return '1週間';
    case termProps.twoWeek:
      return '2週間';
    case termProps.threeWeek:
      return '3週間';
    case termProps.oneMonth:
      return '1ヶ月';
    case termProps.threeMonth:
      return '3ヶ月';
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
    case termProps.threeMonth:
      return 93;
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

export const returnStatusProps = {
  default: 1,
  renting: 2,
  returnProcedure: 3,
  returned: 4,
} as const;
type returnStatusProps =
  (typeof returnStatusProps)[keyof typeof returnStatusProps];

export const numberToReturnStatus = (number: number) => {
  switch (number) {
    case returnStatusProps.renting:
      return 'レンタル中';
    case returnStatusProps.returnProcedure:
      return '返却手続き済';
    case returnStatusProps.returned:
      return '返却済';
  }
};
