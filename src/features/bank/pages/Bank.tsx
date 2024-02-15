import { Header } from '@/components/Layout/Header';
import { BankInfo } from '../../costume/components/BankInfo';

export const Bank = () => {
  return (
    <div>
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <div className="mx-auto max-w-screen-2xl">
        <BankInfo />
      </div>
    </div>
  );
};
