
'use client';

import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle, PiggyBank } from 'lucide-react';
import { useTransactions } from '@/context/transaction-context';
import BudgetCard, { type Budget } from '@/components/budgets/budget-card';

const initialBudgets: Omit<Budget, 'spent'>[] = [
  {
    id: '1',
    name: 'Groceries',
    amount: 500,
    icon: 'ShoppingCart',
  },
  {
    id: '2',
    name: 'Entertainment',
    amount: 200,
    icon: 'Ticket',
  },
  {
    id: '3',
    name: 'Transport',
    amount: 150,
    icon: 'Car',
  },
  {
    id: '4',
    name: 'Utilities',
    amount: 250,
    icon: 'Home',
  },
];

export default function BudgetsPage() {
  const { transactions } = useTransactions();

  const budgetsWithSpent = useMemo(() => {
    return initialBudgets.map((budget) => {
      const spent = transactions
        .filter(
          (t) => t.type === 'expense' && t.category === budget.name.toLowerCase()
        )
        .reduce((acc, t) => acc + t.amount, 0);
      return { ...budget, spent };
    });
  }, [transactions]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
            <PiggyBank className="w-10 h-10 text-primary" />
            Monthly Budgets
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your spending and stay on top of your financial goals.
          </p>
        </div>
        <Button>
          <PlusCircle />
          <span>Add New Budget</span>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgetsWithSpent.map((budget) => (
          <BudgetCard key={budget.id} budget={budget} />
        ))}
      </div>
    </div>
  );
}
