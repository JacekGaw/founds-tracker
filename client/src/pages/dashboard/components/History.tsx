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
      <div className="w-full overflow-x-auto min-w-xl max-h-[400px] h-full overflow-y-auto">
        <div className="grid gap-2 grid-cols-6 p-1 bg-bg-dark text-sm text-text-muted uppercase">
          <p>Transaction Date</p>
          <p>Category</p>
          <p>Type</p>
          <p>Amount</p>
          <p className="col-span-2">Description</p>
        </div>
        {transactions.length > 0
          ? transactions.map((t) => (
              <div
                className="grid grid-cols-6 gap-2 bg-bg px-1 py-2 border-b border-border-muted text-sm "
                key={t.id}
              >
                <p>{t.transactionDate}</p>
                <p>{getCategoryName(t.categoryId)}</p>
                <p>{t.type}</p>
                <p>
                  {t.amount}
                  {user?.currency}
                </p>
                <p className="col-span-2">{t.description}</p>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default History;
