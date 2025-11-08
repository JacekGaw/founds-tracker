import { PlusCircle } from "lucide-react";
import Button from "../../../components/UI/Button";
import Input from "../../../components/UI/Input";
import type { OptionType } from "../../../components/UI/Input";
import { useUserCtx } from "../../../store/UserContext";
import { useActionState } from "react";
import {
  useTransactionCtx,
  type NewTransaction,
} from "../../../store/TransactionContext";

const typeOptions: Array<OptionType> = [
  {
    value: "expense",
    text: "Expense",
  },
  {
    value: "income",
    text: "Income",
  },
  {
    value: "savings",
    text: "Savings",
  },
];

type FormState = {
  error?: string;
} | null;

const AddTransactions: React.FC = () => {
  const { user } = useUserCtx();

  const [state, handleAddExpense, isPending] = useActionState<
    FormState,
    FormData
  >(async (previousState: FormState, formData: FormData) => {
    console.log(previousState, formData);
    const transactionDate = formData.get("transactionDate") as string;
    const type = formData.get("type") as string;
    const category = formData.get("category") as string;
    const amount = formData.get("amount") as string;
    const description = formData.get("description") as string;
    const newTransaction: NewTransaction = {
      transactionDate,
      type,
      category,
      amount,
      description,
    };
    console.log(newTransaction);
    return null;
  }, null);

  return (
    <>
      <p>Add Transaction</p>
      <form action={handleAddExpense} className="flex flex-col gap-2 text-sm">
        <Input
          type="date"
          label="Transaction Date"
          name="transactionDate"
          required
        />
        <Input
          inputType="select"
          label="Type"
          options={typeOptions}
          name="type"
          required
        />
        <Input
          inputType="select"
          label={
            <div className="group">
              Category{" "}
              <button
                type="button"
                className="hidden group-hover:inline-block cursor-pointer hover:text-secondary text-primary underline"
              >
                manage categories
              </button>
            </div>
          }
          options={typeOptions}
          name="category"
          required
        />
        <Input
          type="number"
          name="amount"
          label={`Amount (${user?.currency})`}
          min={0}
          step="0.01"
          placeholder="0,00"
          required
        />
        <Input
          inputType="textarea"
          name="description"
          label="Description (optional)"
        />
        {state?.error ? <p>{state.error}</p> : null}
        <Button type="submit" theme="primary" disabled={isPending}>
          <PlusCircle className="mr-2" size={16} /> Add
        </Button>
      </form>
    </>
  );
};

export default AddTransactions;
