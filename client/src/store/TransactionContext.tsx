import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import api from "../api/api";
import type { AxiosResponse } from "axios";

interface TransactionContextProps {
  addNewTransaction: (
    newTransactionData: NewTransaction
  ) => Promise<string | null>;
}

export type NewTransaction = {
  transactionDate: string;
  type: string;
  category: string;
  amount: string;
  description: string;
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
  const addNewTransaction = async (
    newTransactionData: NewTransaction
  ): Promise<string | null> => {
    try {
      const result: AxiosResponse = await api.post("/api/transaction", {
        ...newTransactionData,
        category: "1",
      });
      console.log(result.data);
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
  };

  return (
    <TransactionContext.Provider value={ctxValue}>
      {children}
    </TransactionContext.Provider>
  );
};
