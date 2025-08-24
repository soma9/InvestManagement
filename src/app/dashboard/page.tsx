'use client';

import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import AllocationChart from '@/components/dashboard/allocation-chart';
import PerformanceChart from '@/components/dashboard/performance-chart';
import { ArrowUpRight, Wallet, Target, TrendingUp } from 'lucide-react';
import { useCurrency } from '@/context/currency-context';
import { useTransactions } from '@/context/transaction-context';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { formatCurrency } = useCurrency();
  const { transactions } = useTransactions();

  const totalValue = useMemo(() => {
    return transactions.reduce((acc, t) => {
      if (t.type === 'income') return acc + t.amount;
      return acc - t.amount;
    }, 0);
  }, [transactions]);
  
  const ytdGain = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return transactions
      .filter(t => new Date(t.date).getFullYear() === currentYear && t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
  }, [transactions]);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground">
          Welcome Back, Investor!
        </h1>
        <p className="text-muted-foreground mt-2">
          Here's a snapshot of your financial journey.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">YTD Gain/Loss</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+{formatCurrency(ytdGain)}</div>
            <p className="text-xs text-muted-foreground">+15.3% this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Goals</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 goal achieved this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Recommendation</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <Link href="/recommendations" className="block">
              <Button variant="outline" className="w-full">
                Get AI Insights
              </Button>
            </Link>
            <p className="text-xs text-muted-foreground mt-2">Based on current market data</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Portfolio Performance</CardTitle>
            <CardDescription>
              Your portfolio value over the last 12 months.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PerformanceChart transactions={transactions} />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Investment Allocation</CardTitle>
            <CardDescription>
              How your assets are currently distributed.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AllocationChart />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Financial Goals</CardTitle>
          <CardDescription>
            You are on your way to achieving your financial dreams.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Retirement Fund</span>
              <span className="text-sm text-muted-foreground">{formatCurrency(250000)} / {formatCurrency(1000000)}</span>
            </div>
            <Progress value={25} />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Dream Vacation</span>
              <span className="text-sm text-muted-foreground">{formatCurrency(8500)} / {formatCurrency(10000)}</span>
            </div>
            <Progress value={85} />
          </div>
          <div className="flex justify-between">
            <Link href="/goals">
              <Button variant="outline">View All Goals</Button>
            </Link>
            <Link href="/report">
              <Button>Generate Report</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
