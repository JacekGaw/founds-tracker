import {
    createContext,
    useContext,
  } from "react";
  import type { ReactNode } from "react";
  
  
  interface TransactionContextProps {

  }

  export type NewTransaction = {
    transactionDate: string,
    type: string,
    category: string,
    amount: string,
    description: string,
  }
  
  export const TransactionContext = createContext<TransactionContextProps | undefined>(
    undefined
  );
  
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

    
    
  
    const ctxValue = {
    };
  
    return (
      <TransactionContext.Provider value={ctxValue}>{children}</TransactionContext.Provider>
    );
  };
  