'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'Jan', portfolio: 86000 },
  { month: 'Feb', portfolio: 92000 },
  { month: 'Mar', portfolio: 90000 },
  { month: 'Apr', portfolio: 98000 },
  { month: 'May', portfolio: 105000 },
  { month: 'Jun', portfolio: 102000 },
  { month: 'Jul', portfolio: 110000 },
  { month: 'Aug', portfolio: 115000 },
  { month: 'Sep', portfolio: 112000 },
  { month: 'Oct', portfolio: 118000 },
  { month: 'Nov', portfolio: 124000 },
  { month: 'Dec', portfolio: 125430 },
];

const chartConfig = {
  portfolio: {
    label: 'Portfolio Value',
    color: 'hsl(var(--primary))',
  },
};

export default function PerformanceChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
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
          tickFormatter={(value) => `$${value / 1000}k`}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              labelFormatter={(value, payload) =>
                `Value in ${payload[0]?.payload.month}`
              }
              formatter={(value) =>
                new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                }).format(value as number)
              }
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
