import { createContext, useContext } from "react";
import useTransactions from "../hooks/useTransactions";

const TransactionsContext = createContext();

export function TransactionsProvider({ children }) {
  const transactionsState = useTransactions();
  return (
    <TransactionsContext.Provider value={transactionsState}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactionsContext() {
  return useContext(TransactionsContext);
}
