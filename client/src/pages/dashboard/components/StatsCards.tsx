import { TrendingDown, TrendingUp, PiggyBank, HandCoins } from "lucide-react";
import Card from "../../../components/UI/Card";
import { useUserCtx } from "../../../store/UserContext";

const StatsCards: React.FC = () => {
    const { user } = useUserCtx();

    return (
        <div className="grid justify-between items-stretch gap-5 grid-cols-2 lg:grid-cols-4 grid-wrap ">
        <Card className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <p>Expenses</p>
            <TrendingDown />
          </div>
          <div className="font-extralight">
            <span className="font-bold text-3xl mr-1">{1236.64}</span>
            {user?.currency}
          </div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <p>Income</p>
            <TrendingUp />
          </div>
          <div className="font-extralight">
            <span className="font-bold text-3xl mr-1">{6500}</span>
            {user?.currency}
          </div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <p>Savings</p>
            <PiggyBank />
          </div>
          <div className="font-extralight">
            <span className="font-bold text-3xl mr-1">{500}</span>
            {user?.currency}
          </div>
        </Card>
        <Card className="flex flex-col gap-2">
          <div className="flex gap-2 justify-between">
            <p>Balance</p>
            <HandCoins />
          </div>
          <div className="font-extralight">
            <span className="font-bold text-3xl mr-1">{4767.91}</span>
            {user?.currency}
          </div>
        </Card>
      </div>
    )
} 

export default StatsCards;