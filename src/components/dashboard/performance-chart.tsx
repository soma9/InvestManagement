'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useCurrency } from '@/context/currency-context';
import type { Transaction } from '@/context/transaction-context';
import { useMemo } from 'react';
import { format, subMonths, startOfMonth } from 'date-fns';

const chartConfig = {
  portfolio: {
    label: 'Portfolio Value',
    color: 'hsl(var(--primary))',
  },
};

export default function PerformanceChart({ transactions }: { transactions: Transaction[] }) {
  const { formatCurrency, convertFromUSD, currency } = useCurrency();

  const chartData = useMemo(() => {
    const twelveMonthsAgo = subMonths(new Date(), 11);
    const monthlyData: { month: string; portfolio: number, originalValue: number }[] = [];

    // Initialize months
    for (let i = 0; i < 12; i++) {
      const monthDate = startOfMonth(subMonths(new Date(), 11 - i));
      monthlyData.push({ month: format(monthDate, 'MMM'), portfolio: 0, originalValue: 0 });
    }

    let runningTotal = 0;
    const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    for (const transaction of sortedTransactions) {
      const transactionDate = new Date(transaction.date);
      if (transactionDate < startOfMonth(twelveMonthsAgo)) {
        if (transaction.type === 'income') {
          runningTotal += transaction.amount;
        } else {
          runningTotal -= transaction.amount;
        }
      }
    }

    monthlyData.forEach((monthData, index) => {
        const currentMonthDate = startOfMonth(subMonths(new Date(), 11 - index));
        const nextMonthDate = startOfMonth(subMonths(new Date(), 10 - index));
        
        const monthTransactions = sortedTransactions.filter(t => {
            const tDate = new Date(t.date);
            return tDate >= currentMonthDate && tDate < nextMonthDate;
        });

        if (index === 0) {
            monthData.portfolio = runningTotal;
        } else {
            monthData.portfolio = monthlyData[index - 1].portfolio;
        }
        
        for (const transaction of monthTransactions) {
            if (transaction.type === 'income') {
                monthData.portfolio += transaction.amount;
            } else {
                monthData.portfolio -= transaction.amount;
            }
        }
    });

    monthlyData.forEach(md => md.originalValue = md.portfolio);

    return monthlyData;

  }, [transactions]);
  
  const convertedChartData = chartData.map(item => ({
      ...item,
      portfolio: convertFromUSD(item.portfolio),
  }));

  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart
        accessibilityLayer
        data={convertedChartData}
        margin={{
          left: 12,
          right: 12,
          top: 10,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => {
            const numericValue = typeof value === 'number' ? value : 0;
            if (currency === 'JPY' || currency === 'INR') {
                return `${Math.round(numericValue / 1000)}k`
            }
            return `$${(numericValue / 1000).toFixed(0)}k`
          }}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value, payload) =>
                `Value in ${payload[0]?.payload.month}`
              }
              formatter={(value, name, item) => formatCurrency(item.payload.originalValue)}
            />
          }
        />
        <defs>
          <linearGradient id="fillPortfolio" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="var(--color-portfolio)"
              stopOpacity={0.8}
            />
            <stop
              offset="95%"
              stopColor="var(--color-portfolio)"
              stopOpacity={0.1}
            />
          </linearGradient>
        </defs>
        <Area
          dataKey="portfolio"
          type="natural"
          fill="url(#fillPortfolio)"
          stroke="var(--color-portfolio)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}
