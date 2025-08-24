'use server';

import {
  summarizeMarketReport,
  type SummarizeMarketReportInput,
  type SummarizeMarketReportOutput,
} from '@/ai/flows/summarize-market-report';

export async function getAiSummary(
  input: SummarizeMarketReportInput
): Promise<SummarizeMarketReportOutput | null> {
  try {
    const result = await summarizeMarketReport(input);
    return result;
  } catch (error) {
    console.error('Error getting AI summary:', error);
    return null;
  }
}
