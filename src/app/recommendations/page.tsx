'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAiRecommendation, type RecommendationOutput } from './actions';
import { useToast } from '@/hooks/use-toast';
import { BrainCircuit, Loader, Wand2 } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const recommendationFormSchema = z.object({
  financialGoals: z
    .string()
    .min(10, { message: 'Please describe your financial goals in more detail.' })
    .max(500, { message: 'Please keep your goals under 500 characters.' }),
  riskTolerance: z.enum(['conservative', 'moderate', 'aggressive']),
  marketConditions: z
    .string()
    .min(10, {
      message: 'Please describe your view on market conditions.',
    })
    .max(500, {
      message: 'Please keep your market view under 500 characters.',
    }),
});

export default function RecommendationsPage() {
  const [recommendation, setRecommendation] = useState<RecommendationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recommendationFormSchema>>({
    resolver: zodResolver(recommendationFormSchema),
    defaultValues: {
      financialGoals: '',
      riskTolerance: 'moderate',
      marketConditions: 'I believe the market is currently experiencing steady growth with some volatility in the tech sector.',
    },
  });

  async function onSubmit(values: z.infer<typeof recommendationFormSchema>) {
    setIsLoading(true);
    setRecommendation(null);
    try {
      const result = await getAiRecommendation(values);
      if (result) {
        setRecommendation(result);
      } else {
        throw new Error('Failed to get recommendation.');
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not fetch AI recommendation. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl md:text-4xl font-bold text-foreground flex items-center gap-3">
          <BrainCircuit className="w-10 h-10 text-primary" />
          AI-Driven Recommendations
        </h1>
        <p className="text-muted-foreground mt-2">
          Leverage AI to get a personalized investment strategy.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Investment Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="financialGoals"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Financial Goals</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Retire in 20 years, buy a house in 5 years..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Describe your primary financial objectives.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="riskTolerance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Risk Tolerance</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your risk tolerance" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="conservative">Conservative</SelectItem>
                        <SelectItem value="moderate">Moderate</SelectItem>
                        <SelectItem value="aggressive">Aggressive</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>
                      How much risk are you willing to take?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="marketConditions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>View on Market Conditions</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., I believe the market is bullish..."
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      What is your outlook on the current market?
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <Loader className="animate-spin" />
                ) : (
                  <Wand2 />
                )}
                Generate Strategy
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isLoading && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-8 w-1/2" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </CardContent>
          </Card>
        </div>
      )}

      {recommendation && (
        <div className="space-y-6 animate-in fade-in-50 duration-500">
          <Card>
            <CardHeader>
              <CardTitle>Strategy Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{recommendation.strategyDescription}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Asset Allocation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{recommendation.assetAllocation}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Specific Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{recommendation.specificInvestments}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
