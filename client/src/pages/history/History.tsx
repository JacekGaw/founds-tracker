import { useState, useEffect } from "react";
import TransactionsTable from "../../components/TransactionsTable";
import Card from "../../components/UI/Card";
import type {
  GetTransactionsFilters,
  TransactionType,
} from "../../store/TransactionContext";
import { useSearchParams } from "react-router";
import { useTransactionCtx } from "../../store/TransactionContext";
import Input, { type OptionType } from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { Search } from "lucide-react";
import { getMonthRange } from "../../helpers/dateHelpers";
import { useCategoryCtx } from "../../store/CategoryContext";
import DateRangePicker from "../../components/DateRangePicker";

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


const History: React.FC = () => {
  const [choosenType, setChoosenType] = useState<
    "expense" | "income" | "savings" | undefined
  >(undefined);
  const [showCustomDatePickers, setShowCustomDatePickers] = useState<boolean>(false);
  const [historyTransactions, setHistoryTransactions] = useState<
    TransactionType[]
  >([]);
  const { categories } = useCategoryCtx();
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultDate = getMonthRange(new Date());

  const DEFAULT_FILTERS: Partial<GetTransactionsFilters> = {
    from: defaultDate.from,
    to: defaultDate.to,
    phrase: "",
    type: undefined,
    categoryId: undefined,
  };

  const filters: GetTransactionsFilters = {
    from: searchParams.get("from") ?? DEFAULT_FILTERS.from,
    to: searchParams.get("to") ?? DEFAULT_FILTERS.to,
    phrase: searchParams.get("phrase") ?? DEFAULT_FILTERS.phrase,
    type: ["expense", "income", "savings"].includes(
      searchParams.get("type") || ""
    )
      ? (searchParams.get("type") as "expense" | "income" | "savings")
      : undefined,
    categoryId: searchParams.get("categoryId")
      ? Number(searchParams.get("categoryId"))
      : DEFAULT_FILTERS.categoryId,
  };

  const [formValues, setFormValues] = useState(filters);
  const { getTransactions } = useTransactionCtx();

  const getHistoryTransactions = async (params: GetTransactionsFilters) => {
    const transactions = await getTransactions(params);

    if (transactions) {
      setHistoryTransactions(transactions);
    }
  };

  useEffect(() => {
    setFormValues(filters);
    console.log("Hey");
    getHistoryTransactions(filters);
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (from: string, to: string, custom: boolean) => {
    setFormValues((prev) => ({ ...prev, from, to }));
    if(custom) {
        setShowCustomDatePickers(true);
    } else setShowCustomDatePickers(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const params: Record<string, string> = {};

    if (formValues.from) params.from = formValues.from;
    if (formValues.to) params.to = formValues.to;
    if (formValues.phrase) params.phrase = formValues.phrase;
    if (formValues.type) params.type = formValues.type;
    if (formValues.categoryId !== undefined)
      params.categoryId = formValues.categoryId.toString();

    setSearchParams(params);
    await getHistoryTransactions(params);
  };

  return (
    <>
      <div className="w-full flex flex-col gap-10">
        <header>
          <h1 className="text-xl text-center">History</h1>
        </header>
        <Card className="flex flex-col gap-5">
          <h2>Filters:</h2>
          <form
            className="flex items-center gap-5 flex-wrap"
            onSubmit={handleSubmit}
          >
            <DateRangePicker defaultValues={{from: formValues.from, to: formValues.to}} onChange={handleDateChange} />
            {showCustomDatePickers && <>
                <Input
              type="date"
              label="From"
              name="from"
              value={formValues.from}
              onChange={handleChange}
              required
            />
            <Input
              type="date"
              label="To"
              name="to"
              value={formValues.to}
              onChange={handleChange}
              required
            />
            </>}
            
            <Input
              inputType="select"
              label="Type"
              options={[{ value: "", text: "---" }, ...typeOptions]}
              name="type"
              value={formValues.type}
              onChange={(event) => {
                const { name, value } = event.target;

                setFormValues((prev) => ({
                  ...prev,
                  [name]: value || undefined,
                  categoryId: value ? prev.categoryId : undefined,
                }));

                setChoosenType(
                  value as "expense" | "income" | "savings" | undefined
                );
              }}
            />
            <Input
              inputType="select"
              label={<div className="group">Category</div>}
              value={formValues.categoryId}
              options={[
                { value: "", text: "---" },
                ...categories
                  .filter((c) => c.type === choosenType)
                  .map((c) => {
                    return { value: c.id.toString(), text: c.name };
                  }),
              ]}
              onChange={(event) => {
                const { name, value } = event.target;
                setFormValues((prev) => ({
                  ...prev,
                  [name]: value ? Number(value) : undefined,
                }));
              }}
              name="categoryId"
            />
            <Input
              type="text"
              label="Search Phrase"
              value={formValues.phrase}
              onChange={handleChange}
              name="phrase"
            />
            <Button type="submit" theme="primary" className="md:self-end">
              <Search className="mr-2" size={16} /> Search
            </Button>
          </form>
          <div className="w-full overflow-x-auto ">
            <div className="min-w-[700px] grid gap-2 grid-cols-6 p-1 bg-bg-dark text-sm text-text-muted uppercase">
              <p>Transaction Date</p>
              <p>Category</p>
              <p>Type</p>
              <p>Amount</p>
              <p className="col-span-2">Description</p>
            </div>

            <TransactionsTable transactions={historyTransactions} />
          </div>
        </Card>
      </div>
    </>
  );
};

export default History;
