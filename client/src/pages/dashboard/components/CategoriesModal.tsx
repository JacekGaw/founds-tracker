import { useActionState, useTransition } from "react";
import Input, { type OptionType } from "../../../components/UI/Input";
import {
  useCategoryCtx,
  type CategoryType,
} from "../../../store/CategoryContext";
import { Plus, Trash2 } from "lucide-react";

type FormState = {
  error?: string;
} | null;

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

const CategoryItem: React.FC<{
  c: CategoryType;
  deleteFn: (id: number) => void;
  disabled: boolean;
}> = ({ c, deleteFn, disabled }) => {
  return (
    <div className=" w-full group flex bg-bg-light rounded-md border border-border-muted">
      <div className="w-12 rounded-l-md border-r border-border-muted" style={{backgroundColor: c.color ?? "hsl(0 0% 98%)"}}></div>
    <div className=" flex justify-between w-full items-center py-1 px-2">
      <p>{c.name}</p>
      <div className="hidden group-hover:flex justify-end gap-2 items-center">
        <button
          disabled={disabled}
          onClick={() => deleteFn(c.id)}
          className="cursor-pointer hover:text-secondary"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
    </div>
  );
};

const CategoriesModal: React.FC = () => {
  const { categories, addCategories, deleteCategory } = useCategoryCtx();
  const [isDeletePending, startTransition] = useTransition();

  const [state, addCategory, isPending] = useActionState<FormState, FormData>(
    async (_previousState: FormState, formData: FormData) => {
      const name = formData.get("name") as string;
      const color = formData.get("color") as string;
      console.log(color);
      const type = formData.get("type") as "expense" | "income" | "savings";
      const newCategoryArr = [{ name, type, color }];
      const error = await addCategories(newCategoryArr);
      return error ? { error } : null;
    },
    null
  );

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteCategory(id);
    });
  };

  const categoriesGroups = Object.groupBy(categories, ({ type }) => type);

  return (
    <div className="flex flex-col gap-5 ">
      <div>Manage Categories</div>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-2  rounded-md pl-2">
          <p className="font-extralight">Expenses:</p>
          {categoriesGroups.expense ? (
            <div className="flex flex-col text-sm gap-2 pl-2">
              {categoriesGroups.expense.map((c) => (
                <CategoryItem
                  key={c.id}
                  c={c}
                  deleteFn={handleDelete}
                  disabled={isDeletePending}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2  rounded-md pl-2">
          <p className="font-extralight">Incomes:</p>
          {categoriesGroups.income ? (
            <div className="flex flex-col text-sm gap-2 pl-2">
              {categoriesGroups.income.map((c) => (
                <CategoryItem
                  key={c.id}
                  c={c}
                  deleteFn={handleDelete}
                  disabled={isDeletePending}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2  rounded-md pl-2">
          <p className="font-extralight">Savings:</p>
          {categoriesGroups.savings ? (
            <div className="flex flex-col text-sm gap-2 pl-2">
              {categoriesGroups.savings.map((c) => (
                <CategoryItem
                  key={c.id}
                  c={c}
                  deleteFn={handleDelete}
                  disabled={isDeletePending}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
      <div className="border-t border-border py-2">
        <form action={addCategory} className="flex flex-col gap-2">
          <div className="flex justify-between items-stretch gap-2 text-sm">
            <Input name="name" placeholder="Name" required className="w-full" />
            <Input inputType="select" options={typeOptions} name="type" />
            <Input  inputClassName="flex  h-full p-1!" defaultValue="#88AA66" name="color" type="color" />
            <button
              disabled={isPending}
              type="submit"
              className="bg-primary text-white hover:scale-105 transition-all duration-200 cursor-pointer p-4 text-sm rounded-sm"
            >
              <Plus size={16} />
            </button>
          </div>
          {state?.error ? <p>{state.error}</p> : null}
        </form>
      </div>
    </div>
  );
};

export default CategoriesModal;
