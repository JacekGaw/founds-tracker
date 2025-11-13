import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useUserCtx } from "./UserContext";
import api from "../api/api";

interface CategoryContextProps {
  categories: CategoryType[];
  addCategories: (data: NewCategoryType[]) => Promise<string | null>;
  deleteCategory: (id: number) => Promise<void>;
  updateCategory: (id: number, updateData: Partial<UpdateCategoryType>) => Promise<string | null>;
}

export type CategoryType = {
  id: number;
  name: string;
  type: "expense" | "income" | "savings";
  createdAt: string;
  userId: string;
  color: string | null;
};

export type NewCategoryType = {
  name: string;
  type: "expense" | "income" | "savings";
  color: string;
};

export type UpdateCategoryType = {
  name: string;
  color: string | null;
};

export const DEFAULT_CAT_COLOR = "#fafafa";

export const CategoryContext = createContext<CategoryContextProps | undefined>(
  undefined
);

export const useCategoryCtx = (): CategoryContextProps => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error(
      "CategoryContext must be used within an CategoryContextProvider"
    );
  }
  return context;
};

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const { user } = useUserCtx();

  useEffect(() => {
    getCategories();
  }, [user]);

  const addCategories = async (
    newCategories: NewCategoryType[]
  ): Promise<string | null> => {
    try {
      const response = await api.post("api/category", newCategories);
      if (response.data as CategoryType[]) {
        setCategories((p) => [...p, ...response.data]);
      }
      return null;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
      return "Error adding new category";
    }
  };

  const getCategories = async () => {
    if (user) {
      try {
        const response = await api.get("api/categories");
        if (response.data) {
          setCategories(response.data);
        }
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };

  const deleteCategory = async (id: number) => {
    try {
      const _response = await api.delete(`api/category/${id}`);
      setCategories((p) => p.filter((p) => p.id !== id));
    } catch (err: unknown) {
      console.error(err);
    }
  };

  const updateCategory = async (id: number, updateData: Partial<UpdateCategoryType>) => {
    try {
      const response = await api.patch(`api/category/${id}`, updateData);
      const updatedCategory: CategoryType = response.data;
      if(!updateCategory){
        return null;
      }
      setCategories((p) => p.map((cat) => cat.id === id ? updatedCategory : cat));
      return null;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
      return "Error updating category";
    }
  }

  const ctxValue = {
    categories,
    addCategories,
    deleteCategory,
    updateCategory
  };

  return (
    <CategoryContext.Provider value={ctxValue}>
      {children}
    </CategoryContext.Provider>
  );
};
