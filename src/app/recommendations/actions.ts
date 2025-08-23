'use server';

import {
  generateInvestmentStrategy,
  type GenerateInvestmentStrategyInput,
  type GenerateInvestmentStrategyOutput,
} from '@/ai/flows/generate-investment-strategy';

export type RecommendationOutput = GenerateInvestmentStrategyOutput;

export async function getAiRecommendation(
  input: GenerateInvestmentStrategyInput
): Promise<RecommendationOutput | null> {
  try {
    const result = await generateInvestmentStrategy(input);
    return result;
  } catch (error) {
    console.error('Error getting AI recommendation:', error);
    return null;
  }
}
