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
    <div className="group flex justify-between items-center bg-bg-light border border-border-muted rounded-md py-1 px-2">
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
  );
};

const CategoriesModal: React.FC = () => {
  const { categories, addCategories, deleteCategory } = useCategoryCtx();
  const [isDeletePending, startTransition] = useTransition();

  const [state, addCategory, isPending] = useActionState<FormState, FormData>(
    async (_previousState: FormState, formData: FormData) => {
      const name = formData.get("name") as string;
      const type = formData.get("type") as "expense" | "income" | "savings";
      const newCategoryArr = [{ name, type }];
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
            <button
              disabled={isPending}
              type="submit"
              className="bg-primary text-white hover:scale-105 transition-all duration-200 cursor-pointer p-2 text-sm rounded-sm"
            >
              <Plus size={16} />
            </button>
          </div>
          {state?.error ? state.error : null}
        </form>
      </div>
    </div>
  );
};

export default CategoriesModal;
