interface costumeProps {
  category: string;
  deliveryCharge: string;
  name: string;
  others: string;
  price: string;
  size: string;
  state: string;
}

const SizeProps = {
  Child: '1',
  Junior: '2',
  Senior: '3',
} as const;
type SizeProps = (typeof SizeProps)[keyof typeof SizeProps];

export const numberToSize = (number: string) => {
  switch (number) {
    case SizeProps.Child:
      return 'Child';
    case SizeProps.Junior:
      return 'Junior';
    case SizeProps.Senior:
      return 'Senior';
  }
};
