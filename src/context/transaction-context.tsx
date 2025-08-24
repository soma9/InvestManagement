
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
  deleteTransaction: (id: string) => void;
};

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

const initialTransactions: Transaction[] = [
    {
      id: '1',
      description: 'Monthly Salary',
      amount: 5000,
      type: 'income',
      date: new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString(),
    },
    {
        id: '2',
        description: 'Groceries',
        amount: 300,
        type: 'expense',
        category: 'groceries',
        date: new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString(),
    },
    {
        id: '3',
        description: 'Rent',
        amount: 1500,
        type: 'expense',
        category: 'utilities',
        date: new Date().toISOString(),
    }
  ];

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);

  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    setTransactions(prev => [...prev, { ...transaction, id: crypto.randomUUID() }].sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };
  
  const value = useMemo(() => ({
    transactions,
    addTransaction,
    deleteTransaction,
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
