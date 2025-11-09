import { useCategoryCtx } from "../../../store/CategoryContext";
import { type TransactionType } from "../../../store/TransactionContext";
import { useUserCtx } from "../../../store/UserContext";

const History: React.FC<{
  transactions: TransactionType[];
}> = ({ transactions }) => {
  const { categories } = useCategoryCtx();
  const { user } = useUserCtx();

  const getCategoryName = (id: number | null): string => {
    if (id === null) {
      return "No category";
    }
    return categories.find((c) => c.id === id)?.name ?? "No category";
  };

  return (
    <div className="flex flex-col gap-5">
      <p>History</p>

      <div className="w-full overflow-x-auto max-h-[400px] h-full overflow-y-auto">
        <div className="min-w-[700px] grid gap-2 grid-cols-6 p-1 bg-bg-dark text-sm text-text-muted uppercase">
          <p>Transaction Date</p>
          <p>Category</p>
          <p>Type</p>
          <p>Amount</p>
          <p className="col-span-2">Description</p>
        </div>

        {/* Grid rows */}
        {transactions.length > 0 ? (
          transactions.map((t) => (
            <div
              className="min-w-[700px] grid grid-cols-6 gap-2 bg-bg px-1 py-2 border-b border-border-muted text-sm"
              key={t.id}
            >
              <p className="whitespace-nowrap">{t.transactionDate}</p>
              <p className="whitespace-nowrap">
                {getCategoryName(t.categoryId)}
              </p>
              <p className="whitespace-nowrap">{t.type}</p>
              <p className="whitespace-nowrap">
                {t.amount}
                {user?.currency}
              </p>
              <p className="col-span-2 truncate">{t.description}</p>
            </div>
          ))
        ) : (
          <div className="text-center text-text-muted p-4">No transactions</div>
        )}
      </div>
    </div>
  );
};

export default History;
