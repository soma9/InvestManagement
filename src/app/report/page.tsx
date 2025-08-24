'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Leaf, Printer, Wand2, Loader } from 'lucide-react';
import AllocationChart from '@/components/dashboard/allocation-chart';
import PerformanceChart from '@/components/dashboard/performance-chart';
import { useState, useEffect } from 'react';
import { useCurrency } from '@/context/currency-context';
import { getAiSummary } from './actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useTransactions } from '@/context/transaction-context';

export default function ReportPage() {
  const { formatCurrency } = useCurrency();
  const [currentDate, setCurrentDate] = useState('');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { transactions } = useTransactions();

  useEffect(() => {
    setCurrentDate(new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }));
  }, []);

  const portfolioData = {
    totalValue: 125430.50,
    ytdGain: 8120.75,
    ytdReturn: '15.3%',
    riskProfile: 'Moderate',
    goals: [
      { name: 'Retirement Fund', progress: 25, currentAmount: 250000, targetAmount: 1000000 },
      { name: 'Dream Vacation', progress: 85, currentAmount: 8500, targetAmount: 10000 },
      { name: 'New Car', progress: 37.5, currentAmount: 15000, targetAmount: 40000 },
    ]
  };

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    setSummary(null);
    try {
      const reportText = `
        Portfolio Summary:
        - Total Value: ${formatCurrency(portfolioData.totalValue)}
        - YTD Gain: +${formatCurrency(portfolioData.ytdGain)}
        - YTD Return: +${portfolioData.ytdReturn}
        - Risk Profile: ${portfolioData.riskProfile}

        Financial Goals Status:
        ${portfolioData.goals.map(g => `- ${g.name}: ${g.progress}% complete (${formatCurrency(g.currentAmount)} / ${formatCurrency(g.targetAmount)})`).join('\n')}
      `;
      const result = await getAiSummary({ report: reportText });
      if (result) {
        setSummary(result.summary);
      } else {
        throw new Error('Failed to get summary.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch AI summary. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 bg-background print:bg-white text-foreground print:text-black">
      <div className="flex justify-between items-start mb-8 print:mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Leaf className="w-8 h-8 text-primary" />
            <h1 className="font-headline text-3xl font-bold text-primary">
              WealthWise
            </h1>
          </div>
          <h2 className="text-xl font-semibold">Investment Performance Report</h2>
          <p className="text-muted-foreground">Generated on: {currentDate}</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button onClick={handleGenerateSummary} disabled={isLoading}>
            {isLoading ? <Loader className="animate-spin" /> : <Wand2 />}
            <span>Get AI Summary</span>
          </Button>
          <Button onClick={() => window.print()}>
            <div>
              <Printer className="mr-2 h-4 w-4" /> Print Report
            </div>
          </Button>
        </div>
      </div>

      {isLoading && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>AI Summary</CardTitle>
          </CardHeader>
          <CardContent>
             <Skeleton className="h-4 w-full mb-2" />
             <Skeleton className="h-4 w-full mb-2" />
             <Skeleton className="h-4 w-3/4" />
          </CardContent>
        </Card>
      )}

      {summary && (
         <Card className="mb-8 animate-in fade-in-50 duration-500">
           <CardHeader>
             <CardTitle className='flex items-center gap-2'><Wand2/> AI-Generated Summary</CardTitle>
           </CardHeader>
           <CardContent>
             <p className="text-muted-foreground">{summary}</p>
           </CardContent>
         </Card>
       )}


      <Card className="print:shadow-none print:border-none">
        <CardContent className="p-6 space-y-8">
          <section>
            <h3 className="text-lg font-semibold mb-2 font-headline">Portfolio Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">{formatCurrency(portfolioData.totalValue)}</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">YTD Gain</p>
                <p className="text-2xl font-bold text-green-600">+{formatCurrency(portfolioData.ytdGain)}</p>
              </div>
               <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">YTD Return</p>
                <p className="text-2xl font-bold text-green-600">+{portfolioData.ytdReturn}</p>
              </div>
               <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Risk Profile</p>
                <p className="text-2xl font-bold">{portfolioData.riskProfile}</p>
              </div>
            </div>
          </section>

          <Separator />
          
          <section className='break-after-page'>
             <h3 className="text-lg font-semibold mb-4 font-headline">Portfolio Performance (Last 12 Months)</h3>
              <div className='print:w-full print:h-[400px]'>
                <PerformanceChart transactions={transactions} />
              </div>
          </section>
          
          <Separator />

          <section>
            <h3 className="text-lg font-semibold mb-4 font-headline">Asset Allocation</h3>
            <div className='print:w-full print:h-[400px]'>
                <AllocationChart />
            </div>
          </section>

           <Separator />

          <section>
             <h3 className="text-lg font-semibold mb-4 font-headline">Financial Goals Status</h3>
             <div className="space-y-4">
                {portfolioData.goals.map((goal, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                      <p className="font-medium">{goal.name}</p>
                      <p className="text-sm text-muted-foreground">Progress: {goal.progress}% ({formatCurrency(goal.currentAmount)} / {formatCurrency(goal.targetAmount)})</p>
                  </div>
                ))}
             </div>
          </section>

        </CardContent>
      </Card>
      <footer className="text-center text-xs text-muted-foreground mt-8 print:mt-4">
        <p>This report is for informational purposes only and does not constitute financial advice.</p>
        <p>WealthWise © {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
