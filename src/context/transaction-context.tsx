
'use client';

import React, { createContext, useContext, useState, useMemo } from 'react';

export type Transaction = {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category?: string;
};

type TransactionContextType = {
  transactions: Transaction[];
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
};

const initialTransactions: Transaction[] = [
    { id: '1', description: 'Initial savings', amount: 125430.50, type: 'income', date: new Date().toISOString() },
    { id: '2', description: 'Groceries', amount: 75.5, type: 'expense', date: new Date().toISOString(), category: 'groceries' },
    { id: '3', description: 'Freelance Project', amount: 1500, type: 'income', date: new Date(new Date().setDate(new Date().getDate() - 5)).toISOString() },
    { id: '4', description: 'Dinner Out', amount: 120, type: 'expense', date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString(), category: 'entertainment' },
];

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: crypto.randomUUID() }].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };
  
  const value = useMemo(() => ({
    transactions,
    addTransaction,
  }), [transactions]);

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
};
