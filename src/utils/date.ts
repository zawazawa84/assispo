import { parse, addDays, format } from 'date-fns';

interface DateProps {
  dateStr: string;
  days: number;
}

export const addDaysToDate = ({ dateStr, days }: DateProps) => {
  const date = parse(dateStr, 'yyyy.MM.dd', new Date());
  const newDate = addDays(date, days);
  return format(newDate, 'yyyy.MM.dd');
};
