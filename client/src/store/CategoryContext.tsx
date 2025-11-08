import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useUserCtx } from "./UserContext";
import api from "../api/api";

interface CategoryContextProps {
  categories: CategoryType[];
}

export type CategoryType = {
  id: string;
  name: string;
  type: "expense" | "income" | "savings";
  createdAt: string;
  userId: string;
};

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

  const addCategories = async () => {
    try {
        const newCategories = []
        const response = await api.post('api/category', newCategories);
        
    } catch (err: unknown) {
        console.error(err);
    }
  }

  const getCategories = async () => {
    if (user) {
      try {
        const response = await api.get("api/categories");
        if (response.data) {
            console.log(response.data)
          setCategories(response.data);
        }
      } catch (err: unknown) {
        console.error(err);
      }
    }
  };

  const ctxValue = {
    categories,
  };

  return (
    <CategoryContext.Provider value={ctxValue}>
      {children}
    </CategoryContext.Provider>
  );
};
