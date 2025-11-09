import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import api from "../api/api";
import type { AxiosResponse } from "axios";

interface TransactionContextProps {
  addNewTransaction: (
    newTransactionData: NewTransaction
  ) => Promise<string | null>;
  getTransactions: (
    filters?: GetTransactionsFilters
  ) => Promise<TransactionType[] | null>;
}

export type NewTransaction = {
  transactionDate: string;
  type: string;
  category: string;
  amount: string;
  description: string;
};

export type TransactionType = {
    id: number;
    createdAt: string;
    userId: number;
    transactionDate: string;
    type: "expense" | "savings" | "income";
    categoryId: number | null;
    amount: string;
    description: string | null;
    name: string;
  };

  export type GetTransactionsFilters = {
    categoryId?: number;
    type?: "expense" | "savings" | "income";
    from?: string;
    to?: string;
  };

export const TransactionContext = createContext<
  TransactionContextProps | undefined
>(undefined);

export const useTransactionCtx = (): TransactionContextProps => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error(
      "TransactionContext must be used within an TransactionContextProvider"
    );
  }
  return context;
};

export const TransactionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
    const getTransactions = async (
        filters?: GetTransactionsFilters
      ): Promise<TransactionType[] | null> => {
        try {
          const params = new URLSearchParams();
    
          if (filters?.categoryId !== undefined) {
            params.append("categoryId", filters.categoryId.toString());
          }
          if (filters?.type) {
            params.append("type", filters.type);
          }
          if (filters?.from) {
            params.append("from", filters.from);
          }
          if (filters?.to) {
            params.append("to", filters.to);
          }
    
          const queryString = params.toString();
          const url = `/api/transactions${queryString ? `?${queryString}` : ""}`;
    
          const result: AxiosResponse<TransactionType[]> = await api.get(url);
          return result.data;
        } catch (err: unknown) {
          console.error("Error fetching transactions:", err);
          if (err instanceof Error) {
            throw new Error(err.message);
          }
          throw new Error("Error fetching transactions");
        }
      };

  const addNewTransaction = async (
    newTransactionData: NewTransaction
  ): Promise<string | null> => {
    try {
      await api.post("/api/transaction", {
        ...newTransactionData
      });
      return null;
    } catch (err: unknown) {
      if (err instanceof Error) {
        return err.message;
      }
      return "Error adding new transaction";
    }
  };

  const ctxValue = {
    addNewTransaction,
    getTransactions,
  };

  return (
    <TransactionContext.Provider value={ctxValue}>
      {children}
    </TransactionContext.Provider>
  );
};
