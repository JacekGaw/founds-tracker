import { useCategoryCtx } from "../store/CategoryContext";
import type { TransactionType } from "../store/TransactionContext";
import { useUserCtx } from "../store/UserContext";

const TransactionsTable: React.FC<{
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
    
      const getCategoryColor = (id: number | null): string | undefined => {
        if (id === null) {
          return undefined;
        }
        return categories.find((c) => c.id === id)?.color ?? undefined;
      };
    
      const getTextColorForBg = (hexColor?: string): string => {
        if (!hexColor) return "#000";
      
        const color = hexColor.replace("#", "");
      
        const r = parseInt(color.substring(0, 2), 16);
        const g = parseInt(color.substring(2, 4), 16);
        const b = parseInt(color.substring(4, 6), 16);
      
        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      
        return luminance > 186 ? "#000" : "#fff";
      };

    return (
        <>
            {transactions.length > 0 ? (
          transactions.map((t) => (
            <div
              className="min-w-[700px] grid grid-cols-6 gap-2 bg-bg px-1 py-2 border-b border-border-muted text-sm"
              key={t.id}
            >
              <p className="whitespace-nowrap">{t.transactionDate}</p>
              <p className="whitespace-nowrap">
                <span  className="p-1 rounded-full" style={{ backgroundColor: getCategoryColor(t.categoryId), color: getTextColorForBg(getCategoryColor(t.categoryId)), }}>
                {getCategoryName(t.categoryId)}</span>
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
        </>
    )
}

export default TransactionsTable;