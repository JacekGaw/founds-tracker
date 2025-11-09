import { useCategoryCtx } from "../../../store/CategoryContext";
import type { TransactionType } from "../../../store/TransactionContext";
import { PieChart, Pie, ResponsiveContainer, Cell } from "recharts";
import { useUserCtx } from "../../../store/UserContext";

type ChartDataItem = {
    name: string;
    value: number;
  };

const Chart: React.FC<{ transactions: TransactionType[] }> = ({
  transactions
}) => {
  const { categories } = useCategoryCtx();
  const { user } = useUserCtx()
  const expensesTransactions = transactions.filter((c) => c.type === "expense");

  const getCategoryName = (id: number | null): string => {
    if (id === null) {
      return "No category";
    }
    return categories.find((c) => c.id === id)?.name ?? "No category";
  };
  const getCategoryBreakdown = () => {
    const breakdown: Record<string, number> = {};

    expensesTransactions.forEach((t) => {
      const categoryName = getCategoryName(t.categoryId);
      breakdown[categoryName] =
        (breakdown[categoryName] || 0) + Number(t.amount);
    });

    return Object.entries(breakdown).map(([name, value]) => ({
      name,
      value: Math.round(value * 100) / 100,
    }));
  };

  const categoryData: ChartDataItem[] = transactions.length !== 0 ? getCategoryBreakdown() : [];

  return (
    <div className="flex flex-col gap-5">
      <p>Expenses Chart</p>
      <div className="w-full flex justify-center items-center p-5">
        {transactions.length === 0 ? (
          <div className="text-text-muted font-extralight">No transactions</div>
        ) : (
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={(entry) => {
                    const e = entry as unknown as ChartDataItem;
                    return `${e.name}: ${e.value.toFixed(2)} ${user?.currency}`;
                  }}
              >
                {categoryData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={"#A77"} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default Chart;
