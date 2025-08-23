import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Leaf, Printer } from 'lucide-react';
import AllocationChart from '@/components/dashboard/allocation-chart';
import PerformanceChart from '@/components/dashboard/performance-chart';

export default function ReportPage() {
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
        <Button onClick={() => window.print()} className="print:hidden">
            <Printer className="mr-2 h-4 w-4" /> Print Report
        </Button>
      </div>

      <Card className="print:shadow-none print:border-none">
        <CardContent className="p-6 space-y-8">
          <section>
            <h3 className="text-lg font-semibold mb-2 font-headline">Portfolio Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Total Value</p>
                <p className="text-2xl font-bold">$125,430.50</p>
              </div>
              <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">YTD Gain</p>
                <p className="text-2xl font-bold text-green-600">+$8,120.75</p>
              </div>
               <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">YTD Return</p>
                <p className="text-2xl font-bold text-green-600">+15.3%</p>
              </div>
               <div className="p-4 bg-secondary/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Risk Profile</p>
                <p className="text-2xl font-bold">Moderate</p>
              </div>
            </div>
          </section>

          <Separator />
          
          <section className='break-after-page'>
             <h3 className="text-lg font-semibold mb-4 font-headline">Portfolio Performance (Last 12 Months)</h3>
              <div className='print:w-full print:h-[400px]'>
                <PerformanceChart />
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
                <div className="p-4 border rounded-lg">
                    <p className="font-medium">Retirement Fund</p>
                    <p className="text-sm text-muted-foreground">Progress: 25% ($250,000 / $1,000,000)</p>
                </div>
                <div className="p-4 border rounded-lg">
                    <p className="font-medium">Dream Vacation</p>
                    <p className="text-sm text-muted-foreground">Progress: 85% ($8,500 / $10,000)</p>
                </div>
                <div className="p-4 border rounded-lg">
                    <p className="font-medium">New Car</p>
                    <p className="text-sm text-muted-foreground">Progress: 37.5% ($15,000 / $40,000)</p>
                </div>
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
