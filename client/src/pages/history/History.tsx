import { useState, useEffect } from "react";
import TransactionsTable from "../../components/TransactionsTable";
import Card from "../../components/UI/Card";
import type { GetTransactionsFilters, TransactionType } from "../../store/TransactionContext";
import { useSearchParams } from "react-router";
import { useTransactionCtx } from "../../store/TransactionContext";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import { Search } from "lucide-react";
import { getMonthRange } from "../../helpers/dateHelpers";

const History: React.FC = () => {
    const [historyTransactions, setHistoryTransactions] = useState<TransactionType[]>([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const defaultDate = getMonthRange(new Date());
    console.log(defaultDate)
    const DEFAULT_FILTERS = {
        from: defaultDate.from,
        to: defaultDate.to,
        phrase: "",
      };

    const filters = {
        from: searchParams.get("from") ?? DEFAULT_FILTERS.from,
        to: searchParams.get("to") ?? DEFAULT_FILTERS.to,
        phrase: searchParams.get("phrase") ?? DEFAULT_FILTERS.phrase,
      };
    const [formValues, setFormValues] = useState(filters);
    const { getTransactions } = useTransactionCtx()

    

    const getHistoryTransactions = async (params: GetTransactionsFilters) => {
        const transactions = await getTransactions(params);
      
        if (transactions) {
          setHistoryTransactions(transactions);
        }
      };

    useEffect(() => {
        setFormValues(filters);
        console.log("Hey")
        getHistoryTransactions(filters);
    }, [searchParams])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
      };
      
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        const params: Record<string, string> = {};
      
        if (formValues.from) params.from = formValues.from;
        if (formValues.to) params.to = formValues.to;
        if (formValues.phrase) params.phrase = formValues.phrase;
      
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
          <form className="flex items-center gap-5 flex-wrap" onSubmit={handleSubmit}> 
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
