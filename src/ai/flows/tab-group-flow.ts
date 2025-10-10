'use server';
/**
 * @fileOverview An AI flow that generates tab groups based on a user's interest.
 *
 * - getTabGroups - A function that handles the tab group generation process.
 * - TabGroupInput - The input type for the getTabGroups function.
 * - TabGroupOutput - The return type for the getTabGroups function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TabSchema = z.object({
  title: z.string().describe('The title of the tab.'),
  url: z.string().url().describe('The URL of the tab.'),
});

const TabGroupSchema = z.object({
  name: z.string().describe('The name of the tab group.'),
  tabs: z.array(TabSchema).describe('A list of tabs in the group.'),
});

const TabGroupInputSchema = z.object({
  interest: z.string().describe("A user's interest to generate tab groups for."),
});
export type TabGroupInput = z.infer<typeof TabGroupInputSchema>;

const TabGroupOutputSchema = z.object({
  groups: z.array(TabGroupSchema).describe('A list of generated tab groups.'),
});
export type TabGroupOutput = z.infer<typeof TabGroupOutputSchema>;

export async function getTabGroups(input: TabGroupInput): Promise<TabGroupOutput> {
  return tabGroupFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tabGroupPrompt',
  input: {schema: TabGroupInputSchema},
  output: {schema: TabGroupOutputSchema},
  prompt: `You are an assistant that creates groups of browser tabs for a user based on their interests.
  
  Generate 3 tab groups related to the following interest: {{{interest}}}.
  Each group should have a name and between 2 and 4 tabs.
  Each tab must have a title and a valid URL.`,
});

const tabGroupFlow = ai.defineFlow(
  {
    name: 'tabGroupFlow',
    inputSchema: TabGroupInputSchema,
    outputSchema: TabGroupOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
