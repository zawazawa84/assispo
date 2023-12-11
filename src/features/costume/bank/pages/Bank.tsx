import { Header } from '@/components/Layout/Header';
import { BankInfo } from '../../components/BankInfo';

export const Bank = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <header className="sticky top-0 z-10 bg-white">
        <Header />
      </header>
      <BankInfo />
    </div>
  );
};
