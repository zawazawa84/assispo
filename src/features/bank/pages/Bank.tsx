import { BankInfo } from '../../costume/components/BankInfo';

import { Header } from '@/components/Layout/Header';

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
