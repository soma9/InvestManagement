'use client';

import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTransactions } from '@/context/transaction-context';
import { useCurrency } from '@/context/currency-context';
import { Bar, BarChart, XAxis, YAxis, Tooltip } from 'recharts';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';

const initialBudgets = [
  {
    name: 'Groceries',
    amount: 500,
  },
  {
    name: 'Entertainment',
    amount: 200,
  },
  {
    name: 'Transport',
    amount: 150,
  },
  {
    name: 'Utilities',
    amount: 250,
  },
];

const chartConfig = {
    spent: {
      label: 'Spent',
      color: 'hsl(var(--primary))',
    },
    amount: {
      label: 'Budget',
      color: 'hsl(var(--secondary))',
    },
  };

export default function BudgetOverview() {
  const { transactions } = useTransactions();
  const { formatCurrency, convertFromUSD } = useCurrency();

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
  
  const convertedBudgetData = useMemo(() => {
    return budgetsWithSpent.map(b => ({
        ...b,
        spent: convertFromUSD(b.spent),
        amount: convertFromUSD(b.amount),
        originalSpent: b.spent,
        originalAmount: b.amount,
    }))
  }, [budgetsWithSpent, convertFromUSD]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Overview</CardTitle>
        <CardDescription>
          Your spending summary for this month.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
            <BarChart data={convertedBudgetData} layout="vertical" margin={{left: 10, right: 10}}>
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={10} width={80} />
                <Tooltip cursor={false} content={<ChartTooltipContent
                    formatter={(value, name, item) => {
                        if (name === 'spent') {
                            return `${formatCurrency(item.payload.originalSpent)} / ${formatCurrency(item.payload.originalAmount)}`
                        }
                    }}
                    labelFormatter={(value) => `${value}`}
                 />} />
                <Bar dataKey="spent" name="Spent" fill="var(--color-spent)" radius={4} />
            </BarChart>
        </ChartContainer>
        <div className='flex justify-end'>
            <Link href="/budgets">
                <Button variant="outline">
                    Manage Budgets <ArrowRight className="ml-2" />
                </Button>
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}
