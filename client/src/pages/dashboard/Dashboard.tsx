import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import StatsCards from "./components/StatsCards";
import Card from "../../components/UI/Card";
import AddTransactions from "./components/AddTransactions";
import History from "./components/History";

const Dashboard: React.FC = () => {

  return (
    <div className="w-full flex flex-col gap-10">
      <div className="flex gap-5 justify-center items-center font-bold">
        <button className="hover:text-primary cursor-pointer">
          <ChevronLeft />
        </button>
        <div className="flex flex-col justify-center items-center">
          <p className="text-sm font-extralight">11.2025</p>
          <p className="text-2xl leading-5">November</p>
        </div>
        <button className="hover:text-primary cursor-pointer">
          <ChevronRight />
        </button>
      </div>
      <StatsCards />
      <div className="grid gap-5 grid-cols-6">
        <Card className="flex flex-col gap-5 col-span-4">
            <p>Categorized Expenses Chart</p>
        </Card>
        <Card className="flex flex-col gap-5 col-span-2">
            <AddTransactions />
        </Card>
      </div>
      <div className="w-full">
        <Card>
            <History />
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
