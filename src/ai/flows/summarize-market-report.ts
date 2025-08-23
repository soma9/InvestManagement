'use server';

/**
 * @fileOverview Summarizes market reports to provide quick insights.
 *
 * - summarizeMarketReport - A function that summarizes a market report.
 * - SummarizeMarketReportInput - The input type for the summarizeMarketReport function.
 * - SummarizeMarketReportOutput - The return type for the summarizeMarketReport function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeMarketReportInputSchema = z.object({
  report: z
    .string()
    .describe('The full text of the market report to summarize.'),
  userInvestmentProfile: z
    .string()
    .optional()
    .describe('Optional profile for investment to tailor report'),
});
export type SummarizeMarketReportInput = z.infer<typeof SummarizeMarketReportInputSchema>;

const SummarizeMarketReportOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the market report.'),
});
export type SummarizeMarketReportOutput = z.infer<typeof SummarizeMarketReportOutputSchema>;

export async function summarizeMarketReport(input: SummarizeMarketReportInput): Promise<SummarizeMarketReportOutput> {
  return summarizeMarketReportFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeMarketReportPrompt',
  input: {schema: SummarizeMarketReportInputSchema},
  output: {schema: SummarizeMarketReportOutputSchema},
  prompt: `You are an expert financial analyst who summarizes market reports for investors.

  Here is the market report: {{{report}}}

  {% if userInvestmentProfile %}Consider the following investment profile when writing the summary: {{{userInvestmentProfile}}}{% endif %}

  Provide a concise summary of the market report, focusing on key trends and potential impacts on investments.`,
});

const summarizeMarketReportFlow = ai.defineFlow(
  {
    name: 'summarizeMarketReportFlow',
    inputSchema: SummarizeMarketReportInputSchema,
    outputSchema: SummarizeMarketReportOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
