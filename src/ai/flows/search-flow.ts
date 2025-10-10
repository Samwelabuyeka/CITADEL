'use server';
/**
 * @fileOverview A search flow that uses an AI to generate search results.
 *
 * - search - A function that handles the search process.
 * - SearchInput - The input type for the search function.
 * - SearchOutput - The return type for the search function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SearchResultItemSchema = z.object({
  title: z.string().describe('The title of the search result.'),
  url: z.string().url().describe('The URL of the search result.'),
  snippet: z.string().describe('A short snippet of the search result.'),
});

const SearchInputSchema = z.object({
  query: z.string().describe('The search query.'),
});
export type SearchInput = z.infer<typeof SearchInputSchema>;

const SearchOutputSchema = z.object({
  results: z.array(SearchResultItemSchema).describe('A list of search results.'),
});
export type SearchOutput = z.infer<typeof SearchOutputSchema>;

// This is a placeholder for a real web search API call.
// You could replace this with an API like Google Custom Search, Bing, etc.
async function performWebSearch(query: string): Promise<SearchOutput> {
  console.log(`Performing a web search for: ${query}`);
  // In a real implementation, you would fetch results from a search API.
  // For this example, we'll return some realistic-looking dummy data.
  return {
    results: [
      {
        title: `Official Documentation for: ${query}`,
        url: `https://example.com/search?q=${encodeURIComponent(query)}`,
        snippet: `Find the most up-to-date information and official documentation for ${query}. Get started with tutorials, guides, and API references.`,
      },
      {
        title: `Understanding ${query} | A Beginner's Guide`,
        url: `https://another-site.com/guides/${encodeURIComponent(query)}`,
        snippet: `This comprehensive guide breaks down everything you need to know about ${query}, from the basics to advanced concepts.`,
      },
      {
        title: `Recent News and Articles about ${query}`,
        url: `https://news-outlet.com/topics/${encodeURIComponent(query)}`,
        snippet: `Stay informed with the latest news, articles, and discussions surrounding ${query} from top tech journalists.`,
      },
    ],
  };
}

const webSearchTool = ai.defineTool(
  {
    name: 'webSearch',
    description: 'Performs a web search for a given query and returns a list of results.',
    inputSchema: z.object({ query: z.string() }),
    outputSchema: SearchOutputSchema,
  },
  async (input) => {
    return performWebSearch(input.query);
  }
);


export async function search(input: SearchInput): Promise<SearchOutput> {
  return searchFlow(input);
}

const prompt = ai.definePrompt({
  name: 'searchPrompt',
  input: {schema: SearchInputSchema},
  tools: [webSearchTool],
  prompt: `You are a search engine. Given a query, use the webSearch tool to get a list of results. Do not make up results; only use the tool.

Query: {{{query}}}`,
});

const searchFlow = ai.defineFlow(
  {
    name: 'searchFlow',
    inputSchema: SearchInputSchema,
    outputSchema: SearchOutputSchema,
  },
  async input => {
    const llmResponse = await prompt(input);
    const toolResponse = llmResponse.toolRequest?.tool?.('webSearch')?.output;
    if (toolResponse) {
      return toolResponse;
    }
    return { results: [] };
  }
);
