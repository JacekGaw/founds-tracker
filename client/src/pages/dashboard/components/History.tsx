import TransactionsTable from "../../../components/TransactionsTable";
import { type TransactionType } from "../../../store/TransactionContext";

const History: React.FC<{
  transactions: TransactionType[];
}> = ({ transactions }) => {
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

        <TransactionsTable transactions={transactions} />
      </div>
    </div>
  );
};

export default History;
