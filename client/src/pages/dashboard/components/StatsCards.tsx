import { TrendingDown, TrendingUp, PiggyBank, HandCoins } from "lucide-react";
import Card from "../../../components/UI/Card";
import { useUserCtx } from "../../../store/UserContext";
import type { TransactionType } from "../../../store/TransactionContext";

const StatsCards: React.FC<{transactions: TransactionType[]}> = ({transactions}) => {
    const { user } = useUserCtx();
    const transactionsGroup = Object.groupBy(transactions, ({type}) => type);
    const expenses = transactionsGroup.expense?.reduce((sum, transactions) => {
      return sum += parseFloat(transactions.amount)
    }, 0) ?? 0;
    const income = transactionsGroup.income?.reduce((sum, transactions) => {
      return sum += parseFloat(transactions.amount)
    }, 0) ?? 0;
    const savings = transactionsGroup.savings?.reduce((sum, transactions) => {
      return sum += parseFloat(transactions.amount)
    }, 0) ?? 0;
    const balance = income - expenses - savings;

    return (
        <div className="grid justify-between items-stretch gap-5 grid-cols-2 lg:grid-cols-4 grid-wrap ">
        <Card className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <p>Expenses</p>
            <TrendingDown />
          </div>
          <div className="font-extralight">
            <span className="font-bold text-lg sm:text-xl lg:text-3xl mr-1">{expenses.toFixed(2)}</span>
            {user?.currency}
          </div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <p>Income</p>
            <TrendingUp />
          </div>
          <div className="font-extralight">
            <span className="font-bold text-lg sm:text-xl lg:text-3xl mr-1">{income.toFixed(2)}</span>
            {user?.currency}
          </div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <p>Savings</p>
            <PiggyBank />
          </div>
          <div className="font-extralight">
            <span className="font-bold text-lg sm:text-2xl lg:text-3xl mr-1">{savings.toFixed(2)}</span>
            {user?.currency}
          </div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <p>Balance</p>
            <HandCoins />
          </div>
          <div className="font-extralight">
            <span className="font-bold text-lg sm:text-xl lg:text-3xl mr-1">{balance.toFixed(2)}</span>
            {user?.currency}
          </div>
        </Card>
      </div>
    )
} 

export default StatsCards;