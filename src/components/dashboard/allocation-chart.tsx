'use client';

import { Pie, PieChart, Cell } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';

const chartData = [
  { asset: 'Stocks', value: 45000, fill: 'var(--color-stocks)' },
  { asset: 'Bonds', value: 30000, fill: 'var(--color-bonds)' },
  { asset: 'Real Estate', value: 20000, fill: 'var(--color-realEstate)' },
  { asset: 'Cash', value: 10000, fill: 'var(--color-cash)' },
];

const chartConfig = {
  value: {
    label: 'Value',
  },
  stocks: {
    label: 'Stocks',
    color: 'hsl(var(--chart-1))',
  },
  bonds: {
    label: 'Bonds',
    color: 'hsl(var(--chart-2))',
  },
  realEstate: {
    label: 'Real Estate',
    color: 'hsl(var(--chart-4))',
  },
  cash: {
    label: 'Cash',
    color: 'hsl(var(--chart-5))',
  },
};

export default function AllocationChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[300px]"
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="asset"
          innerRadius={60}
          strokeWidth={5}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <ChartLegend
          content={<ChartLegendContent nameKey="asset" />}
          className="-mt-4"
        />
      </PieChart>
    </ChartContainer>
  );
}
