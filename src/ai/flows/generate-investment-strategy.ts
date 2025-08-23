'use server';

/**
 * @fileOverview AI-powered investment strategy recommendation flow.
 *
 * - generateInvestmentStrategy - A function that generates personalized investment strategies.
 * - GenerateInvestmentStrategyInput - The input type for the generateInvestmentStrategy function.
 * - GenerateInvestmentStrategyOutput - The return type for the generateInvestmentStrategy function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateInvestmentStrategyInputSchema = z.object({
  financialGoals: z
    .string()
    .describe('The user’s financial goals (e.g., retirement, buying a home).'),
  riskTolerance: z
    .string()
    .describe(
      'The user’s risk tolerance (e.g., conservative, moderate, aggressive).'
    ),
  marketConditions: z
    .string()
    .describe('The current market conditions and trends.'),
});
export type GenerateInvestmentStrategyInput = z.infer<
  typeof GenerateInvestmentStrategyInputSchema
>;

const GenerateInvestmentStrategyOutputSchema = z.object({
  strategyDescription: z
    .string()
    .describe('A detailed description of the recommended investment strategy.'),
  assetAllocation: z
    .string()
    .describe('The recommended asset allocation (e.g., stocks, bonds, real estate).'),
  specificInvestments: z
    .string()
    .describe(
      'Specific investment recommendations based on the strategy and market conditions.'
    ),
});
export type GenerateInvestmentStrategyOutput = z.infer<
  typeof GenerateInvestmentStrategyOutputSchema
>;

export async function generateInvestmentStrategy(
  input: GenerateInvestmentStrategyInput
): Promise<GenerateInvestmentStrategyOutput> {
  return generateInvestmentStrategyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateInvestmentStrategyPrompt',
  input: {schema: GenerateInvestmentStrategyInputSchema},
  output: {schema: GenerateInvestmentStrategyOutputSchema},
  prompt: `You are an expert financial advisor. Based on the user's financial goals, risk tolerance, and current market conditions, provide a personalized investment strategy.

Financial Goals: {{{financialGoals}}}
Risk Tolerance: {{{riskTolerance}}}
Current Market Conditions: {{{marketConditions}}}

Provide a detailed strategy description, recommended asset allocation, and specific investment recommendations.`,
});

const generateInvestmentStrategyFlow = ai.defineFlow(
  {
    name: 'generateInvestmentStrategyFlow',
    inputSchema: GenerateInvestmentStrategyInputSchema,
    outputSchema: GenerateInvestmentStrategyOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
