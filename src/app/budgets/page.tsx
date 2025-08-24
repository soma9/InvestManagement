
'use client';

import React, { useState, useMemo } from 'react';
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
import BudgetCard from '@/components/budgets/budget-card';
import AddBudgetDialog from '@/components/budgets/add-budget-dialog';
import type { Budget, BudgetData } from '@/components/budgets/budget-card';

const initialBudgets: BudgetData[] = [
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
  const [budgets, setBudgets] = useState<BudgetData[]>(initialBudgets);
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);

  const addBudget = (newBudget: Omit<BudgetData, 'id'>) => {
    setBudgets((prev) => [
      ...prev,
      { ...newBudget, id: crypto.randomUUID() },
    ]);
  };

  const updateBudget = (updatedBudget: BudgetData) => {
    setBudgets((prev) =>
      prev.map((b) => (b.id === updatedBudget.id ? updatedBudget : b))
    );
  };

  const deleteBudget = (id: string) => {
    setBudgets((prev) => prev.filter((b) => b.id !== id));
  };


  const budgetsWithSpent = useMemo((): Budget[] => {
    return budgets.map((budget) => {
      const spent = transactions
        .filter(
          (t) => t.type === 'expense' && t.category?.toLowerCase() === budget.name.toLowerCase()
        )
        .reduce((acc, t) => acc + t.amount, 0);
      return { ...budget, spent };
    });
  }, [transactions, budgets]);

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
        <AddBudgetDialog
          open={isAddDialogOpen}
          onOpenChange={setAddDialogOpen}
          onAddBudget={addBudget}
        >
          <Button>
            <PlusCircle />
            <span>Add New Budget</span>
          </Button>
        </AddBudgetDialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {budgetsWithSpent.length === 0 ? (
           <Card className="md:col-span-2 lg:col-span-3">
             <CardContent className="p-8 flex flex-col items-center justify-center text-center gap-4">
                <PiggyBank className="w-16 h-16 text-muted" />
                <h3 className="font-semibold text-xl">No Budgets Found</h3>
                <p className="text-muted-foreground">
                  Click "Add New Budget" to create your first spending budget.
                </p>
             </CardContent>
           </Card>
        ) : (
          budgetsWithSpent.map((budget) => (
            <BudgetCard key={budget.id} budget={budget} onUpdate={updateBudget} onDelete={deleteBudget} />
          ))
        )}
      </div>
    </div>
  );
}
