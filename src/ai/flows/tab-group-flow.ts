'use server';
/**
 * @fileOverview An AI flow that generates tab groups based on a user's open tabs.
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
  tabs: z.array(TabSchema).describe('A list of currently open browser tabs to be grouped.'),
});
type TabGroupInput = z.infer<typeof TabGroupInputSchema>;

const TabGroupOutputSchema = z.object({
  groups: z.array(TabGroupSchema).describe('A list of generated tab groups.'),
});
type TabGroupOutput = z.infer<typeof TabGroupOutputSchema>;

export async function getTabGroups(input: TabGroupInput): Promise<TabGroupOutput> {
  // If there are no tabs or only one tab, no need to call the AI.
  if (input.tabs.length <= 1) {
    return { groups: [] };
  }
  return tabGroupFlow(input);
}

const prompt = ai.definePrompt({
  name: 'tabGroupPrompt',
  input: {schema: TabGroupInputSchema},
  output: {schema: TabGroupOutputSchema},
  prompt: `You are an assistant that creates groups of browser tabs for a user based on their currently open tabs.
  
  Analyze the following list of open tabs and organize them into logical groups. Each group should have a descriptive name. Only include tabs from the provided list.

  Open Tabs:
  {{#each tabs}}
  - Title: "{{title}}", URL: "{{url}}"
  {{/each}}
  
  Generate up to 3 groups. Each group must have a name and contain a list of the tabs that belong to it.`,
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
