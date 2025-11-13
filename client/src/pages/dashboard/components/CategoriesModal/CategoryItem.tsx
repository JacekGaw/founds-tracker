import { Check, Edit2, Trash2, X } from "lucide-react";
import {
  DEFAULT_CAT_COLOR,
  useCategoryCtx,
  type CategoryType,
  type UpdateCategoryType,
} from "../../../../store/CategoryContext";
import { useActionState, useRef } from "react";
import Input from "../../../../components/UI/Input";
import Modal, { type ModalRef } from "../../../../components/UI/Modal";
import Button from "../../../../components/UI/Button";

type FormState = {
  error?: string;
} | null;

const CategoryItem: React.FC<{
  c: CategoryType;
  deleteFn: (id: number) => void;
  disabled: boolean;
  inEdit: boolean;
  editCategoryFn: (id: number | null) => void;
}> = ({ c, deleteFn, disabled, inEdit, editCategoryFn }) => {
  const { updateCategory } = useCategoryCtx();
  const modalRef = useRef<ModalRef>(null);

  const [state, saveChanges, isPending] = useActionState<FormState, FormData>(
    async (_previousState: FormState, formData: FormData) => {
      const name = formData.get("name") as string;
      const color = formData.get("color") as string;

      const updateCatData: Partial<UpdateCategoryType> = { name: name };
      if (color !== DEFAULT_CAT_COLOR) {
        updateCatData.color = color;
      }
      const error = await updateCategory(c.id, updateCatData);
      editCategoryFn(null);
      return error ? { error } : null;
    },
    null
  );

  const handleDelete = () => {
    deleteFn(c.id);
    modalRef.current?.close();
  };

  if (inEdit) {
    return (
      <div className="w-full bg-bg-light text-xs rounded-md border border-border-muted flex flex-col">
        <form action={saveChanges} className=" w-full group flex ">
          <Input
            inputClassName="flex h-full p-0!"
            name="color"
            type="color"
            defaultValue={c.color ?? DEFAULT_CAT_COLOR}
          />

          <div className=" flex justify-between w-full items-center py-1 px-2">
            <div className="flex">
              <Input
                name="name"
                placeholder="Name"
                required
                defaultValue={c.name}
                inputClassName="p-1!"
              />
            </div>

            <div className="flex justify-end gap-2 items-center">
              <button
                disabled={isPending}
                type="submit"
                className="cursor-pointer hover:text-secondary"
              >
                <Check size={16} />
              </button>
              <button
                disabled={isPending}
                type="button"
                onClick={() => editCategoryFn(null)}
                className="cursor-pointer hover:text-secondary"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </form>
        {state?.error ? (
          <p className="text-sm p-1 text-red-600">{state.error}</p>
        ) : null}
      </div>
    );
  }

  return (
    <>
      <Modal ref={modalRef}>
        <div className="flex flex-col gap-5">
          <p className="text-lg font-bold text-center">Are you sure?</p>
          <p className="text-base">
            If you delete <strong>{c.name}</strong> category, expenses added
            with it will be marked as <strong>No category</strong>.
          </p>
          <div className="w-full flex justify-end text-sm">
            <Button onClick={() => modalRef.current?.close()} theme="none">
              Cancel
            </Button>
            <Button onClick={handleDelete} theme="danger">
              Delete
            </Button>
          </div>
        </div>
      </Modal>
      <div className=" w-full group flex bg-bg-light rounded-md border border-border-muted">
        <div
          className="w-12 rounded-l-md border-r border-border-muted"
          style={{ backgroundColor: c.color ?? DEFAULT_CAT_COLOR }}
        ></div>
        <div className=" flex justify-between w-full items-center py-1 px-2">
          <p>{c.name}</p>
          <div className="hidden group-hover:flex justify-end gap-2 items-center">
            <button
              disabled={disabled}
              onClick={() => editCategoryFn(c.id)}
              className="cursor-pointer hover:text-secondary"
            >
              <Edit2 size={16} />
            </button>
            <button
              disabled={disabled}
              onClick={() => modalRef.current?.open()}
              className="cursor-pointer hover:text-secondary"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryItem;
