import { ChevronLeft, ChevronRight } from "lucide-react";

import StatsCards from "./components/StatsCards";
import Card from "../../components/UI/Card";
import AddTransactions from "./components/AddTransactions";
import History from "./components/History";
import {
  type TransactionType,
  useTransactionCtx,
} from "../../store/TransactionContext";
import { useEffect, useState, useTransition } from "react";
import { getMonthRange } from "../../helpers/dateHelpers";
import Chart from "./components/Chart";

const Dashboard: React.FC = () => {
  const { getTransactions } = useTransactionCtx();
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [dashboardDate, setDashboardDate] = useState<Date>(new Date());
  const [_isLoading, startTransition] = useTransition();

  const getDashboardTransactions = () => {
    startTransition(async () => {
      try {
        const transactions = await getTransactions({ ...getMonthRange(dashboardDate) });
        if (transactions) {
          setTransactions(transactions);
        }
      } catch (err) {
        console.error(err);
      }
    });
  };

  const handleAddTransaction = (date: string) => {
    const transactionDate = new Date(date);
    if((`${transactionDate.getFullYear()}.${transactionDate.getMonth()}`) === (`${dashboardDate.getFullYear()}.${dashboardDate.getMonth()}`)){
      getDashboardTransactions()
    }
    
  }

  useEffect(() => {
    getDashboardTransactions();
  }, [dashboardDate]);

  const setPreviousMonth = () => {
    setDashboardDate((current) => {
      const newDate = new Date(current);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const setNextMonth = () => {
    setDashboardDate((current) => {
      const newDate = new Date(current);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const resetToCurrent = () => {
    setDashboardDate(new Date());
  };

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="group flex gap-5 justify-center items-center font-bold">
        <button onClick={setPreviousMonth} className="hover:text-primary cursor-pointer">
          <ChevronLeft />
        </button>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm font-extralight">{dashboardDate.getMonth()+1}.{dashboardDate.getFullYear()}</p>
          <p className="text-2xl leading-5">{dashboardDate.toLocaleString('default', { month: 'long' })}</p>
          <button onClick={resetToCurrent} className="opacity-0 cursor-pointer group-hover:opacity-100 underline hover:text-secondary transition-opacity duration-150 text-primary text-xs mt-1 font-extralight">back to current</button>
        </div>
        <button onClick={setNextMonth} className="hover:text-primary cursor-pointer">
          <ChevronRight />
        </button>
      </div>
      <StatsCards transactions={transactions} />
      <div className="grid gap-5 grid-cols-6 ">
        <Card className="flex  flex-col gap-5 col-span-6 lg:col-span-4 lg:order-1 order-2">
          <Chart transactions={transactions} />
        </Card>
        <Card className="flex flex-col gap-5 col-span-6 lg:col-span-2 lg:order-2 order-1">
          <AddTransactions onAddTransaction={handleAddTransaction} />
        </Card>
      </div>
      <div className="w-full">
        <Card>
          <History transactions={transactions} />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
