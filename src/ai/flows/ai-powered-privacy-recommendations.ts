// Implemented as requested
'use server';
/**
 * @fileOverview An AI-powered privacy assistant that analyzes browsing habits and suggests optimal privacy settings.
 *
 * - aiPoweredPrivacyRecommendations - A function that handles the privacy recommendation process.
 * - AIPoweredPrivacyRecommendationsInput - The input type for the aiPoweredPrivacyRecommendations function.
 * - AIPoweredPrivacyRecommendationsOutput - The return type for the aiPoweredPrivacyRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIPoweredPrivacyRecommendationsInputSchema = z.object({
  browsingHistory: z
    .string()
    .describe(
      'A detailed history of the user browsing activity, including websites visited, search queries, and interactions with web content.'
    ),
});
export type AIPoweredPrivacyRecommendationsInput = z.infer<typeof AIPoweredPrivacyRecommendationsInputSchema>;

const AIPoweredPrivacyRecommendationsOutputSchema = z.object({
  recommendations: z
    .string()
    .describe(
      'A list of personalized privacy recommendations based on the analysis of the users browsing history.'
    ),
  explanation: z
    .string()
    .describe(
      'A detailed explanation of why each recommendation is being made, and how it will improve the users privacy.'
    ),
});
export type AIPoweredPrivacyRecommendationsOutput = z.infer<typeof AIPoweredPrivacyRecommendationsOutputSchema>;

export async function aiPoweredPrivacyRecommendations(
  input: AIPoweredPrivacyRecommendationsInput
): Promise<AIPoweredPrivacyRecommendationsOutput> {
  return aiPoweredPrivacyRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiPoweredPrivacyRecommendationsPrompt',
  input: {schema: AIPoweredPrivacyRecommendationsInputSchema},
  output: {schema: AIPoweredPrivacyRecommendationsOutputSchema},
  prompt: `You are an AI-powered privacy assistant that analyzes a user's browsing history and provides personalized recommendations for improving their privacy.

  Analyze the following browsing history:
  {{browsingHistory}}

  Based on this analysis, provide a list of recommendations to improve the user's privacy. For each recommendation, explain why it is being made and how it will help.

  Format your response as a list of recommendations, with each recommendation followed by its explanation.
  `,
});

const aiPoweredPrivacyRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiPoweredPrivacyRecommendationsFlow',
    inputSchema: AIPoweredPrivacyRecommendationsInputSchema,
    outputSchema: AIPoweredPrivacyRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);



